import React, { useState, useEffect } from 'react';

/**
 * BalanceScale Widget
 * Left: array of numbers and string 'x'
 * Right: array of numbers
 */
export const BalanceScale = ({ left = [], right = [], interactive = false }) => {
  const [leftWeight, setLeftWeight] = useState(0);
  const [rightWeight, setRightWeight] = useState(0);
  const [xVal, setXVal] = useState(5); // Internal state for slider if interactive

  useEffect(() => {
    const resolveSum = (arr) => arr.reduce((acc, v) => acc + (v === 'x' ? xVal : typeof v === 'number' ? v : parseInt(v) || 0), 0);
    setLeftWeight(resolveSum(left));
    setRightWeight(resolveSum(right));
  }, [left, right, xVal]);

  const diff = leftWeight - rightWeight;
  const tiltAngle = Math.max(-15, Math.min(15, diff * 3)); // Tilts based on weight diff

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '16px' }}>
      <div style={{ position: 'relative', width: '300px', height: '200px', display: 'flex', justifyContent: 'center' }}>
        {/* Stand */}
        <div style={{ position: 'absolute', bottom: '0', width: '16px', height: '140px', background: 'hsl(var(--border-glass))', borderRadius: '8px' }}></div>
        <div style={{ position: 'absolute', bottom: '0', width: '80px', height: '10px', background: 'hsl(var(--border-glass))', borderRadius: '4px' }}></div>
        
        {/* Pivoting Beam */}
        <div style={{
          position: 'absolute',
          top: '60px',
          width: '280px',
          height: '8px',
          background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)))',
          borderRadius: '4px',
          transform: `rotate(${tiltAngle}deg)`,
          transformOrigin: 'center center',
          transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          {/* Left Plate */}
          <div style={{
            position: 'absolute',
            left: '-10px',
            top: '0',
            width: '60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `rotate(${-tiltAngle}deg)`,
            transformOrigin: 'top center',
            transition: 'transform 0.4s'
          }}>
            <div style={{ width: '2px', height: '40px', background: '#94a3b8' }}></div>
            <div style={{
              width: '80px',
              height: '8px',
              background: 'hsl(var(--bg-glass))',
              border: '1px solid hsl(var(--border-glass))',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '2px',
              padding: '2px',
              position: 'relative'
            }}>
              {/* Left Items display */}
              <div style={{ position: 'absolute', bottom: '10px', display: 'flex', gap: '4px' }}>
                {left.map((item, idx) => (
                  <div key={idx} style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    background: item === 'x' ? 'hsl(var(--primary))' : 'hsl(var(--bg-secondary))',
                    border: '1px solid hsl(var(--border-glass))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                  }}>
                    {item === 'x' ? 'x' : item}
                  </div>
                ))}
              </div>
            </div>
            <span style={{ fontSize: '12px', color: 'hsl(var(--text-secondary))', marginTop: '14px' }}>{leftWeight} kg</span>
          </div>

          {/* Right Plate */}
          <div style={{
            position: 'absolute',
            right: '-10px',
            top: '0',
            width: '60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `rotate(${-tiltAngle}deg)`,
            transformOrigin: 'top center',
            transition: 'transform 0.4s'
          }}>
            <div style={{ width: '2px', height: '40px', background: '#94a3b8' }}></div>
            <div style={{
              width: '80px',
              height: '8px',
              background: 'hsl(var(--bg-glass))',
              border: '1px solid hsl(var(--border-glass))',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '2px',
              padding: '2px',
              position: 'relative'
            }}>
              {/* Right Items display */}
              <div style={{ position: 'absolute', bottom: '10px', display: 'flex', gap: '4px' }}>
                {right.map((item, idx) => (
                  <div key={idx} style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    background: 'hsl(var(--secondary))',
                    border: '1px solid hsl(var(--border-glass))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <span style={{ fontSize: '12px', color: 'hsl(var(--text-secondary))', marginTop: '14px' }}>{rightWeight} kg</span>
          </div>
        </div>
      </div>
      
      {/* Slider for interactive balance solving */}
      {left.includes('x') && (
        <div className="glass-panel" style={{ padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'center', width: '80%' }}>
          <label style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>Tweak Box <b>x</b>: </label>
          <input
            type="range"
            min="1"
            max="15"
            value={xVal}
            onChange={(e) => setXVal(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'hsl(var(--primary))' }}
          />
          <span style={{ fontWeight: 'bold', fontSize: '16px', color: 'hsl(var(--primary))' }}>{xVal}</span>
        </div>
      )}
    </div>
  );
};


/**
 * FractionVisualizer Widget
 */
export const FractionVisualizer = ({ numerator: initNum = 1, denominator: initDen = 4, showComparison = false, targetNumerator = 0, targetDenominator = 1 }) => {
  const [num, setNum] = useState(initNum);
  const [den, setDen] = useState(initDen);

  useEffect(() => {
    setNum(initNum);
    setDen(initDen);
  }, [initNum, initDen]);

  // Generate pie sectors
  const renderPie = (n, d, colorClass) => {
    const radius = 50;
    const cx = 60;
    const cy = 60;
    const sectors = [];

    for (let i = 0; i < d; i++) {
      const angleStart = (i * 360) / d - 90;
      const angleEnd = ((i + 1) * 360) / d - 90;
      
      // Convert polar to cartesian
      const rads = (angle) => (angle * Math.PI) / 180;
      const x1 = cx + radius * Math.cos(rads(angleStart));
      const y1 = cy + radius * Math.sin(rads(angleStart));
      const x2 = cx + radius * Math.cos(rads(angleEnd));
      const y2 = cy + radius * Math.sin(rads(angleEnd));
      
      const isLargeArc = 360 / d > 180 ? 1 : 0;
      const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${isLargeArc} 1 ${x2} ${y2} Z`;
      
      sectors.push(
        <path
          key={i}
          d={pathData}
          fill={i < n ? colorClass : 'transparent'}
          stroke="hsl(var(--border-glass))"
          strokeWidth="1.5"
          style={{ transition: 'fill 0.3s ease' }}
        />
      );
    }
    return <svg width="120" height="120">{sectors}</svg>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
      <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Current: {num}/{den}</span>
          {renderPie(num, den, 'hsl(var(--primary))')}
        </div>
        
        {showComparison && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'hsl(var(--secondary))' }}>Target: {targetNumerator}/{targetDenominator}</span>
            {renderPie(targetNumerator, targetDenominator, 'hsl(var(--secondary))')}
          </div>
        )}
      </div>

      <div className="glass-panel" style={{ width: '80%', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontSize: '13px' }}>Numerator (parts):</label>
          <input
            type="range"
            min="1"
            max={den}
            value={num}
            onChange={(e) => setNum(Math.min(parseInt(e.target.value), den))}
            style={{ width: '60%', accentColor: 'hsl(var(--primary))' }}
          />
          <span style={{ fontWeight: 'bold', minWidth: '20px' }}>{num}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontSize: '13px' }}>Denominator (total):</label>
          <input
            type="range"
            min="2"
            max="12"
            value={den}
            onChange={(e) => {
              const d = parseInt(e.target.value);
              setDen(d);
              if (num > d) setNum(d);
            }}
            style={{ width: '60%', accentColor: 'hsl(var(--primary))' }}
          />
          <span style={{ fontWeight: 'bold', minWidth: '20px' }}>{den}</span>
        </div>
      </div>
    </div>
  );
};


/**
 * RatioMixer Widget
 */
export const RatioMixer = ({ blue: initB = 2, yellow: initY = 3, targetRatio = [] }) => {
  const [blue, setBlue] = useState(initB);
  const [yellow, setYellow] = useState(initY);

  // Compute blended color
  const total = blue + yellow;
  const bluePercent = (blue / total) * 100;
  const yellowPercent = (yellow / total) * 100;
  
  // Blend colors: blue (0, 100, 255) + yellow (255, 210, 0)
  const r = Math.round((0 * bluePercent + 255 * yellowPercent) / 100);
  const g = Math.round((120 * bluePercent + 210 * yellowPercent) / 100); // Shifted blue g slightly for prettier greens
  const b = Math.round((255 * bluePercent + 0 * yellowPercent) / 100);
  const blendedHex = `rgb(${r}, ${g}, ${b})`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {/* Blue paint */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '40px', height: '60px', border: '2px solid #3b82f6', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${(blue/10)*100}%`, background: '#3b82f6', transition: 'height 0.3s' }}></div>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Blue: {blue}</span>
        </div>

        {/* Mixer Flask */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            border: '3px solid hsl(var(--border-glass))',
            borderRadius: '50px',
            position: 'relative',
            background: 'hsl(var(--bg-glass))',
            boxShadow: '0 0 20px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {/* Blended Liquid */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '70%',
              background: blendedHex,
              opacity: 0.85,
              transition: 'background-color 0.4s'
            }}></div>
            <div style={{ position: 'relative', zIndex: 1, fontSize: '13px', fontWeight: '800', color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
              Ratio: {blue}:{yellow}
            </div>
          </div>
          <span style={{ fontSize: '11px', color: 'hsl(var(--text-secondary))' }}>Green Blend</span>
        </div>

        {/* Yellow paint */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '40px', height: '60px', border: '2px solid #eab308', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${(yellow/10)*100}%`, background: '#eab308', transition: 'height 0.3s' }}></div>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Yellow: {yellow}</span>
        </div>
      </div>

      <div className="glass-panel" style={{ width: '80%', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontSize: '13px' }}>Blue parts:</label>
          <input
            type="range"
            min="1"
            max="10"
            value={blue}
            onChange={(e) => setBlue(parseInt(e.target.value))}
            style={{ width: '60%', accentColor: '#3b82f6' }}
          />
          <span style={{ fontWeight: 'bold', width: '20px' }}>{blue}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontSize: '13px' }}>Yellow parts:</label>
          <input
            type="range"
            min="1"
            max="10"
            value={yellow}
            onChange={(e) => setYellow(parseInt(e.target.value))}
            style={{ width: '60%', accentColor: '#eab308' }}
          />
          <span style={{ fontWeight: 'bold', width: '20px' }}>{yellow}</span>
        </div>
      </div>
    </div>
  );
};


/**
 * UnitCircleTrig Widget
 */
export const UnitCircleTrig = ({ angle: initA = 0.523 }) => {
  const [angle, setAngle] = useState(initA);

  const x = Math.cos(angle);
  const y = Math.sin(angle);

  // Map circle coords (-1 to 1) to SVG coords (cx=80, cy=80, r=60)
  const cx = 80;
  const cy = 80;
  const r = 60;
  const sx = cx + x * r;
  const sy = cy - y * r; // invert y for SVG coordinate system

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Circle SVG */}
        <svg width="180" height="180" style={{ background: 'hsl(var(--bg-secondary))', borderRadius: '50%', border: '1px solid hsl(var(--border-glass))' }}>
          {/* Axis */}
          <line x1="80" y1="10" x2="80" y2="150" stroke="hsl(var(--text-muted))" strokeWidth="0.5" strokeDasharray="3" />
          <line x1="10" y1="80" x2="150" y2="80" stroke="hsl(var(--text-muted))" strokeWidth="0.5" strokeDasharray="3" />
          
          {/* Unit Circle */}
          <circle cx="80" cy="80" r="60" fill="none" stroke="hsl(var(--border-glass))" strokeWidth="1.5" />

          {/* Right Triangle */}
          {/* Cosine line (horizontal blue) */}
          <line x1="80" y1="80" x2={sx} y2="80" stroke="#3b82f6" strokeWidth="2.5" />
          {/* Sine line (vertical green) */}
          <line x1={sx} y1="80" x2={sx} y2={sy} stroke="#10b981" strokeWidth="2.5" />
          {/* Hypotenuse (radius line red) */}
          <line x1="80" y1="80" x2={sx} y2={sy} stroke="hsl(var(--primary))" strokeWidth="2" />
          
          {/* Origin and Intersection dots */}
          <circle cx="80" cy="80" r="3" fill="#fff" />
          <circle cx={sx} cy={sy} r="4" fill="hsl(var(--primary))" />
        </svg>

        {/* Readout stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '150px', justifyContent: 'center' }}>
          <div style={{ fontSize: '13px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Angle θ:</span>
            <span style={{ fontWeight: 'bold' }}>{((angle * 180) / Math.PI).toFixed(0)}°</span>
          </div>
          <div style={{ fontSize: '13px', color: '#3b82f6', display: 'flex', justifyContent: 'space-between' }}>
            <span>cos(θ) (Width):</span>
            <span style={{ fontWeight: 'bold' }}>{x.toFixed(3)}</span>
          </div>
          <div style={{ fontSize: '13px', color: '#10b981', display: 'flex', justifyContent: 'space-between' }}>
            <span>sin(θ) (Height):</span>
            <span style={{ fontWeight: 'bold' }}>{y.toFixed(3)}</span>
          </div>
          <div style={{ fontSize: '13px', color: 'hsl(var(--primary))', display: 'flex', justifyContent: 'space-between' }}>
            <span>tan(θ) (Slope):</span>
            <span style={{ fontWeight: 'bold' }}>{Math.abs(x) > 0.001 ? (y / x).toFixed(3) : '∞'}</span>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ width: '80%', padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <label style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>Rotate θ:</label>
        <input
          type="range"
          min="0"
          max={2 * Math.PI}
          step="0.01"
          value={angle}
          onChange={(e) => setAngle(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: 'hsl(var(--primary))' }}
        />
      </div>
    </div>
  );
};


/**
 * CoordinatePlotter Widget
 */
export const CoordinatePlotter = ({ functionType = 'linear', m: initM = 1, b: initB = 0, h: initH = 0, k: initK = 0 }) => {
  const [m, setM] = useState(initM);
  const [b, setB] = useState(initB);
  const [h, setH] = useState(initH);
  const [k, setK] = useState(initK);

  // SVG parameters
  const size = 180;
  const padding = 15;
  const mapCoord = (val) => {
    // Maps algebra range [-5, 5] to SVG range [padding, size-padding]
    const range = size - 2 * padding;
    return padding + ((val + 5) / 10) * range;
  };

  // Generate paths for functions
  const getPathData = () => {
    let points = [];
    for (let lx = -5; lx <= 5; lx += 0.1) {
      let ly;
      if (functionType === 'linear') {
        ly = m * lx + b;
      } else if (functionType === 'quadratic') {
        ly = 1 * Math.pow(lx - h, 2) + k;
      } else if (functionType === 'rational') {
        // rational 1 / (x - 3)
        if (Math.abs(lx - 3) < 0.1) continue;
        ly = 1 / (lx - 3);
      }
      
      // Clamp values so paths don't explode out of SVG bounds
      if (ly >= -6 && ly <= 6) {
        points.push(`${mapCoord(lx)},${size - mapCoord(ly)}`);
      }
    }
    return points.length > 0 ? `M ${points.join(' L ')}` : '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <svg width="180" height="180" style={{ background: 'hsl(var(--bg-secondary))', borderRadius: '8px', border: '1px solid hsl(var(--border-glass))' }}>
          {/* Axis grid */}
          <line x1={mapCoord(0)} y1="0" x2={mapCoord(0)} y2={size} stroke="hsl(var(--text-muted))" strokeWidth="0.5" />
          <line x1="0" y1={mapCoord(0)} x2={size} y2={mapCoord(0)} stroke="hsl(var(--text-muted))" strokeWidth="0.5" />

          {/* Rational Asymptote line */}
          {functionType === 'rational' && (
            <line
              x1={mapCoord(3)}
              y1="0"
              x2={mapCoord(3)}
              y2={size}
              stroke="hsl(346.8 77.2% 49.8%)"
              strokeWidth="1.5"
              strokeDasharray="4"
            />
          )}

          {/* Plot Path */}
          <path d={getPathData()} fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        </svg>

        {/* Dynamic Controls based on type */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '180px' }}>
          {functionType === 'linear' && (
            <>
              <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label>Slope m:</label>
                  <span>{m}</span>
                </div>
                <input type="range" min="-3" max="3" step="0.5" value={m} onChange={(e) => setM(parseFloat(e.target.value))} style={{ accentColor: 'hsl(var(--primary))' }} />
              </div>
              <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label>Intercept b:</label>
                  <span>{b}</span>
                </div>
                <input type="range" min="-4" max="4" step="0.5" value={b} onChange={(e) => setB(parseFloat(e.target.value))} style={{ accentColor: 'hsl(var(--primary))' }} />
              </div>
            </>
          )}

          {functionType === 'quadratic' && (
            <>
              <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label>H Shift (h):</label>
                  <span>{h}</span>
                </div>
                <input type="range" min="-3" max="3" step="0.5" value={h} onChange={(e) => setH(parseFloat(e.target.value))} style={{ accentColor: 'hsl(var(--primary))' }} />
              </div>
              <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label>V Shift (k):</label>
                  <span>{k}</span>
                </div>
                <input type="range" min="-3" max="3" step="0.5" value={k} onChange={(e) => setK(parseFloat(e.target.value))} style={{ accentColor: 'hsl(var(--primary))' }} />
              </div>
            </>
          )}

          {functionType === 'rational' && (
            <div style={{ fontSize: '12px', color: 'hsl(var(--text-secondary))', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div><b>f(x) = 1 / (x - 3)</b></div>
              <div>Vertical Asymptote at x = 3 (Red dashed line). Division by zero makes the output shoot to ±Infinity!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


/**
 * RiemannSums Widget
 */
export const RiemannSums = ({ a = 0, b = 2 }) => {
  const [rects, setRects] = useState(6);

  const size = 180;
  const padding = 15;
  const mapX = (val) => padding + (val / 2) * (size - 2 * padding);
  const mapY = (val) => size - (padding + (val / 4) * (size - 2 * padding)); // scale bounds: x [0,2], y [0,4]

  const drawRectangles = () => {
    const dx = (b - a) / rects;
    const rElements = [];
    
    for (let i = 0; i < rects; i++) {
      const rx = a + i * dx;
      const ry = Math.pow(rx + dx, 2); // Right Riemann Sum endpoint height
      
      const svgX = mapX(rx);
      const svgW = mapX(rx + dx) - mapX(rx);
      const svgY = mapY(ry);
      const svgH = mapY(0) - svgY;
      
      rElements.push(
        <rect
          key={i}
          x={svgX}
          y={svgY}
          width={svgW}
          height={svgH}
          fill="hsla(var(--primary), 0.3)"
          stroke="hsl(var(--primary))"
          strokeWidth="0.5"
        />
      );
    }
    return rElements;
  };

  const drawCurve = () => {
    let pts = [];
    for (let xVal = 0; xVal <= 2; xVal += 0.05) {
      pts.push(`${mapX(xVal)},${mapY(Math.pow(xVal, 2))}`);
    }
    return `M ${pts.join(' L ')}`;
  };

  // Compute sum approximation
  const dx = (b - a) / rects;
  let approximation = 0;
  for (let i = 0; i < rects; i++) {
    approximation += Math.pow(a + (i + 1) * dx, 2) * dx; // right sum
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <svg width="180" height="180" style={{ background: 'hsl(var(--bg-secondary))', borderRadius: '8px', border: '1px solid hsl(var(--border-glass))' }}>
          {/* Coordinate axes */}
          <line x1={mapX(0)} y1="0" x2={mapX(0)} y2={size} stroke="hsl(var(--text-muted))" strokeWidth="0.5" />
          <line x1="0" y1={mapY(0)} x2={size} y2={mapY(0)} stroke="hsl(var(--text-muted))" strokeWidth="0.5" />

          {/* Riemann Rectangles */}
          {drawRectangles()}

          {/* Curve y = x^2 */}
          <path d={drawCurve()} fill="none" stroke="hsl(var(--secondary))" strokeWidth="2" />
        </svg>

        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '180px' }}>
          <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label>Rectangles (N):</label>
              <span style={{ fontWeight: 'bold' }}>{rects}</span>
            </div>
            <input
              type="range"
              min="4"
              max="40"
              value={rects}
              onChange={(e) => setRects(parseInt(e.target.value))}
              style={{ accentColor: 'hsl(var(--primary))' }}
            />
          </div>
          <div style={{ fontSize: '12px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div>Approx Area: <b>{approximation.toFixed(3)}</b></div>
            <div>Exact Area: <b>2.667</b> (8/3)</div>
          </div>
        </div>
      </div>
    </div>
  );
};


/**
 * VectorSpace3D Widget (Rendered in 2D for simplicity, interactive matrix transforms)
 */
export const VectorSpace3D = ({ matrix: initM = [[1, 0], [0, 1]], vector = [1, 1] }) => {
  const [a, setA] = useState(initM[0][0]);
  const [b, setB] = useState(initM[0][1]);
  const [c, setC] = useState(initM[1][0]);
  const [d, setD] = useState(initM[1][1]);

  const size = 180;
  const center = size / 2;
  const scale = 25; // pixels per unit

  // Input Vector transformed
  const vx = vector[0];
  const vy = vector[1];
  const tx = a * vx + b * vy;
  const ty = c * vx + d * vy;

  const renderGrid = () => {
    // Draws transformed gridlines
    const lines = [];
    const step = 1;
    for (let i = -3; i <= 3; i += step) {
      // vertical lines (constant x) mapped: p(t) = A * [i, t] = [a*i + b*t, c*i + d*t]
      const startX1 = center + (a * i + b * -3) * scale;
      const startY1 = center - (c * i + d * -3) * scale;
      const endX1 = center + (a * i + b * 3) * scale;
      const endY1 = center - (c * i + d * 3) * scale;

      lines.push(<line key={`v-${i}`} x1={startX1} y1={startY1} x2={endX1} y2={endY1} stroke="hsla(var(--text-muted), 0.25)" strokeWidth="0.75" />);

      // horizontal lines (constant y) mapped: p(t) = A * [t, i] = [a*t + b*i, c*t + d*i]
      const startX2 = center + (a * -3 + b * i) * scale;
      const startY2 = center - (c * -3 + d * i) * scale;
      const endX2 = center + (a * 3 + b * i) * scale;
      const endY2 = center - (c * 3 + d * i) * scale;

      lines.push(<line key={`h-${i}`} x1={startX2} y1={startY2} x2={endX2} y2={endY2} stroke="hsla(var(--text-muted), 0.25)" strokeWidth="0.75" />);
    }
    return lines;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <svg width="180" height="180" style={{ background: 'hsl(var(--bg-secondary))', borderRadius: '8px', border: '1px solid hsl(var(--border-glass))' }}>
          {/* Base axes before transform (subtle) */}
          <line x1={center} y1="0" x2={center} y2={size} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="0" y1={center} x2={size} y2={center} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          
          {/* Morphed Gridlines */}
          {renderGrid()}

          {/* Original Vector (subtle orange arrow) */}
          <line x1={center} y1={center} x2={center + vx * scale} y2={center - vy * scale} stroke="hsl(var(--streak-orange))" strokeWidth="1.5" strokeDasharray="3" />
          
          {/* Transformed Vector (bold purple arrow) */}
          <line x1={center} y1={center} x2={center + tx * scale} y2={center - ty * scale} stroke="hsl(var(--primary))" strokeWidth="2.5" />
          <circle cx={center + tx * scale} cy={center - ty * scale} r="3.5" fill="hsl(var(--primary))" />
        </svg>

        {/* Matrix inputs */}
        <div className="glass-panel" style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '180px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', textAlign: 'center', marginBottom: '4px' }}>Matrix A</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <label style={{ fontSize: '11px', color: 'hsl(var(--text-secondary))' }}>a (scale x)</label>
              <input type="number" step="0.5" style={{ background: 'hsl(var(--bg-secondary))', border: '1px solid hsl(var(--border-glass))', color: '#fff', padding: '4px', borderRadius: '4px', width: '100%', fontSize: '12px' }} value={a} onChange={(e) => setA(parseFloat(e.target.value) || 0)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <label style={{ fontSize: '11px', color: 'hsl(var(--text-secondary))' }}>b (shear x)</label>
              <input type="number" step="0.5" style={{ background: 'hsl(var(--bg-secondary))', border: '1px solid hsl(var(--border-glass))', color: '#fff', padding: '4px', borderRadius: '4px', width: '100%', fontSize: '12px' }} value={b} onChange={(e) => setB(parseFloat(e.target.value) || 0)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <label style={{ fontSize: '11px', color: 'hsl(var(--text-secondary))' }}>c (shear y)</label>
              <input type="number" step="0.5" style={{ background: 'hsl(var(--bg-secondary))', border: '1px solid hsl(var(--border-glass))', color: '#fff', padding: '4px', borderRadius: '4px', width: '100%', fontSize: '12px' }} value={c} onChange={(e) => setC(parseFloat(e.target.value) || 0)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <label style={{ fontSize: '11px', color: 'hsl(var(--text-secondary))' }}>d (scale y)</label>
              <input type="number" step="0.5" style={{ background: 'hsl(var(--bg-secondary))', border: '1px solid hsl(var(--border-glass))', color: '#fff', padding: '4px', borderRadius: '4px', width: '100%', fontSize: '12px' }} value={d} onChange={(e) => setD(parseFloat(e.target.value) || 0)} />
            </div>
          </div>
          
          <div style={{ fontSize: '11px', color: 'hsl(var(--text-secondary))', marginTop: '6px', textAlign: 'center' }}>
            Det: <b>{(a * d - b * c).toFixed(1)}</b>
          </div>
        </div>
      </div>
    </div>
  );
};


// Primary Router Component for dynamically rendering the right widget
export const InteractiveWidget = ({ type, params }) => {
  switch (type) {
    case 'BalanceScale':
    case 'AlgebraBalance':
      return <BalanceScale {...params} />;
    case 'FractionVisualizer':
      return <FractionVisualizer {...params} />;
    case 'RatioMixer':
      return <RatioMixer {...params} />;
    case 'UnitCircleTrig':
      return <UnitCircleTrig {...params} />;
    case 'CoordinatePlotter':
      return <CoordinatePlotter {...params} />;
    case 'RiemannSums':
      return <RiemannSums {...params} />;
    case 'VectorSpace3D':
      return <VectorSpace3D {...params} />;
    default:
      return (
        <div style={{ padding: '16px', color: 'hsl(var(--text-muted))', fontStyle: 'italic', fontSize: '13px' }}>
          Interactive Demonstration (Visual Mode)
        </div>
      );
  }
};

export default InteractiveWidget;
