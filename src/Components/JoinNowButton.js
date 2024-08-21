
import React from "react";
import { Link } from "react-router-dom";


function JoinNowButton() {
  return (
    <Link className="btn btn-primary mr-4" to="/sign-up">
      Join now
    </Link>
  );
}

export default JoinNowButton;
