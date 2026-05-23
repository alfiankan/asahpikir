import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Flame, Trophy, Lock, Unlock, Sparkles, BookOpen, GraduationCap, ArrowLeft, RefreshCw, Star, Info } from 'lucide-react';
import { initUserState, updateMastery, selectNextStep, isModuleUnlocked } from './components/AdaptiveEngine';
import InteractiveWidget from './components/InteractiveWidget';
import QuizCard from './components/QuizCard';

// Static imports of structured adaptive lesson and quiz files
import elemArithmetic from './data/lessons/elementary/arithmetic.json';
import elemFractions from './data/lessons/elementary/fractions.json';
import midRatios from './data/lessons/middle_school/ratios.json';
import midIntroAlgebra from './data/lessons/middle_school/intro_algebra.json';
import highTrig from './data/lessons/high_school/trigonometry.json';
import highFunctions from './data/lessons/high_school/functions.json';
import collCalculus from './data/lessons/college/calculus.json';
import collLinearAlgebra from './data/lessons/college/linear_algebra.json';

// Group curriculum modules by track
const CURRICULUM = {
  elementary: [elemArithmetic, elemFractions],
  middle_school: [midRatios, midIntroAlgebra],
  high_school: [highTrig, highFunctions],
  college: [collCalculus, collLinearAlgebra],
};

const TRACK_LABELS = {
  elementary: "Elementary School (Grades 1-6)",
  middle_school: "Middle School (Grades 6-8)",
  high_school: "High School (Grades 9-12)",
  college: "College Level (Grades 13+)"
};

// Quick helper to render basic inline math equations
const formatMathContent = (text = '') => {
  if (!text) return '';
  // Simple replacement of $...$ inline LaTeX blocks
  const parts = text.split(/\$(.+?)\$/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      // Styled math formula
      return (
        <code key={i} style={{
          background: 'rgba(255,255,255,0.06)',
          color: 'hsl(var(--secondary))',
          padding: '2px 6px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          {part}
        </code>
      );
    }
    // Markdown elements rendering
    return part.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h3 key={`${idx}`} style={{ fontSize: '18px', marginTop: '16px', marginBottom: '8px', color: '#fff' }}>{line.slice(4)}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={`${idx}`} style={{ fontSize: '22px', marginTop: '20px', marginBottom: '10px', color: '#fff' }}>{line.slice(3)}</h2>;
      }
      return <p key={`${idx}`} style={{ marginBottom: '12px', fontSize: '15px', color: 'hsl(var(--text-secondary))' }}>{line}</p>;
    });
  });
};

export default function App() {
  const [userState, setUserState] = useState(initUserState());
  const [currentTrack, setCurrentTrack] = useState('elementary');
  const [activeModule, setActiveModule] = useState(null); // module object
  const [activeStep, setActiveStep] = useState(null); // step object
  const [showPlacement, setShowPlacement] = useState(true);
  const [celebrationModule, setCelebrationModule] = useState(null);

  // Load state from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('asahfikir_user_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserState(parsed);
        setCurrentTrack(parsed.profile.track || 'elementary');
        setShowPlacement(false);
      } catch (e) {
        console.error("Failed loading user state from localStorage:", e);
      }
    }
  }, []);

  // Save state helper
  const saveState = (updated) => {
    setUserState(updated);
    localStorage.setItem('asahfikir_user_data', JSON.stringify(updated));
  };

  // Select start level placement
  const handleSelectTrack = (trackKey) => {
    const updated = { ...userState };
    updated.profile.track = trackKey;
    
    // Set baseline masteries for prior levels
    const tracks = ['elementary', 'middle_school', 'high_school', 'college'];
    const trackIndex = tracks.indexOf(trackKey);
    
    tracks.forEach((t, index) => {
      if (index < trackIndex) {
        // Assume user mastered prior tracks
        CURRICULUM[t].forEach(mod => {
          updated.knowledge[mod.id] = { mastery: 0.9, completedSteps: mod.steps.map(s => s.id), completed: true };
        });
      }
    });

    saveState(updated);
    setCurrentTrack(trackKey);
    setShowPlacement(false);
  };

  // Launching a specific learning module
  const startModule = (moduleData) => {
    if (!isModuleUnlocked(moduleData, userState)) return;
    setActiveModule(moduleData);
    const next = selectNextStep(moduleData, userState);
    setActiveStep(next);
  };

  // Handle quiz response
  const handleAnswerSubmit = (isCorrect, responseTime, hintsUsed) => {
    if (!activeModule || !activeStep) return;

    // Update state via BKT engine
    const nextState = updateMastery(userState, activeModule.id, activeStep.id, isCorrect, responseTime, hintsUsed);
    saveState(nextState);

    // If answer is correct and node is complete, trigger confetti!
    const nodeState = nextState.knowledge[activeModule.id];
    if (nodeState && nodeState.mastery >= 0.85 && !userState.knowledge[activeModule.id]?.completed) {
      triggerConfetti();
      setCelebrationModule(activeModule);
    }

    // Select next adaptive step
    const nextStep = selectNextStep(activeModule, nextState);
    if (nextStep) {
      setActiveStep(nextStep);
    } else {
      // Completed all steps in this run
      setActiveStep(null);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#10b981', '#ec4899', '#f59e0b']
    });
  };

  const resetAllProgress = () => {
    if (window.confirm("Are you sure you want to reset all your learning history and achievements?")) {
      const reset = initUserState();
      setUserState(reset);
      localStorage.setItem('asahfikir_user_data', JSON.stringify(reset));
      setShowPlacement(true);
      setActiveModule(null);
      setActiveStep(null);
    }
  };

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <header className="nav-header">
        <div className="brand" onClick={() => { setActiveModule(null); setActiveStep(null); }}>
          <Sparkles size={24} style={{ color: 'hsl(var(--primary))' }} />
          <span>asahfikir</span>
        </div>

        <div className="nav-stats">
          <div className="stat-badge streak">
            <Flame size={16} fill="currentColor" />
            <span>{userState.profile.streak} Days</span>
          </div>

          <div className="stat-badge points">
            <Trophy size={16} />
            <span>{userState.profile.points} XP</span>
          </div>

          {!activeModule && (
            <select
              style={{
                background: 'hsl(var(--bg-glass))',
                border: '1px solid hsl(var(--border-glass))',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
              value={currentTrack}
              onChange={(e) => setCurrentTrack(e.target.value)}
            >
              <option value="elementary">Elementary</option>
              <option value="middle_school">Middle School</option>
              <option value="high_school">High School</option>
              <option value="college">College</option>
            </select>
          )}

          <button
            onClick={resetAllProgress}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'hsl(var(--text-muted))',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px'
            }}
            title="Reset All Progress"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {showPlacement ? (
          /* Placement & Track Picker Screen */
          <div className="glass-panel diagnostic-container">
            <GraduationCap size={48} style={{ color: 'hsl(var(--primary))', margin: '0 auto' }} />
            <div>
              <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Select Your Starting Path</h2>
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '15px' }}>
                AsahFikir adapts lessons to your proficiency in real-time. Pick where you would like to start your learning journey:
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', marginTop: '12px' }}>
              {Object.keys(TRACK_LABELS).map((trackKey) => (
                <button
                  key={trackKey}
                  className="choice-card"
                  style={{ justifyContent: 'space-between', padding: '20px' }}
                  onClick={() => handleSelectTrack(trackKey)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <BookOpen size={20} style={{ color: 'hsl(var(--primary))' }} />
                    <span style={{ fontWeight: '600' }}>{TRACK_LABELS[trackKey]}</span>
                  </div>
                  <ArrowRight size={16} />
                </button>
              ))}
            </div>
          </div>
        ) : activeModule ? (
          /* Active Lesson Player */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header progress info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                className="btn btn-secondary"
                style={{ padding: '8px 16px', fontSize: '14px' }}
                onClick={() => { setActiveModule(null); setActiveStep(null); }}
              >
                <ArrowLeft size={16} /> Dashboard
              </button>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {activeModule.title} Mastery: {Math.round((userState.knowledge[activeModule.id]?.mastery || 0) * 100)}%
                </span>
                <div className="progress-bar-container" style={{ width: '160px' }}>
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${Math.round((userState.knowledge[activeModule.id]?.mastery || 0) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Split explore/visual and quiz sections */}
            {activeStep ? (
              <div className="lesson-frame">
                {/* Left panel: concept explanation and quiz card */}
                <div className="lesson-left">
                  <div className="glass-panel" style={{ padding: '24px', flex: 1, overflowY: 'auto', maxHeight: '350px' }}>
                    {formatMathContent(activeStep.content)}
                  </div>
                  
                  <QuizCard step={activeStep} onAnswer={handleAnswerSubmit} />
                </div>

                {/* Right panel: interactive mathematical visual widget */}
                <div className="lesson-right">
                  <InteractiveWidget type={activeStep.widget} params={activeStep.widgetParams} />
                </div>
              </div>
            ) : (
              /* Completed Module Screen */
              <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'hsla(var(--secondary), 0.15)',
                  color: 'hsl(var(--secondary))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Star size={40} fill="currentColor" />
                </div>
                <div>
                  <h2 style={{ fontSize: '26px' }}>Module Completed!</h2>
                  <p style={{ color: 'hsl(var(--text-secondary))', marginTop: '8px', maxWidth: '400px' }}>
                    You have achieved mathematical mastery in <b>{activeModule.title}</b>! The adaptive engine has updated your knowledge graph profile.
                  </p>
                </div>
                <button className="btn btn-primary" onClick={() => { setActiveModule(null); setActiveStep(null); }}>
                  Back to Dashboard
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Course Map Dashboard */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Celebration modal overlay */}
            {celebrationModule && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 100,
                background: 'rgba(2, 6, 23, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)'
              }}>
                <div className="glass-panel" style={{ padding: '40px', maxWidth: '450px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                  <Star size={64} style={{ color: '#f59e0b' }} fill="#f59e0b" />
                  <div>
                    <h2 style={{ fontSize: '26px' }}>Level Mastered!</h2>
                    <p style={{ color: 'hsl(var(--text-secondary))', marginTop: '8px' }}>
                      Sensational job! Your adaptive mastery for <b>{celebrationModule.title}</b> reached 85%+. You've unlocked subsequent math concepts!
                    </p>
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setCelebrationModule(null)}>
                    Awesome, Let's Continue
                  </button>
                </div>
              </div>
            )}

            <div>
              <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Learning Path</h1>
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '15px' }}>
                Currently studying: <b>{TRACK_LABELS[currentTrack]}</b>. Complete unlocked nodes to unlock advanced topics.
              </p>
            </div>

            <div className="dashboard-grid">
              {CURRICULUM[currentTrack].map((mod) => {
                const unlocked = isModuleUnlocked(mod, userState);
                const nodeState = userState.knowledge[mod.id] || { mastery: 0, completed: false };
                const progressPercent = Math.round(nodeState.mastery * 100);

                return (
                  <div
                    key={mod.id}
                    className={`glass-panel concept-card ${unlocked ? 'active' : 'locked'}`}
                    onClick={() => unlocked && startModule(mod)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: 'hsl(var(--text-muted))', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        {unlocked ? "Unlocked" : "Locked"}
                      </span>
                      {unlocked ? (
                        nodeState.completed ? (
                          <Star size={18} fill="hsl(var(--secondary))" stroke="hsl(var(--secondary))" />
                        ) : (
                          <Unlock size={16} style={{ color: 'hsl(var(--secondary))' }} />
                        )
                      ) : (
                        <Lock size={16} style={{ color: 'hsl(var(--text-muted))' }} />
                      )}
                    </div>

                    <div>
                      <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>{mod.title}</h3>
                      <p style={{ fontSize: '13px', color: 'hsl(var(--text-secondary))' }}>
                        {mod.steps.length} learning modules & adaptive quiz items.
                      </p>
                    </div>

                    {unlocked && (
                      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                          <span>Adaptive Mastery</span>
                          <span style={{ fontWeight: 'bold' }}>{progressPercent}%</span>
                        </div>
                        <div className="progress-bar-container">
                          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Info panel */}
            <div className="glass-panel" style={{ padding: '20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <Info size={20} style={{ color: 'hsl(var(--primary))', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '4px' }}>How the Adaptive System Works</h4>
                <p style={{ fontSize: '13px', color: 'hsl(var(--text-secondary))', lineHeight: 1.5 }}>
                  AsahFikir uses Bayesian Knowledge Tracing (BKT) to update its assessment of your math abilities. As you answer questions correctly, your mastery score increases, and the system serves higher difficulty items (Levels 1 to 3) in real-time. Unlocking advanced tracks will automatically assume basic skills in the previous modules.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
