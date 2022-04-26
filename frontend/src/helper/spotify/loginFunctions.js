export const login = async () => {
  const API_BASE_URL = global.BASE_API_URL;

  try {
    const url = `${API_BASE_URL}/login-spotify`;
    let res = await fetch(url, {
      method: "GET",
      mode: "cors"
    });
    if (res.status === 200) {
      let json = await res.json();
      window.location.href = json.url;
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
