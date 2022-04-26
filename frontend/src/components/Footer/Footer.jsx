export default function Footer() {
  return (
    <div>
      {/* <!-- Footer--> */}
      <footer className="footer text-center">
        <div className="container px-4 px-lg-5">
          <ul className="list-inline mb-5">
            <li className="list-inline-item">
              <a
                className="social-link rounded-circle text-white mr-3"
                href="https://marcosraimondi1.github.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="icon-globe"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a
                className="social-link rounded-circle text-white mr-3"
                href="https://www.linkedin.com/in/marcos-raimondi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="icon-social-linkedin"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a
                className="social-link rounded-circle text-white"
                href="https://github.com/marcosraimondi1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="icon-social-github"></i>
              </a>
            </li>
          </ul>
          <p className="text-muted small mb-0">Copyright &copy; Marcos Raimondi 2022</p>
        </div>
      </footer>
    </div>
  );
}
