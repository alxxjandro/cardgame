import { useEffect, useState } from "react";
import Card from "./Card";
import Menu from "./MainMenu";
import Game from "./Game";
import bg from "./assets/bg.jpg";

function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [click, setClick] = useState("");

  // const options = ["Easy", "Medium", "Hard"];
  const options = [
    {
      difficulty: "Easy",
      cards: 5
    },
    {
      difficulty: "Medium",
      cards: 8
    },
    {
      difficulty: "Hard",
      cards: 10
    },
  ]

  return (
    <div
      className="min-h-screen min-w-screen bg-cover bg-center flex justify-center items-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >

      <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] z-0" />
      <div className="z-10">
        {!difficulty && <Menu setDifficulty={setDifficulty} options={options} />}
        {difficulty && <Game difficulty={difficulty} />}
      </div>
    </div>
  );
}

export default App;