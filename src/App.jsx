import { useState } from "react";
import Card from "./Card";
import Menu from "./MainMenu";
import Game from "./Game";
import bg from "./assets/bg.jpg";

function App() {
  const [screen, setScreen] = useState("menu"); // "menu" | "game"
  const [difficulty, setDifficulty] = useState(null);

  const options = [
    {
      difficulty: "Easy",
      cards: 5,
      clicks: 8,
    },
    {
      difficulty: "Medium",
      cards: 8,
      clicks: 10,
    },
    {
      difficulty: "Hard",
      cards: 10,
      clicks: 12,
    },
  ];

  function handleStart(selectedDifficulty) {
    setDifficulty(selectedDifficulty);
    setScreen("game");
  }

  function handleGoToMenu() {
    setDifficulty(null);
    setScreen("menu");
  }

  return (
    <div
      className="min-h-screen min-w-screen bg-cover bg-center flex justify-center items-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] z-0" />
      <div className="z-10">
        {screen === "menu" && (
          <Menu
            setDifficulty={handleStart}
            options={options}
          />
        )}
        {screen === "game" && (
          <Game
            difficulty={difficulty}
            onGoToMenu={handleGoToMenu}
          />
        )}
      </div>
    </div>
  );
}

export default App;