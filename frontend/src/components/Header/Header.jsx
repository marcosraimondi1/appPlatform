import PropTypes from "prop-types";
export default function Header(props) {
  return (
    <div>
      {/* <!-- Header--> */}
      <header id={props.id} className="masthead d-flex align-items-center">
        <div className="container px-4 px-lg-5 text-center">
          <h1 className="mb-1">{props.title}</h1>
          <h3 className="mb-5">
            <em>{props.description}</em>
          </h3>
          {props?.children}
        </div>
      </header>
    </div>
  );
}

Header.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node
};
