// Sidebar.jsx
import React from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined, BarChartOutlined, TeamOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import logoCollapsed from "../../assets/vrismsmall.png";
import logoExpanded from "../../assets/vrism.png";

const { Sider } = Layout;

export default function Sidebar({ collapsed, onCollapse }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Map paths to menu keys
  const pathToKey = {
    "/admin/dashboard": "1",
    "/admin/leads": "2",
    "/admin/leads": "3",
  };

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "1":
        navigate("/admin/dashboard");
        break;
      case "2":
        navigate("/admin/leads");
        break;
      case "3":
        navigate("/admin/leads");
        break;
      default:
        break;
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      theme="light"
      width={220}
      style={{
        height: "100vh",        // Full viewport height
        position: "sticky",      // Sticky to the side
        top: 0,
        backgroundColor: "#ffffff",
        overflow: "auto",
      }}
    >
      {/* Logo */}
      <div
        className="logo"
        style={{
          height: 64,
          textAlign: "center",
          padding: "16px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={collapsed ? logoCollapsed : logoExpanded}
          alt="Logo"
          style={{ height: 32 }}
        />
        {!collapsed && (
          <span
            style={{
              color: "#0E2C44", // Dark blue text
              fontWeight: "bold",
              marginLeft: 8,
              fontSize: 18,
            }}
          >
           
          </span>
        )}
      </div>

      {/* Menu */}
      <Menu
        theme="light"
        selectedKeys={[pathToKey[location.pathname]]}
        mode="inline"
        onClick={handleMenuClick}
        items={[
          { key: "1", icon: <HomeOutlined style={{ color: "#0E2C44" }} />, label: "Dashboard" },
          { key: "2", icon: <BarChartOutlined style={{ color: "#0E2C44" }} />, label: "Analytics" },
          { key: "3", icon: <TeamOutlined style={{ color: "#0E2C44" }} />, label: "Leads" },
        ]}
        style={{
          backgroundColor: "#ffffff",
          color: "#0E2C44",
        }}
      />
    </Sider>
  );
}
