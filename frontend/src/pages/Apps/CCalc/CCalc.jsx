import React, { useState } from "react";

import MathJax from "react-mathjax2";
import { create, all } from "mathjs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

const math = create(all, {});

export default function CCalc() {
  const [variables, setVariables] = useState([]);
  const [equation, setEquation] = useState("");
  const [eqinput, setEqinput] = useState("");
  const [result, setResult] = useState("");

  const deleteVar = (varName) => {
    setVariables((prev) => prev.filter((v) => v.name !== varName));
  };

  const vars = variables.map((variable) => (
    <div key={variable.name} style={{ color: "blue" }}>
      <p
        style={{
          fontSize: "20px",
          display: "inline",
          marginRight: "10px",
          padding: "5px",
        }}
      >
        {variable.name + " = " + variable.value}
      </p>
      <FontAwesomeIcon
        id="icon"
        style={{ display: "inline", padding: "5px" }}
        color="yellow"
        icon="trash"
        size="md"
        onClick={() => deleteVar(variable.name)}
      />
    </div>
  ));

  const submit = () => {
    let varName = equation.split("=")[0].replace(/\s/g, "");
    if (varName === "") {
      alert("Invalid Input");
      return;
    }

    const exists = variables.filter((v) => v.name === varName).length > 0;

    if (exists) {
      alert("Cannot have 2 variables with same name");
      return;
    }

    setVariables((prev) => [...prev, { name: varName, value: result }]);
  };

  return (
    <>
      <Header
        id="ccalc-masthead"
        title="Complex Calculator"
        description="Solve equations and operate with complex numbers"
      >
        <div style={{ margin: "10px" }}>
          <TextField
            id="outlined-basic"
            label="Equation"
            size="small"
            variant="filled"
            color="success"
            fullWidth
            value={eqinput}
            onChange={(e) => {
              let eq = e.target.value;

              variables.forEach((variable) => {
                eq = eq.replaceAll(variable.name, `(${variable.value})`);
              });
              setEqinput(e.target.value);
              setEquation(eq);
              let res = "";
              try {
                res = math.evaluate(eq);
              } catch (error) {}
              if (!res) res = "";
              setResult(res);
            }}
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
            <MathJax.Text text={"$$" + equation + "$$" + " = " + result} />
          </MathJax.Context>
        </div>

        <button className="btn btn-primary" onClick={submit}>
          Set Variable
        </button>

        <br />
        <div style={{ margin: "10px" }}>
          {vars.length > 0 ? <>Variables</>:<></>}
          {vars}
        </div>
      </Header>
      <Footer />
    </>
  );
}
