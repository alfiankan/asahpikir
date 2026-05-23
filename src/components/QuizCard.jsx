import React, { useState, useEffect } from 'react';
import { Lightbulb, CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';

export const QuizCard = ({ step, onAnswer }) => {
  const [selected, setSelected] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [hintsUsed, setHintsUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showStepByStep, setShowStepByStep] = useState(false);

  // Reset states on step changes
  useEffect(() => {
    setSelected('');
    setSubmitted(false);
    setIsCorrect(false);
    setStartTime(Date.now());
    setHintsUsed(false);
    setShowHint(false);
    setShowStepByStep(false);
  }, [step.id]);

  if (!step.question) {
    return (
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'hsl(var(--secondary))' }}>
          <CheckCircle2 size={20} /> Conceptual Exploration
        </h4>
        <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '15px' }}>
          Read the concepts on the left and interact with the math sandbox to build your intuition. When you're ready to proceed to the quizzes, press the button below.
        </p>
        <button className="btn btn-primary" style={{ marginTop: '12px' }} onClick={() => onAnswer(true, 5, false)}>
          I Understand <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  const { text, choices, correctAnswer, hint, explanation, explanationSteps } = step.question;

  const handleSubmit = () => {
    if (!selected || submitted) return;
    
    const correct = selected === correctAnswer;
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    
    setIsCorrect(correct);
    setSubmitted(true);
    
    // Play Web Audio sound indicator
    playFeedbackSound(correct);

    // Bubble up details to Adaptive Engine
    onAnswer(correct, elapsedSeconds, hintsUsed);
  };

  // Synthesize game sound effects using Web Audio API (cross-browser offline friendly!)
  const playFeedbackSound = (correct) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (correct) {
        // High, bright double beep
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else {
        // Low buzzing fail sound
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(146.83, ctx.currentTime); // D3
        osc.frequency.linearRampToValueAtTime(110.00, ctx.currentTime + 0.3); // A2
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (e) {
      console.warn("Audio Context blocked or unsupported:", e);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
      {/* Level Tag */}
      <span style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        fontSize: '11px',
        fontWeight: 'bold',
        padding: '2px 8px',
        borderRadius: '4px',
        background: step.level === 3 ? 'hsla(346.8, 77.2%, 49.8%, 0.15)' : step.level === 2 ? 'hsla(199.1, 88.7%, 48.4%, 0.15)' : 'hsla(142.1, 76.2%, 45.3%, 0.15)',
        color: step.level === 3 ? '#f43f5e' : step.level === 2 ? '#38bdf8' : '#34d399',
        border: '1px solid currentColor'
      }}>
        LEVEL {step.level}
      </span>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginTop: '12px' }}>
        <HelpCircle size={22} style={{ color: 'hsl(var(--primary))', flexShrink: 0, marginTop: '2px' }} />
        <h3 style={{ fontSize: '18px', fontWeight: '600', lineHeight: 1.4 }}>{text}</h3>
      </div>

      {/* Choice Selector Cards */}
      <div className="choices-grid">
        {choices.map((choice, idx) => {
          let cardClass = "choice-card";
          if (submitted) {
            if (choice === correctAnswer) cardClass += " correct";
            else if (choice === selected) cardClass += " incorrect";
          } else if (selected === choice) {
            cardClass += " selected";
          }

          return (
            <button
              key={idx}
              className={cardClass}
              disabled={submitted}
              onClick={() => setSelected(choice)}
            >
              <span style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '1px solid currentColor',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {String.fromCharCode(65 + idx)}
              </span>
              {choice}
            </button>
          );
        })}
      </div>

      {/* Action Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
        {hint && !submitted && (
          <button
            className="btn btn-secondary"
            style={{ padding: '8px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
            onClick={() => {
              setHintsUsed(true);
              setShowHint(!showHint);
            }}
          >
            <Lightbulb size={16} style={{ color: 'hsl(var(--streak-orange))' }} />
            {showHint ? "Hide Hint" : "Need a Hint?"}
          </button>
        )}

        {!submitted ? (
          <button
            className="btn btn-primary"
            style={{ marginLeft: 'auto' }}
            disabled={!selected}
            onClick={handleSubmit}
          >
            Check Answer
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            {/* Show Explanation feedback box */}
            <div className={`feedback-box ${isCorrect ? 'correct' : 'incorrect'}`} style={{ width: '100%' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontWeight: 'bold', fontSize: '15px', marginBottom: '6px' }}>
                {isCorrect ? (
                  <>
                    <CheckCircle2 size={18} style={{ color: 'hsl(var(--secondary))' }} />
                    <span style={{ color: 'hsl(var(--secondary))' }}>Excellent! That is correct.</span>
                  </>
                ) : (
                  <>
                    <XCircle size={18} style={{ color: '#f43f5e' }} />
                    <span style={{ color: '#f43f5e' }}>Not quite. Let's learn why:</span>
                  </>
                )}
              </div>
              <p style={{ fontSize: '14px', color: 'hsl(var(--text-secondary))' }}>{explanation}</p>
              
              {!isCorrect && explanationSteps && explanationSteps.length > 0 && (
                <div style={{ marginTop: '12px' }}>
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={(e) => { e.preventDefault(); setShowStepByStep(!showStepByStep); }}
                  >
                    <HelpCircle size={15} style={{ color: 'hsl(var(--primary))' }} />
                    {showStepByStep ? "Hide Step-by-Step Help" : "Show Step-by-Step Help"}
                  </button>
                  {showStepByStep && (
                    <div className="glass-panel" style={{ marginTop: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left', background: 'rgba(0,0,0,0.2)' }}>
                      {explanationSteps.map((stepText, stepIdx) => (
                        <div key={stepIdx} style={{ display: 'flex', gap: '8px', fontSize: '13.5px', color: 'hsl(var(--text-secondary))' }}>
                          <span style={{ fontWeight: 'bold', color: 'hsl(var(--primary))' }}>{stepIdx + 1}.</span>
                          <span>{stepText}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              <button
                className="btn btn-primary"
                style={{ marginTop: '16px', width: '100%' }}
                onClick={() => onAnswer(isCorrect, 0, false)} // Triggers navigation to next screen
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>

      {showHint && !submitted && (
        <div className="glass-panel" style={{ padding: '16px', borderLeft: '4px solid hsl(var(--streak-orange))', background: 'hsla(var(--streak-orange), 0.05)', fontSize: '14px' }}>
          <b>Hint:</b> {hint}
        </div>
      )}
    </div>
  );
};

export default QuizCard;
