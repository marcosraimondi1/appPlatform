import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Services() {
  return (
    <div>
      {/* <!-- Services--> */}
      <section className="content-section bg-primary text-white text-center" id="services">
        <div className="container px-4 px-lg-5">
          <div className="content-section-heading">
            <h3 className="text-secondary mb-0">Services</h3>
            <h2 className="mb-5">My Skills</h2>
          </div>
          <div className="row gx-4 gx-lg-5">
            <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
              <span className="service-icon rounded-circle mx-auto mb-3">
                <FontAwesomeIcon icon={["fab", "react"]} size="lg" spin />
              </span>
              <h4>
                <strong>React</strong>
              </h4>
              <p className="text-faded mb-0">Web Development wiht React.JS</p>
            </div>
            <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
              <span className="service-icon rounded-circle mx-auto mb-3">
                <FontAwesomeIcon icon={["fab", "node"]} size="lg" />
              </span>
              <h4>
                <strong>Backend</strong>
              </h4>
              <p className="text-faded mb-0">Full Stack Integration</p>
            </div>
            <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
              <span className="service-icon rounded-circle mx-auto mb-3">
                <FontAwesomeIcon icon="database" spin />
              </span>
              <h4>
                <strong>Databases</strong>
              </h4>
              <p className="text-faded mb-0">MongoDb & SQL</p>
            </div>
            <div className="col-lg-3 col-md-6">
              <span className="service-icon rounded-circle mx-auto mb-3">
                <FontAwesomeIcon icon="cloud" />
              </span>
              <h4>
                <strong>Cloud Services</strong>
              </h4>
              <p className="text-faded mb-0">Applications up and running on the web</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
