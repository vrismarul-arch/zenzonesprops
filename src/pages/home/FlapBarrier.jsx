import React, { useState } from "react";
import { Image, Typography, Card, Row, Col, Button } from "antd";
import { PhoneOutlined, FileTextOutlined } from "@ant-design/icons";
import product1 from "../home/Flap Barrier/image1.jpg";
import product2 from "../home/Flap Barrier/image2.jpg";
import product3 from "../home/Flap Barrier/flap3.jpg";

// ✅ Import brand logos
import esslLogo from "../home/logos/essl.png";
import zktecoLogo from "../home/logos/zkteco.png";
import cameLogo from "../home/logos/came.png";
import hikvisionLogo from "../home/logos/hikvision.png";
import honeywellLogo from "../home/logos/honeywell.png";

import "./ProductDetails.css";

const FlapBarrier = () => {
  const [mainImage, setMainImage] = useState(product1);
  const [selectedBrand, setSelectedBrand] = useState("eSSL");

  // Brand-specific content
  const brandData = {
    eSSL: {
      title: "eSSL Flap Barrier",
      desc: "eSSL Flap Barriers provide secure, fast, and reliable access control for industrial, commercial, and residential environments.",
    },
    ZKTeco: {
      title: "ZKTeco Flap Barrier",
      desc: "ZKTeco Flap Barriers offer intelligent access control with modern safety features for commercial and government applications.",
    },
    CAME: {
      title: "CAME Flap Barrier",
      desc: "CAME Flap Barriers are engineered with precision and reliability for heavy-duty vehicle and pedestrian management.",
    },
    Hikvision: {
      title: "Hikvision Flap Barrier",
      desc: "Hikvision automated barriers integrate AI monitoring and smart security features for modern traffic management.",
    },
    Honeywell: {
      title: "Honeywell Flap Barrier",
      desc: "Honeywell Flap Barriers combine robust construction with smooth electronic controls for safe and efficient access management.",
    },
  };

  const brandLogos = [
    { name: "eSSL", logo: esslLogo },
    { name: "ZKTeco", logo: zktecoLogo },
    { name: "CAME", logo: cameLogo },
    { name: "Hikvision", logo: hikvisionLogo },
    { name: "Honeywell", logo: honeywellLogo },
  ];

  const handleCall = () => {
    window.location.href = "tel:+919952150059";
  };

  const handleQuote = () => {
    window.open(
      "https://n8n-en7m.onrender.com/form/a4c5e822-a7b6-456a-aeba-e1ae7211bd91",
      "_blank"
    );
  };

  return (
    <div className="product-page">
      {/* Title Section */}
      <div className="product-title">
        <h1 className="title-heading">{brandData[selectedBrand].title}</h1>
        <p className="title-subtext">{brandData[selectedBrand].desc}</p>
      </div>

      {/* Image Gallery */}
      <Card bordered={false} className="image-card">
        <div className="gallery-grid">
          <div className="gallery-main">
            <div className="image-wrapper">
              <Image
                src={mainImage}
                alt="Main product"
                className="gallery-main-img"
                style={{ height: "400px" }}
              />
              <div className="badge">
                <span className="number">100%</span>
                <span className="label">GUARANTEE</span>
              </div>
            </div>
          </div>
          <div className="gallery-thumbs">
            {[product1, product2, product3].map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className="gallery-thumb"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Brand Variants */}
              <div className="brand-variant-section">
                              <h2 className="brand-variant-title"> We Have This Kind of  Brand Variants</h2>



        <div className="brand-logos">
          {brandLogos.map((brand) => (
            <img
              key={brand.name}
              src={brand.logo}
              alt={brand.name}
              className={`brand-logo ${
                selectedBrand === brand.name ? "active" : ""
              }`}
              onClick={() => setSelectedBrand(brand.name)}
            />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="product-details">
        <Row gutter={[24, 24]} className="details-row">
          <Col xs={24} md={12} lg={8}>
            <Card title="Key Features" bordered={false} className="info-card">
              <ul>
                <li>Robust construction with long lifecycle components</li>
                <li>Advanced control system compatible with third-party integrations</li>
                <li>Safety features including sensors and emergency release options</li>
                <li>Suitable for both indoor and outdoor installations</li>
                <li>Low maintenance design with easy serviceability</li>
              </ul>
            </Card>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Card title="Technical Specifications" bordered={false} className="info-card">
              <ul>
                <li>Power Supply: AC 220V ±10%, 50Hz</li>
                <li>Operating Temperature: -20°C to +60°C</li>
                <li>Material: Stainless Steel / Alloy Housing</li>
                <li>Operation Mode: Automatic / Manual Override</li>
                <li>Control Interface: Remote / RFID / Access Controller</li>
              </ul>
            </Card>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Card title="Variants / Model Options" bordered={false} className="info-card">
              <ul>
                <li className="variet">{selectedBrand} Standard Model</li>
                <li  className="variet">{selectedBrand} Pro Series (High-Speed)</li>
                <li  className="variet">{selectedBrand} Heavy-Duty Model</li>
                <li className="variet">Custom configurations available upon request</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Sticky Footer */}
      <div className="sticky-footer">
        <Button
          type="primary"
          icon={<PhoneOutlined />}
          className="btn-call"
          onClick={handleCall}
        >
          Call Now
        </Button>
        <Button
          type="default"
          icon={<FileTextOutlined />}
          className="btn-quote"
          onClick={handleQuote}
        >
          Get Quote
        </Button>
      </div>
    </div>
  );
};

export default FlapBarrier;
