import React, { useState } from "react";
import Slider from "react-slick";
import herobg from "./projects.png"; // Replace with your actual image
import leftArrow from "./lefticon.png"; // custom left arrow
import rightArrow from "./righticon.png"; // custom right arrow
import "./Curentproject.css";

// Residence images
const residences = [
  { image: herobg, alt: "Modern residence exterior 1" },
  { image: herobg, alt: "Modern residence exterior 2" },
  { image: herobg, alt: "Modern residence exterior 3" },
  { image: herobg, alt: "Modern residence exterior 4" },
];

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
  <button className="slick-arrow custom-arrow right" onClick={onClick}>
    <img src={rightArrow} alt="Next" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button className="slick-arrow custom-arrow left" onClick={onClick}>
    <img src={leftArrow} alt="Previous" />
  </button>
);

const Curentproject = () => {
  const [previewIndex, setPreviewIndex] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const handlePrev = () =>
    setPreviewIndex((prev) =>
      prev === 0 ? residences.length - 1 : prev - 1
    );

  const handleNext = () =>
    setPreviewIndex((prev) =>
      prev === residences.length - 1 ? 0 : prev + 1
    );

  return (
    <div className="why-choose">
    <div className="curent-container">
      <div className="curent-header">
        <h2 className="curent-title">Your property, fully managed.</h2>
      </div>

      {/* Slider */}
      <Slider {...settings}>
        {residences.map((residence, index) => (
          <div
            key={index}
            className="curent-card"
            onClick={() => setPreviewIndex(index)}
          >
            <img
              src={residence.image}
              alt={residence.alt}
              className="curent-image"
            />
          </div>
        ))}
      </Slider>

      {/* Preview Modal */}
      {previewIndex !== null && (
        <div
          className="preview-overlay"
          onClick={() => setPreviewIndex(null)}
        >
          <div
            className="preview-content"
            onClick={(e) => e.stopPropagation()}
          >
            

            <img
              src={residences[previewIndex].image}
              alt={residences[previewIndex].alt}
              className="preview-img"
            />


            <button
              className="preview-close"
              onClick={() => setPreviewIndex(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div></div>
  );
};

export default Curentproject;
