import "./WhyChooseUs.css";

export default function WhyChooseUs() {
  return (
    <section className="why-choose">
      {/* Left Title */}
      <div className="why-left">
        <h2>Why <br /> Choosing Us</h2>
      </div>

      {/* Right Cards */}
      <div className="why-right">
        <div className="why-card">
          <h3>Your trusted partner</h3>
          <p>
            The advantage of hiring a workspace with us is that it gives you 
            comfortable service and all-around facilities.
          </p>
        </div>

        <div className="why-card">
          <h3>End-to-End Support</h3>
          <p>
            From site visits to documentation, loans, and even rental management, we handle everything for you.
          </p>
        </div>

        <div className="why-card">
          <h3>Profitable Investments</h3>
          <p>
           Properties that combine lifestyle comfort with assured long-term returns.

          </p>
        </div>
      </div>
    </section>
  );
}