import "./Hero.css";
import herobg from "./hero.png";
import React, { useState } from "react";
import { Modal } from "antd";
import FormPage from "../../FormPage";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <section className="hero">
      {/* Left Content */}
      <div className="hero-content">
        <p className="hero-subtitle">Welcome to ZenZones</p>
        <h1 className="hero-title">
          Own a Fully Furnished 2BHK in Perungudi
          <br /> Earn Rental Income from Day 1
        </h1>
        <p className="hero-text">
          This 1070 sq.ft, fully furnished 2BHK with a ready PG setup gives you
          instant monthly cash flow and long-term appreciation.
        </p>

        {/* Button to trigger modal */}
        <div className="hero-buttons">
          <button className="btn-primary" onClick={showModal}>
            Visit NOW!
          </button>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="hero-image">
        <img src={herobg} alt="Modern Property" className="hero-house" />
      </div>

      {/* Modal Form */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closable={true}
        className="glass-modal"
        centered
      >
        <FormPage />
      </Modal>
    </section>
  );
}
