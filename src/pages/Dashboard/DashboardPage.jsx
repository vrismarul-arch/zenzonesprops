import { useEffect, useState } from "react";
import { api } from "../../api/api";
import {
  Table, Button, Select, Space, Tabs, Popconfirm, Modal,
  Card, Typography, Drawer, Image, Dropdown, Menu,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const { Title, Text } = Typography;

export default function DashboardPage({ onLogout }) {
  const [entries, setEntries] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [currentEntry, setCurrentEntry] = useState(null); 
  const [statusUpdating, setStatusUpdating] = useState(false); 
  const [profileVisible, setProfileVisible] = useState(false); 
  const [profile, setProfile] = useState(null); 
  const [drawerVisible, setDrawerVisible] = useState(false); 
  const [selectedEntry, setSelectedEntry] = useState(null); 

  const navigate = useNavigate();

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/entries/all");
      setEntries(response.data); 
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch entries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEntries(); }, []);

  const handleStatusUpdate = async (entry, newStatus) => {
    setStatusUpdating(true);
    try {
      await api.put(`/api/entries/status/${entry._id}`, { status: newStatus });
      toast.success("Status updated successfully");
      fetchEntries(); 
      setCurrentEntry(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    onLogout();
    navigate("/admin/login");
  };

  const fetchProfile = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) { toast.error("Not authenticated"); return; }
    try {
      const response = await api.get("/api/admin/profile", { headers: { Authorization: `Bearer ${token}` } });
      setProfile(response.data);
      setProfileVisible(true);
    } catch (err) { console.error(err); toast.error("Failed to fetch profile"); }
  };

  const exportToExcel = () => {
    if (!entries.length) { toast.error("No data to export"); return; }
    const data = entries.map(e => ({
      Name: e.name, Email: e.email, Phone: e.phoneNumber, Company: e.companyName,
      Requirement: e.requirement, RequirementType: e.requirementType, Brands: e.brands?.join(", "), Status: e.status,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Entries");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "entries.xlsx");
    toast.success("Excel file exported");
  };

  const generatePDF = (entry) => {
    if (!entry) { toast.error("No entry selected"); return; }
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("SVJ Groups - Entry Details", 105, 10, { align: "center" });
    doc.line(10, 25, 200, 25);
    doc.setFontSize(12);
    let y = 35;
    const addDetail = (label, value) => {
      doc.setFont(undefined, "bold");
      doc.text(`${label}:`, 10, y);
      doc.setFont(undefined, "normal");
      doc.text(value || "-", 50, y);
      y += 8;
    };
    addDetail("Name", entry.name);
    addDetail("Email", entry.email);
    addDetail("Phone", entry.phoneNumber);
    addDetail("Company", entry.companyName);
    addDetail("Requirement", entry.requirement);
    addDetail("Requirement Type", entry.requirementType);
    addDetail("Brands", entry.brands?.join(", "));
    addDetail("Status", entry.status);
    doc.save(`${entry.name}_entry.pdf`);
    toast.success("PDF generated successfully!");
  };

  const sendPDFEmail = async (entry) => {
    if (!entry) { toast.error("No entry selected"); return; }
    try {
      await fetch("https://vrism.app.n8n.cloud/webhook-test/send-entry-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryId: entry._id }), 
      });
      toast.success("PDF email triggered successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send PDF email");
    }
  };
  
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select value={status} style={{ width: 160 }} onChange={(newStatus) => setCurrentEntry({ ...record, newStatus })} disabled={status === "Completed"}>
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Action In Progress">Action In Progress</Select.Option>
          <Select.Option value="Completed">Completed</Select.Option>
          <Select.Option value="Rejected">Rejected</Select.Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          {currentEntry?._id === record._id && (
            <Popconfirm
              title={`Change status to "${currentEntry.newStatus}"?`}
              onConfirm={() => handleStatusUpdate(record, currentEntry.newStatus)}
              onCancel={() => setCurrentEntry(null)}
              okText="Yes" cancelText="No"
            >
              <Button type="primary" loading={statusUpdating}>Confirm</Button>
            </Popconfirm>
          )}
          <Button type="link" onClick={() => { setSelectedEntry(record); setDrawerVisible(true); }}>View Details</Button>
        </Space>
      ),
    },
  ];

  const statusMap = { Enquiry: "Pending", "Action In Progress": "Action In Progress", Completed: "Completed", "Closed Accounts": "Rejected" };
  const items = Object.keys(statusMap).map(tabName => ({
    key: tabName,
    label: `${tabName} (${entries.filter(e => e.status === statusMap[tabName]).length})`,
    children: <Table dataSource={entries.filter(e => e.status === statusMap[tabName])} columns={columns} rowKey="_id" loading={loading} bordered pagination={{ pageSize: 5 }} scroll={{ x: "max-content" }} />
  }));

  return (
    <div style={{ maxWidth: 1200, margin: "20px auto", padding: "20px" }}>
      <Card style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Title level={2} style={{ textAlign: "center" }}>Admin Dashboard</Title>
          <Space style={{ justifyContent: "center", width: "100%" }} wrap>
            <Button type="primary" onClick={fetchProfile}>View Profile</Button>
            <Button type="default" onClick={exportToExcel}>Export to Excel</Button>
            <Button type="primary" danger onClick={handleLogout}>Logout</Button>
          </Space>
          <Tabs defaultActiveKey="Enquiry" items={items} />
        </Space>
      </Card>

      <Modal open={profileVisible} title="Admin Profile" onCancel={() => setProfileVisible(false)} footer={[<Button key="close" onClick={() => setProfileVisible(false)}>Close</Button>]}>
        {profile ? (
          <Card style={{ borderRadius: 12 }}>
            <Text strong>Name: </Text> <Text>{profile.name}</Text><br />
            <Text strong>Email: </Text> <Text>{profile.email}</Text>
          </Card>
        ) : (<p>Loading...</p>)}
      </Modal>

      <Drawer title="Entry Details" width={500} open={drawerVisible} onClose={() => setDrawerVisible(false)}>
        {selectedEntry ? (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Card>
              <Text strong>Name:</Text> <Text>{selectedEntry.name}</Text><br />
              <Text strong>Email:</Text> <Text>{selectedEntry.email}</Text><br />
              <Text strong>Phone:</Text> <Text>{selectedEntry.phoneNumber}</Text><br />
              <Text strong>Company:</Text> <Text>{selectedEntry.companyName}</Text><br />
              <Text strong>Requirement:</Text> <Text>{selectedEntry.requirement}</Text><br />
              <Text strong>Requirement Type:</Text> <Text>{selectedEntry.requirementType}</Text><br />
              <Text strong>Brands:</Text> <Text>{selectedEntry.brands?.join(", ")}</Text><br />
              <Text strong>Status:</Text> <Text>{selectedEntry.status}</Text><br />
            </Card>

            {selectedEntry.images?.length > 0 && (
              <Card title="Uploaded Images">
                <Image.PreviewGroup>
                  <Space wrap>
                    {selectedEntry.images.map((url, idx) => (
                      <Image key={idx} src={url} alt={`img-${idx}`} width={120} height={120} style={{ objectFit: "cover", borderRadius: 8 }} />
                    ))}
                  </Space>
                </Image.PreviewGroup>
              </Card>
            )}

            <Space>
              <Button type="primary" onClick={() => generatePDF(selectedEntry)}>Download PDF</Button>
              <Button type="default" onClick={() => sendPDFEmail(selectedEntry)}>Send PDF via Email</Button>
            </Space>
          </Space>
        ) : (<p>No entry selected</p>)}
      </Drawer>
    </div>
  );
}
