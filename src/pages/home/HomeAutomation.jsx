import React, { useState } from "react";
import { Image, Typography, Card, Row, Col, Button } from "antd";
import { PhoneOutlined, FileTextOutlined } from "@ant-design/icons";
import product1 from "../home/Baggage Scanner/baggage3.jpg";
import product2 from "../home/Baggage Scanner/baggage2.jpg";
import product3 from "../home/Baggage Scanner/baggage1.jpg";
import esslLogo from "../home/logos/essl.png";
import zktecoLogo from "../home/logos/zkteco.png";
import cameLogo from "../home/logos/came.png";
import hikvisionLogo from "../home/logos/hikvision.png";
import honeywellLogo from "../home/logos/honeywell.png";
import "./ProductDetails.css";

const { Paragraph } = Typography;

const BaggageScanner = () => {
  const [mainImage, setMainImage] = useState(product1);
  const [selectedBrand, setSelectedBrand] = useState("eSSL");

  const handleCall = () => {
    window.location.href = "tel:+919952150059";
  };

  const handleQuote = () => {
    window.open("/enquiryform", "_blank");
  };

  // ✅ Brand data
  const brandData = {
    eSSL: {
      title: "eSSL Baggage Scanner",
      desc: "eSSL baggage scanners deliver advanced security imaging with high-speed scanning and AI-based threat detection for airports, offices, and malls.",
    },
    ZKTeco: {
      title: "ZKTeco Baggage Scanner",
      desc: "ZKTeco provides intelligent scanning systems with clear imaging, X-ray precision, and reliability for professional security applications.",
    },
    CAME: {
      title: "CAME Baggage Scanner",
      desc: "CAME offers heavy-duty baggage scanners with European design, ensuring long-term reliability and exceptional image clarity.",
    },
    Hikvision: {
      title: "Hikvision Baggage Scanner",
      desc: "Hikvision scanners integrate cutting-edge imaging and AI algorithms for accurate and secure baggage inspection.",
    },
    Honeywell: {
      title: "Honeywell Baggage Scanner",
      desc: "Honeywell’s smart baggage scanners combine durability, speed, and innovation for modern safety management systems.",
    },
  };

  const brandLogos = [
    { name: "eSSL", logo: esslLogo },
    { name: "ZKTeco", logo: zktecoLogo },
    { name: "CAME", logo: cameLogo },
    { name: "Hikvision", logo: hikvisionLogo },
    { name: "Honeywell", logo: honeywellLogo },
  ];

  return (
    <div className="product-page">
      {/* ✅ Title Section */}
      <div className="product-title">
        <h1 className="title-heading">{brandData[selectedBrand].title}</h1>
        <p className="title-subtext">{brandData[selectedBrand].desc}</p>
      </div>

      {/* ✅ Image Gallery */}
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

      {/* ✅ Brand Variant Section */}
      <div className="brand-variant-section" style={{ textAlign: "center", marginTop: "40px" }}>
        <h2 className="brand-variant-title">We Have This Kind of Brand Variants</h2>
        <div
          className="brand-logos"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "25px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {brandLogos.map((brand) => (
            <img
              key={brand.name}
              src={brand.logo}
              alt={brand.name}
              className={`brand-logo ${selectedBrand === brand.name ? "active" : ""}`}
              onClick={() => setSelectedBrand(brand.name)}
              style={{
                height: "60px",
                objectFit: "contain",
                cursor: "pointer",
                border:
                  selectedBrand === brand.name
                    ? "2px solid #722ed1"
                    : "2px solid transparent",
                borderRadius: "12px",
                padding: "8px",
                backgroundColor:
                  selectedBrand === brand.name ? "#f9f5ff" : "transparent",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* ✅ Product Details */}
      <div className="product-details">
        <Row gutter={[24, 24]} className="details-row">
          <Col xs={24} md={12} lg={8}>
            <Card title="Key Features" bordered={false} className="info-card">
              <ul>
                <li>High-resolution X-ray imaging for enhanced detection</li>
                <li>Automatic threat alert with AI recognition</li>
                <li>Fast scanning throughput for high-traffic areas</li>
                <li>Durable conveyor design and compact footprint</li>
                <li>Easy maintenance and operator-friendly interface</li>
              </ul>
            </Card>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Card title="Technical Specifications" bordered={false} className="info-card">
              <ul>
                <li>Power Supply: AC 220V ±10%, 50Hz</li>
                <li>Operating Temperature: -20°C to +60°C</li>
                <li>Scan Mode: Dual Energy X-ray</li>
                <li>Resolution: 0.1 mm Wire Detectable</li>
                <li>Interface: Ethernet / USB / Remote Monitor</li>
              </ul>
            </Card>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Card title="Variants / Model Options" bordered={false} className="info-card">
              <ul>
                <li>{selectedBrand} Compact Model</li>
                <li>{selectedBrand} Pro Series (High Speed)</li>
                <li>{selectedBrand} Advanced AI Model</li>
                <li>Custom configurations available upon request</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </div>

      {/* ✅ Sticky Footer Buttons */}
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

export default BaggageScanner;
