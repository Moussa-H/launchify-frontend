import React from "react";
import "./style.css";
import img1 from "../../assets/testimonial-1.png";
import img2 from "../../assets/testimonial-1.png";
import img3 from "../../assets/testimonial-1.png";
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
                  "Launchify is the best platform I have ever used. It provides
                  a unique deal flow not just with raw project information but
                  also as the ultimate destination for accessing pitch decks,
                  FAQs, or video pitches. With its extensive database, Vestbee
                  goes beyond platforms like Dealroom or PitchBook, offering
                  unique insights and seamless connections with founders
                  otherwise unavailable. Vestbee's value goes way beyond the
                  software, great UX, and a strong pipeline. Their committed,
                  engaged, and responsive team, strong community, amazing
                  events, and invaluable updates and market insights make this
                  platform a must-go!"
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
                <p>Investor</p>
              </div>
              <div className="col-md-10">
                <p className="testimonial-text fst-italic">
                  "Launchify is the best platform I have ever used. It provides
                  a unique deal flow not just with raw project information but
                  also as the ultimate destination for accessing pitch decks,
                  FAQs, or video pitches. With its extensive database, Vestbee
                  goes beyond platforms like Dealroom or PitchBook, offering
                  unique insights and seamless connections with founders
                  otherwise unavailable. Vestbee's value goes way beyond the
                  software, great UX, and a strong pipeline. Their committed,
                  engaged, and responsive team, strong community, amazing
                  events, and invaluable updates and market insights make this
                  platform a must-go!"
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
                <p>Mentor & Advisor</p>
              </div>
              <div className="col-md-10">
                <p className="testimonial-text fst-italic">
                  "Launchify is the best platform I have ever used. It provides
                  a unique deal flow not just with raw project information but
                  also as the ultimate destination for accessing pitch decks,
                  FAQs, or video pitches. With its extensive database, Vestbee
                  goes beyond platforms like Dealroom or PitchBook, offering
                  unique insights and seamless connections with founders
                  otherwise unavailable. Vestbee's value goes way beyond the
                  software, great UX, and a strong pipeline. Their committed,
                  engaged, and responsive team, strong community, amazing
                  events, and invaluable updates and market insights make this
                  platform a must-go!"
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
