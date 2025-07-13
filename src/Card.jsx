
function Card({ name, image, onClick }) {
  return (
    <div onClick={() => onClick(name)}>
      {/* <h1>{name}</h1> */}
      <img src={image} alt={name + " image"} />
    </div>
  );
}

export default Card;
