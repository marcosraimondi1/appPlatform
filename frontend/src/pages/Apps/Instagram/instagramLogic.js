export const useInstagram = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (data) setData({});
    setLoading(true);
    let new_data = await fetchData({ username });
    setData(new_data);
    setUsername("");
    setLoading(false);
  };

  return { username, data, loading, setUsername, submit };
};
