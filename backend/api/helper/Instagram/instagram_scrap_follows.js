/**
 * 	Scraps users follows
 * 	@param page {puppeteer.Page} - browsers page instance
 * 	@param target {string} - scrap followers or following
 * 	@returns {Promise<Array<object>>}
 */
const instagram_scrap_follows = async (page, target) => {
  await page.waitForTimeout(1500);

  let followers = [];
  let link_number = target === "following" ? 3 : 2;

  try {
    // obtener cantidad de follows del link para abrir el popup
    const cantidad = await getCantidad(page, link_number);

    if (!cantidad) {
      console.log("failed to get cantidad");
      await page.screenshot({ path: "screens/failedToOpen" + target + ".png" });
      return [];
    }

    console.log("-----> Follows: " + cantidad);

    // open pop up
    if (!(await openPopUp(link_number, page))) {
      console.log("failed to open pop up");
      await page.screenshot({ path: "screens/failedToOpen" + target + ".png" });
      return [];
    }

    const items = await scrapNames(page, cantidad);

    // extract text from elementHandle items
    followers = await extractInnerHtml(items);

    console.log(`--------- Scraped ${followers.length} Elements ---------`);
  } catch (error) {
    console.log(error);
  }
  await page.waitForTimeout(1000);
  return followers;
};

/**
 *
 * ------------- F U N C T I O N S ---------------
 *
 */

const extractInnerHtml = async (items) => {
  let follows = [];
  for (let i = 0; i < items.length; i++) {
    follows.push(await items[i].evaluate(async (node) => await node.innerHTML));
  }
  return follows;
};

const scrapNames = async (page, cantidad) => {
  const selector =
    "a.notranslate._0imsa > span._7UhW9.xLCgt.qyrsm.KV-D4.se6yk.T0kll"; // selector para los elementos de la lista

  await page.waitForTimeout(1500);

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

    console.log(`--> ${items.length} / ${cantidad} <--`);

    ti = Date.now();
    prev_len = items.length;

    // scrollear para cargar mas elementos
    if (!(await scroll(page))) break;
  }

  return items;
};

const scroll = async (page) => {
  try {
    await page.evaluate(() => {
      document.getElementsByClassName("isgrP")[0].scrollTop = 9999999;
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getCantidad = async (page, link_number) => {
  try {
    let cantidad_selector = `#react-root > section > main > div > header > section > ul > li:nth-child(${link_number}) > a > div > span`;

    await page.waitForTimeout(1000);

    let elemento = await page.$(cantidad_selector);

    const cantidad = await page.evaluate((e) => {
      return parseInt(e.innerHTML);
    }, elemento);

    return cantidad;
  } catch (error) {
    return false;
  }
};

const openPopUp = async (link_number, page) => {
  const link_selector = `#react-root > section > main > div > header > section > ul > li:nth-child(${link_number}) > a`;

  try {
    await page.waitForSelector(link_selector);
    await page.click(link_selector);
    return true;
  } catch (error) {
    return false;
  }
};

exports.instagram_scrap_follows = instagram_scrap_follows;
