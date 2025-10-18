import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import { Form, Input, DatePicker, Button, Select, Card } from "antd";
import { api } from "../api/api";
import "./FormPage.css";
import NotificationCard from "../components/NotificationCard";

export default function YesFormPage({ onSuccess }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate(); // ✅ initialize navigation

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const dateTime = values.date
        ? `${values.date.format("YYYY-MM-DD")}T00:00:00`
        : null;

      const payload = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        dateTime,
        propertyType: values.propertyType,
        notes: values.notes || "",
      };

      const response = await api.post("/api/entries/add", payload);
      form.resetFields();

      setNotification({
        status: "success",
        title: "Booking Successful!",
        message: response.data.message,
        buttonText: "Go Home",
        onClick: () => {
          setNotification(null);
          if (onSuccess) onSuccess();
          navigate("/"); // ✅ redirect to home
        },
      });
    } catch (error) {
      console.error(error);
      setNotification({
        status: "error",
        title: "Booking Failed",
        message: "Please try again later.",
        buttonText: "Retry",
        onClick: () => setNotification(null),
      });
    } finally {
      setLoading(false);
    }
  };

  if (notification) {
    return <NotificationCard {...notification} />;
  }

  return (
    <div className="mobile-form-container">
      <Card className="glass-card-mobile">
        <h2 className="form-title-mobile">Plan Your Stay with Zenova</h2>
        <p>Tell us your preferred dates, and our team will confirm availability</p>
        <Form form={form} layout="vertical" onFinish={onFinish} className="glass-form-mobile">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Enter your name" }]}
          >
            <Input placeholder="Your full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: "email", message: "Enter a valid email" }]}
          >
            <Input placeholder="Your email address" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Enter phone number" }]}
          >
            <Input placeholder="10-digit phone number" />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: false, message: "Select a date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Property Type"
            name="propertyType"
            rules={[{ required: true, message: "Select property type" }]}
          >
            <Select placeholder="Select BHK">
              <Select.Option value="2BHK">2 BHK</Select.Option>
              <Select.Option value="3BHK">3 BHK</Select.Option>
              <Select.Option value="4BHK">4 BHK</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Notes" name="notes">
            <Input.TextArea rows={3} placeholder="Additional notes (optional)" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              Submit Booking
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
