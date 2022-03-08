import React, { useState } from "react";

import { fetchData } from "../../../helper/requestFunctions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactJson from "react-json-view";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

const ENDPOINT = "/instagram";

export default function Instagram() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (data) setData({});
    setLoading(true);
    let new_data = await fetchData({ endpoint: ENDPOINT, username });
    setData(new_data);
    setUsername("");
    setLoading(false);
  };

  return (
    <>
      <Header
        id="insta-masthead"
        title="Instagram Follower Scraper"
        description="Insert your instagram username"
      >
        <div style={{ margin: "10px" }}>
          <input
            style={{ marginRight: "10px" }}
            onChange={(txt) => setUsername(txt.target.value)}
          />
          <button className="btn btn-primary" onClick={submit}>
            Search
          </button>
        </div>

        <br />

        {loading ? (
          <div>
            <FontAwesomeIcon icon={["fab", "react"]} size="6x" spin />
          </div>
        ) : (
          <div style={{ overflowY: "scroll", maxHeight: "600px" }}>
            <ReactJson
              style={{ overflowY: "hidden" }}
              collapsed={true}
              name="Follows"
              src={data}
              theme="solarized"
              displayDataTypes={false}
              iconStyle="triangle"
            />
          </div>
        )}
      </Header>
      <Footer />
    </>
  );
}
