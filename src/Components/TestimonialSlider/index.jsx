import React from "react";
import "./style.css";
import img1 from "../../assets/testimonial-1.png";
import img2 from "../../assets/profile1.png";
import img3 from "../../assets/profile2.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function TestimonialSlider() {
  return (
    <div className="testimonial-section py-5">
      <div
        id="testimonialCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {/* Testimonial 1 */}
          <div className="carousel-item active">
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center testimonial-card">
              <div className="col-md-2 text-center text-md-start">
                <img src={img1} alt="Person" className="rounded-circle mb-3" />
                <h5>John Doe</h5>
                <p>Founder & CEO</p>
              </div>
              <div className="col-md-10">
                <p className="testimonial-text fst-italic">
                  "Launchify is a standout platform offering a unique deal flow
                  with access to pitch decks, FAQs, and video pitches, setting
                  it apart from competitors. Its extensive database provides
                  insights and connections beyond what platforms like Dealroom
                  or PitchBook offer. With great UX, a strong pipeline, and a
                  highly engaged team, Launchify excels in supporting founders
                  through valuable updates, events, and market insights."
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="carousel-item">
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center testimonial-card">
              <div className="col-md-2 text-center text-md-start">
                <img src={img2} alt="Person" className="rounded-circle mb-3" />
                <h5>Jane Smith</h5>
                <p>Founder & CEO</p>
              </div>
              <div className="col-md-10">
                <p className="testimonial-text fst-italic">
                  "Launchify has revolutionized how we connect with startups.
                  The platform’s in-depth data, pitch deck access, and seamless
                  communication tools offer more than just project information.
                  Their proactive team, insightful updates, and engaging events
                  create a strong support network that goes beyond other
                  platforms."
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="carousel-item">
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center testimonial-card">
              <div className="col-md-2 text-center text-md-start">
                <img src={img3} alt="Person" className="rounded-circle mb-3" />
                <h5>Michael Lee</h5>
                <p>Founder & CEO</p>
              </div>
              <div className="col-md-10">
                <p className="testimonial-text fst-italic">
                  "StartupLink delivers unmatched value by providing deep
                  insights, access to key startup materials, and smooth
                  connections. The user-friendly interface, coupled with expert
                  market insights and a dedicated community, makes it the
                  perfect platform for founders and investors alike."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Previous and Next Buttons */}
        <div className="carousel-controls">
          <a
            className="carousel-control-prev"
            href="#testimonialCarousel"
            role="button"
            data-bs-slide="prev"
          >
            <i className="fas fa-chevron-left"></i>
            <span className="visually-hidden">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#testimonialCarousel"
            role="button"
            data-bs-slide="next"
          >
            <i className="fas fa-chevron-right"></i>
            <span className="visually-hidden">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TestimonialSlider;
