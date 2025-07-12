import { useEffect, useState } from "react";
import Card from "./Card";
import Menu from "./MainMenu";
import Game from "./Game";

function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [click, setClick] = useState("");

  return (
    <div className="min-h-screen min-w-screen bg-gray-200 flex justify-center items-center">
      {!difficulty && <Menu setDifficulty={setDifficulty} />}
      {difficulty && <Game difficulty={difficulty} />}
    </div>
  );
}

export default App;
