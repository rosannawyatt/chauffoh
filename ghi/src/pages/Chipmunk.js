import chippy from "../images/chipmunk.webp";
import Footer from "../components/Footer";

const Chipmunk = () => {

  return (
    <>
      <div className="chippy-body">
        <div>
          <img className="chipmunk-image" src={chippy} alt="man getting attacked by giant chipmunk" />
        </div>
        <div className="row">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Chipmunk;