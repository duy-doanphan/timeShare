import React, { useEffect } from "react";
import "./main.css";
import img from "../../../Assets/img.jpg";
import img2 from "../../../Assets/img (2).jpg";
import img3 from "../../../Assets/img (3).jpg";
import img4 from "../../../Assets/img (4).jpg";

import Aos from "aos";
import "aos/dist/aos.css";
import { IoLocationOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";

const Data = [
  {
    id: 1,
    imgSrc: img,
    desTitle: "Da Lat",
    location: "Viet Nam",
    grade: "Relax",
    fees: "500K",
    description:
      "Dalat is the land of flowers and fog, because of the romantic and lyrical space that Dalat has become one of the most attractive tourist attractions in Vietnam. Here are the 5 most beautiful homestay in Da Lat for your visit and stay",
  },

  {
    id: 2,
    imgSrc: img2,
    desTitle: "Da Nang",
    location: "Viet Nam",
    grade: "Relax",
    fees: "1M",
    description:
      "Situated in Da Nang, 600 metres from My Khe Beach and 1.1 km from Bac My An Beach, N Home offers a garden and air conditioning. This beachfront property offers access to a balcony and free WiFi. Love Lock Bridge Da Nang is 2.8 km away and Cham Museum is 3.5 km from the homestay.",
  },
  {
    id: 3,
    imgSrc: img3,
    desTitle: "Ha Long",
    location: "Viet Nam",
    grade: "Relax",
    fees: "1M",
    description:
      "Situated in Ha Long, 600 metres from Queen Cable Car Station, The Bay - Ha Long Homestay features free WiFi, and guests can enjoy in the balcony or lush common area",
  },
  {
    id: 1,
    imgSrc: img4,
    desTitle: "Phu Quoc",
    location: "Viet Nam",
    grade: "Relax",
    fees: "1M5",
    description:
      "Situated in Phu Quoc Island, Seashells Phu Quoc Hotel & Spa offers contemporary rooms with free WiFi access in Duong Dong town.",
  },
  {
    id: 2,
    imgSrc: img4,
    desTitle: "Phu Quoc",
    location: "Viet Nam",
    grade: "Relax",
    fees: "$3000",
    description:
      "Situated in Phu Quoc Island, Seashells Phu Quoc Hotel & Spa offers contemporary rooms with free WiFi access in Duong Dong town.",
  },
  {
    id: 3,
    imgSrc: img4,
    desTitle: "Phu Quoc",
    location: "Viet Nam",
    grade: "Relax",
    fees: "$3000",
    description:
      "Situated in Phu Quoc Island, Seashells Phu Quoc Hotel & Spa offers contemporary rooms with free WiFi access in Duong Dong town.",
  },
];
const Main = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="main container section">
      <div className="secTitle">
        <h3 data-aos="fade-up" className="title">
          TOP HOMESTAY
        </h3>
      </div>

      <div className="secContent grid">
        { }
        {Data.map(
          ({ id, imgSrc, desTitle, location, grade, fees, description }) => {
            return (
              <div key={id} data-aos="fade-up" className="singleDestination">
                <div class="new-ribbon secondary">{fees}</div>
                <div className="imageDiv">
                  <img src={imgSrc} alt={desTitle} />
                </div>

                <div className="cardInfo">
                  <div className="cardBody-title">
                    <div>
                      <h1 className="destTitle">{desTitle}</h1>
                      <span className="continent flex">
                        <IoLocationOutline className="icon" />
                        <span className="name">{location}</span>
                      </span>
                    </div>
                    <div className="grade">
                      <span style={{ fontSize: "0.85rem" }}>
                        <IoHeart style={{ fontSize: "1.8rem", color: "red" }} />
                        {grade}
                        {/* <small>1</small> */}
                      </span>
                    </div>
                  </div>

                  <div className="desc">
                    <p>{description}</p>
                  </div>

                  <div className="fees flex">
                    <button className="btn flex">Details</button>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};
export default Main;
