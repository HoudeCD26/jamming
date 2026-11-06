import { useState,useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Tracklist from './Components/Tracklist'
import Playlist from './Components/Playlist'

import SpotifyLogin from './Components/SpotifyLogin';
import { getSpotifyToken } from './authorization/spotify';


function App() {
  



  const trackList = [
    {
      song:"Tenessee Whiskey",
      author: "chris stappleton",
      album: "Traveller",
      id:1,
      uri:"uri1"
    },
    {
      song:"Livin'The Dream",
      author: "Morgan Wallen",
      album: "Dangerous",
      id:2,
      uri:"uri2"
    },
    {
      song:"Kick Myself",
      author: "Morgan Wallen",
      album: "Im the problem" ,
      id:3,
      uri:"uri3"
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


/*
*
*
* 
*/
//uri state variable to hold the array of uri track to submit to spotify

   const [uriPlaylist,setUriPlaylist] = useState([]);

   function handleUriPlaylist(){

    setUriPlaylist(()=>(
      playlist.map(track=>(track.uri))
    ))
   }

  const [profile, setProfile] = useState(null);

   useEffect(() => {
    console.log('🔥 React useEffect executed');
    console.log('Current path:', window.location.pathname);

    async function authenticate() {
      try {
        console.log('🔥 Starting Spotify authentication');

        const tokenData = await getSpotifyToken();

        console.log('🔥 Token received:', !!tokenData.access_token);

        const response = await fetch(
          'https://api.spotify.com/v1/me',
          {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
            },
          }
        );

        const user = await response.json();

        setProfile(user);
      } catch (error) {
        console.error('Spotify authentication failed:', error);
      }
    }

    if (window.location.pathname === '/callback') {
      authenticate();
    }
  }, []);

  


  return (
    <>
      <section id="center">
            <div>
      <h1>My Spotify App</h1>

      {!profile ? (
        <SpotifyLogin />
      ) : (
        <div>
          <h2>Welcome {profile.display_name}!</h2>
          <p>Email: {profile.email}</p>
          <p>Spotify ID: {profile.id}</p>
          {profile.images?.[0] && (
            <img
              src={profile.images[0].url}
              alt="Spotify profile"
              width="120"
            />
          )}
        </div>
      )}
    </div>
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
          <button onClick={handleUriPlaylist}>add</button>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )

}


export default App
