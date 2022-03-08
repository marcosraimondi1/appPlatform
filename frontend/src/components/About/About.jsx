export default function About() {
  return (
    <div>
      {/* <!-- About--> */}
      <section className="content-section bg-light" id="about">
        <div className="container px-4 px-lg-5 text-center">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-lg-10">
              <h2>Something about me</h2>
              <p className="lead mb-5">
                Computer engineering student interested in all kinds of projects
                and programming challenges. Lately improving my web development
                skills, but eager to learn new cool stuff such as artificial
                intelligence and IoT.
              </p>
              <a className="btn btn-dark btn-xl" href="#services">
                My Skills
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
