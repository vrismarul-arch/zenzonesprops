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
          <h3>Luxury facilities</h3>
          <p>
            The advantage of hiring a workspace with us is that it gives you 
            comfortable service and all-around facilities.
          </p>
          <a href="#">More Info →</a>
        </div>

        <div className="why-card">
          <h3>Affordable Price</h3>
          <p>
            You can get a workspace of the highest quality at an affordable price 
            and still enjoy the facilities that are only here.
          </p>
          <a href="#">More Info →</a>
        </div>

        <div className="why-card">
          <h3>Many Choices</h3>
          <p>
            We provide many unique workspace choices so that you can choose the 
            workspace to your liking.
          </p>
          <a href="#">More Info →</a>
        </div>
      </div>
    </section>
  );
}