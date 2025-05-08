import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Confetti from "react-confetti";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

// Image imports
import photo1 from "./asset/img/photo 1.jpg";
import photo5 from "./asset/img/photo 5.jpg";
import photo3 from "./asset/img/photos 3.jpg";
import photo4 from "./asset/img/photo 4.jpg";
import photo6 from "./asset/img/photo 6.jpg";
import photo7 from "./asset/img/photo 7.jpg";
import photo8 from "./asset/img/photo 8.jpg";
import photo9 from "./asset/img/photo 9.jpg";
import photo10 from "./asset/img/photo 10.jpg";
import photo12 from "./asset/img/photo 12.jpg";

const photos = [photo1, photo5, photo3, photo4, photo6, photo7, photo8, photo9, photo10, photo12];

// Birthday set to May 19, 2025
const birthdayDate = new Date("2025-05-19T00:00:00");

function App() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isBirthday, setIsBirthday] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showFireworks, setShowFireworks] = useState(true);

  function calculateTimeLeft() {
    const now = new Date();
    const difference = birthdayDate - now;

    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      setIsBirthday(!newTimeLeft);
    }, 1000);

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isBirthday && showFireworks) {
      const timeout = setTimeout(() => setShowFireworks(false), 10000);
      return () => clearTimeout(timeout);
    }
  }, [isBirthday, showFireworks]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    adaptiveHeight: true,
    lazyLoad: "ondemand",
  };

  // Google Drive embed link
  const videoEmbedUrl = "https://drive.google.com/file/d/1QAiV7QSqrKTp6Iss7bpbV4ibU-Lb8Qi6/preview";

  return (
    <div className="App">
      {isBirthday && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={100}
          />
          {showFireworks && (
            <div className="fireworks-container">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="firework-particle"
                  style={{
                    "--delay": `${Math.random() * 0.5 + i * 0.2}s`,
                    "--x-pos": `${Math.random() * 80 + 10}%`,
                    "--y-pos": `${Math.random() * 50 + 10}%`,
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}

      <header className="header">
        <h1>Happy Birthday, Beautiful! 🎉</h1>

        {isBirthday && (
          <button
            className="fireworks-toggle"
            onClick={() => setShowFireworks(!showFireworks)}
            aria-label={showFireworks ? "Hide fireworks" : "Show fireworks"}
          >
            {showFireworks ? "Hide Fireworks" : "Show Fireworks"}
          </button>
        )}

        {!isBirthday && timeLeft ? (
          <div className="countdown">
            <p>Countdown to Your Special Day:</p>
            <div className="timer">
              <div>
                <span>{timeLeft.days}</span>Days
              </div>
              <div>
                <span>{timeLeft.hours}</span>Hours
              </div>
              <div>
                <span>{timeLeft.minutes}</span>Minutes
              </div>
              <div>
                <span>{timeLeft.seconds}</span>Seconds
              </div>
            </div>
          </div>
        ) : (
          <div className="celebration">
            <h2>🎂 Today is your day! 🎂</h2>
            <p>
              Happy birthday my love as you grow older i want you to know that you are loved
              and i am very proud of you for what you've achieved so far and i pray to God that he can
              be able to give you more strength to even do better. i believe in you so much and best believe ill
              be here with you cheering you on every step you make till you reach your goal. i love youuu so much 💖
            </p>
          </div>
        )}
      </header>

      {isBirthday && (
        <section className="video">
          <h2>A Special Memory 🎥</h2>
          <div className="video-container">
            <iframe
              src={videoEmbedUrl}
              title="Birthday Video"
              allow="autoplay"
              allowFullScreen
              className="video-iframe"
            ></iframe>
          </div>
        </section>
      )}

      <section className="gallery">
        <Slider {...sliderSettings}>
          {photos.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={photo}
                alt={`Birthday memory ${index + 1}`}
                className="slide-image"
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
      </section>

      <footer>
        <p>Made with ❤️ just for you.</p>
      </footer>
    </div>
  );
}

export default App;