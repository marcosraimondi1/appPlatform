const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
const { instagram_login } = require("./instagram_login");
const { instagram_scrap_follows } = require("./instagram_scrap_follows");
const { process_data } = require("./process_data");

dotenv.config();

/**
 * ---------- FUNCTIONS -----------
 */

/**
 * 	Scrap Followers and Followings
 * 	@param {string} username - instagram username to scrap
 * 	@returns {Promise<{status: "error/success", data?: {process_data}, error?}>}
 */
const scrapFollows = async (username) => {
  console.log("Username " + username);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--disable-gpu", "--disable-dev-shm-usage", "--disable-setuid-sandbox", "--no-sandbox"]
  });

  const page = await browser.newPage();

  let res = await instagram_login(page);

  if (res.status == "error") return res;

  res = await instagram_scrap_profile(page, username);

  if (res.status === "error") return res;

  return { status: "success", data: process_data(res.data) };
};

/**
 * 	Scraps users profile
 * 	@param page {puppeteer.Page} - browsers page instance
 * 	@param username {string} - user to scrap profile
 * 	@returns {Promise<{status: "error/success", error?, data?: {followers,following}}>}
 */
const instagram_scrap_profile = async (page, username) => {
  console.log("Scraping for: ", username);

  try {
    const followers = await getFollows(page, username, "followers");

    const following = await getFollows(page, username, "following");

    if (followers.length === 0 || following.length === 0)
      return { status: "error", error: "empty arrays" };

    return { status: "success", data: { followers, following } };
  } catch (error) {
    console.log(error);
    return { status: "error", error };
  }
};

const getFollows = async (page, username, target) => {
  await navigate(page, `https://www.instagram.com/${username}/`);
  return await instagram_scrap_follows(page, target);
};

const navigate = async (page, url) => {
  await page.goto(url, {
    waitUntil: "domcontentloaded"
  });
  await page.waitForTimeout(1000);
};

module.exports = { scrapFollows };
