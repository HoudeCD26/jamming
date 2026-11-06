
let tokenRequest = null;
const CLIENT_ID = '1f5417e03c5643158672442080f64e36';
const REDIRECT_URI = 'http://[::1]:5173/callback';

const generateRandomString = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));

  return Array.from(values, x => chars[x % chars.length]).join('');
};

async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export async function loginWithSpotify() {
  const verifier = generateRandomString(64);
  const challenge = await generateCodeChallenge(verifier);
  const state = generateRandomString(16);

  sessionStorage.setItem('code_verifier', verifier);
  sessionStorage.setItem('spotify_state', state);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: 'user-read-private user-read-email',
    state,
    code_challenge_method: 'S256',
    code_challenge: challenge,
  });

  window.location.href =
    `https://accounts.spotify.com/authorize?${params.toString()}`;
}
async function exchangeSpotifyToken() {
  const params = new URLSearchParams(window.location.search);

  const code = params.get('code');
  const state = params.get('state');

  const savedState = sessionStorage.getItem('spotify_state');
  const verifier = sessionStorage.getItem('code_verifier');

  if (!code || state !== savedState || !verifier) {
    throw new Error('Invalid Spotify callback');
  }

  const response = await fetch(
    'https://accounts.spotify.com/api/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: verifier,
      }),
    }
  );
const data = await response.json();

console.log('Spotify response:', {
  success: response.ok,
  hasAccessToken: !!data.access_token,
  hasRefreshToken: !!data.refresh_token,
  error: data.error,
});

if (!response.ok) {
  throw new Error(data.error_description || data.error);
}

if (!data.access_token) {
  throw new Error('Spotify did not return an access token');
}

sessionStorage.setItem('access_token', data.access_token);

console.log(
  'Saved successfully:',
  !!sessionStorage.getItem('access_token')
);

if (data.refresh_token) {
  sessionStorage.setItem('refresh_token', data.refresh_token);
}

sessionStorage.removeItem('code_verifier');
sessionStorage.removeItem('spotify_state');

return data;
}

export function getSpotifyToken() {
  if (!tokenRequest) {
    tokenRequest = exchangeSpotifyToken();
  }
  
  return tokenRequest;
}