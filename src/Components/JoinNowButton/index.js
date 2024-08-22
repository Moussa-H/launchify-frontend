
import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

function JoinNowButton() {
  return (
    <Link className="btn btn-primary custom-btn" to="/sign-up">
      Join now
    </Link>
  );
}

export default JoinNowButton;
