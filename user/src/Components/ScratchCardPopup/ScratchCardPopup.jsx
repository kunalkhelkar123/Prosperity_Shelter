import React, { useRef, useState, useEffect } from "react";

const ScratchCardPopup = ({ onClose }) => {
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [reward, setReward] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {



    const isAlreadyScratched = localStorage.getItem("scratch") === "true";
    if (isAlreadyScratched) {
        onClose();
      setIsScratched(true); // Skip the scratch if already done
    }


    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set up the scratch card overlay
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Scratch Here!", canvas.width / 2, canvas.height / 2);
  }, []);

  const handleScratch = (e) => {
    if (isScratched || !isMouseDown) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2, false); // Circular scratch
    ctx.fill();

    // Check how much of the card has been scratched
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let scratchedPixels = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) scratchedPixels++;
    }
    const scratchedPercentage =
      (scratchedPixels / (canvas.width * canvas.height)) * 100;

    if (scratchedPercentage > 50) {
      // Reveal reward once 50% of the card is scratched
      const randomReward = Math.floor(Math.random() * 20) + 1;
      setReward(randomReward);
      setIsScratched(true);
      localStorage.setItem("scratch", "true");
    }
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleRedeem = () => {
    alert(`You have redeemed ₹${reward}!`);
    onClose(); // Close popup after redeeming
  };

  const handleClosePopup = () => {
    setIsScratched(false);
    setReward(null); // Reset reward when closing popup
    onClose(); // Close popup
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          width: "320px",
        }}
      >
        <h2>Scratch to Win!</h2>
        <div
          style={{
            position: "relative",
            marginBottom: "20px",
            display: "inline-block",
          }}
        >
          {/* Reward Text */}
          <div
            style={{
              width: "250px", // Ensure width matches canvas
              height: "120px", // Ensure height matches canvas
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "18px",
              fontWeight: "bold",
              background: "#f8f8f8",
              borderRadius: "10px",
              zIndex: isScratched ? 1 : -1,
            }}
          >
            🎉 Congrats! You got ₹{reward} 🎉
          </div>

          {/* Scratch Card Canvas */}
          <canvas
            ref={canvasRef}
            width={250} // Adjust width
            height={120} // Adjust height
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              cursor: isScratched ? "not-allowed" : "pointer",
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleScratch} // Track scratch on mouse move
          ></canvas>
        </div>

        {isScratched && (
          <div>
            <p>If you want to redeem this reward, click the button below:</p>
            <button
              onClick={handleRedeem}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Redeem ₹{reward}
            </button>
          </div>
        )}
        <button
          onClick={handleClosePopup}
          style={{
            marginTop: "20px",
            padding: "5px 10px",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ScratchCardPopup;
