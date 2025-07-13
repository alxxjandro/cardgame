import { useEffect, useState } from "react";
import Card from "./Card";

function Game({ difficulty }) {
  const [characters, setCharacters] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const urls = [
          "https://rickandmortyapi.com/api/character?page=1",
          "https://rickandmortyapi.com/api/character?page=2",
          "https://rickandmortyapi.com/api/character?page=3",
        ];

        const responses = await Promise.all(urls.map(url => fetch(url)));
        const arrays = await Promise.all(responses.map(res => res.json()));

        const data = arrays[0].results.concat(arrays[1].results,arrays[2].results);
        setCharacters(data);
      } catch (e) {
        console.error("An error occurred: ", e);
      }
    };
    loadCharacters();
  }, []);

  useEffect(() => {
    if (characters.length > 0) {
      setCards(loadCards(difficulty));
    }
  }, [characters, difficulty]);

  function loadCards(difficulty) {
    if (!characters || characters.length === 0) return null;

    const cards = [];
    const ids = [];
    for (let i = 0; i < difficulty.cards; i++) {


      let char = characters[Math.floor(Math.random() * 60)];
      while(ids.includes(char.id)){
        char = characters[Math.floor(Math.random() * 60)];
      }

      cards.push(
        <Card
          key={char.id}
          name={char.name}
          image={char.image}
          onClick={() => console.log("Clicked", char.name)}
        />
      );
      ids.push(char.id)


    }
    return cards;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {cards}
    </div>
  );
}

export default Game;