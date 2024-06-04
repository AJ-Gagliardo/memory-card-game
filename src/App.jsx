import { useEffect, useState } from "react";

import "./App.css";

// i Will separate many of these later on into their own component

//things to do:

// Fetch the data (done)
// randomId generator (done)
// implement something like dififculties example easy generates 6, medium 9, hard 12 (to be done)
// cards themselves, make a compomnent only for cards so they can have their own state or a
// something to reshuffle cards after every click
// something to either change state or status of that card in an object (for example alreadyClicked: true)

function App() {
  // component for the cards
  const [difficulty, setDifficulty] = useState(6); //6 is easy, 9 intermediate, 12 is hard

  return (
    <>
      <Game difficulty={difficulty} />
    </>
  );
}

function Game({ difficulty }) {
  // fetch the data

  const [data, setData] = useState(null);
  // function pokeUrl(name) {
  //   `https://pokeapi.co/api/v2/pokemon/${name}`;
  // }

  // getRandomPokemonId(6);

  //space for fetching the pokemon from the api
  // dont forget loading screen
  async function fetchData() {
    console.log("loading...");
    // const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150`
    );
    const result = await response.json();
    setData(result);
    console.log(result);
    // console.log(result);
  }

  useEffect(() => {
    fetchData();
  }, []);

  /////////////////////////////
  // get random numbers
  let randomPokemonIdArr = [];

  // this part is to create random numbers to get random pokemon from 150
  // this will be a component
  function randomNumber() {
    console.log("i am trying");
    return Math.floor(Math.random() * 150);
  }

  function getRandomPokemonId(num) {
    randomPokemonIdArr = [];
    for (let i = 0; i < num; i++) {
      randomPokemonIdArr.push(randomNumber());
    }
    console.log(randomPokemonIdArr);
  }
  getRandomPokemonId(difficulty);
  //objects or state or both for the  card image and if itsclicked or not

  // generate cards
  
  //this works
  // {console.log(randomPokemonIdArr.map((pokemon)=>(data.results[pokemon])))}
  return (
    <>
      {data ? 
      randomPokemonIdArr.map((pokemonId, index) => (
        <Card data={data} pokemonId = {pokemonId} key={index}  />
      )): (<p>Loading...</p>)
      }
    </>
  );
}

function Card({ data, pokemonId }) {
  return <div>{data.results[pokemonId].name}</div>; // this is not working, working on it since in console it works
}

export default App;

// reshuffle
