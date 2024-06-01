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
  const [data, setData] = useState(null);
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

  getRandomPokemonId(6);

  // will have to do a function that runs random number (xTimes) depending on the difficulty

  //space for fetching the pokemon from the api
  // dont forget loading screen
  async function fetchData() {
    console.log("loading...");
    // const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150`
    );
    const result = await response.json();
    console.log(result);
    // console.log(result);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return <></>;
}

export default App;
