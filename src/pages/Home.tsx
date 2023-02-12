import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-5 mt-5">
      <img
        src="public/imgs/everythingstore.png"
        alt="storebanner"
        style={{
          height: "500px",
          width: "1000px",
          objectFit: "cover",
          borderRadius: "5%",
        }}
      />
      <Button className="btn-lg">
        <Link to="/store" className="text-decoration-none  text-white">
          Store
        </Link>
      </Button>
    </div>
  );
};

export default Home;
