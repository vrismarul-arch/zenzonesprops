import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Table, Button, Select, Space, Tabs, Popconfirm, message } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DashboardPage({ onLogout }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const navigate = useNavigate();

  // Fetch all entries
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

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleStatusUpdate = async (entry, newStatus) => {
    setStatusUpdating(true);
    try {
      await api.put(`/api/entries/status/${entry._id}`, { status: newStatus });
      toast.success("Status updated successfully");
      fetchEntries();
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

  // Table columns
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Date",
      dataIndex: "dateTime",
      key: "date",
      render: (dateTime) => new Date(dateTime).toLocaleDateString(),
    },
    {
      title: "Time",
      dataIndex: "dateTime",
      key: "time",
      render: (dateTime) => new Date(dateTime).toLocaleTimeString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          style={{ width: 120 }}
          onChange={(newStatus) => setCurrentEntry({ ...record, newStatus })}
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Completed">Completed</Select.Option>
          <Select.Option value="Rejected">Rejected</Select.Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        currentEntry && currentEntry._id === record._id ? (
          <Popconfirm
            title={`Change status to "${currentEntry.newStatus}"?`}
            onConfirm={() => handleStatusUpdate(record, currentEntry.newStatus)}
            onCancel={() => setCurrentEntry(null)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" loading={statusUpdating}>
              Confirm
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const statusMap = {
    Enquiry: "Pending",
    Proposed: "Completed",
    "Closed Accounts": "Rejected",
  };

  const items = Object.keys(statusMap).map((tabName) => ({
    key: tabName,
    label: `${tabName} (${entries.filter((e) => e.status === statusMap[tabName]).length})`,
    children: (
      <Table
        dataSource={entries.filter((e) => e.status === statusMap[tabName])}
        columns={columns}
        rowKey="_id"
        loading={loading}
        bordered
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />
    ),
  }));

  return (
    <div style={{ maxWidth: 1200, margin: "20px auto" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <h2>Admin Dashboard</h2>
        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
        <Tabs defaultActiveKey="Enquiry" items={items} />
      </Space>
    </div>
  );
}
