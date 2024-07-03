import { useEffect, useState } from "react";
import song1 from "./assets/Pokemon_Stadium.mp3";
import song2 from "./assets/battle_theme.mp3";
import playAudio from "../playAudio";
import githubLogo from "./assets/github-logo.png";

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
  const [difficulty, setDifficulty] = useState(); //6 is easy, 9 intermediate, 12 is hard
  const [transition, setTransition] = useState();
  const [audio, setAudio] = useState(null);

  function handleSetDifficulty(level) {
    const audioInstance = playAudio(song2, 0.1, 2);
    setAudio(audioInstance);
    setTransition(true);
    setTimeout(() => {
      setDifficulty(level);
      setTransition(false);
    }, 2000);
  }

  // function stopAudio() {
  //   if (audio) {
  //     audio.pause(); // Pause the audio
  //     audio.currentTime = 0; // Reset the audio to the beginning
  //   }
  // }

  return (
    <>
      {/* <button onClick={stopAudio()}>Stop Music</button> */}
      {transition ? (
        <div className="transition-screen"></div>
      ) : difficulty ? (
        <>
          <Game difficulty={difficulty} setDifficulty={setDifficulty} />
          <Footer />
        </>
      ) : (
        <>
          <Menu difficulty={difficulty} setDifficulty={handleSetDifficulty} />
          <Footer />
        </>
      )}
    </>
  );
}

function Menu({ difficulty, setDifficulty }) {
  const [currentSong, setCurrentSong] = useState("");
  let firstTime = true;

  return (
    <>
      <p>
        Instructions: You have to select cards (click) without repeating the
        selection. You win if you can select all without repeating{" "}
      </p>
      <h3>Select Difficulty</h3>
      <div>
        <button onClick={() => setDifficulty(3)}>Easy (3)</button>
        <button onClick={() => setDifficulty(6)}>Medium (6)</button>
        <button onClick={() => setDifficulty(9)}>Hard (9)</button>
        <button class="pokemonMaster" onClick={() => setDifficulty(150)}>
          Pokemon Master (150)
        </button>
      </div>
    </>
  );
}

function Game({ difficulty, setDifficulty }) {
  // fetch the data

  const [data, setData] = useState(null);
  const [pokeImgs, setPokeImgs] = useState([]);
  const [score, setScore] = useState(0);
  const [randomPokemonIdArr, setRandomPokemonIdArr] = useState([]);
  const [alreadyFlipped, setAlreadyFlipped] = useState([]);
  const [isFlipped, setIsFlipped] = useState([]);
  const [restart, setRestart] = useState(0);

  // function pokeUrl(name) {
  //   `https://pokeapi.co/api/v2/pokemon/${name}`;
  // }

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

    //working on this one
    const imagesPromise = result.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const pokeData = await res.json();
      return pokeData.sprites.front_default;
    });

    const images = await Promise.all(imagesPromise);
    setPokeImgs(images);
  }
  function shuffleArray(array) {
    for (let i = 0; i < array.length; i++) {
      const randomIndex = Math.floor(Math.random() * array.length);
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    console.log(array);
    return array;
  }

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   function startGame() {
  //     setScore(0);
  //     setRandomPokemonIdArr([]);
  //     setIsFlipped([]);
  //     setRandomPokemonIdArr(getRandomPokemonId(difficulty));
  //     console.log(`difficulty changed`);
  //   }
  //   startGame();
  // }, [difficulty]);

  useEffect(() => {
    function startGame() {
      setScore(0);
      setRandomPokemonIdArr([]);
      setIsFlipped([]);

      if (difficulty > 149) {
        setRandomPokemonIdArr(getAllPokemonId());
      } else {
        setRandomPokemonIdArr(getRandomPokemonId(difficulty));
      }

      console.log(`difficulty changed to ${difficulty}`);
    }
    startGame();
  }, [difficulty, restart]);

  useEffect(() => {
    if (score === difficulty) {
      // setTimeout(console.log("you win!"), 1000);
      alert("You Win!");
      setRestart(restart + 1);
    }
  });

  /////////////////////////////
  // get random numbers
  // gives a random number between 1 to 150 which would be the pokemon ID
  let ids = [];

  function randomNumber() {
    console.log("i am trying");
    return Math.floor(Math.random() * 150);
  }

  function getRandomPokemonId(num) {
    ids = [];
    for (let i = 0; i < num; i++) {
      let ranNum = randomNumber();
      if (ids.includes(ranNum)) {
        ranNum = randomNumber();
      }
      ids.push(ranNum);
    }
    // console.log(randomPokemonIdArr);
    return ids;
  }

  function getAllPokemonId() {
    ids = [];

    for (let i = 0; i < 150; i++) {
      ids.push(i);
    }
    return ids;
  }

  useEffect(() => {
    setRandomPokemonIdArr(getRandomPokemonId(difficulty));
  }, [difficulty]);

  // function restart() {
  //   setDifficulty(difficulty);
  // }

  useEffect(() => {
    setRandomPokemonIdArr((prevIds) => shuffleArray([...prevIds]));
  }, [score]);

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
              isFlipped={isFlipped}
              setIsFlipped={setIsFlipped}
              setDifficulty={setDifficulty}
              difficulty={difficulty}
              restart={restart}
              setRestart={setRestart}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
function Footer() {
  return (
    <div className="footer">
      <hr></hr>
      <div className="footerInfo">
        <a href="https://aj-gagliardo.github.io/">
          Portfolio: Antonio Gagliardo (ajgagliardo)
          <img src={githubLogo} className="githubImg" />
        </a>
      </div>
    </div>
  );
}

// the card component,
function Card({
  data,
  pokemonId,
  pokeImgs,
  setScore,
  score,
  isFlipped,
  setIsFlipped,
  setDifficulty,
  difficulty,
  setRestart,
  restart,
}) {
  // to check if the card was clicked
  const [selectedBefore, setSelectedBefore] = useState(false);

  // need to add here something like an object to see which ID was click
  // or maybe a state that checks which ids where already clicked
  // DONT do based on the card position since I will be shuffling

  //function to change state of card

  // function checkIfSelected(array, id) {
  //   return array.includes(id);
  // }

  function selectCard() {
    // if (!selectedBefore) {
    //   setSelectedBefore(true);
    //   setScore(score + 1);
    // }
    // if (selectedBefore) {
    //   alert("sorry try again");
    //   return;
    // }
    // if(isFlipped.)

    if (isFlipped.includes(pokemonId)) {
      alert("Game over, this card was already selected");

      setRestart(restart + 1);
    } else {
      setScore(score + 1);
      setIsFlipped([...isFlipped, pokemonId]);
      // isFlipped = [...isFlipped, pokemonId];
      console.log([...isFlipped, pokemonId]);
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
