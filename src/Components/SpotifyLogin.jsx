
import React from 'react';
import { loginWithSpotify } from '../authorization/spotify';

export default function SpotifyLogin() {
  return (
    <button onClick={loginWithSpotify}>
      Login with Spotify
    </button>
  );
}
