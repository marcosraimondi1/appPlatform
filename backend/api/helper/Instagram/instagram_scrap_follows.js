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

  if (target == "following")
    link_number = 3;

  try {
    // obtener cantidad de follows del link para abrir el popup
    let cantidad_selector = `#react-root > section > main > div > header > section > ul > li:nth-child(${link_number}) > a > div > span`;

    try {
      await page.waitForSelector(cantidad_selector);
    } catch (error) { }

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
    } catch (error) { }

    console.log("Follows: " + cantidad);

    page.screenshot({ path: `screens/${target}3.png` });

    const selector = "a.notranslate._0imsa > span._7UhW9.xLCgt.qyrsm.KV-D4.se6yk.T0kll"; // selector para los elementos de la lista

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
      if (items.length >= cantidad)
        break;

      // si no hay cambios no actualiza el tiempo y se detendra el loop a los 15 seg
      if (items.length === prev_len)
        continue;

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
    const close_selector = "body > div.RnEpo.Yx5HN > div > div > div > div:nth-child(1) > div > div:nth-child(3) > button";
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
exports.instagram_scrap_follows = instagram_scrap_follows;
