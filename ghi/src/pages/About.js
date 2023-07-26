import GitHub_Logo from "../images/github-mark.png";
import Linkedin_Logo from "../images/LI-In-Bug.png";
import Footer from "../components/Footer";
export default function About() {
  return (
    <>
      <div className="row justify-content-center align-items-center">
        <div className="card" style={{ width: "15rem" }}>
          {/* <img className="card-img-top" src="..." alt="Card cap" /> */}
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div className="d-flex justify-content-center">
              <a
                href="https://github.com/"
                className="btn btn-primary"
                style={{ marginRight: "10px" }}
              >
                GitHub
              </a>
              <a href="https://github.com/" className="btn btn-primary">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="card" style={{ width: "15rem" }}>
          {/* <img className="card-img-top" src="..." alt="Card cap" /> */}
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div className="d-flex justify-content-center">
              <a
                href="https://github.com/"
                className="btn btn-info"
                style={{ marginRight: "10px" }}
              >
                GitHub
              </a>
              <a href="https://github.com/" className="btn btn-info">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="card" style={{ width: "15rem" }}>
          {/* <img className="card-img-top" src="..." alt="Card cap" /> */}
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div className="d-flex justify-content-center">
              <a
                href="https://github.com/"
                className="btn btn-danger"
                style={{ marginRight: "10px" }}
              >
                GitHub
              </a>
              <a href="https://github.com/" className="btn btn-danger">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center align-items-center">
        <div className="card" style={{ width: "15rem" }}>
          {/* <img className="card-img-top" src="..." alt="Card cap" /> */}
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div className="d-flex justify-content-center">
              <a
                href="https://github.com/"
                className="btn btn-success"
                style={{ marginRight: "10px" }}
              >
                GitHub
              </a>
              <a href="https://github.com/" className="btn btn-success">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="card" style={{ width: "15rem" }}>
          {/* <img className="card-img-top" src="..." alt="Card cap" /> */}
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div className="d-flex justify-content-center">
              <a href="https://github.com/" style={{ marginRight: "0px" }}>
                <img
                  className="img-thumbnail"
                  style={{ width: "50%" }}
                  src={Linkedin_Logo}
                  alt="linkedin logo"
                />
              </a>
              <a href="https://github.com/">
                <img
                  className="img-thumbnail"
                  style={{ width: "100%" }}
                  src={GitHub_Logo}
                  alt="github logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <Footer />
      </div>
    </>
  );
}
