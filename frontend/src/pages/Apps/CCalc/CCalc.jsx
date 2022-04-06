import React from "react";

import MathJax from "react-mathjax2";

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
        <form onSubmit={submit}>
          <div style={{ margin: "10px" }}>
            <TextField
              id="outlined-basic"
              label="Equation"
              size="small"
              variant="filled"
              color="success"
              fullWidth
              value={eqinput}
              onChange={(e) => onChangeEqInput(e.target.value)}
              style={{ margin: "10px" }}
            />
          </div>

          <br />

          <div style={{ fontSize: "25px", margin: "10px" }}>
            <MathJax.Context
              input="ascii"
              onError={(MathJax, error) => {
                console.warn(error);
                console.log(
                  "Encountered a MathJax error, re-attempting a typeset!"
                );
                MathJax.Hub.Queue(MathJax.Hub.Typeset());
              }}
              script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
              options={{
                asciimath2jax: {
                  useMathMLspacing: true,
                  delimiters: [["$$", "$$"]],
                  preview: "none",
                },
              }}
            >
              <MathJax.Text text={eqText} />
            </MathJax.Context>
          </div>

          <button className="btn btn-primary" onClick={submit}>
            Set Variable
          </button>
        </form>

        <br />
        <div style={{ margin: "10px" }}>
          {vars.length > 0 ? <>Variables</> : <></>}
          {vars}
        </div>
      </Header>
      <Footer />
    </>
  );
}
