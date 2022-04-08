import React from "react";
import MathJaxL from "react-mathjax2";

export default function Mathjax({ equation }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <MathJaxL.Context
        input="ascii"
        onError={(MathJax, error) => {
          console.warn(error);
          console.log("Encountered a MathJax error, re-attempting a typeset!");
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
        <MathJaxL.Text text={equation} />
      </MathJaxL.Context>
    </div>
  );
}
