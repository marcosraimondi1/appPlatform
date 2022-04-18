import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { create, all } from "mathjs";

const math = create(all, {});

export const useCcalc = () => {
  const [variables, setVariables] = useState([]);
  const [equation, setEquation] = useState("");
  const [eqMathjax, setEqMathjax] = useState("");
  const [result, setResult] = useState("");
  const [errorW, setError] = useState("");
  const [scope, setScope] = useState({});
  const [vars, setVars] = useState([]);

  useEffect(() => {
    setVars(
      variables.map((variable) => {
        let newScope = scope;
        newScope[variable.name] = variable.value;
        setScope(newScope);
        return (
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
                setEquation((prev) => `${prev + variable.name}`);
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
        );
      })
    );
  }, [variables, scope]);

  const deleteVar = (varName) => {
    setVariables((prev) => prev.filter((v) => v.name !== varName));
  };

  const submit = (event) => {
    event.preventDefault();

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

    if (!result || result === "") {
      alert("Invalid Expression");
      return;
    }

    setVariables((prev) => [...prev, { name: varName, value: result }]);
    onChangeEqInput("");
  };

  const onChangeEqInput = (value) => {
    // correctly show variables with mathjax
    setEqMathjax(getMathjaxEquation(value, variables));

    setEquation(value);

    try {
      setResult(doMath(value, scope));
      setError("");
    } catch (error) {
      // show error to user
      setError(error.message);
    }
  };

  const eqText = [`$$${eqMathjax}$$`, `$$= ${result}$$`];

  return { submit, vars, eqText, equation, onChangeEqInput, errorW };
};

const doMath = (eq, scope) => {
  let res = "";
  try {
    res = math.evaluate(eq + "()", scope);
  } catch (e) {
    // Do not evaluate function with few arguments
    if (e.message.indexOf("Too few arguments in function") > -1) {
      throw e;
    }
    try {
      res = math.evaluate(eq, scope);
    } catch (e) {
      throw e;
    }
  }
  if (!res) res = "";
  return res;
};

const getMathjaxEquation = (value, variables) => {
  let eq = value;
  variables.forEach((variable) => {
    const  reg = new RegExp(`\\b${variable.name}\\b`, "g");
    eq = eq.replaceAll(reg, `(${variable.name})`);
  });
  return eq;
};
