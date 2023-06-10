import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Coin from './Components/Coin';
function App() {
  // // step 1 create useEffect
  // const MyComponent = () => {
  //   const [data, setData] = useState([]);
  
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get('https://api.example.com/data');
  //         setData(response.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  const [coins, setCoins] = useState([]);
  const [search,setSearch] = useState('');
;
  useEffect( ()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
    .then(res=>{
        setCoins(res.data);
        // console.log(res.data);
    })
    .catch(error=>console.log(error));
  }, [] );
  // or use async await


    const handleChange = e =>{
      setSearch(e.target.value);
    }
    const filteredCoins = coins.filter(coin=>coin.name.toLowerCase().includes(search.toLowerCase()));
    // coin is defined here

    const [theme, setTheme] = useState('dark');
    const toggleTheme = () => {
      if (theme === 'light') {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    };
    useEffect(() => {
      document.body.className = theme;
    }, [theme]);

  return (
    // <div className={theme}>
      <div className={`coin-app ${theme}`}>
        <div className="outl">
        <div className="form-check form-switch ">
      <label className="form-check-labe don" htmlFor="flexSwitchCheckDefault">
  {/* < i class="fa-regular fa-lightbulb" /> */}
  dark
  </label>
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={toggleTheme}/>
  {/* onchange kr skte ho */}
  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
  {/* < i class="fa-regular fa-lightbulb" /> */}
  light
  </label>
 
  
</div>
        </div>
      
      <div className="coin-search">
        <h1 className="coin-text">
          Search a CyptoCurrency 
        </h1>
        <form > 
          <input type="text" name="" placeholder='SEARCH crypto like "bitcoin" ' id="" className='coin-input' onChange={handleChange} />
        </form>
      </div>
      {filteredCoins.map(coin=>{
        return (
          <Coin 
            key = {coin.id}
            name = {coin.name}
            image = {coin.image}
            symbol={coin.symbol}
            price={coin.current_price}
            volume={coin.total_volume}
            priceChange = {coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
            />)
      })}
    </div>
    // </div>
    
  );
}

export default App;
