// Bayesian Knowledge Tracing (BKT) Parameters
const BKT_DEFAULT = {
  p_l0: 0.15, // Prior probability of knowing
  p_t: 0.20,  // Transition probability (learning step)
  p_s: 0.10,  // Slip probability (knows but makes error)
  p_g: 0.20,  // Guess probability (doesn't know but gets correct)
};

export const initUserState = () => {
  return {
    profile: {
      name: "Math Explorer",
      track: "elementary", // Default track
      streak: 0,
      points: 0,
      lastActive: null
    },
    knowledge: {} // Map of moduleId -> { mastery: number, completedSteps: string[], completed: boolean }
  };
};

/**
 * Update the mastery probability using BKT formulas.
 * Account for hints and response times.
 */
export const updateMastery = (currentState, moduleId, stepId, isCorrect, responseTime = 30, hintsUsed = false) => {
  const updatedState = { ...currentState };
  
  if (!updatedState.knowledge[moduleId]) {
    updatedState.knowledge[moduleId] = {
      mastery: BKT_DEFAULT.p_l0,
      completedSteps: [],
      completed: false
    };
  }

  const nodeState = updatedState.knowledge[moduleId];
  let p_prev = nodeState.mastery;

  // 1. Parameter Adjustments
  let slip = BKT_DEFAULT.p_s;
  let guess = BKT_DEFAULT.p_g;
  let transition = BKT_DEFAULT.p_t;

  if (hintsUsed) {
    // Having used hints indicates partial knowledge; count as incorrect but reduce BKT penalty
    isCorrect = false;
    slip = 0.40; 
  }

  if (isCorrect && responseTime < 10) {
    // Rapid answer shows high confidence, boost transition
    transition += 0.05;
  }

  // 2. BKT Posterior Calculation
  let p_post = 0;
  if (isCorrect) {
    const num = p_prev * (1 - slip);
    const den = p_prev * (1 - slip) + (1 - p_prev) * guess;
    p_post = num / den;
  } else {
    const num = p_prev * slip;
    const den = p_prev * slip + (1 - p_prev) * (1 - guess);
    p_post = num / den;
  }

  // 3. Project Transition (Learning step)
  let p_new = p_post + (1 - p_post) * transition;

  // Clamp mastery between 0.01 and 0.99 to avoid asymptotic lock
  p_new = Math.max(0.01, Math.min(0.99, p_new));

  // 4. Update state variables
  nodeState.mastery = p_new;
  if (!nodeState.completedSteps.includes(stepId)) {
    nodeState.completedSteps.push(stepId);
  }

  // Mark module completed if mastery threshold met (e.g. 85% confidence)
  if (p_new >= 0.85) {
    nodeState.completed = true;
  }

  // 5. Update user points & streak
  if (isCorrect) {
    updatedState.profile.points += 10;
    
    // Streak tracking
    const today = new Date().toDateString();
    if (updatedState.profile.lastActive === today) {
      // Already active today, streak stays intact
    } else {
      updatedState.profile.streak += 1;
      updatedState.profile.lastActive = today;
    }
  }

  return updatedState;
};

/**
 * Determine which level of question to show next.
 * Difficulty levels inside the module JSON:
 * Level 1: mastery < 0.40
 * Level 2: 0.40 <= mastery < 0.70
 * Level 3: mastery >= 0.70
 */
export const selectNextStep = (moduleData, userState) => {
  const moduleId = moduleData.id;
  const nodeState = userState.knowledge[moduleId] || {
    mastery: BKT_DEFAULT.p_l0,
    completedSteps: [],
    completed: false
  };

  const currentMastery = nodeState.mastery;
  
  // Decide target difficulty levels based on current mastery
  let allowedLevels = [1];
  if (currentMastery >= 0.70) {
    allowedLevels = [3, 2]; // Prefers level 3, fallbacks to 2
  } else if (currentMastery >= 0.40) {
    allowedLevels = [2, 1]; // Prefers level 2, fallbacks to 1
  }

  // Find steps matching the target levels that haven't been completed yet
  for (let lvl of allowedLevels) {
    const nextStep = moduleData.steps.find(
      (s) => s.level === lvl && !nodeState.completedSteps.includes(s.id)
    );
    if (nextStep) return nextStep;
  }

  // Fallback: search any level that is uncompleted
  const uncompleted = moduleData.steps.find(
    (s) => !nodeState.completedSteps.includes(s.id)
  );
  if (uncompleted) return uncompleted;

  // If everything is completed, return the first step or complete state
  return null;
};

/**
 * Check if the user has unlocked the current module based on prerequisite graph.
 */
export const isModuleUnlocked = (moduleData, userState) => {
  if (!moduleData.prerequisites || moduleData.prerequisites.length === 0) {
    return true;
  }

  return moduleData.prerequisites.every((prereqId) => {
    const prereqState = userState.knowledge[prereqId];
    return prereqState && prereqState.mastery >= 0.75;
  });
};
