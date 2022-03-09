const express = require("express");
const archiver = require("archiver");
const zipdir = require("zip-dir");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const fs = require("fs");

const {
  generateRandomString,
  fetchAccessToken,
  fetchProfile,
  fetchPlaylists,
  fetchPlaylistSongs,
} = require("../helper/Spotify/spotifyApi/fetchApi.js");

const { getUrls } = require("../helper/Spotify/Browser_requests/fetchUrls.js");
const convert_playlist = require("../helper/Spotify/YMP3Converter/youtubeToMp3.js");
const {
  getSongsYoutubeVideoIds,
} = require("../helper/Spotify/youtubeApi/fetchApi.js");

const client_id = process.env.SPOT_CLIENT_ID;
const redirect_uri = process.env.SPOT_REDIRECT_URI;

const router = express.Router();

/**
 * 	Logs in to spotify - returns auth0 url which redirect to callback route
 */
router.get("/login-spotify", async (req, res) => {
  try {
    let state = generateRandomString(16);

    // data a la que quiero tener acceso
    let scope =
      "user-read-private user-read-email " +
      "playlist-read-collaborative playlist-read-private " +
      "user-read-playback-state user-modify-playback-state user-read-currently-playing";

    // parametros necesarios de la url (ver api docs)
    let params = new URLSearchParams({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    }).toString();

    let url = "https://accounts.spotify.com/authorize?" + params;

    const toSend = {
      status: "success",
      url,
    };

    return res.json(toSend);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", error });
  }
});

/**
 * 	Afet logging in, callback route is hit to fetch tokens and profile
 */
router.get("/callback", async (req, res) => {
  try {
    // parametros que vienen del redireccionamiento (ver api docs)
    const { state, code, error } = req.query;

    if (!state) return res.status(404).json({ error: "not found" });

    if (error) return res.status(400).json({ status: "error", error });

    // fetch for access token
    let tokens = await fetchAccessToken(code);

    if (tokens) {
      // retrieve users username
      let profile = await fetchProfile(tokens.access_token);

      const username = profile?.name;

      // save data to file (no database)
      const data = { tokens, profile };

      saveUserData(username, data);

      if (username) {
        // redirect to web app
        let link = "http://localhost:3000/spotify/";

        if (process.env.NODE_ENV === "production")
          link = process.env.BASE_URL + "/spotify/";

        return res.redirect(link + username);
      }
    }
  } catch (error) {
    console.log("ERROR CALLBACK");
    console.log(error);
  }
  console.log("algo salio mal aca");

  let link = "http://localhost:3000/spotify/";
  if (process.env.NODE_ENV === "production")
    link = process.env.BASE_URL + "/spotify";

  return res.redirect(link);
});

/**
 * 	For getting users playlists
 */

router.get("/getPlaylists", async (req, res) => {
  try {
    const { username } = req.query;

    let data = getUserData(username);

    if (!data) return res.status(400).json({ status: "error" });

    let access_token = data.tokens.access_token;

    const playlists = await fetchPlaylists(access_token);

    if (playlists) {
      data.playlists = playlists;
      fs.writeFileSync(`data/${username}.txt`, JSON.stringify(data), (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      return res.json({ status: "success", data: playlists });
    }
  } catch (error) {
    console.log("ERROR GETTING PLAYLISTS");
    console.log(error);
  }
  return res.json({ status: "error", error: "request failed" });
});

/**
 * 	For getting users playlist's songs
 */

router.get("/getPlaylistSongs", async (req, res) => {
  try {
    const { username, playlist_id } = req.query;

    // Get saved data
    let data = getUserData(username);

    if (!data) return res.status(400).json({ status: "error" });

    let access_token = data.tokens.access_token;

    const songs = await fetchPlaylistSongs(access_token, playlist_id);

    if (songs) {
      try {
        data.playlists[playlist_id].songs = songs;

        fs.writeFileSync(`data/${username}.txt`, JSON.stringify(data));

        let songs_obj = {};
        songs.map((song) => {
          songs_obj[song.name] = song;
        });
        return res.json({ status: "success", data: songs_obj });
      } catch (error) {
        console.log("ERRROR", error);
      }
    }
  } catch (error) {
    console.log("ERROR GETTING SONGS");
    console.log(error);
  }
  return res.status(400).json({ status: "error", error: "request failed" });
});

router.get("/downloadSongs", async (req, res) => {
  try {
    const { username, playlist_id } = req.query;

    let data = getUserData(username);

    if (!data) return res.status(400).json({ status: "error" });

    // get playlist songs
    let songs = [];
    let playlist_name = "playlist" + generateRandomString(8);

    try {
      // see if songs are already saved
      playlist_name = data.playlists[playlist_id].name;
      songs = data.playlists[playlist_id].songs;
      if (!songs) throw "fetching songs";
    } catch (error) {
      // fetch songs with spotify api
      console.log(error);
      let access_token = data.tokens.access_token;

      songs = await fetchPlaylistSongs(access_token, playlist_id);

      if (!songs) return res.status(400).json({ status: "error" }); // failed to fetch songs, probably token expired
    }

    // get video ids using youtube api (to many request fail) )
    // const videoIds = await getSongsYoutubeVideoIds(songs);

    // get video urls with puppeteer Array<{title, videoId}>
    const videoIds = await getUrls(songs);

    if (!videoIds || videoIds.length === 0) throw "failed to get any videoIds";

    // await download
    let { paths, save_path } = await convert_playlist(videoIds, playlist_name);

    if (paths.length === 0) throw "failed to download any songs";
    // send files
    console.log("comprimiendo");

    // Use an `each` option to call a function everytime a file is added, and receives the path
    // let buffer = await zipdir(save_path, {
    //   each: (path) => console.log(path, " added!"),
    //   function(err, buffer) {
    //     console.log(err);
    //   },
    // });

    // res.send(buffer);

    let zipped_path = path.resolve([save_path, "../zipped.zip"]);

    await zipDirectory(save_path, zipped_path);

    res.sendFile(zipped_path);

    console.log("enviado");

    setTimeout(() => {
      // delete downloaded files after sending them
      console.log("eliminando archivos");
      fs.rmSync(save_path, { recursive: true, force: true });
      fs.rmSync(zipped_path, { force: true });
    }, 2000);
    return;
  } catch (error) {
    console.log("Error: ", error);
    return res.status(505).json({ status: "error" });
  }
});

module.exports = router;

/**
 * FUNCTIONS __________________________________
 */

/**
 * Gets Saved Users Data
 * @param {string} username
 * @returns {object}
 */
function getUserData(username) {
  try {
    let data = fs.readFileSync(`data/${username}.txt`, "utf8");
    data = JSON.parse(data);
    return data;
  } catch (err) {
    return null;
  }
}

function saveUserData(username, data) {
  fs.writeFileSync(`data/${username}.txt`, JSON.stringify(data), (err) => {
    if (err) {
      console.error("Error saving data: ", err);
      return;
    }
  });
}

/**
 * Create a zip file
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
function zipDirectory(sourceDir, outPath) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve());
    archive.finalize();
  });
}
