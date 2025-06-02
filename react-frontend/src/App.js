// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import bgMusicFile from './assets/sounds/background.mp3';

const importAll = (r) => r.keys().map(r);
const icons = importAll(require.context('./assets/icons', false, /\.(png|jpe?g|svg)$/));

const themes = [
  { name: 'dark', value: 'linear-gradient(135deg, #1a1a2e, #16213e)' },
  { name: 'light', value: 'linear-gradient(135deg, #fdfbfb, #ebedee)' },
  { name: 'retro', value: 'linear-gradient(135deg, #373B44, #4286f4)' },
  { name: 'midnight', value: 'linear-gradient(135deg, #141e30, #243b55)' },
  { name: 'sunset', value: 'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)' }
];

const shuffleArray = (array) =>
  array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);

function App() {
  const [cards, setCards] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [clickWindowOpen, setClickWindowOpen] = useState(false);
  const [roundTimeout, setRoundTimeout] = useState(null);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [soundOn, setSoundOn] = useState(true);
  const [combo, setCombo] = useState(0);
  const [bgMusic, setBgMusic] = useState(null);
  const [themeIndex, setThemeIndex] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  const currentTheme = themes[themeIndex];

  useEffect(() => {
    const music = new Audio(bgMusicFile);
    music.loop = true;
    music.volume = 0.2;
    setBgMusic(music);
  }, []);

  useEffect(() => {
    if (bgMusic) {
      soundOn ? bgMusic.play() : bgMusic.pause();
    }
  }, [soundOn, bgMusic]);

  useEffect(() => {
    if (difficulty) startNewGame();
  }, [difficulty]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      playSound('gameover');
      updateLeaderboard();
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  const startNewGame = () => {
    setScore(0);
    setCombo(0);
    setTimeLeft(30);
    setGameOver(false);
    if (roundTimeout) clearTimeout(roundTimeout);
    startNewRound();
  };

  const startNewRound = () => {
    const selectedIcons = shuffleArray(icons).slice(0, 6);
    const pairedIcons = shuffleArray([...selectedIcons, ...selectedIcons]);
    const target = selectedIcons[Math.floor(Math.random() * selectedIcons.length)];

    setCards(pairedIcons);
    setCurrentImage(target);
    setSelectedIndices([]);
    setCorrectIndex(null);
    setClickWindowOpen(true);

    if (roundTimeout) clearTimeout(roundTimeout);
    const timeout = setTimeout(() => {
      setClickWindowOpen(false);
      setCombo(0);
      startNewRound();
    }, 5000);
    setRoundTimeout(timeout);
  };

  const handleCardClick = (index) => {
    if (gameOver || !clickWindowOpen) return;

    if (cards[index] === currentImage) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      setScore((prev) => prev + 10 * newCombo);
      setTimeLeft((prev) => prev + Math.min(3, 180 - prev)); // bonus time up to max
      playSound('match');
      setClickWindowOpen(false);
      setCorrectIndex(index);
      if (roundTimeout) clearTimeout(roundTimeout);
      setTimeout(() => startNewRound(), 800);
    } else {
      setCombo(0);
      playSound('mismatch');
      setSelectedIndices((prev) => [...prev, index]);
    }
  };

  const playSound = (type) => {
    if (!soundOn) return;
    const matchSound = new Audio(require('./assets/sounds/match.mp3'));
    const failSound = new Audio(require('./assets/sounds/fail.mp3'));
    const gameOverSound = new Audio(require('./assets/sounds/gameover.mp3'));
    if (type === 'match') matchSound.play();
    else if (type === 'mismatch') failSound.play();
    else if (type === 'gameover') gameOverSound.play();
  };

  const shuffleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const updateLeaderboard = () => {
    const updated = [...leaderboard, score].sort((a, b) => b - a).slice(0, 5);
    setLeaderboard(updated);
  };

  return (
    <div className="App" style={{ background: currentTheme.value, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
        <button className="sound-toggle" onClick={() => setSoundOn(!soundOn)}>
          Sound: {soundOn ? 'ON' : 'OFF'}
        </button>
        <button className="sound-toggle" onClick={shuffleTheme}>
          Theme: {currentTheme.name}
        </button>
      </div>

      <h1>🧠 Pix Match Game</h1>

      {!difficulty ? (
        <div className="difficulty-select">
          <h2>Select Difficulty</h2>
          <button onClick={() => setDifficulty('easy')}>Easy</button>
          <button onClick={() => setDifficulty('medium')}>Medium</button>
          <button onClick={() => setDifficulty('hard')}>Hard</button>
        </div>
      ) : (
        <>
          <div className="controls">
            <span>Score: {score}</span>
            <span>🔥 Combo: {combo}</span>
            <div className="timer-bar">
              <div className="timer-fill" style={{ width: `${(timeLeft / 30) * 100}%` }}></div>
            </div>
            <span>Time Left: {timeLeft}s</span>
            <button onClick={startNewGame}>🔄 New Game</button>
          </div>

          <div className="preview">
            <p>Find this image</p>
            {currentImage && (
              <div style={{ padding: '10px', borderRadius: '12px', display: 'inline-block', background: 'none' }}>
                <img src={currentImage} alt="target" className="preview-image" style={{ background: '#fff', borderRadius: '12px', padding: '10px' }} />
              </div>
            )}
          </div>

          <div className="grid">
            {cards.map((icon, index) => (
              <div
                key={index}
                className={`card flipped ${correctIndex === index ? 'correct' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <div className="card-inner">
                  <div className="card-front"></div>
                  <div className="card-back" style={{ backgroundColor: '#f9f9f9' }}>
                    <img src={icon} alt="icon" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {gameOver && (
            <div className="game-over">
              <h2>⏱️ Time's up!</h2>
              <p>Your Final Score: {score}</p>
              <h3>🏆 Leaderboard</h3>
              <ol>
                {leaderboard.map((s, i) => (
                  <li key={i}>Score: {s}</li>
                ))}
              </ol>
              <button onClick={startNewGame}>Play Again</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
