import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  Spin,
  Select,
  Input,
  Card,
  Row,
  Col,
  Tag,
  Statistic,
  Button,
  // Add Modal and Descriptions here
  Modal,
  Descriptions,
} from "antd";
import {
  FilterOutlined,
  ArrowUpOutlined,
  DollarOutlined,
  SolutionOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { api } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./DashboardSheet.css";

const { Option } = Select;

const STATUS_OPTIONS = [
  { label: "Pending", value: "Pending", color: "#fa8c16" },
  { label: "Sent Quotation", value: "Sent Quotation", color: "#722ed1" },
  { label: "PO Received", value: "PO Received", color: "#1890ff" },
  { label: "In Progress", value: "In Progress", color: "#faad14" },
  { label: "Invoice Generated", value: "Invoice Generated", color: "#13c2c2" },
  { label: "Payment Received", value: "Payment Received", color: "#52c41a" },
  { label: "Completed", value: "Completed", color: "#a0d911" },
];

const STATUS_ORDER = STATUS_OPTIONS.map((s) => s.label);

const formatCurrency = (val) =>
  (val || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

export default function DashboardSheet() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  // New state for the Modal functionality
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  let searchInput;

  // Fetch leads
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/leads", {
        params: { status: selectedStatus },
      });
      setData(
        res.data.map((item, idx) => ({
          ...item,
          key: item.key || idx,
          TotalPrice: parseFloat(item.TotalPrice) || 0,
          SVJShare: parseFloat(item.SVJShare) || 0,
          VrismShare: parseFloat(item.VrismShare) || 0,
          TotalRevenue: parseFloat(item.TotalRevenue) || 0,
          SvjRevenue: parseFloat(item.SvjRevenue) || 0,
          VrismRevenue: parseFloat(item.VrismRevenue) || 0,
        }))
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedStatus]);

  const handleFieldChange = async (record, field, value) => {
    setUpdateLoading(true);
    try {
      const res = await api.patch(`/api/leads/${record.key}`, {
        [field]: value,
      });
      setData((prev) =>
        prev.map((r) =>
          r.key === record.key
            ? {
                ...r,
                [field]: value,
                SVJShare: parseFloat(res.data.SVJShare) || 0,
                VrismShare: parseFloat(res.data.VrismShare) || 0,
              }
            : r
        )
      );
      toast.success(`${field} updated`);
    } catch (err) {
      console.error(err);
      toast.error(`Failed to update ${field}`);
    } finally {
      setUpdateLoading(false);
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => (searchInput = node)}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => {
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
            confirm();
          }}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => {
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
            confirm();
          }}
          size="small"
          style={{ marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            clearFilters();
            setSearchText("");
            setSearchedColumn("");
          }}
          size="small"
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffe58f", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // Metrics
  const { totalRevenue, totalLeads, totalSvjRevenue, totalVrismRevenue, statusDistribution } =
    useMemo(() => {
      const metrics = {
        totalRevenue: data.reduce(
          (sum, item) => sum + (parseFloat(item.TotalRevenue) || 0),
          0
        ),
        totalSvjRevenue: data.reduce(
          (sum, item) => sum + (parseFloat(item.SvjRevenue) || 0),
          0
        ),
        totalVrismRevenue: data.reduce(
          (sum, item) => sum + (parseFloat(item.VrismRevenue) || 0),
          0
        ),
        totalLeads: data.length,
        statusMap: {},
      };
      data.forEach((item) => {
        const status = STATUS_ORDER.includes(item.Status) ? item.Status : null;
        if (status)
          metrics.statusMap[status] = (metrics.statusMap[status] || 0) + 1;
      });
      const statusDistribution = STATUS_ORDER.map((status) => ({
        name: status,
        value: metrics.statusMap[status] || 0,
        color:
          STATUS_OPTIONS.find((o) => o.label === status)?.color || "#999999",
      }));
      return { ...metrics, statusDistribution };
    }, [data]);

  // Columns
  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      width: 70,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      ...getColumnSearchProps("Name"),
    },
    {
      title: "Phone",
      dataIndex: "Phone Number",
      key: "Phone Number",
      ...getColumnSearchProps("Phone Number"),
    },
    {
      title: "Product",
      dataIndex: "Products",
      key: "Products",
      ...getColumnSearchProps("Products"),
    },
    {
      title: "ON SITE VIEW",
      dataIndex: "ON SITE VIEW",
      key: "ON SITE VIEW",
      render: (text, record) => (
        <Select
          value={text || ""}
          onChange={(val) => handleFieldChange(record, "ON SITE VIEW", val)}
          disabled={updateLoading}
          style={{ width: 120 }}
        >
          <Option value="YES VISIT">YES VISIT</Option>
          <Option value="NO">NO</Option>
          <Option value="VisitComplete">VisitComplete</Option>
        </Select>
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (text, record) => (
        <Select
          value={text || "Pending"}
          onChange={(val) => handleFieldChange(record, "Status", val)}
          disabled={updateLoading}
          style={{ width: "100%" }}
        >
          {STATUS_OPTIONS.map((s) => (
            <Option key={s.label} value={s.label}>
              <Tag color={s.color}>{s.label}</Tag>
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            setModalData(record);
            setModalVisible(true);
          }}
        >
          View Details
        </Button>
      ),
    },
  ];

  // Export
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "LeadsData.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    // Only include titles for columns that have a dataIndex and shouldn't be hidden in the export
    const exportColumns = columns.filter(c => c.dataIndex && c.dataIndex !== 'index');
    const tableColumn = exportColumns.map((c) => c.title);
    const tableRows = data.map((d) => exportColumns.map((c) => d[c.dataIndex] || ''));

    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save("LeadsData.pdf");
  };

  return (
    <div className="dashboard-container">
      <Toaster position="top-right" />
      <h2 className="dashboard-header">
        <PieChartOutlined style={{ marginRight: 8 }} />
        Leads & Revenue Dashboard
      </h2>

      {loading ? (
        <Spin size="large" className="loading-spinner" />
      ) : (
        <>
          {/* Metrics Cards */}
          <Row gutter={[24, 24]} className="metrics-row">
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="TOTAL LEADS"
                  value={totalLeads}
                  prefix={<SolutionOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="TOTAL REVENUE"
                  value={formatCurrency(totalRevenue)}
                  prefix={<DollarOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="SVJ REVENUE (70%)"
                  value={formatCurrency(totalSvjRevenue)}
                  prefix={<ArrowUpOutlined style={{ color: "#52c41a" }} />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="VRISM REVENUE (30%)"
                  value={formatCurrency(totalVrismRevenue)}
                  prefix={<ArrowUpOutlined style={{ color: "#1890ff" }} />}
                />
              </Card>
            </Col>
          </Row>

          {/* Donut Chart */}
          <Row gutter={[24, 24]} className="chart-row">
            <Col xs={24}>
              <Card title={<><PieChartOutlined /> Lead Status Distribution</>}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                     
                      aria-label="Lead Status Distribution Donut Chart"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          aria-label={`${entry.name}: ${entry.value} leads`}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value} Leads`, name]}
                    />
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      wrapperStyle={{ maxHeight: 200, overflowY: "auto" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          {/* Export Buttons */}
          <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
            <Col>
              <Button type="primary" icon={<FileExcelOutlined />} onClick={exportExcel}>
                Export Excel
              </Button>
            </Col>
            <Col>
              <Button type="primary" icon={<FilePdfOutlined />} onClick={exportPDF}>
                Export PDF
              </Button>
            </Col>
          </Row>

          {/* Leads Table */}
          <Table
            dataSource={data}
            columns={columns}
            bordered
            rowKey="key"
            scroll={{ x: "max-content" }}
            pagination={{ pageSize: 10 }}
            style={{ marginTop: 20 }}
          />
          
          {/* View Details Modal Component */}
          <Modal
            open={modalVisible}
            title="Lead Details"
            footer={
              <Button onClick={() => setModalVisible(false)}>Close</Button>
            }
            onCancel={() => setModalVisible(false)}
          >
            {modalData && (
              <Descriptions column={1} bordered size="small">
                {Object.entries(modalData).map(([key, value]) => {
                  // Exclude redundant keys or keys displayed in the table
                  if (
                    [
                      "Name",
                      "Phone Number",
                      "Status",
                      "ON SITE VIEW",
                      "key",
                      "TotalPrice",
                      "SVJShare",
                      "VrismShare",
                      "TotalRevenue",
                      "SvjRevenue",
                      "VrismRevenue",
                    ].includes(key)
                  )
                    return null;
                  const displayValue = Array.isArray(value)
                    ? value.join(", ")
                    : value;
                  if (!displayValue) return null;
                  return (
                    <Descriptions.Item key={key} label={key}>
                      {displayValue}
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            )}
          </Modal>
        </>
      )}
    </div>
  );
}