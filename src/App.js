import './App.css';
import { useEffect,useState } from 'react';
import twitterLogo from './assets/twitter.png'
function App() {
  const [quoteInfo, setQuoteInfo] = useState({});
  const [isLoading, setIsloading] = useState(false)
  const [appColor, setAppColor] = useState('skyblue')

  useEffect(()=>{
    getQuote();
    setIsloading(true)
  },[])

  const getQuote = ()=>{
    fetch("https://api.quotable.io/random")
    .then((response) => {
      return response.json();
    })
    .then((data) =>{
      setQuoteInfo({
        text:data.content,
        author:data.author,
      })
      setIsloading(false)
      const randomColor = Math.floor(Math.random()*16777215).toString(16);
      setAppColor(`#${randomColor}`)
    });
  };
  

  return (
    <div className="App" style={{background: appColor, margin: 0, padding: 0, height: '100vh'}}>
      <div className='quote-wrpper' style={{background: appColor}}>
        <div id="quote-box" style={{width:'500px',margin:'0 auto'}}>
          {
            !isLoading ? (
              <>
                <p id="text" style={{color: appColor}}>{`“${quoteInfo.text}`}</p>
                <p id="author" style={{color: appColor}}>{`:- ${quoteInfo.author}`}</p>
              </>
            ) :
            <div className='loader-wrapper'>
              <div className='loading'>
              </div>
            </div>
          }
          <div className='action-buttons'>
            <button 
              style={{background: appColor}}
              id="new-quote" 
              onClick={() => {
                getQuote()
                setIsloading(true)
              }}
            >New Quote</button>
            <a href={'https://twitter.com/intent/tweet'+quoteInfo.text} id="tweet-quote">
              <img src={twitterLogo} alt='twitter' className='twitter-icon' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
