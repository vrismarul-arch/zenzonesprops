    import React from "react";
import "./WhatsAppFloating.css";

const WhatsAppFloating = () => {
  const phoneNumber = "919790984055"; // Replace with your number
  const message = "Hello! I would like to know more about your products.";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
      />
    </a>
  );
};

export default WhatsAppFloating;
