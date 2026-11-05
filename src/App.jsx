import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Tracklist from './Components/Tracklist'
import Playlist from './Components/Playlist'

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

/*
*
*
* 
*/
// playlist state variable to hold the array of track selected byt the user 

  const [playlist,setPlaylist] = useState([]);
  
  function getTrackById(id) {
    return trackList.find(track => track.id === id);
};

function handleAddToPlaylist(id){

  const track = getTrackById(id);

 if (!track) return;

      setPlaylist(prev => {
        if (prev.some(item => item.id === id)) {
            return prev;
        }

        return [...prev, track];
    });
};


function handleRemoveFromPlaylist(id){
 setPlaylist(prev => (
        prev.filter(track => track.id !== id)
    ));
};


/*
*
*
* 
*/
// title state variable to hold the custom title enter by the user 

   const [customTitle,setCustomTitle] = useState('');

   function handleChangeTitle(e){
    const {value} = e.target;
    setCustomTitle(value);
   }

   


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
          <Tracklist trackList={trackList}  handleClickButton={handleAddToPlaylist} add={true} />
        </div>
        <div id="social">
          <input value={customTitle} onChange={handleChangeTitle} placeholder='Enter your playlist Title'/>
          <Tracklist trackList={playlist} handleClickButton={handleRemoveFromPlaylist} add={false} />
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
