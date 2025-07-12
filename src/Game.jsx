
function Game({difficulty}){

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
  
  return (
    <div>
      GAME + {difficulty}
    </div>
  )
}

export default Game;