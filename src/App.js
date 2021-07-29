import { useState, useEffect } from 'react'

import "./index.css";


const url = "https://pokeres.bastionbot.org/images/pokemon";

const pokemons = [
  { id: 1, name: "balbasaur" },
  { id: 8, name: "wartotle" },
  { id: 9, name: "blastoise" },
  { id: 6, name: "charizard" }
];

function App() {

  const [flipCard, setFlipCard] = useState([])

  const [matched, setMatched] = useState([])

  const pairOfPokemons = [...pokemons, ...pokemons]

  const handleFlip = (index) => {
    setFlipCard((opened) => [...opened, index])
  }

  useEffect(() => {
    const firstMatch = pairOfPokemons[flipCard[0]];
    const secondMatch = pairOfPokemons[flipCard[1]];

    if (secondMatch && firstMatch.id === secondMatch.id) {
      setMatched([...matched, firstMatch.id])
    }
    if (flipCard.length === 2) {
      setTimeout(() => setFlipCard([]), 1000);
    }

  }, [flipCard])

  return (
    <div className="App">
      <div className="cards">
        {
          pairOfPokemons.map((pokemon, index) => {

            let isFlipped = false;

            if (flipCard.includes(index)) {
              isFlipped = true;
            }

            if (matched.includes(pokemon.id)) {
              isFlipped = true;
            }

            return (
              <div className={`pokemon-card ${isFlipped ? "flipped" : ""} `} key={index}
                onClick={() => handleFlip(index)}>
                <div className="inner">
                  <div className="front">
                    <img src={`${url}/${pokemon.id}.png`} alt="pokemon" width="100" />
                  </div>
                  <div className="back"></div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
