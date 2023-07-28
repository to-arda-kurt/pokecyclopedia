import { useEffect, useState } from "react";
import './App.css'

interface ISprites {

  "front_default": string;
  "other": {"dream_world": {"front_default":string}}

}

interface PokemonInfo{
  "name": string;
  "height": number,
  "weight": number,
  "baseExperience": number,
  "sprites" : ISprites,
  "base_experience": number,
  "types": {"type": {"name": string}}
}




function App() {
  const pokemonNames = ["charizard", "ditto", "snorlax", "psyduck", "bulbasaur", "onix"]
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo>({})
  const [pokemonTypes, setPokemonTypes] = useState<PokemonInfo>({})
  const [searchText, setSearchText] = useState('')
  const [status, setStatus] = useState('')

  const getPokemonDetails = async (pokeName: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);

    if(response.ok){
      const pokemon = await response.json();
    const types = await pokemon.types
      setStatus('loading...')
      setPokemonInfo(pokemon)
      setPokemonTypes(types)
      setStatus('');
    } else {
      setStatus('Are you sure that pokemon exists? Please try Again')
    }
   

  }

  const searchInputHandler = (e) => {
    setSearchText(e.target.value)

   
  }

  const handleKeyDown = (e) => {

    if(e.key === 'Enter'){

      console.log(searchText)
      getPokemonDetails(searchText)
      setSearchText('')
    }
  }


  useEffect(() => {
    getPokemonDetails(`charizard`)

  },[]);

 
 

  return (
    <>

      <div className="pokeom-search">
        <label htmlFor="pokemonSearch">Search Pokemon</label>
        <input type="text" name="pokemonSearch" id="pokemonSearch" value={searchText} onKeyDown={handleKeyDown} onChange={(e) => searchInputHandler(e)}/>
      </div>

        <span className="status-message" >{status}</span>

      <div className="pokemon-body">

        <div className="pokemon-buttons">
          {
            pokemonNames.map(pokemon => (
              <button onClick={() => getPokemonDetails(pokemon)}>{pokemon}</button>
            ))
          }
        </div>
        
        {Object.keys(pokemonInfo).length !== 0 ?
          <div className="pokemon-card" >
            <img className="pokemon-large-image" src={pokemonInfo.sprites.other.dream_world.front_default} alt="" />
            <img src={pokemonInfo.sprites.front_default} alt="" />
            <div><h3 className="pokemon-name">{pokemonInfo.name}</h3></div>
            <div className="pokemon-card-control">
              <p className="pokemon-card-label">Height: </p>
              <span>{pokemonInfo.height}</span>
            </div>
            <div className="pokemon-card-control">
              <p className="pokemon-card-label">Weight:</p>
              <span>{pokemonInfo.weight}</span>
            </div>
            <div className="pokemon-card-control">
              <p className="pokemon-card-label">Base Experience:</p>
              <span>{pokemonInfo.base_experience}</span>
            </div>
            <div className="pokemon-card-control">
              <p className="pokemon-card-label">Types </p>
                {pokemonTypes.map(types => <span>{types.type.name} </span>)}
            </div>
          </div>
          :
          <div >Choose your pokemon!</div>
        }

      </div>
    </>
  )
}

export default App
