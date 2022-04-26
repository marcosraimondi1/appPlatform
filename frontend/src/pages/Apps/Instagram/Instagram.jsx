import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactJson from "react-json-view";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

import { useInstagram } from "./instagramLogic.js";

export default function Instagram() {
  const { username, data, loading, setUsername, submit } = useInstagram();

  return (
    <>
      <Header
        id="insta-masthead"
        title="Instagram Follower Scraper"
        description="Insert your instagram username (only public accounts)"
      >
        <div style={{ margin: "10px" }}>
          <input
            style={{ marginRight: "10px" }}
            value={username}
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
