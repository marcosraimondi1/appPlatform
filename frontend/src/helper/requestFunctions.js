export const fetchData = async (params) => {
  const API_BASE_URL = global.BASE_API_URL;
  const { endpoint, username } = params;

  let url = API_BASE_URL + endpoint;

  if (username) url += "?username=" + username;

  try {
    const res = await fetch(url, {
      method: "GET",
      mode: "no-cors"
    });

    if (res.status === 200) {
      const json = await res.json();

      if (json.status === "error") {
        alert("Request failed: check that your account is public and the username is correct");
        return { error: "request failed" };
      }

      return json.data;
    }

    console.log({ error: `failed with status code: ${res.status}` });
    return { error: "request failed" };
  } catch (error) {
    console.log(error);
    return { error: "request failed" };
  }
};
