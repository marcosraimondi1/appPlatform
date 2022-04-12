import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { create, all, and } from "mathjs";

const math = create(all, {});

export const useCcalc = () => {
  const [variables, setVariables] = useState([]);
  const [equation, setEquation] = useState("");
  const [eqinput, setEqinput] = useState("");
  const [result, setResult] = useState("");

  const deleteVar = (varName) => {
    setVariables((prev) => prev.filter((v) => v.name !== varName));
  };

  const vars = variables.map((variable) => (
    <div
      key={variable.name}
      style={{
        display: "flex",
        color: "blue",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <p
        id="icon"
        style={{
          fontSize: "20px",
          marginLeft: "10px",
          padding: "3px",
          alignSelf: "start",
        }}
        onClick={() => {
          setEqinput((prev) => `${prev + variable.name}$ `);
        }}
      >
        {variable.name + " : " + math.typeOf(variable.value)}
      </p>
      <FontAwesomeIcon
        id="icon"
        style={{ alignSelf: "start", marginRight: "10px" }}
        color="yellow"
        icon="trash"
        size="sm"
        onClick={() => deleteVar(variable.name)}
      />
    </div>
  ));

  const submit = (event) => {
    event.preventDefault();

    let varName = eqinput.split("=")[0].replace(/\s/g, "");

    if (varName === "") {
      alert("Invalid Input");
      return;
    }

    const exists = variables.filter((v) => v.name === varName).length > 0;

    if (exists) {
      alert("Cannot have 2 variables with same name");
      return;
    }

    if (!result || result === "") {
      alert("Invalid Expression");
      return;
    }

    setVariables((prev) => [...prev, { name: varName, value: result }]);
    onChangeEqInput("");
  };

  const onChangeEqInput = (value) => {
    let eq = value;
    variables.forEach((variable) => {
      eq = eq.replaceAll(`${variable.name}$`, `(${variable.value})`);
    });
    setEqinput(value);
    setEquation(eq);
    let res = "";
    try {
      if (
        eq.indexOf("lusolve") >= 0 &&
        eq.replace(/\s/g, "").indexOf("lusolve(") < 0
      ) {
        console.log("missing params");
        throw new Error("Params missing!");
      }

      res = math.evaluate(eq);
    } catch (error) {}
    if (!res) res = "";
    setResult(res);
  };

  const eqText = [`$$${equation}$$`, `$$= ${result}$$`];
  return { submit, vars, eqText, eqinput, onChangeEqInput };
};
