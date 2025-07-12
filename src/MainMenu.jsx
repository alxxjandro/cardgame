function Menu({ setDifficulty, difficulty }) {
  const options = ["Easy", "Medium", "Hard"];

  return (
    <div className="">
      <h1>To start, select a difficulty</h1>
      {options.map(option => 
        <button
          key={option}
          onClick={() => setDifficulty(option)}
          className="border-2 border-indigo-600 px-3 py-2 mx-1"
        >
          {option}
        </button>
      )}
    </div>
  );
}

export default Menu;