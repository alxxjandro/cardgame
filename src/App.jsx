import { useEffect, useState } from "react";
import Card from "./Card";
import Menu from "./MainMenu";
import Game from "./Game";

function App() {
  const [characters, setCharacters] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [click, setClick] = useState("");




  // useEffect(() => {
  //   console.log(click);
  // }, [click]);

  return (
    <div>
      {!difficulty && (<Menu setDifficulty={setDifficulty} />) }
      {difficulty && (<Game difficulty={difficulty}/>) }
    </div>
  );
}

export default App;
