import { useState } from "react";
import { Form, Input, DatePicker, TimePicker, Button, message, Card } from "antd";
import dayjs from "dayjs";
import { api } from "../api/api";
import "./FormPage.css"; // Import the CSS file for styling

export default function FormPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const date = values.date.format("YYYY-MM-DD");
      const time = values.time.format("hh:mm A");
      const dateTime = `${date}T${values.time.format("HH:mm")}`;

      const payload = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        dateTime: dateTime,
      };

      const response = await api.post("/api/entries/add", payload);
      message.success(response.data.message || "Entry submitted successfully!");
      form.resetFields();
    } catch (error) {
      console.error("Error submitting entry:", error);
      message.error("Failed to submit entry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-card" title="Book an Appointment">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="glass-form"
      >
        <div className="form-row">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Please enter your phone number" }]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select the date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <Form.Item
          label="Time"
          name="time"
          rules={[{ required: true, message: "Please select the time" }]}
        >
          <TimePicker style={{ width: "100%" }} format="h:mm A" use12Hours />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}