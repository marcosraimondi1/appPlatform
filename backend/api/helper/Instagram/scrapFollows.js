const puppeteer = require("puppeteer");
const dotenv = require("dotenv");

dotenv.config();

const ADMIN_USER = process.env.INSTA_USERNAME;
const ADMIN_PASS = process.env.INSTA_PASSWORD;

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
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ],
  });

  const page = await browser.newPage();
  const page2 = await browser.newPage();

  let res = await instagram_login(page);

  if (res.status == "error") return res;

  res = await instagram_scrap_profile(page, username);

  if (res.status === "error") return res;

  return { status: "success", data: process_data(res.data) };
};
/**
 * 	Logins to Instagram with admin account
 * 	@param page {puppeteer.Page} - browsers page instance
 * 	@returns {Promise<{status: "error/success", error?}>} - {}
 */
const instagram_login = async (page) => {
  console.log("LOGGING IN");

  try {
    await page.goto("https://www.instagram.com/accounts/login/", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForSelector("[name=username]");
    // Completar formulario
    await page.type("[name=username]", ADMIN_USER);

    await page.waitForSelector("[name=password]");

    await page.type("[name=password]", ADMIN_PASS);

    // Send form
    await page.waitForSelector("[type=submit]");
    await page.click("[type=submit]");

    await page.waitForTimeout(1000);

    // Check for error messages
    const error_message = await page.evaluate(() => {
      try {
        return document.querySelector("#slfErrorAlert").innerHTML;
      } catch (error) {
        return null;
      }
    });

    if (error_message) {
      return { status: "error", error: error_message };
    }

    console.log("LOGGED");

    await page.waitForTimeout(1500);

    return { status: "success" };
  } catch (error) {
    console.log("error logging in ----------------------");
    console.log(error);
    return { status: "error", error };
  }
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
    await page.goto(`https://www.instagram.com/${username}/`, {
      waitUntil: "domcontentloaded",
    });

    const followers = await instagram_scrap_follows(page, "followers");

    await page.goto(`https://www.instagram.com/${username}/`, {
      waitUntil: "domcontentloaded",
    });

    const following = await instagram_scrap_follows(page, "following");

    if (followers.length === 0 || following.length === 0)
      return { status: "error", error: "empty arrays" };

    return { status: "success", data: { followers, following } };
  } catch (error) {
    console.log(error);
    return { status: "error", error };
  }
};
/**
 * 	Scraps users follows
 * 	@param page {puppeteer.Page} - browsers page instance
 * 	@param target {string} - scrap followers or following
 * 	@returns {Promise<Array<object>>}
 */
const instagram_scrap_follows = async (page, target) => {
  page.waitForTimeout(1500);
  let followers = [];
  page.screenshot({ path: `screens/${target}1.png` });

  let link_number = 2;

  if (target == "following") link_number = 3;

  try {
    // obtener cantidad de follows del link para abrir el popup
    let cantidad_selector = `#react-root > section > main > div > header > section > ul > li:nth-child(${link_number}) > a > div > span`;

    try {
      await page.waitForSelector(cantidad_selector);
    } catch (error) {}

    await page.waitForTimeout(1000);

    page.screenshot({ path: `screens/${target}2.png` });

    let elemento = await page.$(cantidad_selector);

    const cantidad = await page.evaluate((e) => {
      // Open Popup
      return parseInt(e.innerHTML);
    }, elemento);

    const link_selector = `#react-root > section > main > div > header > section > ul > li:nth-child(${link_number}) > a`;

    try {
      await page.waitForSelector(link_selector);
      await page.click(link_selector);
    } catch (error) {}

    console.log("Follows: " + cantidad);

    page.screenshot({ path: `screens/${target}3.png` });

    const selector =
      "a.notranslate._0imsa > span._7UhW9.xLCgt.qyrsm.KV-D4.se6yk.T0kll"; // selector para los elementos de la lista

    await page.waitForTimeout(1500);
    page.screenshot({ path: `screens/${target}11.png` });

    let items = [];
    let ti = Date.now();
    let prev_len = items.length;

    // scrollear hasta encontrar todos los follows
    while (Date.now() - ti < 15 * 1000) {
      // conseguir los elementos a traves con el css selector
      items = await page.$$(selector);

      // terminar el ciclo -> todos los datos conseguidos
      if (items.length >= cantidad) break;

      // si no hay cambios no actualiza el tiempo y se detendra el loop a los 15 seg
      if (items.length === prev_len) continue;

      ti = Date.now();
      prev_len = items.length;

      // scrollear para cargar mas elementos
      try {
        await page.evaluate(() => {
          document.getElementsByClassName("isgrP")[0].scrollTop = 9999999;
        });
      } catch (error) {
        console.log(error);
        break;
      }
    }

    // extract text from elementHandle items
    for (let i = 0; i < items.length; i++) {
      followers.push(
        await items[i].evaluate(async (node) => await node.innerHTML)
      );
    }

    // Close Pop Up
    const close_selector =
      "body > div.RnEpo.Yx5HN > div > div > div > div:nth-child(1) > div > div:nth-child(3) > button";
    try {
      await page.click(close_selector);
    } catch (error) {
      // refresh page
      await page.reload();
      await page.waitForTimeout(1000);
      console.log("error closing, refreshing page");
    }

    console.log(`--------- Scraped ${followers.length} Elements ---------`);

    await page.waitForTimeout(1000);
  } catch (error) {
    console.log(error);
  }
  await page.waitForTimeout(1000);
  return followers;
};
/**
 * 	Process Data
 * 	@param {Object} data  - data to process
 * 	@returns {{seguidores:{te_siguen,no_te_siguen}, seguidos:{los_sigues, no_los_sigues}} - description
 */
const process_data = (data) => {
  try {
    let { followers, following } = data;

    // verificamos si los que seguimos nos siguen
    let te_siguen = [];
    let no_te_siguen = [];

    following.forEach((follow) => {
      if (followers.includes(follow)) te_siguen.push(follow);
      else no_te_siguen.push(follow);
    });

    // verificamos si seguimos a los que nos siguen
    let los_sigues = [];
    let no_los_sigues = [];
    followers.forEach((follow) => {
      if (following.includes(follow)) los_sigues.push(follow);
      else no_los_sigues.push(follow);
    });

    const seguidores = { los_sigues, no_los_sigues };
    const seguidos = { te_siguen, no_te_siguen };

    return { seguidores, seguidos };
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = { scrapFollows };
