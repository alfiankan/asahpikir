# High School Curriculum (Grades 9-12) - AsahFikir

This document details the modules, interactive concepts, and adaptive quiz ideas for the **High School** track.

---

## 1. Algebra I & II

### Core Concept: System of Equations & Quadratics
- **Level 1 (Intuition)**: Graphical intersections of two lines; factoring quadratic expressions by forming rectangular grids of tiles.
- **Level 2 (Procedural)**: Solving systems of linear equations algebraically; using the quadratic formula.
- **Level 3 (Challenge)**: Systems of inequalities, non-linear intersections, complex numbers.

### Interactive Widget Idea: `QuadraticTiles`
* **Interaction**: Drag $x^2$ tiles, $x$ bars, and unit squares to form a perfect rectangle, illustrating factoring like $x^2 + 5x + 6 = (x+2)(x+3)$.
* **Quiz**: "Arrange the tiles for $x^2 + 4x + 3$ into a rectangle. What are its dimensions?"

---

## 2. Geometry (Coordinate)

### Core Concept: Analytic Geometry & Slope
- **Level 1 (Intuition)**: Plotting lines on a coordinate plane, watching slope ($m$) and intercept ($b$) change in real-time.
- **Level 2 (Procedural)**: Distance and midpoint formulas; writing equations of parallel and perpendicular lines.
- **Level 3 (Challenge)**: Conic sections (circles, ellipses, parabolas, hyperbolas) from their algebraic definitions.

### Interactive Widget Idea: `CoordinatePlotter`
* **Interaction**: Drag sliders for $m$ and $b$ to rotate and shift the line $y = mx + b$. Drag points on the coordinate plane to measure lengths.
* **Quiz**: "Adjust the line parameters to pass through the points $(1, 3)$ and $(3, 7)$. What is the equation of the line?"

---

## 3. Trigonometry

### Core Concept: The Unit Circle & Wave Functions
- **Level 1 (Intuition)**: Rotating a vector on a circle of radius 1, projecting its height to trace $\sin(\theta)$ and width to trace $\cos(\theta)$.
- **Level 2 (Procedural)**: Solving right triangle ratios; converting between degrees and radians.
- **Level 3 (Challenge)**: Trigonometric identities and inverse functions.

### Interactive Widget Idea: `UnitCircleTrig`
* **Interaction**: Drag an angle handle around the unit circle. Watch the right triangle update. Concurrently, a second graph plots $\sin(\theta)$ or $\cos(\theta)$ as waves.
* **Quiz**: "Set the angle to $\pi/6$ ($30^\circ$). What is the value of $\sin(\theta)$? Why is it exactly half the radius?"

---

## 4. Functions

### Core Concept: Domain, Range, and Transformations
- **Level 1 (Intuition)**: A "Function Machine" where inputs feed in and outputs are generated. Graph transformations: $f(x-h) + k$ shifts graphs horizontally/vertically.
- **Level 2 (Procedural)**: Identifying domain restrictions (e.g. division by zero, negative square roots).
- **Level 3 (Challenge)**: Composite and inverse functions ($f(g(x))$, $f^{-1}(x)$).

### Interactive Widget Idea: `FunctionTransformer`
* **Interaction**: Choose a parent function (e.g., $y = x^2$, $y = \sqrt{x}$). Drag sliders for horizontal shift $h$, vertical shift $k$, and scale factor $a$.
* **Quiz**: "Given the parent function $f(x) = |x|$, shift the graph 3 units to the right and 2 units up. Write down the equation of the new graph."

---

## 5. Pre-Calculus

### Core Concept: Limits and Sequences
- **Level 1 (Intuition)**: Zooming in infinitely on a curve at a single point to see that it approximates a straight line (local linearity).
- **Level 2 (Procedural)**: Evaluating limits of rational functions using factoring.
- **Level 3 (Challenge)**: Summing infinite geometric series using visual fraction partitions.

### Interactive Widget Idea: `LimitZoomer`
* **Interaction**: A curve with a point $x = c$. The user slides a magnifier to zoom in. The curve looks more and more like a line, showing the concept of tangent lines.
* **Quiz**: "Zoom in on $y = x^2$ at the point $(1,1)$. Estimate the slope of the line it approaches."
