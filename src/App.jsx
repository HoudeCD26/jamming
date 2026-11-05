import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Tracklist from './Components/Tracklist'

function App() {
  const trackList = [
    {
      song:"Tenessee Whiskey",
      author: "chris stappleton",
      album: "Traveller",
      id:1
    },
    {
      song:"Livin'The Dream",
      author: "Morgan Wallen",
      album: "Dangerous",
      id:2
    },
    {
      song:"Kick Myself",
      author: "Morgan Wallen",
      album: "Im the problem" ,
      id:3
    }
  ]

  const [playlist,setPlaylist] = useState([]);
  
  function getTrackById(id) {
    return trackList.find(track => track.id === id);
};

function handleAddToPlaylist(id){

  const track = getTrackById(id);

 if (!track) return;

  setPlaylist(prev => [...prev, track]);
};



  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Jammming</h1>
        <input placeholder='Enter Song to search for'/>
        </div>
        <button
          type="button"
          className="counter"
        
        >
        SEARCH
        </button>
      </section>

   

      <section id="next-steps">
        <div id="docs">
          <Tracklist trackList={trackList} handleAddToPlaylist={handleAddToPlaylist} />
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
