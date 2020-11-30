import React, { useEffect, useContext, useState } from "react";
import "./style.css";
import Options from "../Options"
import {loadCharacter} from "../utils/API"
import BuyShip from "../Ship/BuyShip"
import AuthContext from "../../context/auth/authContext";
import {useCharacterContext} from "../../context/character/CharacterContext"
import Login from "../auth/Login"
import CharacterCreator from "./CharacterCreator"
export default function ViewCharacter(props) { 
  let userId;
  const [state, dispatch] = useCharacterContext();
  const authContext = useContext(AuthContext);

  console.log({authContext});
  useEffect(()=>{
    
    if(authContext.isAuthenticated) {
      console.log(authContext.user);
      
      getCharacter(authContext.user._id);}
     
  },[authContext.isAuthenticated]);

  
  const getCharacter=id=>{
    dispatch({type:"LOADING"});
    
    loadCharacter(id)
    .then(res=>{
      if(res.data){
        dispatch({type:"UPDATE_CHARACTER", char:res.data})
      }
    })
  };

  let display={display:"TopRight"};
  if(!authContext.isAuthenticated)
  return(
    <Login />
  )
  else if(!state.loaded) return (<>Loading</>);
//  else if(page==="create") return (<CharacterCreator />)
  else return (
    <>
    <BuyShip />
    <div className="container desk-box">
    <div className="container" id="license">
      <div className="smudge"></div>
        <div className="row">
          <div className="col-5" id="photo">
            <img src={state.data.characterImage} />s
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
    <Options displayed={display}/>
</div>  
</>
  );
}

