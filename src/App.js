
import {  useState } from 'react';
import useSWR from 'swr';
import './App.css';

const fetcher = async (...args)=>fetch(...args).then(response=>response.json())


function App() {

  const [gameTitle, setGameTitle] = useState("");
  const [searchedGame, setSearchedGame] = useState([])
  const {data, error} = useSWR("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3",fetcher);

  function searchGame(event){
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
    .then(response=>response.json())
    .then(data=>{
      setSearchedGame(data)
    })
    if(error){
      console.log(`Error: ${error}`)
    }

    event.preventDefault();
  }

  

  return (
    <div className="App">
      <form className="searchSection">
        <h1>Search For a Game</h1>
        <input type="text" placeholder='Enter the name...' onChange={(e)=>setGameTitle(e.target.value)}/>
        <button onClick={searchGame}>Search</button>
        <div className="games">
          {searchedGame.map((obj,index)=>{
            return(
              <div key={index} className="game">
                {obj.external}
                <img src={obj.thumb} alt="" />
                ${obj.cheapest}
              </div>
            )
          })}
        </div>
      </form>
      <div className="dealsSection">
        <h1>Latest Deals</h1>
        <div className="games">
          {data && data.map((obj,index)=>{
            return(
              <div key={index} className="game" id='deals'>
                <h3>{obj.title}</h3>
                <p>Normal Price: ${obj.normalPrice}</p>
                <p>Sale Price: ${obj.salePrice}</p>
                <h3>YOU SAVE {obj.savings.substring(0,2)}%</h3>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
