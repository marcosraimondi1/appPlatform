import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { create, all } from "mathjs";

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
      res = math.evaluate(eq);
    } catch (error) {}
    if (!res) res = "";
    setResult(res);
  };

  const eqText =
    result === "" ? `$$${equation}$$` : `$$${equation} = ${result}$$`;

  return { submit, vars, eqText, eqinput, onChangeEqInput };
};
