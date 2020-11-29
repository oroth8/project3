import React, { useEffect, useContext, useState } from "react";
import "./style.css";
import {loadCharacter} from "../utils/API"
// import AuthContext from "../../context/auth/authContext";
import {useCharacterContext} from "../../context/character/CharacterContext"


export default function ViewCharacter(props) { 

  let userId=0;
  const [state, dispatch] = useCharacterContext();
  console.log(state);
  const getCharacter=userId=>{
    dispatch({type:"LOADING"});
    loadCharacter(0)
    .then(res=>{
      dispatch({type:"UPDATE_CHARACTER", char:res.data})
    })
  };

  useEffect(()=>{
    getCharacter();
  },[]);

  if(!state.loaded) return (<></>);
  else 
  return (
    <div className="container desk-box">
    <div className="container" id="license">
      <div className="smudge"></div>
        <div className="row">
          <div className="col-5" id="photo">
            <img src={state.data.characterImage} />
          </div>
          <div className="col-7">
          <ul className="stats">
          <li>Name: {state.data.name}</li>
            <li>Age: {state.data.age}</li>
            <li>Born:{state.data.birthYear}</li>
            <li>Ship Class: {state.data.shipIdArray[0]} </li>               
            </ul>
          </div>
        </div>
        <div className="row license-text">
          LICENSE
        </div>
        <div className="row update-text">
          UPDATED {state.currentYear}
        </div>
    </div>
    <a href="/buyShip">Creator</a>
</div>  
  );
}
