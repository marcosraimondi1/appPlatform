const youtubeMp3Converter = require("youtube-mp3-converter");
const fs = require("fs");
const path = require("path");

const savePath = path.resolve(__dirname, "./../../../../playlists"); // for linux

// const savePath = "C:\\Users\\marco\\Songs"; // for windows

/**
 * Downloads Many Youtube Audios
 * @param {Array<{title, videoId}>} songs
 * @param {string} playlist_name - name of directory
 * @returns {Promise<{ paths: Array<{ name: string, path: string }>, save_path: string}>} - returns array with path to files and the directory where playlist was saved
 */
async function convert_playlist(songs, playlist_name) {
  const TOTAL = songs.length;

  // directory cant contain illegal characters
  let save_path = `${savePath}\\${playlist_name.replace(/\W/g, " ")}`;

  try {
    // create directory if it doesnt exist
    fs.mkdirSync(save_path);
  } catch (error) {}

  // creates Download function
  const YD = await youtubeMp3Converter(save_path);

  const arrays = divide_in_smaller_arrays(songs, 3);

  let paths = [];

  for (let array of arrays) {
    // cada array descarga sus canciones asincronamente y espera que se terminen de descargar las canciones del array anterior
    let new_paths = array.map((song) => {
      let data = youtube_to_mp3(YD, song.videoId, song.title).catch((error) => {
        console.log(error);
      });
      return data;
    });
    // esperar que se descarguen
    new_paths = await Promise.all(new_paths);
    paths = paths.concat(new_paths.filter((new_path) => new_path.path)); // guardamos los elementos que se guardaron efectivamente
    console.log(`Progress: ${paths.length} / ${TOTAL}`);
  }

  return { paths, save_path };
}

/**
 * Converts one youtube video to mp3
 * @param {object} YD - youtubeMp3Converter instance
 * @param {string} videoId
 * @param {string} title
 * @returns {Promise<{path:string | null, name:string}>}
 */
async function youtube_to_mp3(YD, videoId, title) {
  console.log("Downloading: ", title);
  let name = title.replace(/\W/g, " ");
  // Downloads mp3 and Returns path were it was saved.
  const song_path = await YD(`https://www.youtube.com/watch?v=${videoId}`, {
    title: name,
  }).catch((error) => {
    console.log(error);
    return null;
  });

  console.log("Finished Downloading: ", title);
  return { name: title + ".mp3", path: song_path };
}

/**
 * Divides array in smaller arrays
 * @param {Array<>} array - array to divide
 * @param {number} N - number of elements per array
 * @returns {Array<Array<>>}
 */
function divide_in_smaller_arrays(array, N) {
  return new Array(Math.ceil(array.length / N))
    .fill()
    .map((_) => array.splice(0, N));
}

module.exports = convert_playlist;
