import React from "react";

export default function Item(props) {
  return (
    <div className="col-lg-6">
      <a
        className="portfolio-item"
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="caption">
          <div className="caption-content">
            <div className="h2">{props.caption_title}</div>
            <p className="mb-0">{props.caption_description}</p>
          </div>
        </div>
        <img className="img-fluid" src={props.img_source} alt="..." />
      </a>
    </div>
  );
}
