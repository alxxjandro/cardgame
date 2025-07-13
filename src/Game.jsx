import { useEffect, useState } from "react";
import Card from "./Card";

function Game({ difficulty }) {
  const [characters, setCharacters] = useState([]);
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const urls = [
          "https://rickandmortyapi.com/api/character?page=1",
          "https://rickandmortyapi.com/api/character?page=2",
          "https://rickandmortyapi.com/api/character?page=3",
        ];

        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const arrays = await Promise.all(responses.map((res) => res.json()));

        const data = arrays[0].results.concat(
          arrays[1].results,
          arrays[2].results,
        );
        setCharacters(data);
      } catch (e) {
        console.error("An error occurred: ", e);
      }
    };
    loadCharacters();
  }, []);

  //once we fetch all the characters, get
  //the ones we are going to be playing with
  useEffect(() => {
    if (characters.length > 0) {
      let values = [];

      for (let i = 0; i < difficulty.clicks; i++) {
        let id = Math.floor(Math.random() * 60);
        while (values.includes(id)) {
          id = Math.floor(Math.random() * 60);
        }
        values.push(id);
      }
      setIds(values);
    }
  }, [characters, difficulty]);

  //once we have the id's, start the game
  useEffect(() => {
    if (ids.length > 0) {
      getRandomCards();
    }
  }, [ids]);

  useEffect(() => {
    console.log(clickedCards);
    getRandomCards();
  }, [clickedCards]);

  function getRandomCards() {
    const notClicked = ids.filter((id) => !clickedCards.includes(id));
    if (notClicked.length === 0) return;
    const mustInclude =
      notClicked[Math.floor(Math.random() * notClicked.length)];

    //pick clikc-1 cards and ensure at least one that hasn't been clicked shows up
    const random = [...ids]
      .filter((id) => id !== mustInclude)
      .sort(() => Math.random() - 0.5)
      .slice(0, difficulty.cards - 1);

    const final = [...random, mustInclude].sort(() => Math.random() - 0.5);

    const newCards = final.map((id) => {
      const char = characters[id];
      return (
        <Card
          key={char.id}
          name={char.name}
          image={char.image}
          onClick={() => checkGameStatus(id)}
        />
      );
    });

    setCards(newCards);
  }

  function checkGameStatus(id) {
    //check for a double click
    if (clickedCards.includes(id)) {
      alert("Sorry, you lose!");
    }

    //check if that was the last card
    if (clickedCards.length + 1 === difficulty.clicks) {
      alert("Congrats!, you win!");
    }

    //if the player hasn't lose/won, keep playing
    setClickedCards((prev) => [...prev, id]);
  }

  return <div className="flex flex-wrap justify-center gap-4 p-4">{cards}</div>;
}

export default Game;
