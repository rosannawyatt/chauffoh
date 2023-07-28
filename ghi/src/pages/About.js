import GitHub_Logo from "../images/github-mark.png";
import Linkedin_Logo from "../images/LI-In-Bug.png";
import Footer from "../components/Footer";
import driving2 from "../images/driving2.jpeg";
export default function About() {
  return (
    <>
      <div className="container-fluid">
        <div className="page-body">
          <div className="row">
            <div className="col-lg-7 p-0">
              <img
                style={{ width: "100%", height: "100%" }}
                src={driving2}
                alt="car-about"
              />
            </div>
            <div className="col-lg-5 p-5 mt-3">
              <h1 className="text-color-primary">
                How is Chauffoh different from rideshare?{" "}
              </h1>
              <div className="mt-3">
                <p className="about">
                  While rideshare gets you from point a to point b, Chauffoh
                  drivers come to you and drive you where you need to go in YOUR
                  CAR, so if you’ve gone somewhere and find yourself in a
                  position where you can’t, or don’t want to drive, you can
                  still make it home safely, without having to worry about
                  picking up your car later.
                </p>
              </div>
              <div className="mt-4">
                <h3>We value:</h3>
                <ul>
                  <li>
                    <h4>Driver and Passengers Safety</h4>
                  </li>
                  <li>
                    <h4>Eco-Friendly</h4>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col p-5">
              <h1> Meet the Team</h1>
              <div className="row justify-content-center">
                <div className="col">
                  <div
                    className="card"
                    style={{ width: "15rem", margin: "20px" }}
                  >
                    {/* <img className="card-img-top" src="..." alt="Card cap" /> */}
                    <div className="card-body">
                      <h5 className="card-title">Dalton Carl</h5>
                      <p className="card-text">
                        Full-Stack Engineer and QA Lead
                      </p>
                      <div className="d-flex justify-content-center">
                        <a
                          href="https://www.linkedin.com/in/daltoncarl/"
                          style={{ margin: "0px" }}
                        >
                          <img
                            className="img-thumbnail"
                            style={{ width: "50%", border: "none" }}
                            src={Linkedin_Logo}
                            alt="linkedin logo"
                          />
                        </a>
                        <a href="https://github.com/DaltonAC/">
                          <img
                            className="img-thumbnail"
                            style={{ width: "100%", border: "none" }}
                            src={GitHub_Logo}
                            alt="github logo"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div
                    className="card"
                    style={{ width: "15rem", margin: "20px" }}
                  >
                    {/* <img className="card-img-top" src="..." alt="Card cap" /> */}
                    <div className="card-body">
                      <h5 className="card-title">Diana Tran</h5>
                      <p className="card-text">
                        Full-Stack Engineer and Project Lead
                      </p>
                      <div className="d-flex justify-content-center">
                        <a
                          href="https://www.linkedin.com/in/diana-tran-capm/"
                          style={{ margin: "0px" }}
                        >
                          <img
                            className="img-thumbnail"
                            style={{ width: "50%", border: "none" }}
                            src={Linkedin_Logo}
                            alt="linkedin logo"
                          />
                        </a>
                        <a href="https://gitlab.com/dt-dtran">
                          <img
                            className="img-thumbnail"
                            style={{ width: "100%", border: "none" }}
                            src={GitHub_Logo}
                            alt="github logo"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div
                    className="card"
                    style={{ width: "15rem", margin: "20px" }}
                  >
                    {/* <img className="card-img-top" src="..." alt="Card cap" /> */}
                    <div className="card-body">
                      <h5 className="card-title">Ian McIntyre</h5>
                      <p className="card-text">
                        Full-Stack Engineer and Back-End Lead
                      </p>
                      <div className="d-flex justify-content-center">
                        <a href="https://github.com/" style={{ margin: "0px" }}>
                          <img
                            className="img-thumbnail"
                            style={{ width: "50%", border: "none" }}
                            src={Linkedin_Logo}
                            alt="linkedin logo"
                          />
                        </a>
                        <a href="https://github.com/">
                          <img
                            className="img-thumbnail"
                            style={{ width: "100%", border: "none" }}
                            src={GitHub_Logo}
                            alt="github logo"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div
                    className="card"
                    style={{ width: "15rem", margin: "20px" }}
                  >
                    {/* <img className="card-img-top" src="..." alt="Card cap" /> */}
                    <div className="card-body">
                      <h5 className="card-title">Josh Tobin</h5>
                      <p className="card-text">
                        Full-Stack Engineer and Deployment Lead
                      </p>
                      <div className="d-flex justify-content-center">
                        <a
                          href="https://www.linkedin.com/in/tobin-jay/"
                          style={{ margin: "0px" }}
                        >
                          <img
                            className="img-thumbnail"
                            style={{ width: "50%", border: "none" }}
                            src={Linkedin_Logo}
                            alt="linkedin logo"
                          />
                        </a>
                        <a href="https://gitlab.com/tobinjay24/">
                          <img
                            className="img-thumbnail"
                            style={{ width: "100%", border: "none" }}
                            src={GitHub_Logo}
                            alt="github logo"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div
                    className="card"
                    style={{ width: "15rem", margin: "20px" }}
                  >
                    {/* <img className="card-img-top" src="..." alt="Card cap" /> */}
                    <div className="card-body">
                      <h5 className="card-title">Rosanna Wyatt</h5>
                      <p className="card-text">
                        Full-Stack Engineer and Front-End Lead
                      </p>
                      <div className="d-flex justify-content-center">
                        <a
                          href="https://www.linkedin.com/in/rosannawyatt/"
                          style={{ marginRight: "0px" }}
                        >
                          <img
                            className="img-thumbnail"
                            style={{ width: "50%", border: "none" }}
                            src={Linkedin_Logo}
                            alt="linkedin logo"
                          />
                        </a>
                        <a href="https://gitlab.com/rosannawyatt/">
                          <img
                            className="img-thumbnail"
                            style={{ width: "100%", border: "none" }}
                            src={GitHub_Logo}
                            alt="github logo"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
