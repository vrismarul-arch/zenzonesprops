import React, { useState } from "react";
import { Image, Typography, Card, Row, Col, Button } from "antd";
import { PhoneOutlined, FileTextOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import product1 from "../home/image/product.png";
import product2 from "../home/image/produt2.png";
import product3 from "../home/image/produt3.png";
import "./ProductDetails.css";

const { Paragraph } = Typography;

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(product1);
  const navigate = useNavigate();

  const handleCall = () => {
    window.location.href = "tel:+919952150059";
  };

  const handleQuote = () => {
    // You probably want to open external URL
    window.open(
      "https://n8n-en7m.onrender.com/form/809256a5-0f50-47e8-930c-6ebe6ce2981e",
      "_blank"
    );
  };

  return (
    <div className="product-page">
      {/* Title Section */}
      <div className="product-title">
        <h1 className="title-heading">
          Boom Barrier (<span>BB-Radar</span>)
        </h1>
        <p className="title-subtext">
          Premium vehicle detection sensor with stable performance
        </p>
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

      {/* Product Highlights & Technical Specs */}
      <div className="product-details">
        <Row gutter={[24, 24]} className="details-row">
          <Col xs={24} md={12} lg={8}>
            <Card title="Product Highlights" bordered={false} className="info-card">
              <h3>Variants / Model Options:</h3>
              <ul>
                <li>eSSL Standard Model</li>
                <li>eSSL Pro Series (High-Speed)</li>
                <li>eSSL Heavy-Duty Model</li>
                <li>Custom configurations available upon request</li>
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
            <Card title="Features" bordered={false} className="info-card">
              <Paragraph>BB-Radar</Paragraph>
              <Paragraph>Category: Boom Barrier</Paragraph>
              <ul>
                <li>Detection Distance: 1-6M (default 3M)</li>
                <li>Detection Width: 0.5-1.5M (Right/Left)</li>
                <li>Working Frequency: 79GHz</li>
                <li>Supply Voltage: 9-24VDC (12VDC)/1A</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Sticky Footer Buttons */}
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

export default ProductDetails;
