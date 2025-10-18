import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import DashboardSheet from "../../pages/Dashboard/DashboardSheet";

const { Content } = Layout;

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />

      <Layout className="site-layout">

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            borderRadius: 8,
          }}
        >
          <DashboardSheet />
        </Content>
      </Layout>
    </Layout>
  );
}
