import { useEffect, useState } from "react";

import "./App.css";

// i Will separate many of these later on into their own component

//things to do:

// Fetch the data (done)
// randomId generator (done)
// implement something like dififculties example easy generates 6, medium 9, hard 12 ( done)
// cards themselves, make a compomnent only for cards so they can have their own state or a (done)
// something to reshuffle cards after every click (in process )
// something to either change state or status of that card in an object (for example alreadyClicked: true) (done)

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
  const [pokeImgs, setPokeImgs] = useState([]);
  const [score, setScore] = useState(0);
  const [randomPokemonIdArr, setRandomPokemonIdArr] = useState([]);
  const [alreadyFlipped, setAlreadyFlipped] = useState([]);

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
    // function getImages(){
    //   randomPokemonIdArr.map((pokemonId)=>
    //     `https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    // }

    //working on this one
    const imagesPromise = result.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const pokeData = await res.json();
      return pokeData.sprites.front_default;
    });

    const images = await Promise.all(imagesPromise);
    setPokeImgs(images);

function shuffleDeck(){
  
}


  }

  useEffect(() => {
    fetchData();
  }, []);

  /////////////////////////////
  // get random numbers
  // gives a random number between 1 to 150 which would be the pokemon ID
  useEffect(() => {
    let ids = [];

    function randomNumber() {
      console.log("i am trying");
      return Math.floor(Math.random() * 150);
    }

    function getRandomPokemonId(num) {
      ids = [];
      for (let i = 0; i < num; i++) {
        ids.push(randomNumber());
      }
      // console.log(randomPokemonIdArr);
      return ids;
    }
    setRandomPokemonIdArr(getRandomPokemonId(difficulty));
  }, [difficulty]);

    

  // generate cards

// the UI of the game
  // {console.log(randomPokemonIdArr.map((pokemon)=>(data.results[pokemon])))}
  return (
    <>
      <div>
        <h2>
          Score: {score}/{difficulty}
        </h2>
      </div>
      <div className="game">
        {data && pokeImgs ? (
          randomPokemonIdArr.map((pokemonId, index) => (

            <Card
              data={data}
              pokemonId={pokemonId}
              key={index}
              pokeImgs={pokeImgs[pokemonId]}
              setScore={setScore}
              score={score}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

// the card component, 
function Card({ data, pokemonId, pokeImgs, setScore, score}) {
  // to check if the card was clicked
  const [selectedBefore, setSelectedBefore] = useState(false);

  
// need to add here something like an object to see which ID was click
// or maybe a state that checks which ids where already clicked
// DONT do based on the card position since I will be shuffling

  //function to change state of card
  function selectCard() {
    
    if (!selectedBefore) {
      setSelectedBefore(true);
      setScore(score + 1);
    }
    if (selectedBefore) {
      alert("sorry try again");
      return;
    }
  }

  function renderCard() {
    return (
      <div className="card" onClick={() => selectCard()}>
        <img className="pokemonImg" src={pokeImgs}></img>
        <p className="pokemonName">{data.results[pokemonId].name}</p>
      </div>
    ); // this is not working, working on it since in console it works
  }
  // useEffect(() => {
  //   renderCard();
  // }, []);
  return renderCard();
}
// return renderCard();

export default App;

// reshuffle
