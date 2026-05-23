# College Curriculum (Grades 13+) - AsahFikir

This document details the modules, interactive concepts, and adaptive quiz ideas (at least 5 questions per difficulty level) for the **College** track.

---

## 1. Calculus I & II

### Core Concept: Derivatives & Integrals
- **Level 1 (Intuition)**: Tangent line slope (rate of change) as secant points merge; accumulation of area under a curve using Riemann sum rectangles.
- **Level 2 (Procedural)**: Finding derivatives (chain rule, product rule) and evaluating definite integrals.
- **Level 3 (Challenge)**: Volumes of revolution, infinite series convergence tests.

### Interactive Widget Idea: `RiemannSums`
* **Interaction**: A curve on an interval. A slider allows the user to change the number of rectangles ($N$) from 4 to 100. The sum of the rectangle areas is recalculated and compared to the exact integral.

### Graded Quiz Questions (At least 5 per level)

#### Level 1: Limit & Secant Visual Relations
1. **Question 1**: As the number of rectangles in a Riemann sum increases, what happens to the approximation error?
   - *Step-by-step*:
     1. Recall that a Riemann sum uses discrete rectangles to estimate the area under a curve.
     2. As we add more rectangles, each rectangle gets narrower.
     3. Narrower rectangles follow the curve's slope more closely, leaving smaller gaps.
     4. Therefore, the approximation error decreases towards zero.
2. **Question 2**: What is the limit of $(x^2 - 1)/(x - 1)$ as $x$ approaches 1?
   - *Step-by-step*:
     1. Try direct substitution: $x = 1$ yields $0/0$, which is indeterminate.
     2. Factor the numerator: $x^2 - 1 = (x - 1)(x + 1)$.
     3. Rewrite limit: $\lim (x-1)(x+1)/(x-1)$.
     4. Cancel the common factor $(x - 1)$ (valid since $x \ne 1$ at the limit): $\lim (x+1)$.
     5. Substitute $x = 1$: $1 + 1 = 2$.
3. **Question 3**: If a secant line passes through $(1, 1)$ and $(1+h, (1+h)^2)$ on the curve $y=x^2$, what is its slope as a function of $h$?
   - *Step-by-step*:
     1. Slope formula is $\Delta y / \Delta x$.
     2. $\Delta y = (1+h)^2 - 1 = 1 + 2h + h^2 - 1 = 2h + h^2$.
     3. $\Delta x = 1 + h - 1 = h$.
     4. Slope $= (2h + h^2)/h = 2 + h$.
4. **Question 4**: As secant interval $h \rightarrow 0$, what does the slope of $y=x^2$ at $x=1$ approach?
   - *Step-by-step*:
     1. From previous step, the secant slope is $2 + h$.
     2. Take the limit as $h$ approaches 0.
     3. The slope approaches $2 + 0 = 2$. This is the derivative!
5. **Question 5**: What does the definite integral represent geometrically?
   - *Step-by-step*:
     1. The integral sums up infinitesimal products of $f(x)$ (height) and $dx$ (width).
     2. This sum represents the net signed area between the curve $f(x)$ and the x-axis over an interval.

#### Level 2: Core Derivative & Integration Calculations
1. **Question 6**: What is the exact area under the curve $y = x^2$ from $0$ to $2$?
   - *Step-by-step*:
     1. Set up the definite integral: $\int_0^2 x^2 dx$.
     2. Find the antiderivative of $x^2$ using power rule: $x^3 / 3$.
     3. Evaluate at upper bound 2: $2^3 / 3 = 8/3$.
     4. Evaluate at lower bound 0: $0^3 / 3 = 0$.
     5. Subtract the lower bound value: $8/3 - 0 = 8/3$.
2. **Question 7**: Find the derivative of $f(x) = \sin(x^2)$.
   - *Step-by-step*:
     1. Use the Chain Rule: $d/dx[f(g(x))] = f'(g(x)) \times g'(x)$.
     2. Outer function is $\sin(u)$, derivative is $\cos(u)$.
     3. Inner function is $u = x^2$, derivative is $2x$.
     4. Combine: $\cos(x^2) \times 2x = 2x\cos(x^2)$.
3. **Question 8**: Evaluate the indefinite integral $\int 3x^2 dx$.
   - *Step-by-step*:
     1. Use the power rule for integration: $\int x^n dx = x^{n+1}/(n+1) + C$.
     2. Factor out constants: $3 \int x^2 dx$.
     3. Integrate: $3 \times (x^3 / 3) + C$.
     4. Simplify: $x^3 + C$.
4. **Question 9**: Find the derivative of $f(x) = x \ln(x)$.
   - *Step-by-step*:
     1. Use the Product Rule: $(uv)' = u'v + uv'$.
     2. Let $u = x \rightarrow u' = 1$. Let $v = \ln(x) \rightarrow v' = 1/x$.
     3. Combine: $1 \times \ln(x) + x \times (1/x)$.
     4. Simplify: $\ln(x) + 1$.
5. **Question 10**: Evaluate $\int_1^3 2x dx$.
   - *Step-by-step*:
     1. Antiderivative is $x^2$.
     2. Upper bound evaluation: $3^2 = 9$.
     3. Lower bound evaluation: $1^2 = 1$.
     4. Subtract: $9 - 1 = 8$.

#### Level 3: Advanced Integration Techniques & Series
1. **Question 11**: Find the integral of $2x \cdot e^{x^2} dx$.
   - *Step-by-step*:
     1. Use $u$-substitution. Let $u = x^2$.
     2. Compute differential: $du = 2x dx$.
     3. Rewrite the integral in terms of $u$: $\int e^u du$.
     4. Integrate: $e^u + C$.
     5. Substitute back $u = x^2$: $e^{x^2} + C$.
2. **Question 12**: Evaluate $\int x \cos(x) dx$.
   - *Step-by-step*:
     1. Use Integration by Parts: $\int u dv = uv - \int v du$.
     2. Choose $u = x \rightarrow du = dx$. Choose $dv = \cos(x)dx \rightarrow v = \sin(x)$.
     3. Plug in: $x \sin(x) - \int \sin(x) dx$.
     4. Integrate: $x \sin(x) - (-\cos(x)) + C = x \sin(x) + \cos(x) + C$.
3. **Question 13**: Does the infinite series $\sum_{n=1}^\infty 1/n$ converge or diverge?
   - *Step-by-step*:
     1. This is the Harmonic Series.
     2. Apply the Integral Test: check the convergence of $\int_1^\infty 1/x dx$.
     3. $\int 1/x dx = \ln(x)$.
     4. Limit as upper bound goes to infinity: $\lim_{M\rightarrow\infty} \ln(M) - \ln(1) = \infty$.
     5. Since the integral diverges, the series diverges.
4. **Question 14**: What is the second-degree Taylor polynomial of $e^x$ centered at $x=0$?
   - *Step-by-step*:
     1. Taylor expansion formula: $f(0) + f'(0)x + f''(0)x^2/2!$.
     2. For $f(x) = e^x$, all derivatives evaluated at 0 are $e^0 = 1$.
     3. Plug in: $1 + 1x + 1x^2/2 = 1 + x + x^2/2$.
5. **Question 15**: Evaluate $\int_0^1 (e^x + x) dx$.
   - *Step-by-step*:
     1. Antiderivative is $e^x + x^2/2$.
     2. Evaluate at 1: $e^1 + 1/2 = e + 0.5$.
     3. Evaluate at 0: $e^0 + 0 = 1$.
     4. Subtract: $e + 0.5 - 1 = e - 0.5$.

---

## 2. Linear Algebra

### Core Concept: Matrices & Vector Space Transformations
- **Level 1 (Intuition)**: Applying a $2 \times 2$ matrix to a grid of points or a shape, observing scaling, rotation, shearing.
- **Level 2 (Procedural)**: Matrix multiplication, solving systems using elimination.
- **Level 3 (Challenge)**: Determinants and Eigenvalues/Eigenvectors.

### Interactive Widget Idea: `VectorSpace3D`
* **Interaction**: User edits elements of a matrix. The grid morphs in real-time. Eigenvectors are highlighted.

### Graded Quiz Questions (At least 5 per level)

#### Level 1: Matrix Vector Action mapping
1. **Question 1**: What is the output vector when matrix $\begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}$ scales the vector $\begin{pmatrix} 1 \\ 2 \end{pmatrix}$?
   - *Step-by-step*:
     1. Multiply the matrix by the vector: $\begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix} \begin{pmatrix} 1 \\ 2 \end{pmatrix}$.
     2. Compute the first row: $2(1) + 0(2) = 2$.
     3. Compute the second row: $0(1) + 2(2) = 4$.
     4. The output vector is $\begin{pmatrix} 2 \\ 4 \end{pmatrix}$.
2. **Question 2**: What is the action of the identity matrix $\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$ on any vector $v$?
   - *Step-by-step*:
     1. Apply matrix multiplication: $\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 1(x) + 0(y) \\ 0(x) + 1(y) \end{pmatrix} = \begin{pmatrix} x \\ y \end{pmatrix}$.
     2. The output vector is identical to the input vector. It preserves the space entirely.
3. **Question 3**: What vector results from multiplying $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$ by $\begin{pmatrix} 3 \\ 5 \end{pmatrix}$?
   - *Step-by-step*:
     1. First row: $0(3) + 1(5) = 5$.
     2. Second row: $1(3) + 0(5) = 3$.
     3. Result vector is $\begin{pmatrix} 5 \\ 3 \end{pmatrix}$ (reflects across the line $y = x$).
4. **Question 4**: What matrix scales the x-axis by 3 and leaves the y-axis unchanged?
   - *Step-by-step*:
     1. The action on basis vector $i = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ must yield $\begin{pmatrix} 3 \\ 0 \end{pmatrix}$ (first column).
     2. The action on basis vector $j = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$ must yield $\begin{pmatrix} 0 \\ 1 \end{pmatrix}$ (second column).
     3. Combining columns gives matrix $\begin{pmatrix} 3 & 0 \\ 0 & 1 \end{pmatrix}$.
5. **Question 5**: What vector results from multiplying $\begin{pmatrix} 1 & 3 \\ 0 & 1 \end{pmatrix}$ by $\begin{pmatrix} 2 \\ 1 \end{pmatrix}$?
   - *Step-by-step*:
     1. First row: $1(2) + 3(1) = 5$.
     2. Second row: $0(2) + 1(1) = 1$.
     3. Result is $\begin{pmatrix} 5 \\ 1 \end{pmatrix}$.

#### Level 2: Matrix Multiplications & Operations
1. **Question 6**: Multiply matrices $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$ and $B = \begin{pmatrix} 2 & 0 \\ 1 & 2 \end{pmatrix}$. Find element $c_{11}$.
   - *Step-by-step*:
     1. To find element $c_{11}$ in product $C = AB$, take the dot product of row 1 of $A$ and column 1 of $B$.
     2. Row 1 of $A$ is $(1, 2)$. Column 1 of $B$ is $(2, 1)^T$.
     3. Compute: $1(2) + 2(1) = 2 + 2 = 4$.
2. **Question 7**: For matrices in Question 6, find element $c_{21}$ of the product $AB$.
   - *Step-by-step*:
     1. Multiply row 2 of $A$ by column 1 of $B$.
     2. Row 2 of $A$ is $(3, 4)$. Column 1 of $B$ is $(2, 1)^T$.
     3. Compute: $3(2) + 4(1) = 6 + 4 = 10$.
3. **Question 8**: Solve the system: $x + y = 5$ and $2x - y = 1$ for $x$.
   - *Step-by-step*:
     1. Add the two equations together to eliminate $y$: $(x + y) + (2x - y) = 5 + 1$.
     2. Combine terms: $3x = 6$.
     3. Divide by 3: $x = 2$.
4. **Question 9**: Solve for $y$ in the system from Question 8.
   - *Step-by-step*:
     1. Substitute $x = 2$ back into the first equation: $2 + y = 5$.
     2. Subtract 2: $y = 3$.
5. **Question 10**: What is the transpose of the matrix $\begin{pmatrix} 1 & 5 \\ 2 & 9 \end{pmatrix}$?
   - *Step-by-step*:
     1. Transposing swaps rows and columns.
     2. Row 1 $(1, 5)$ becomes column 1.
     3. Row 2 $(2, 9)$ becomes column 2.
     4. Transposed matrix is $\begin{pmatrix} 1 & 2 \\ 5 & 9 \end{pmatrix}$.

#### Level 3: Determinants & Eigenvalue Analysis
1. **Question 11**: What is the determinant of the shear matrix $\begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}$?
   - *Step-by-step*:
     1. The formula for the determinant of a $2 \times 2$ matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$ is $ad - bc$.
     2. Substitute values: $a=1, b=2, c=0, d=1$.
     3. Compute: $1(1) - 2(0) = 1 - 0 = 1$.
2. **Question 12**: If a matrix $A$ transforms vector $v$ such that $Av = \begin{pmatrix} 3 \\ 6 \end{pmatrix}$ where $v = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$, what is the eigenvalue $\lambda$?
   - *Step-by-step*:
     1. Write the eigenvalue equation: $Av = \lambda v$.
     2. Substitute the vectors: $\begin{pmatrix} 3 \\ 6 \end{pmatrix} = \lambda \begin{pmatrix} 1 \\ 2 \end{pmatrix}$.
     3. Compare components: $3 = \lambda(1)$ and $6 = \lambda(2)$.
     4. In both equations, $\lambda = 3$.
3. **Question 13**: Find the determinant of matrix $\begin{pmatrix} 3 & 4 \\ 2 & 5 \end{pmatrix}$.
   - *Step-by-step*:
     1. Use determinant formula: $ad - bc$.
     2. Compute: $3(5) - 4(2) = 15 - 8 = 7$.
4. **Question 14**: What are the eigenvalues of the diagonal matrix $\begin{pmatrix} 4 & 0 \\ 0 & -2 \end{pmatrix}$?
   - *Step-by-step*:
     1. For any diagonal matrix, the eigenvalues are simply the entries along the main diagonal.
     2. The diagonal entries are 4 and $-2$.
     3. Therefore, $\lambda_1 = 4$ and $\lambda_2 = -2$.
5. **Question 15**: If a $2 \times 2$ matrix has eigenvalues $\lambda_1 = 2$ and $\lambda_2 = 5$, what is its determinant?
   - *Step-by-step*:
     1. A key theorem in linear algebra states that the determinant of a matrix equals the product of its eigenvalues: $\det(A) = \lambda_1 \times \lambda_2$.
     2. Multiply: $2 \times 5 = 10$.
     3. The determinant is 10.
