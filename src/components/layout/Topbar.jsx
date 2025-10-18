import React from "react";
import { Layout, Button, Typography } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

export default function Topbar({ collapsed, onToggle }) {
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
        background: "#fff",
        boxShadow: "0 2px 8px #f0f1f2",
        display: "flex",
        alignItems: "center",
      }}
    >
      
      
    </Header>
  );
}
