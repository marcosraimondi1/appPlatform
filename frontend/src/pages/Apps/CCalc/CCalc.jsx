import React from "react";

import MathJax from "./Mathjax/Mathjax.jsx";

import { TextField } from "@mui/material";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { useCcalc } from "./ccalcLogic";

export default function CCalc() {
  const { submit, vars, eqText, eqinput, onChangeEqInput } = useCcalc();

  return (
    <>
      <Header
        id="ccalc-masthead"
        title="Complex Calculator"
        description="Solve equations and operate with complex numbers"
      >
        <a
          style={{ color: "#000000", fontWeight: "450" }}
          href={global.BASE_API_URL + "/ccalc/information"}
        >
          Instructivo
        </a>
        <form onSubmit={submit}>
          <div style={{ margin: "10px" }}>
            <TextField
              id="outlined-basic"
              label="Equation"
              size="small"
              variant="filled"
              color="secondary"
              fullWidth
              value={eqinput}
              onChange={(e) => onChangeEqInput(e.target.value)}
              style={{ margin: "10px" }}
            />
          </div>

          <br />

          <div
            style={{ fontSize: "25px", margin: "10px", alignItems: "center" }}
          >
            <MathJax equation={eqText[0]} />
            <MathJax equation={eqText[1]} />
          </div>

          <button className="btn btn-primary" onClick={submit}>
            Set Variable
          </button>
        </form>

        <br />
        <div
          style={{
            display: "flex",
            margin: "10px",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {vars.length > 0 ? <p>Variables</p> : <></>}

          <div
            style={{
              maxHeight: "150px",
              overflowY: "scroll",
              alignSelf: "center",
              width: "300px",
            }}
          >
            {vars}
          </div>
        </div>
      </Header>
      <Footer />
    </>
  );
}
