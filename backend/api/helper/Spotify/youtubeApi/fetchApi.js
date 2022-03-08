const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const GAPI_KEY = process.env.GAPI_KEY;

/**
 * Get Youtube Video Id from
 * @param {URLSearchParams} search - ("q=params")
 * @returns {Promise<string>} - youtube video Id
 */
async function getVideoId(search) {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    // query params for http request
    let params = `${search}&type=video&fields=items.id.videoId&key=${GAPI_KEY}`;

    let response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?${params}`,
      requestOptions
    );

    if (response.status != 200) {
      let result = await response.json();
      console.log("Error: ", result.error.message);
      return "";
    }

    let result = await response.json();

    let videoId = result.items[0].id.videoId;

    return videoId;
  } catch (error) {
    console.log("Cant get video: " + search, error);
  }
}

/**
 * 	Get URL SEARCH PARAMS
 * 	@param {Array<string>} params - array of string to use in url search
 * 	@returns {URLSearchParams} - url search params ("q=params")
 */
const getSearchUrl = (params) => {
  let search_query = "";
  params.map((param, index) => {
    if (index !== 0) search_query += " ";
    search_query += param;
  });

  let url_params = new URLSearchParams({ q: search_query });
  return url_params;
};

/**
 * Gets Songs Youtube Video Ids
 * @param {Array<object>} songs
 * @returns {Promise<Array<{title, videoId}>>}
 */
async function getSongsYoutubeVideoIds(songs) {
  // get search params
  const search_params = songs.map((song) => ({
    title: song.name,
    search_param: getSearchUrl([
      song.name,
      song.artists[0].name,
      song.album.name,
    ]),
  }));
  // search videos with youtube api and get video ids
  const videoIds = search_params.map(async (search_param) => ({
    title: search_param.title,
    videoId: await getVideoId(search_param.search_param),
  }));

  return Promise.all(videoIds);
}

module.exports = { getSongsYoutubeVideoIds };
