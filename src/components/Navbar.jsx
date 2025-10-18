import { useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const items = [
    {
      key: "admin-login",
      label: "Admin Login",
      onClick: () => navigate("/admin/login"),
    },
    {
      key: "form",
      label: "Booking Form",
      onClick: () => navigate("/form"),
    },
  ];

  return (
    <nav className="navbar">
      {/* Logo left */}
      <div className="navbar-left">
        <img src="logo.png" alt="Zenzones Logo" className="logo-img" />
      </div>

      {/* Right side */}
      <div className="navbar-right">
        

        {/* Ant Design Avatar Dropdown */}
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <Space>
 <Avatar 
      size="large" 
      icon={<UserOutlined />} 
      style={{ backgroundColor: "#2e4bce", color: "#fff" }} 
    />          </Space>
        </Dropdown>
      </div>
    </nav>
  );
}
