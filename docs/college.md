# College Curriculum (Grades 13+) - AsahFikir

This document details the modules, interactive concepts, and adaptive quiz ideas for the **College** track.

---

## 1. Calculus I & II

### Core Concept: Derivatives & Integrals
- **Level 1 (Intuition)**: Tangent line slope (rate of change) as secant points merge; accumulation of area under a curve using Riemann sum rectangles.
- **Level 2 (Procedural)**: Finding derivatives (chain rule, product rule) and evaluating definite integrals (integration by parts).
- **Level 3 (Challenge)**: Volumes of revolution, infinite series convergence tests (Taylor series expansions).

### Interactive Widget Idea: `RiemannSums`
* **Interaction**: A curve (e.g. $y = x^2$) on an interval $[a, b]$. A slider allows the user to change the number of rectangles ($N$) from 4 to 100. The sum of the rectangle areas is recalculated and compared to the exact integral.
* **Quiz**: "Set the interval to $[0, 2]$ and curve to $y = x^2$. Increase $N$ to 50. What value does the Riemann sum converge to?"

---

## 2. Linear Algebra

### Core Concept: Matrices & Vector Space Transformations
- **Level 1 (Intuition)**: Applying a $2 \times 2$ matrix to a grid of points or a shape, observing scaling, rotation, shearing, and the meaning of eigenvalues/eigenvectors.
- **Level 3 (Challenge)**: Determinants as area/volume scaling factors, systems of equations using Gaussian elimination.

### Interactive Widget Idea: `VectorSpace3D`
* **Interaction**: A 3D coordinate system containing a grid. The user edits components of a matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$. The grid morphs in real-time. Eigenvectors are highlighted.
* **Quiz**: "Find a transformation matrix that shears the unit square horizontally by 2 units. What is the determinant of this matrix?"

---

## 3. Differential Equations

### Core Concept: Slope Fields and Rate Equations
- **Level 1 (Intuition)**: Slope fields on a grid. Clicking a point drops a "particle" that flows along the slopes, visualizing Euler's method and solution curves.
- **Level 2 (Procedural)**: Solving first-order separable and linear differential equations.
- **Level 3 (Challenge)**: Coupled systems (e.g., predator-prey equations, phase portraits).

### Interactive Widget Idea: `SlopeFieldFlow`
* **Interaction**: A grid of small slope lines corresponding to $dy/dx = f(x, y)$. The user clicks anywhere to place a point. The system draws a smooth curve matching the local derivatives.
* **Quiz**: "Place a starting point at $(0, 1)$ for $dy/dx = -x/y$. What geometric shape does the solution curve form?"

---

## 4. Advanced Math

### Core Concept: Topology, Abstract Algebra, & Real Analysis
- **Level 1 (Intuition)**: Visualizing continuous deformations in topology (e.g. donut to coffee mug); symmetry groups using rotates and flips of a triangle (Dihedral group $D_3$).
- **Level 2 (Procedural)**: Simple group multiplication tables; epsilon-delta proofs of continuity.
- **Level 3 (Challenge)**: Complex proofs (e.g., isomorphism theorems, Cauchy sequences).

### Interactive Widget Idea: `SymmetryGroup`
* **Interaction**: An equilateral triangle. Buttons allow rotations ($120^\circ$) and reflections. Clicking them logs operations and computes products in the group $D_3$, showing non-abelian multiplication.
* **Quiz**: "Perform a reflection $f$, then a rotation $r$. Is the result equal to performing rotation $r$ first, then reflection $f$?"
