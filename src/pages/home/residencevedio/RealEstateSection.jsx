import React, { useState } from "react";
import { Modal, Collapse } from "antd";
import "./RealEstateSection.css";
import FormPage from "../../FormPage";

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
            <h2>Get a Closer Look at Your Future Property</h2>
            <h3>
              Explore the details, discover the highlights, and see why this is
              the right investment for you.
            </h3>

            <div className="buttons">
              <button className="btn-primary" onClick={showModal}>
                Visit NOW!
              </button>
            </div>

            {/* Accordion */}
            <Collapse accordion className="custom-accordion"style={{width: '500px', marginTop: '20px'}}>
              <Panel header="About the Property" key="1">
                <p>
                  A <strong>2BHK investment-ready apartment</strong> in Perungudi,
                  offering <strong>1070 sq. ft. built-up area</strong> and{" "}
                  <strong>535 sq. ft. UDS share</strong>, making it a reliable
                  long-term asset. Located on the 1st floor with lift access, the
                  property also benefits from an active PG setup on the 2nd floor —
                  giving investors an opportunity for{" "}
                  <strong>instant rental income</strong>. With its prime location in
                  Chennai’s IT corridor, this property isn’t just real estate —
                  it’s a <strong>steady income generator with assured appreciation</strong>.
                </p>
              </Panel>

              <Panel header="Key Highlights" key="2">
                <ul>
                  <li>
                    <strong>Built-up Area:</strong> 1070 sq. ft.
                  </li>
                  <li>
                    <strong>UDS Share:</strong> 535 sq. ft.
                  </li>
                  <li>
                    <strong>Floor & Access:</strong> First floor with lift facility.
                  </li>
                  <li>
                    <strong>Active Setup:</strong> PG already running on the 2nd floor.
                  </li>
                </ul>
              </Panel>

              <Panel header="Investment Potential" key="3">
                <ul>
                  <li>Instant rental income through existing PG setup.</li>
                  <li>Located in Chennai’s fast-growing IT corridor.</li>
                  <li>Strong resale and appreciation prospects.</li>
                  <li>Secure investment with easy EMI options.</li>
                </ul>
              </Panel>
            </Collapse>

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
  <video
    controls
    autoPlay
    loop
    muted
    playsInline
    style={{
      height: "600px",
      borderRadius: "12px",
      objectFit: "contain"
    }}
  >
    <source 
      src="https://bwglgjteqloufayiaadv.supabase.co/storage/v1/object/public/retrowoods/Perung%20Zen%20zones%20Layout.mp4" 
      type="video/mp4" 
    />
    Your browser does not support the video tag.
  </video>
</div>

        </div>
      </section>

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
    </div>
  );
};

export default RealEstateSection;
