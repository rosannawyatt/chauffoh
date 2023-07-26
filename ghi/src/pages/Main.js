// import banner1 from "../images/Chauffoh-banner-city.jpg";
// import driver from "../images/driver-smile.jpg";
// import relax from "../images/man-relaxing.jpg";
// import feet from "../images/feet-out-window.jpg";

export default function Home() {
  return (
    <>
      <div>
        <div
          className="container-fluid"
          style={{
            width: "100%",
            border: 0,
            padding: 0,
            backgroundColor: "#08797E",
            margin: 0,
          }}
        >
          {/* <img style={{ width: "100%"}} src={banner1} /> */}
        </div>
        <div>
          <div>
            <a href="/login">
              <button
                className="login-button"
                style={{
                  backgroundColor: "#F7F3E8",
                  color: "#08797E",
                  borderColor: "#08797E",
                  borderRadius: 25,
                  margin: 5,
                  width: "15%",
                  height: 50,
                  fontWeight: "bold",
                }}
              >
                Log In
              </button>
            </a>
            <a href="/signup">
              <button
                className="signup-button"
                style={{
                  backgroundColor: "#C4B691",
                  color: "#F7F3E8",
                  borderColor: "#C4B691",
                  borderRadius: 25,
                  margin: 5,
                  width: "15%",
                  height: 50,
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </button>
            </a>
          </div>
        </div>
      </div>
      <div>
        <div className="row" style={{ backgroundColor: "#C4B691" }}>
          <div className="col-sm-5 col-md-6" style={{ padding: 30 }}>
            {/* <img src={driver} style={{width: "100%", borderRadius:15}} /> */}
          </div>
          <div
            className="col-sm-5 offset-sm-2 col-md-6 offset-md-0"
            style={{ padding: 30 }}
          >
            <article
              className="article"
              style={{ backgroundColor: "#C4B691", margin: 90 }}
            >
              <p className="header">Chauffoh makes getting home easy!</p>
            </article>
          </div>
        </div>
      </div>
      <div style={{ padding: 50 }}></div>
      <div>
        <div className="row">
          <div className="col-sm-5 col-md-6">
            <article
              className="article"
              style={{ backgroundColor: "#C4B691", margin: 90 }}
            >
              <p className="header">Can't drive? No problem!</p>
            </article>
          </div>
          <div className="col-sm-5 offset-sm-2 col-md-6 offset-md-0">
            {/* <img src={relax} style={{width: "100%", borderRadius:15}} /> */}
          </div>
        </div>
      </div>
      <div style={{ padding: 50 }}></div>
      <div>
        <div className="row" style={{ backgroundColor: "#C4B691" }}>
          <div className="col-sm-5 col-md-6" style={{ padding: 30 }}>
            {/* <img src={feet} style={{width: "100%", borderRadius:15}} /> */}
          </div>
          <div
            className="col-sm-5 offset-sm-2 col-md-6 offset-md-0"
            style={{ padding: 30 }}
          >
            <article
              className="article"
              style={{ backgroundColor: "#C4B691", margin: 90 }}
            >
              <p className="header">Book a ride,</p>
              <p className="header">kick back,</p>
              <p className="header">and leave the driving to us</p>
            </article>
          </div>
        </div>
      </div>
      <div style={{ padding: 50 }}></div>
    </>
  );
}
