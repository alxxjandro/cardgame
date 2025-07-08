import { useEffect, useState } from "react";

function Card({ name, image, onClick }) {
  return (
    <div onClick={() => onClick(name)}>
      <h1>{name}</h1>
      <img src={image} alt={name + " image"} />
    </div>
  );
}

function App() {
  const [characters, setCharacters] = useState([]);
  const [click, setClick] = useState("");

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        let f = await fetch(`https://rickandmortyapi.com/api/character`);
        let r = await f.json();
        setCharacters(r.results);
      } catch (e) {
        console.error("An error occurr: ", e);
      }
    };
    loadCharacters();
  }, []);

  useEffect(() => {
    console.log(click);
  }, [click]);

  return (
    <div>
      {characters &&
        characters.map((char) => (
          <Card
            onClick={setClick}
            key={char.name}
            name={char.name}
            image={char.image}
          />
        ))}
    </div>
  );
}

export default App;
