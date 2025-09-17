import React, { useState } from "react";
import { Modal, Collapse } from "antd";
import "./RealEstateSection.css";
import FormPage from "../../FormPage";
import heroVideo from "./ZZ Prop V2.mp4";

const { Panel } = Collapse;

const RealEstateSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <div className="why-choose">
      <section className="section curent-container">
        <div className="container">
          {/* Text Content */}
          <div className="text-content">
            <h2>A sneak peek at your property</h2>
            <h3>Take a look at the property // Have a look at the property// here and book your visit soon</h3>
 <div className="buttons">
              <button className="btn-primary" onClick={showModal}>
                Schedule a Site Visit NOW!
              </button>
            </div>
            {/* Accordion */}
            <Collapse accordion className="custom-accordion">
              <Panel header="About the Property" key="1">
                <p>
                  Looking for a fully furnished 2BHK apartment in the prime location of <strong>Perungudi</strong>? We've got the perfect match for you, whether you're searching for a <strong>smart stay</strong> or a <strong>strong investment</strong>. This apartment offers:
                </p>
              </Panel>
              <Panel header="Key Features" key="2">
                <ul>
                  <li><strong>Spacious Living:</strong> 1070 sq. ft. of built-up area.</li>
                  <li><strong>High Value:</strong> Undivided share (UDS) of 535 sq. ft.</li>
                  <li><strong>Prime Location:</strong> First floor, lift facility, east-facing.</li>
                  <li><strong>Hassle-Free Ownership:</strong> Property management included.</li>
                </ul>
              </Panel>
              <Panel header="Investment Potential" key="3">
                <p>
                  Perfect investment for those looking to grow their business portfolio.
                </p>
              </Panel>
            </Collapse>

            {/* Button */}
            

            {/* Stats */}
            <div className="stats">
              <div>
                <p>1070+</p>
                <p>Sq. Ft.</p>
              </div>
              <div>
                <p>535+</p>
                <p>UDS</p>
              </div>
              <div>
                <p>2</p>
                <p>BHK</p>
              </div>
            </div>
           
          </div>

          {/* Video */}
          <div className="video-container">
            <video src={heroVideo} controls />
          </div>
        </div>
      </section>

      {/* Modal Form */}
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null} closable={true}>
        <FormPage />
      </Modal>
    </div>
  );
};

export default RealEstateSection;
