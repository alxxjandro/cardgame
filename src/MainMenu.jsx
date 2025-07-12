function Menu({ setDifficulty, difficulty }) {
  const options = ["Easy", "Medium", "Hard"];

  return (
    <div className="max-w-md w-full bg-stone-50 rounded-xl shadow-2xl p-8 flex flex-col items-center gap-6"> 
      <h1 className="text-3xl font-extrabold text-slate-900 text-center leading-snug">
        <span className="block tracking-tight">Welcome to</span>
        <span className="text-4xl text-blue-700 drop-shadow-md"> Rick and Morty's  </span>
        <span className="block"> Card Game! </span>
        <span className="text-xl font-medium text-slate-600 block mt-5">
          Please select a difficulty
        </span>
      </h1>

      <div className="flex flex-col sm:flex-row gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setDifficulty(option)}
            className="px-6 py-2 rounded-full text-md border-2 bg-slate-800 border-slate-800 text-stone-100 hover:scale-102 cursor-pointer hover:bg-stone-50 hover:text-slate-800 transition-all ease-in duration-100"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Menu;