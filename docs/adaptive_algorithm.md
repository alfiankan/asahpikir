# Adaptive Learning Algorithm Specification - AsahFikir

AsahFikir uses a client-side **Adaptive Engine** that runs in real-time in the browser. It combines **Bayesian Knowledge Tracing (BKT)** for node mastery with a **Dynamic Difficulty Selector** to queue slides and quizzes.

---

## 1. Bayesian Knowledge Tracing (BKT)

BKT modeling assumes that a user's knowledge state is a binary variable: either they know the concept (Mastered, $L=1$) or they do not (Not Mastered, $L=0$). We compute the probability of mastery $P(L_t)$ at step $t$ after an action.

### Parameters
The algorithm uses four basic parameters, calibrated for math learning:
1. $P(L_0)$ (Prior): Initial probability that the user already knows the concept. Default $= 0.15$ (or $0.5$ if placed via diagnostic).
2. $P(T)$ (Transition): Probability that the user transitions from unmastered to mastered state after viewing a concept slide. Default $= 0.20$.
3. $P(S)$ (Slip): Probability that the user makes a mistake despite mastering the concept. Default $= 0.10$.
4. $P(G)$ (Guess): Probability that the user guesses the correct answer despite not mastering the concept. Default $= 0.20$.

### Update Equations

When the user submits an answer, we compute the posterior probability of mastery $P(L_t | \text{Action})$ and then project it forward to the next step.

#### Step 1: Compute Posterior $P(L_t | \text{Action})$

- **If the answer is CORRECT**:
  $$P(L_t | \text{Correct}) = \frac{P(L_{t-1}) \cdot (1 - P(S))}{P(L_{t-1}) \cdot (1 - P(S)) + (1 - P(L_{t-1})) \cdot P(G)}$$

- **If the answer is INCORRECT**:
  $$P(L_t | \text{Incorrect}) = \frac{P(L_{t-1}) \cdot P(S)}{P(L_{t-1}) \cdot P(S) + (1 - P(L_{t-1})) \cdot (1 - P(G))}$$

#### Step 2: Account for Learning (Project Transition)

After updating, we apply the transition probability to find the updated mastery state $P(L_t)$ before the next question:
$$P(L_t) = P(L_t | \text{Action}) + (1 - P(L_t | \text{Action})) \cdot P(T)$$

---

## 2. Incorporating Response Time & Hints

To make the algorithm feel more dynamic, we adjust the update weights:
- **Hints**: If a user uses a Hint to solve a problem, it is counted as **Incorrect** for the purposes of the BKT update, but with a smaller penalty ($P(S)$ is set to $0.40$ temporarily to reflect partial knowledge).
- **Response Time**: If the user answers correctly in less than 30% of the median expected time, we boost the transition probability $P(T)$ by $+0.05$ (rapid insight). If they take an extremely long time (e.g. $> 180$ seconds), the transition is muted.

---

## 3. Dynamic Difficulty Leveling

Within a single module (e.g. Fractions), the content is classified into **Level 1** (Intuitive), **Level 2** (Applied), and **Level 3** (Challenge).

The user's current mastery probability $P(L_t)$ dictates the mixture of items served:

| Mastery Probability $P(L_t)$ | Difficulty Level Served | Description |
| :--- | :--- | :--- |
| **$0.0 \le P(L_t) < 0.4$** | **Level 1** | Focuses on visual sandboxes and simple explorations to build baseline intuition. |
| **$0.4 \le P(L_t) < 0.7$** | **Level 1 (30%) + Level 2 (70%)** | Introduces equations and procedural quizzes while keeping visual explanations handy. |
| **$0.7 \le P(L_t) \le 1.0$** | **Level 2 (30%) + Level 3 (70%)** | Pushes user to solve abstract challenge problems. Level 1 is skipped unless requested. |

### Module Completion
A module is considered **Mastered** (marked with a green star in the dashboard) when $P(L_t) \ge 0.85$. This unlocks subsequent nodes in the knowledge graph.

---

## 4. Client-Side Database Schema (LocalStorage)

To save progress offline, we write the user's state to LocalStorage:

```json
{
  "userProfile": {
    "name": "Math Explorer",
    "track": "elementary",
    "streak": 5,
    "lastActive": "2026-05-23"
  },
  "knowledgeState": {
    "elem_arithmetic": {
      "mastery": 0.92,
      "completed": true,
      "history": [true, true, false, true]
    },
    "elem_fractions": {
      "mastery": 0.45,
      "completed": false,
      "history": [true, false]
    }
  }
}
```
