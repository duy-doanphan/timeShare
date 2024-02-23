import React, { useEffect } from "react";
import "./filter.css";
// import video from '../../Assets/video.mp4'
import {
  IoLocationOutline,
  IoAlarmOutline,
  IoPricetagsOutline,
} from "react-icons/io5";
import { HiFilter } from "react-icons/hi";
import { IoLogoFacebook } from "react-icons/io";
import { FaInstagramSquare } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { FaListAlt } from "react-icons/fa";
import { TbApps } from "react-icons/tb";

import Aos from "aos";
import "aos/dist/aos.css";

const Filters = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="home">
      <div className="overlay"></div>
      {/* <video src={video} muted autoPlay loop
                type="video/mp4"></video> */}
      <div className="homeContent container">
        <div className="hero-image_quote-container">
          <div class="hero-image_quote">
            <div class="hero-image_quote-photo">
              <img
                width="179"
                height="157"
                src="https://cdn5.redweek.com/img/heroes/home/testimonial-kym_3.jpg?iHvN8LAoj49dvIOXfakPbg"
                className="lazy"
                alt=""
              />{" "}
            </div>
            <blockquote class="hero-image_quote-text">
              Welcome to our Timeshare Vacation ! Discover a world of
              luxury and relaxation with our premium timeshare offerings.
              Whether you're seeking a beachfront paradise, a mountain retreat,
              or a vibrant city escape, we have the perfect vacation property
              for you. Our mission is to provide you with unforgettable holiday
              experiences. Explore our diverse range of timeshare options,
              exceptional services, and dedicated customer support. Rent
              timeshares with us and make every vacation a memorable adventure.
            </blockquote>
            <div class="hero-image_quote-author-container">
              <cite class="hero-image_quote-author">Kym &amp; Chris </cite>
              <time class="hero-image_quote-date" datetime="2015">
                Members since 2015
              </time>
            </div>
          </div>
        </div>
      </div>
      <div className="searchBox">
        <div data-aos="fade-up" className="cardDiv grid">
          <div className="destinationInput">
            <label htmlFor="city">
              {" "}
              <IoLocationOutline className="icon" />
              <div style={{ width: "4px" }}></div>
              Search your timeshare:
            </label>
            <div className="input flex">
              <input type="text" placeholder="Enter name here...."></input>
            </div>
          </div>
          <div className="dateInput">
            <label htmlFor="date">
              {" "}
              <IoAlarmOutline className="icon" />
              <div style={{ width: "4px" }}></div>
              Select your Date:
            </label>
            <div className="input flex">
              <input type="date" placeholder="Enter name here...."></input>
            </div>
          </div>
          <div className="Price">
            <div className="label_total flex">
              <IoPricetagsOutline className="icon" />
              <div style={{ width: "4px" }}></div>
              <label htmlFor="price">Max price:&nbsp;</label>
              <p className="total">5M</p>
            </div>
            <div className="input flex">
              <input type="range" max="10000" min="1000"></input>
            </div>
          </div>
          <button className="buttonFilterAction">SEARCH</button>
        </div>
        <div data-aos="fade-up" className="homeFooterIcons flex">
          <div className="searchOptions">
            <HiFilter className="icon" />
            <span>MORE FILTER</span>
          </div>
          <div className="rightIcons">
            <IoLogoFacebook className="icon" />
            <FaInstagramSquare className="icon" />
            <SiZalo className="icon" />
          </div>
          <div className="leftIcons">
            <FaListAlt className="icon" />
            <TbApps className="icon" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Filters;
