const fetch = require("node-fetch");

require("dotenv").config();

const client_id = process.env.SPOT_CLIENT_ID;
const client_secret = process.env.SPOT_CLIENT_SECRET;
const redirect_uri = process.env.SPOT_REDIRECT_URI;

const MAX_DURATION_MS = 10 * 60 * 1000; // 10 minutes

/**
 * 	Generates Random String
 * 	@param {number} length  - String length
 * 	@returns {string} - random string
 */
function generateRandomString(length) {
  try {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  } catch (error) {
    console.log(error);
  }
  return "";
}

/**
 * 	Fetch Users Profile
 * 	@param {string} access_token - spotify access token
 * 	@returns {Promise<object>} - users profile
 */
async function fetchProfile(access_token) {
  let profile = await fetch("https://api.spotify.com/v1/me/?fields=display_name, email, id", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
  try {
    if (profile.status === 200) {
      profile = await profile.json();
      const data = {
        name: profile.display_name,
        email: profile.email,
        id: profile.id
      };
      return data;
    }
    console.log("STATUS: ", profile.status);
    return null;
  } catch (error) {
    console.log("----------------------------------------");
    console.log(error);
    return null;
  }
}

/**
 * 	Returns Tokens
 * 	@param {string} code  - code returned by login in auth0
 * 	@returns {Promise<object>} - description
 */
async function fetchAccessToken(code) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirect_uri
  });

  let response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
    },
    body: body
  });

  if (response.status === 200) {
    response = await response.json();

    const { access_token, refresh_token, expires_in } = response;

    return { access_token, refresh_token, expires_in };
  }

  response = await response.json();

  console.log(response);
  return null;
}

/**
 * 	Fetch Users Playlists
 * 	@param {string} access_token - spotify access token
 * 	@returns {Promise<Array<object>>} - array of playlists
 */
async function fetchPlaylists(access_token) {
  let playlists = await fetch("https://api.spotify.com/v1/me/playlists", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

  if (playlists.status === 200) playlists = await playlists.json();
  else {
    console.log(playlists);
    return null;
  }

  const data = {};

  playlists.items.map((item) => {
    // return only some data
    let new_item = {
      name: item.name,
      description: item.description,
      id: item.id
    };

    data[item.id] = new_item;
  });
  return data;
}

/**
 * 	Fetch All Songs from Playlists
 * 	@param {string} access_token  - spotify access token
 * 	@param {string} playlist_id  - playlist id to fetch songs
 * 	@returns {Promise<object|null>} - Object containing songs from playlists
 */
async function fetchPlaylistSongs(access_token, playlist_id) {
  // fetch headers

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + access_token
  };

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };

  // query, atributos que queremos buscar
  const fields =
    "fields=tracks.items(track(name, duration_ms, id, artists(name), album(name, release_date)))";

  const url = `https://api.spotify.com/v1/playlists/${playlist_id}/?${fields}`;

  try {
    let response = await fetch(url, requestOptions);
    let result = await response.json();
    let data = result.tracks.items;

    data = data
      .map((item) => {
        if (item.track.duration_ms > MAX_DURATION_MS) return null;
        let { name, id, album, artists } = item.track;
        return { name, id, album, artists };
      })
      .filter((item) => item);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  generateRandomString,
  fetchProfile,
  fetchAccessToken,
  fetchPlaylists,
  fetchPlaylistSongs
};
