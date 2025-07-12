import { useEffect, useState } from "react";
import Card from "./Card";
import Menu from "./MainMenu";
import Game from "./Game";
import bg from "./assets/bg.jpg";

function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [click, setClick] = useState("");

  return (
    <div
      className="min-h-screen min-w-screen bg-cover bg-center flex justify-center items-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Optional: overlay para oscurecer la imagen y mejorar el contraste */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] z-0" />

      {/* Contenido por encima del fondo */}
      <div className="z-10">
        {!difficulty && <Menu setDifficulty={setDifficulty} />}
        {difficulty && <Game difficulty={difficulty} />}
      </div>
    </div>
  );
}

export default App;