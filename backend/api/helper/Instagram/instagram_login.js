const { ADMIN_USER, ADMIN_PASS } = require("./scrapFollows");

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
exports.instagram_login = instagram_login;
