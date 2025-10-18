import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Upload, Select, Checkbox, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { api } from "../api/api";
import "./FormPage.css";
import NotificationCard from "../components/NotificationCard";

const { Option } = Select;

export default function FormPageMobile({ onSuccess }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Required fields
      formData.append("name", values.name);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("email", values.email);
      formData.append("companyName", values.companyName);

      // Requirement type (send only if selected)
      if (values.requirementType) {
        formData.append("requirementType", values.requirementType);
      }

      // Requirement details (optional)
      formData.append("requirement", values.requirement || "");

      // Brands (always send as array, even if empty)
      formData.append("brands", JSON.stringify(values.brands || []));

      // Images (optional)
      if (values.images && values.images.length > 0) {
        values.images.forEach((fileWrapper) => {
          formData.append("images", fileWrapper.originFileObj);
        });
      }

      // Submit to backend
      const response = await api.post("/api/entries/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Reset form
      form.resetFields();

      // Show success notification
      setNotification({
        status: "success",
        title: "Submitted Successfully!",
        message: response.data.message,
        buttonText: "Go Home",
        onClick: () => {
          setNotification(null);
          if (onSuccess) onSuccess();
          navigate("/");
        },
      });
    } catch (error) {
      console.error(error);
      setNotification({
        status: "error",
        title: "Submission Failed",
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
        <h2 className="form-title-mobile">Submit Your Requirement</h2>
        <p>Fill the details and upload images (optional)</p>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="glass-form-mobile"
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Enter your name" }]}
              >
                <Input placeholder="Your full name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true, message: "Enter phone number" }]}
              >
                <Input placeholder="10-digit phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ type: "email", message: "Enter a valid email" }]}
              >
                <Input placeholder="Your email address" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Company Name"
                name="companyName"
                rules={[{ required: true, message: "Enter company name" }]}
              >
                <Input placeholder="Your company name" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Requirement Product" name="requirementType">
            <Select placeholder="Select requirement type" allowClear>
              <Option value="Boom Barrier">Boom Barrier</Option>
              <Option value="Swing Barrier">Swing Barrier</Option>
              <Option value="Flap Barrier">Flap Barrier</Option>
              <Option value="Turnstile">Turnstile (Full/Half Height)</Option>
              <Option value="Baggage Scanner">Baggage Scanner</Option>
              <Option value="Metal Detector">Walk-through Metal Detector</Option>
              <Option value="Bollard System">Bollard System</Option>
              <Option value="Home Automation">Home Automation</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Preferred Brands" name="brands">
            <Checkbox.Group>
              <Checkbox value="Essl">Essl</Checkbox>
              <Checkbox value="Came">Came</Checkbox>
              <Checkbox value="ZKT">ZKT</Checkbox>
              <Checkbox value="Hikvision">Hikvision</Checkbox>
              <Checkbox value="Honeywell">Honeywell</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="Requirement Details" name="requirement">
            <Input.TextArea rows={3} placeholder="Describe your requirement" />
          </Form.Item>

          <Form.Item
            label="Upload Images"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload beforeUpload={() => false} multiple maxCount={5}>
              <Button icon={<UploadOutlined />}>Select up to 5 images</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
