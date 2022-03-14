import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

import ReactJson from "react-json-view";

import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";

import { useSpotify } from "./spotifyLogic";

export default function Spotify() {
  const {
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
  } = useSpotify();

  return (
    <>
      <Header
        id="spotify-masthead"
        title="Spotify PlayList Download"
        description={username}
      >
        <div
          hidden={data.length > 0 || downloadLink !== ""}
          style={{ margin: "10px" }}
        >
          <Button
            color="error"
            variant="contained"
            size="small"
            onClick={submit}
          >
            Find Playlists
          </Button>
        </div>

        <br />

        {loading ? (
          <div>
            <FontAwesomeIcon icon={["fab", "react"]} size="6x" spin />
          </div>
        ) : (
          <>
            <div
              hidden={data.length === 0 || downloadLink !== ""}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Autocomplete
                disablePortal
                options={data}
                getOptionLabel={(option) => option.name}
                sx={{ width: 300, margin: "5px" }}
                size="small"
                value={selectedPlaylist || { name: "" }}
                onChange={(event, newValue) => setSelectedPlaylist(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ backgroundColor: "#fff" }}
                    label="Playlist"
                    variant="filled"
                  />
                )}
              />
              <Button
                style={{ margin: "5px" }}
                variant="contained"
                size="small"
                onClick={downloadPlaylist}
              >
                Download
              </Button>
            </div>
          </>
        )}
        {!loading && downloadLink !== "" ? (
          <>
            <Button
              style={{ margin: "5px" }}
              variant="contained"
              size="small"
              onClick={downloadZip}
              color="secondary"
            >
              Download {selectedPlaylist.name}
            </Button>
          </>
        ) : (
          <></>
        )}
        <div
          hidden={Object.values(songs).length === 0}
          style={{ overflowY: "scroll", maxHeight: "600px" }}
        >
          <ReactJson
            style={{ overflowY: "hidden" }}
            collapsed={true}
            name="Songs"
            src={songs}
            theme="solarized"
            displayDataTypes={false}
            iconStyle="triangle"
          />
        </div>
      </Header>
      <Footer />
    </>
  );
}
