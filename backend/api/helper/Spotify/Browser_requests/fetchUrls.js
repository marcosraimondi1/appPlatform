const puppeteer = require("puppeteer");

const MAX_DURATION_MINS = 7; // only downloaad videos with duration <= 6 minutes
/**
 * Get video ids of songs
 * @param {Array<object>} songs
 * @returns {Promise<Array<{title, videoId}>>}
 */
const getUrls = async (songs) => {
  console.log("Fetching Urls");

  // launch puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ],
  });

  // divide songs in smaller arrays for better performance
  const arrays = divide_in_smaller_arrays(songs, 15);

  // each smaller array will have a separate browser page
  let promise_array = arrays.map((array) => scrap(array, browser));

  // wait for all songs to finish downloading
  const results = await Promise.all(promise_array);

  // close browser to free resources
  try {
    await browser.close();
  } catch (error) {}

  // concatenate all results
  let result = [];
  for (res of results) result = result.concat(res);

  console.log("Finished Fetching");

  return result;
};

/**
 * Gets VideoIds for specific array of songs
 * @param {Array<object>} songs - songs to fetch url
 * @param {puppeteer.Browser} browser - started browser
 * @returns {Promise<Array<{title, videoId}>>}
 */
async function scrap(songs, browser) {
  const page = await browser.newPage();

  // get youtube search urls for every song
  const youtube_urls = songs.map((song) => {
    if (!song) return { title: "", url: "" };
    return {
      title: song.name,
      url: getSearchUrl([song.name, song.artists[0].name, song.album.name]),
    };
  });

  // scrap from every url, the link to the song video and save its videId
  let results = [];
  for (let url of youtube_urls) {
    let videoId = getVideoIdFromUrl(await getUrl(page, url.url));
    if (videoId) results.push({ title: url.title, videoId });
  }

  // close page to free resources
  try {
    await page.close();
  } catch (error) {}

  return results;
}

/**
 * 	Get Youtube Search Url
 * 	@param {Array<string>} params  - params to search
 * 	@returns {string} - youtube url
 */
const getSearchUrl = (params) => {
  let search_query = "";

  // concat all params into one string
  params.map((param, index) => {
    if (index != 0) search_query += " ";
    search_query += param;
  });

  // format url params
  let new_params = new URLSearchParams({ search_query });
  return `https://www.youtube.com/results?${new_params}`;
};

/**
 * Get Youtube Video Url
 * @param {puppeteer.Page} page - Puppeteer Browser's Page Instance
 * @param {string} url - url to page.goto
 * @returns {Promise<string>} - returns url of video
 */
const getUrl = async (page, url) => {
  try {
    // go to youtube url and wait until the content is loaded
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("a#video-title");
    await page.waitForSelector("span#text");
    let duration = 0;
    // get video url from the dom
    let requested_url = await page.evaluate(
      async (MAX_DURATION_MINS, duration) => {
        try {
          // first check video duration
          duration = parseInt(
            document.querySelector("span#text").innerHTML.split(":")[0]
          );

          if (duration > MAX_DURATION_MINS)
            throw "video to long";

          // get video url
          let el = document.querySelector("a#video-title");

          return Promise.resolve(el.href);
        } catch (error) {
          return Promise.resolve("");
        }
      },
      MAX_DURATION_MINS,
      duration
    );
    console.log("Duration: ", duration);
    return requested_url;
  } catch (error) {
    console.log("error: ", error);
    return "";
  }
};

/**
 * Gets Youtube Video Id from Youtube Video Url
 * @param {string} url - youtube video url
 * @returns {string | null} - videoId
 */
const getVideoIdFromUrl = (url) => {
  try {
    console.log(url);
    let videoUrl = new URL(url);
    let videoId = videoUrl.searchParams.get("v");
    return videoId;
  } catch (error) {
    return null;
  }
};

/**
 * Divides array in smaller arrays
 * @param {Array<>} array - array to divide
 * @param {number} N - elements in each array
 * @returns {Array<Array<>>}
 */
function divide_in_smaller_arrays(array, N = 5) {
  return new Array(Math.ceil(array.length / N))
    .fill()
    .map((_) => array.splice(0, N));
}

module.exports = { getUrls };
