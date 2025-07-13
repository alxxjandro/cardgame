function Menu({ setDifficulty, difficulty, options }) {
  return (
    <div className="max-w-md w-full bg-slate-950 rounded-xl shadow-2xl p-8 flex flex-col items-center gap-6 border border-lime-500">
      <h1 className="text-3xl font-extrabold text-lime-200 text-center leading-snug drop-shadow-[0_0_6px_#84cc16]">
        <span className="block tracking-tight">Welcome to</span>
        <span className="text-4xl text-lime-300 drop-shadow-[0_0_20px_#a3e635]">
          Rick and Morty's
        </span>
        <span className="block">Card Game!</span>
        <span className="text-xl font-medium text-lime-200 block mt-5">
          Please select a difficulty
        </span>
      </h1>

      <div className="flex flex-col sm:flex-row gap-4">
        {options.map((option) => (
          <button
            key={option.difficulty}
            onClick={() => setDifficulty(option)}
            className="px-6 py-2 cursor-pointer rounded-full text-md border-2 bg-lime-300 border-lime-300 text-slate-900 hover:bg-slate-900 hover:text-lime-300 transition-all ease-in duration-150 shadow-md hover:shadow-lime-400"
          >
            {option.difficulty}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Menu;
