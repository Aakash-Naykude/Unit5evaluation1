import "../componants/show.css";
export const ShowList = ({
  id,
  Recepie,
  Instruction,
  handleDelete,
  handleMore,
  Time,
}) => {
  return (
    <>
      <div className="div">
        <h5 onClick={() => handleMore(id)}>Recepie : {Recepie}</h5>
        <p>Instruction : {Instruction}</p>
        <p>Time: {Time}</p>
        <button onClick={() => handleDelete(id)}>Delete Details?</button>
      </div>
    </>
  );
};
