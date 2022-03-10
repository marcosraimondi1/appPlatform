export const fetchPlaylists = async (params) => {
  const API_BASE_URL = global.BASE_API_URL;
  try {
    let { username } = params;

    let options = new URLSearchParams({ username }).toString();
    const url = API_BASE_URL + "/getPlaylists?" + options;

    let res = await fetch(url, { method: "GET", mode: "cors" });

    if (res.status === 200) {
      let json = await res.json();

      if (json.status === "error") {
        alert("Request failed: check that your username is correct");
        return { error: json.error };
      }
      return json.data;
    }
    if (res.status === 400) {
      alert("Spotify Session expired, login again :(");
      params.redirect_login();
      return;
    }
  } catch (error) {
    console.log(error);
  }
  return { error: "request failed" };
};

export const fetchPlaylistSongs = async (params) => {
  const API_BASE_URL = global.BASE_API_URL;
  try {
    let { username, playlist_id } = params;

    let options = new URLSearchParams({ username, playlist_id }).toString();
    const url = API_BASE_URL + "/getPlaylistSongs?" + options;

    let res = await fetch(url, { method: "GET", mode: "cors" });

    if (res.status === 200) {
      let json = await res.json();

      console.log(json);

      if (json.status === "error") {
        alert("Request failed: check that your username is correct");
        return { error: json.error };
      }

      console.log(json.data);
      return json.data;
    }
    if (res.status === 400) {
      alert("Spotify Session expired, login again :(");
      params.redirect_login();
      return;
    }
  } catch (error) {
    console.log(error);
  }
  return { error: "request failed" };
};

export const downloadPlaylistSongs = async (params) => {
  const API_BASE_URL = global.BASE_API_URL;
  try {
    let { username, playlist_id } = params;

    let options = new URLSearchParams({ username, playlist_id }).toString();
    const url = API_BASE_URL + "/downloadSongs?" + options;

    let res = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("RESPONSE TYPE: ", res.type);
    if (res.status === 200) {
      let json = await res.json();
      console.log(json);
      if (json.status === "success") {
        window.open(json.link, "_blank");
      } else {
        alert(json.status);
      }
      return;
    }
    if (res.status === 400) {
      alert("Spotify Session expired, login again :(");
      params.redirect_login();
      return;
    }
  } catch (error) {
    console.log(error);
  }
  alert("something went wrong, try again later");
  return;
};
