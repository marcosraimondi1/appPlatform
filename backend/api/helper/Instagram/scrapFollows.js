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
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();

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
    await page.goto("https://www.instagram.com/accounts/login/");

    await page.waitForTimeout(2000);

    // Completar formulario
    await page.type("[name=username]", ADMIN_USER);

    await page.type("[name=password]", ADMIN_PASS);

    // Send form
    await page.click("[type=submit]");

    await page.waitForTimeout(500);

    // Check for error messages
    const error_message = await page.evaluate(() => {
      try {
        return document.querySelector("#slfErrorAlert").innerHTML;
      } catch (error) {
        return null;
      }
    });

    if (error_message) {
      page.screenshot({ path: "screens/errorlogging.png" });
      return { status: "error", error: error_message };
    }

    await page.waitForTimeout(1000);

    console.log("LOGGED");

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
  try {
    await page.waitForTimeout(1500);
    await page.screenshot({ path: "screens/logged.png" });
    await page.goto(`https://www.instagram.com/${username}/`);

    await page.waitForTimeout(2000);
    await page.screenshot({ path: "screens/profile.png" });

    const followers = await instagram_scrap_follows(page, "followers");

    await page.waitForTimeout(2000);

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
  let followers = [];

  let link_number = 2;

  if (target == "following") link_number = 3;

  try {
    // obtener cantidad de follows
    let elemento = await page.$x(
      `/html/body/div[1]/section/main/div/header/section/ul/li[${link_number}]/a/div/span`
    );

    elemento = elemento[0];

    const cantidad = await page.evaluate((e) => {
      e.click();
      return parseInt(e.innerHTML);
    }, elemento);

    console.log("Follows: " + cantidad);

    // Open Popup
    await page.waitForTimeout(1500);

    const selector =
      "a.notranslate._0imsa > span._7UhW9.xLCgt.qyrsm.KV-D4.se6yk.T0kll"; // selector para los elementos de la lista

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
        await page.screenshot({ path: `screens/scrolling/scrollerror.png` });
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
    const xpath = "/html/body/div[6]/div/div/div/div[1]/div/div[2]/button";
    try {
      let button = await page.$x(xpath);
      button[0].click();
    } catch (error) {
      // refresh page
      await page.reload();
      console.log("error closing, refreshing page");
    }

    console.log(`--------- Scraped ${followers.length} Elements ---------`);
  } catch (error) {
    console.log(error);
  }

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
