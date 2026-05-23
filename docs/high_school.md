# High School Curriculum (Grades 9-12) - AsahFikir

This document details the modules, interactive concepts, and adaptive quiz ideas (at least 5 questions per difficulty level) for the **High School** track.

---

## 1. Trigonometry

### Core Concept: The Unit Circle & Wave Functions
- **Level 1 (Intuition)**: Rotating a vector on a circle of radius 1, projecting its height to trace $\sin(\theta)$ and width to trace $\cos(\theta)$.
- **Level 2 (Procedural)**: Solving right triangle ratios; converting between degrees and radians.
- **Level 3 (Challenge)**: Trigonometric identities and inverse functions.

### Interactive Widget Idea: `UnitCircleTrig`
* **Interaction**: Drag an angle handle around the unit circle. Watch the right triangle update. Concurrently, a second graph plots $\sin(\theta)$ or $\cos(\theta)$ as waves.

### Graded Quiz Questions (At least 5 per level)

#### Level 1: Unit Circle Coordinate Mapping
1. **Question 1**: What is the value of $\sin(\pi/2)$ (or $\sin(90^\circ)$)?
   - *Step-by-step*:
     1. Locate the angle $\pi/2$ on the unit circle. This angle points straight up along the positive y-axis.
     2. Recall that on the unit circle, the y-coordinate represents $\sin(\theta)$.
     3. The coordinates of the point at $\pi/2$ are $(0, 1)$.
     4. The y-coordinate is 1, so $\sin(\pi/2) = 1$.
2. **Question 2**: What is the value of $\cos(0)$?
   - *Step-by-step*:
     1. $0^\circ$ points straight right along the positive x-axis.
     2. On the unit circle, $\cos(\theta)$ is the x-coordinate.
     3. The coordinates at $0$ radians are $(1, 0)$.
     4. The x-coordinate is 1, so $\cos(0) = 1$.
3. **Question 3**: What are the coordinates of the point on the unit circle at angle $\pi$ ($180^\circ$)?
   - *Step-by-step*:
     1. Angle $\pi$ points straight left along the negative x-axis.
     2. Since the circle has a radius of 1, the point is at $(-1, 0)$.
     3. Thus, $\cos(\pi) = -1$ and $\sin(\pi) = 0$.
4. **Question 4**: What is the value of $\sin(3\pi/2)$ ($270^\circ$)?
   - *Step-by-step*:
     1. $3\pi/2$ points straight down along the negative y-axis.
     2. The coordinates are $(0, -1)$.
     3. The y-coordinate is $-1$, so $\sin(3\pi/2) = -1$.
5. **Question 5**: What is the value of $\cos(\pi/2)$?
   - *Step-by-step*:
     1. $\pi/2$ points straight up at coordinates $(0, 1)$.
     2. Cosine is the x-coordinate, which is 0.
     3. Thus, $\cos(\pi/2) = 0$.

#### Level 2: Angle Conversions & Triangle Ratios
1. **Question 6**: Convert $60^\circ$ to radians.
   - *Step-by-step*:
     1. The conversion factor from degrees to radians is $\pi / 180^\circ$.
     2. Multiply $60 \times (\pi / 180) = 60\pi / 180$.
     3. Simplify the fraction by dividing top and bottom by 60.
     4. The result is $\pi / 3$ radians.
2. **Question 7**: Convert $3\pi/4$ radians to degrees.
   - *Step-by-step*:
     1. The conversion factor from radians to degrees is $180^\circ / \pi$.
     2. Multiply: $(3\pi/4) \times (180/\pi)$.
     3. The $\pi$ cancels out: $3/4 \times 180 = 3 \times 45 = 135^\circ$.
3. **Question 8**: In a right triangle, if the opposite side is 3 and the hypotenuse is 5, what is $\sin(\theta)$?
   - *Step-by-step*:
     1. Sine is defined as opposite over hypotenuse: $\sin(\theta) = \text{opposite} / \text{hypotenuse}$.
     2. Substitute values: $\sin(\theta) = 3/5$ (or $0.6$).
4. **Question 9**: If $\cos(\theta) = 4/5$ in a right triangle, what is the adjacent side length if the hypotenuse is 10?
   - *Step-by-step*:
     1. $\cos(\theta) = \text{adjacent} / \text{hypotenuse}$.
     2. $4/5 = \text{adjacent} / 10$.
     3. Solve for adjacent: $\text{adjacent} = (4/5) \times 10 = 8$.
5. **Question 10**: Convert $150^\circ$ to radians.
   - *Step-by-step*:
     1. Multiply by $\pi / 180$: $150\pi / 180$.
     2. Divide numerator and denominator by 30.
     3. Result is $5\pi/6$ radians.

#### Level 3: Trigonometric Identities & Slope Relations
1. **Question 11**: At what angle in the first quadrant ($0$ to $\pi/2$) does $\tan(\theta) = 1$?
   - *Step-by-step*:
     1. $\tan(\theta)$ is defined as $\sin(\theta) / \cos(\theta)$.
     2. For $\tan(\theta) = 1$, we must have $\sin(\theta) = \cos(\theta)$.
     3. On the unit circle, height and width are equal in the first quadrant at exactly $45^\circ$.
     4. In radians, $45^\circ = \pi/4$.
2. **Question 12**: Simplify $\sin^2(\theta) + \cos^2(\theta)$.
   - *Step-by-step*:
     1. This is the fundamental Pythagorean trigonometric identity.
     2. On the unit circle, a right triangle has legs $\cos(\theta)$ and $\sin(\theta)$, and hypotenuse 1.
     3. By the Pythagorean theorem, $\text{leg}_1^2 + \text{leg}_2^2 = \text{hypotenuse}^2$.
     4. Therefore, $\cos^2(\theta) + \sin^2(\theta) = 1^2 = 1$.
3. **Question 13**: If $\sin(\theta) = 0.6$ and $\theta$ is in the second quadrant, what is $\cos(\theta)$?
   - *Step-by-step*:
     1. Use the identity $\sin^2(\theta) + \cos^2(\theta) = 1$.
     2. $(0.6)^2 + \cos^2(\theta) = 1 \rightarrow 0.36 + \cos^2(\theta) = 1$.
     3. $\cos^2(\theta) = 0.64 \rightarrow \cos(\theta) = \pm 0.8$.
     4. In the second quadrant, x-coordinates (cosine) are negative, so $\cos(\theta) = -0.8$.
4. **Question 14**: What is $\tan(\pi/3)$?
   - *Step-by-step*:
     1. $\pi/3 = 60^\circ$.
     2. $\sin(\pi/3) = \sqrt{3}/2$ and $\cos(\pi/3) = 1/2$.
     3. $\tan(\pi/3) = \sin(\pi/3)/\cos(\pi/3) = (\sqrt{3}/2) / (1/2)$.
     4. Simplify: $\sqrt{3}$.
5. **Question 15**: If $\tan(\theta) = 3/4$, what is $\cot(\theta)$?
   - *Step-by-step*:
     1. Cotangent is the reciprocal of tangent: $\cot(\theta) = 1 / \tan(\theta)$.
     2. Substitute value: $\cot(\theta) = 1 / (3/4) = 4/3$.

---

## 2. Functions

### Core Concept: Domain, Range, and Transformations
- **Level 1 (Intuition)**: A "Function Machine" where inputs feed in and outputs are generated. Graph transformations: $f(x-h) + k$ shifts graphs horizontally/vertically.
- **Level 2 (Procedural)**: Identifying domain restrictions (e.g. division by zero, negative square roots).
- **Level 3 (Challenge)**: Composite and inverse functions ($f(g(x))$, $f^{-1}(x)$).

### Interactive Widget Idea: `CoordinatePlotter`
* **Interaction**: Choose a parent function. Drag sliders for horizontal shift $h$, vertical shift $k$, and scale factor $a$.

### Graded Quiz Questions (At least 5 per level)

#### Level 1: Function Value & Intersection Mapping
1. **Question 1**: Where does the line $y = 2x + 3$ cross the y-axis?
   - *Step-by-step*:
     1. The y-intercept occurs where the x-coordinate is 0.
     2. Substitute $x = 0$ into the equation: $y = 2(0) + 3$.
     3. Calculate: $y = 3$.
     4. The point is $(0, 3)$.
2. **Question 2**: If $f(x) = x^2 - 4$, what is $f(-3)$?
   - *Step-by-step*:
     1. Substitute $x = -3$ into the function: $f(-3) = (-3)^2 - 4$.
     2. Square $-3$: $(-3) \times (-3) = 9$.
     3. Subtract 4: $9 - 4 = 5$.
3. **Question 3**: What is the y-intercept of the parabola $y = (x-2)^2 + 1$?
   - *Step-by-step*:
     1. Set $x = 0$.
     2. $y = (0-2)^2 + 1 = (-2)^2 + 1$.
     3. $y = 4 + 1 = 5$. The intercept is at $(0, 5)$.
4. **Question 4**: For $f(x) = 3x - 1$, find the input $x$ that makes $f(x) = 8$.
   - *Step-by-step*:
     1. Set up the equation: $3x - 1 = 8$.
     2. Add 1 to both sides: $3x = 9$.
     3. Divide by 3: $x = 3$.
5. **Question 5**: What is the vertex of the parabola $y = x^2 - 6$?
   - *Step-by-step*:
     1. The vertex form is $y = a(x-h)^2 + k$.
     2. Here, $h = 0$ and $k = -6$.
     3. The vertex is $(0, -6)$.

#### Level 2: Domain and Range Restrictions
1. **Question 6**: What is the domain of the function $f(x) = 1 / (x - 3)$?
   - *Step-by-step*:
     1. Look for mathematical operations that are restricted: division by zero is undefined.
     2. Set the denominator to zero to find the restriction: $x - 3 = 0 \rightarrow x = 3$.
     3. Exclude this value from all real numbers.
     4. The domain is all real numbers except $x = 3$.
2. **Question 7**: What is the domain of $f(x) = \sqrt{x - 2}$?
   - *Step-by-step*:
     1. The term inside a square root must be non-negative in real numbers.
     2. Set up inequality: $x - 2 \ge 0$.
     3. Solve for $x$: $x \ge 2$.
     4. The domain is all $x \ge 2$.
3. **Question 8**: What is the range of $f(x) = x^2 + 5$?
   - *Step-by-step*:
     1. Analyze the parent function $x^2$. Since squares are always non-negative, $x^2 \ge 0$.
     2. Add 5 to both sides: $x^2 + 5 \ge 5$.
     3. Therefore, $f(x) \ge 5$, meaning the range is all real numbers $\ge 5$.
4. **Question 9**: What value of $x$ is excluded from the domain of $f(x) = 2 / (2x - 8)$?
   - *Step-by-step*:
     1. Set denominator to zero: $2x - 8 = 0$.
     2. Add 8: $2x = 8$.
     3. Divide by 2: $x = 4$ is excluded.
5. **Question 10**: What is the domain of $f(x) = 1 / \sqrt{x}$?
   - *Step-by-step*:
     1. Cannot divide by zero: $x \ne 0$.
     2. Under root must be positive: $x \ge 0$.
     3. Combining both: $x > 0$.

#### Level 3: Composite and Inverse Operations
1. **Question 11**: If $f(x) = 2x + 1$ and $g(x) = x^2$, what is the composite function $f(g(x))$?
   - *Step-by-step*:
     1. Understand composite functions: $f(g(x))$ means we feed $g(x)$ as the input into $f(x)$.
     2. Write out $f(\text{input}) = 2(\text{input}) + 1$.
     3. Replace "input" with $g(x) = x^2$.
     4. The composition is $2x^2 + 1$.
2. **Question 12**: For $f(x) = 3x - 2$, find the inverse function $f^{-1}(x)$.
   - *Step-by-step*:
     1. Replace $f(x)$ with $y$: $y = 3x - 2$.
     2. Swap $x$ and $y$ to find the inverse: $x = 3y - 2$.
     3. Solve for $y$: $x + 2 = 3y \rightarrow y = (x + 2)/3$.
     4. The inverse function is $f^{-1}(x) = (x + 2)/3$.
3. **Question 13**: If $f(x) = x + 3$ and $g(x) = 2x - 5$, what is $f(g(3))$?
   - *Step-by-step*:
     1. Solve the inner function first: $g(3) = 2(3) - 5 = 6 - 5 = 1$.
     2. Substitute the result into $f(x)$: $f(1) = 1 + 3 = 4$.
4. **Question 14**: What is the inverse function of $f(x) = x^3$?
   - *Step-by-step*:
     1. $y = x^3 \rightarrow x = y^3$.
     2. Take the cube root of both sides: $y = \sqrt[3]{x}$.
     3. $f^{-1}(x) = \sqrt[3]{x}$.
5. **Question 15**: If $f(x) = 2x$ and $g(x) = x + 4$, solve for $x$ when $f(g(x)) = 10$.
   - *Step-by-step*:
     1. Find composition: $f(g(x)) = f(x+4) = 2(x+4) = 2x + 8$.
     2. Set equal to 10: $2x + 8 = 10$.
     3. Subtract 8: $2x = 2$.
     4. Divide by 2: $x = 1$.
