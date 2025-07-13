function Card({ name, image, onClick }) {
  return (
    <div className="w-36 sm:w-40 md:w-48 lg:w-56" onClick={() => onClick(name)}>
      {/* <h1>{name}</h1> */}
      <img
        className="rounded-2xl shadow-5xl"
        src={image}
        alt={name + " image"}
      />
    </div>
  );
}

export default Card;
