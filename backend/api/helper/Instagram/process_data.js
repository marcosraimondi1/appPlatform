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
exports.process_data = process_data;
