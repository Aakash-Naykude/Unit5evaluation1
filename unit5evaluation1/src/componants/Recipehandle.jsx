import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { Recipe } from "./Recipeinput";
import { ShowList } from "../componants/Recipeshow";
import "../componants/mainpage.css";
import styled from "styled-components";

export const Mainpage = () => {
  const [list, setList] = useState([]);
  const [more, setMore] = useState([]);
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    fetch(`http://localhost:3001/posts`)
      .then((d) => d.json())
      .then((res) => {
        setList(res);
        console.log(res);
      });
  };

  const handleInput = async (inp) => {
    const payload = {
      id: nanoid(8),
      Recepie: inp.Recepie,
      Time: Number(inp.Time),
      Instruction: inp.Instruction,
      Ingredient: inp.Ingredient,
      Type: inp.Type,
      Image: inp.Image,
    };
    setList([...list, payload]);
    try {
      let resp = await fetch("http://localhost:3001/posts", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await resp.json();
    } catch (e) {
      console.log(e);
    }
    getList();
  };
  const handleDelete = async (id) => {
    setList(list.filter((list) => list.id !== id));

    let resp = await fetch(`http://localhost:3001/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const handleSort = () => {
    fetch(`http://localhost:3001/posts?_sort=Time&_order=asc`)
      .then((d) => d.json())
      .then((res) => {
        console.log(res);
        setList(res);
      });
    console.log("hii");
  };
  const handleMore = (id) => {
    fetch(`http://localhost:3001/posts/${id}`)
      .then((d) => d.json())
      .then((res) => {
        console.log(res);
        setMore(res);
      });
  };
  const Button = styled.button`
    background-color: aliceblue;
    color: black;
    margin-left: 45%;
    width: 100px;
    border-radius: 5px;
  `;
  return (
    <div>
      <div className="cont">
        <Recipe className="left" getData={handleInput} />
        <div className="right">
          <Button onClick={handleSort}>Sort by time</Button>
          {list.map((e) => (
            <ShowList
              key={e.id}
              {...e}
              handleDelete={handleDelete}
              handleMore={handleMore}
            />
          ))}
        </div>
      </div>
      <hr />
      <h1 className="name">Item Name : {more.Recepie}</h1>
      <div className="moreinfor">
        <h4>Infor : {more.Instruction}</h4>
        <div>
          Image : <img src={more.Image} className="img" />
        </div>
        <h4>Ingredients : {more.Ingredient}</h4>
        <h4>Time : {more.Time}</h4>
        <h4>Type : {more.Type}</h4>
      </div>
    </div>
  );
};
