import { useRef, useState } from "react";
import "../componants/inp.css"
export const Recipe = ({ getData }) => {
  const [inp, setinp] = useState(null);
  const fileRef = useRef(null);
  const handleChange = (e) => {
    let { name, value, type } = e.target;
    value =
      type === "file" ? URL.createObjectURL(fileRef.current.files[0]) : value;
    setinp({ ...inp, [name]: value });
  };
  const submittedData = (e) => {
    e.preventDefault();
    getData(inp);
  };
  return (
    <>
      <form className="form" onSubmit={submittedData}>
        <label>Recepie :&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input
          onChange={handleChange}
          type="text"
          name="Recepie"
          placeholder="Enter Recepie"
        />
        <br />
        <label>Time :&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input
          onChange={handleChange}
          type="number"
          name="Time"
          placeholder="Enter Time"
        />
        <br />
        <label>Instruction : &nbsp;</label>
        <input
          onChange={handleChange}
          type="text"
          name="Instruction"
          placeholder="Enter Instruction"
        />
        <br />
        <label>Ingredient : &nbsp;&nbsp;</label>
        <input
          onChange={handleChange}
          type="text"
          name="Ingredient"
          placeholder="Enter Ingredient"
        />
        <br />
        <label>Department : &nbsp;&nbsp;&nbsp; </label>
        <select onChange={handleChange} name="Type">
          <option value="Cheese">Cheese</option>
          <option value="Spicy">Spicy</option>
          <option value="Bake">Bake</option>
          <option value="none">none</option>
        </select>
        <br />
        <label>Image Pic :&nbsp;&nbsp;&nbsp;</label>
        <input onChange={handleChange} type="file" name="Image" ref={fileRef} />
        <br />
        <input type="submit" name="Submit" />
      </form>
    </>
  );
};
