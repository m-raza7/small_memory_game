import { useState } from "react";

export default function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [randomNumber, setRandomNumber] = useState("");
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = async () => {
    setMessage("");
    setUserInput("");
    setGameStarted(true);

    // ✅ generate random number (4 digits)
    const num = Math.floor(1000 + Math.random() * 9000).toString();
    setRandomNumber(num);

    // ✅ show popup
    setShowPopup(true);

    try {
      // ✅ delay 0.2 sec
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (err) {
      console.log("Error:", err);
    } finally {
      // ✅ hide popup after 0.2 sec
      setShowPopup(false);
    }
  };

  const checkAnswer = (e) => {
    e.preventDefault();

    if (userInput === randomNumber) {
      setMessage("✅ Correct! You Win 🎉");
    } else {
      setMessage("❌ Wrong! Try Again 😅");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>🎮 Memory Number Game</h2>
      <p>Popup will show a number for <b>0.2 sec</b> 👀</p>

      <button className="btn btn-primary" onClick={startGame}>
        Start Game
      </button>

      {/* ✅ Popup Modal */}
      {showPopup && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-sm">
            <div className="modal-content text-center">
              <div className="modal-body">
                <h1 className="fw-bold">{randomNumber}</h1>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}

      {/* ✅ Input after popup hidden */}
      {gameStarted && !showPopup && (
        <form onSubmit={checkAnswer} className="mt-4">
          <input
            type="text"
            className="form-control text-center"
            placeholder="Enter the number you saw"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />

          <button className="btn btn-success mt-3" type="submit">
            Submit Answer
          </button>
        </form>
      )}

      {/* ✅ Result message */}
      {message && <h4 className="mt-4">{message}</h4>}
    </div>
  );
}
