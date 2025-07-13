import { use, useEffect, useState } from "react";
import Card from "./Card";

function Game({ difficulty, onGoToMenu }) {
  const [gameStatus, setGameStatus] = useState();
  const [characters, setCharacters] = useState([]);
  const [cards, setCards] = useState([]);
  const [round, setRound] = useState(0);
  const [highScore, setHighScore] = useState(0);
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
  }, [characters, difficulty, round]);

  //once we have the id's, start the game
  useEffect(() => {
    if (ids.length > 0) {
      setGameStatus("playing");
      getRandomCards();
    }
  }, [ids]);

  //changing the cards every click
  useEffect(() => {
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
      setGameStatus("lose");
    }

    //check if that was the last card
    if (clickedCards.length + 1 === difficulty.clicks) {
      setGameStatus("win");
    }

    //if the player hasn't lose/won, keep playing
    setClickedCards((prev) => [...prev, id]);
  }

  function FinalScreen() {
    return (
      <div className="text-3xl font-bold text-slate-50">
        {gameStatus === "lose" ? (
          <div className="flex flex-col items-center gap-5">
            <h1 className="text-center">Sorry, you lose! wanna try again?</h1>
            <button
              onClick={() => restartGame()}
              className="text-2xl px-6 py-2 cursor-pointer rounded-full text-md border-2 bg-lime-300 border-lime-300 text-slate-900 hover:bg-slate-900 hover:text-lime-300 transition-all ease-in duration-150 shadow-md hover:shadow-lime-400"
            >
              Play again
            </button>
          </div>
        ) : gameStatus === "win" ? (
          <div className="text-center flex flex-col items-center gap-5">
            <h1>Congrats, you win!</h1>
            <button
              onClick={() => onGoToMenu()}
              className="text-2xl px-6 py-2 cursor-pointer rounded-full text-md border-2 bg-lime-300 border-lime-300 text-slate-900 hover:bg-slate-900 hover:text-lime-300 transition-all ease-in duration-150 shadow-md hover:shadow-lime-400"
            >
              Go to main menu
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  function restartGame() {
    if (clickedCards.length > highScore) {
      setHighScore(
        gameStatus === "win" ? clickedCards.length : clickedCards.length - 1,
      );
    }

    setGameStatus("playing");
    setCards([]);
    setClickedCards([]);
    setIds([]);
    setRound((prev) => prev + 1);
  }

  return (
    <div>
      {gameStatus === "playing" ? (
        <div className="flex flex-col items-center min-h-screen w-screen px-4">
          <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-lime-300 drop-shadow-[0_0_20px_#a3e635] pt-10 px-2">
            Click all characters without repeating to win!
          </h1>
          <div className="pt-4 flex flex-col justify-center text-lime-200 text-xl sm:text-2xl font-semibold drop-shadow-[0_0_20px_#a3e635]">
            <h1>
              {" "}
              {highScore > 0
                ? "Score: " +
                  clickedCards.length +
                  " / " +
                  difficulty.clicks +
                  " • " +
                  ("High Score: " + highScore)
                : "Score: " +
                  clickedCards.length +
                  " / " +
                  difficulty.clicks}{" "}
            </h1>
          </div>

          <div className="flex-1 flex items-center">
            <div className="w-full max-w-6xl flex flex-wrap justify-center gap-2 pb-40">
              {cards}
            </div>
          </div>
        </div>
      ) : (
        <FinalScreen />
      )}
    </div>
  );
}

export default Game;
