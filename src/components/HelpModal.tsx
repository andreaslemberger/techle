interface HelpModalProps {
  onClose: () => void;
}

export default function HelpModal({ onClose }: HelpModalProps) {
  return (
    <div
      className="help-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="How to play"
      onClick={onClose}
    >
      <div className="help-modal" part="help-modal" onClick={(e) => e.stopPropagation()}>
        <button className="help-close" aria-label="Close" onClick={onClose}>
          ✕
        </button>
        <h2>How to play</h2>
        <p>Guess the word in 6 tries.</p>
        <p>Each guess must be a valid word. Press Enter to submit.</p>
        <p>After each guess, the color of the tiles will change:</p>
        <div className="help-examples">
          <div className="help-example">
            <span className="help-tile correct">R</span>
            <span>Correct — letter is in the right spot</span>
          </div>
          <div className="help-example">
            <span className="help-tile present">E</span>
            <span>Present — letter is in the word but wrong spot</span>
          </div>
          <div className="help-example">
            <span className="help-tile absent">A</span>
            <span>Absent — letter is not in the word</span>
          </div>
        </div>
      </div>
    </div>
  );
}
