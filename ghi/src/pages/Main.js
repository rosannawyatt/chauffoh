import banner1 from "../images/banner-new-thin.webp";
import feet from "../images/feet-out-window.jpg";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import anita from "../images/review-1.webp";
import alvin from "../images/review-2.webp";
import couple from "../images/review-3.webp";
import driver2 from "../images/driver-long-text.webp";
import RideCounter from "../components/RideCounter";

export default function Home() {
  return (
    <>
      <div className="container-fluid">
        <div className="big">
          <div className="banner">
            <div>
              <img
                className="banner-image"
                src={banner1}
                alt="banner with logo"
              />
              <NavLink to="/signup" className="signup1">
                <button className="signup-button2">Sign Up</button>
              </NavLink>
            </div>
          </div>
          <div className="locations">
            <div className="container text-center">
              <div
                className="row align-items-center"
                style={{ marginTop: "-5px" }}
              >
                <div className="col">San Francisco, CA</div>
                <div className="col">Phoenix, AZ</div>
                <div className="col">Arlington, TX</div>
              </div>
            </div>
          </div>
          <div className="text-section">
            <div className="row">
              <div className="col-sm-5 col-md-6">
                <p className="line1">Chauffoh makes getting home easy</p>
                <p className="line2">Can't drive? No problem!</p>
                <div className="blurb">
                  <p>
                    If you drive somewhere and find that you can't drive when
                    it's time to leave, or you just don't feel like it (we've
                    all been there), book a ride and one of our drivers will
                    come drive you wherever you need to go. With our fleet of
                    autonomous vehicles, there's no need for a second driver.
                    Once your ride is complete, one of our self-driving cars
                    will pick your driver up.
                  </p>
                </div>
              </div>
              <div className="col-sm-5 offset-sm-2 col-md-6 offset-md-0">
                <div className="counter-box">
                  <div className="counter-head">
                    <p className="counter-line1">Rides completed</p>
                  </div>
                  <div className="counter">
                    <RideCounter></RideCounter>
                  </div>
                </div>
                <div className="signup">
                  <NavLink to="/signup">
                    <button className="signup-button">Get Started</button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="driver-section">
            <div>
              <img src={driver2} alt="driver" className="driver-image" />
            </div>
          </div>
          <div className="review-section">
            <div className="review-text">
              <p style={{ color: "#fafafaf1" }}>What people are saying...</p>
            </div>
            <div className="home-carousel">
              <div
                id="carouselExampleAutoplaying"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={anita}
                      className="d-block w-100"
                      alt="..."
                      style={{ borderRadius: 15 }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={alvin}
                      className="d-block w-100"
                      alt="..."
                      style={{ borderRadius: 15 }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={couple}
                      className="d-block w-100"
                      alt="..."
                      style={{ borderRadius: 15 }}
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="row" style={{ backgroundColor: "#f7f3e8a8" }}>
              <div className="col-sm-5 col-md-6" style={{ padding: 30 }}>
                <img
                  src={feet}
                  alt="feet out window of car"
                  style={{ width: "100%", borderRadius: 15 }}
                />
              </div>
              <div
                className="col-sm-5 offset-sm-2 col-md-6 offset-md-0"
                style={{ padding: 30 }}
              >
                <div className="closing">
                  <p className="closing1">Book a ride,</p>
                  <p className="closing2">kick back,</p>
                  <p className="closing3">and leave the driving to us</p>
                </div>
                <div className="signup3">
                  <NavLink to="/signup">
                    <button className="signup-button">I'm ready!</button>
                  </NavLink>
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
