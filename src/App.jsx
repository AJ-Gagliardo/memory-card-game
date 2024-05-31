import { useState } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState(null);

  async function fetchData() {
    console.log("loading...");
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const result = await response.json();
    console.log(result);
  }

  fetchData();

  return <></>;
}

export default App;
