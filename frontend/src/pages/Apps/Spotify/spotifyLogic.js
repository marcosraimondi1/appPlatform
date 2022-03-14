import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchPlaylists,
  fetchPlaylistSongs,
  downloadPlaylistSongs,
} from "../../../helper/spotify/fetchApi";

export const useSpotify = () => {
  const [username, setUsername] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [data, setData] = useState([]);
  const [songs, setSongs] = useState({});
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [loading, setLoading] = useState(false);

  let urlParams = useParams();
  let navigate = useNavigate();
  const redirect_login = () => navigate("../spotify", { replace: true });

  // load username from params
  useEffect(() => {
    setUsername(urlParams.username);
  }, [urlParams.username]);

  const submit = async () => {
    setLoading(true);
    let data = await fetchPlaylists({ username, redirect_login });
    try {
      setData(Object.values(data));
    } catch (error) {}
    setLoading(false);
  };

  const downloadZip = () => {
    window.open(downloadLink, "_blank");
    setDownloadLink("");
    return;
  };

  const downloadPlaylist = async () => {
    if (!selectedPlaylist) {
      alert("select a playlist");
      return;
    }
    setLoading(true);
    setSongs(
      await fetchPlaylistSongs({
        username,
        playlist_id: selectedPlaylist.id,
        redirect_login,
      })
    );
    let res = await downloadPlaylistSongs({
      username,
      playlist_id: selectedPlaylist.id,
      redirect_login,
    });
    if (res && res.link) {
      // open download tab
      setDownloadLink(res.link);
      downloadZip();
    }
    setLoading(false);
  };

  return {
    username,
    data,
    songs,
    loading,
    submit,
    downloadLink,
    downloadZip,
    downloadPlaylist,
    selectedPlaylist,
    setSelectedPlaylist,
  };
};
