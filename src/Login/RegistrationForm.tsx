import { Input, Form, Button } from "antd";
import React, { useState, useEffect } from "react";
import { layout, tailLayout } from "./shared";
import { registerUser, tryAxiosRequest } from "../network-util";

interface RegistrationFormProps {
  onRegister: (username: string) => void
}

const RegistrationForm = ({ onRegister }: RegistrationFormProps) => {
  const [submittedValues, setSubmittedValues] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (submittedValues !== undefined) {
      tryAxiosRequest(async () => {
        await registerUser(submittedValues, submittedValues.username);
        onRegister(submittedValues.username);
      });
      setSubmittedValues(undefined);
    }
  }, [submittedValues, onRegister]);

  return (
    <Form
      {...layout}
      layout="vertical"
      name="registrationForm"
      onFinish={(values) => setSubmittedValues(values)}
      style={{ textAlign: "left" }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Username is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "First name is required" }]}
          style={{ display: "inline-block", marginBottom: "0", marginRight: "0.5rem" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Last name is required" }]}
          style={{ display: "inline-block", marginBottom: "0" }}
        >
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="Address"
        required
      >
        <Form.Item
            name={["address", "line1"]}
            style={{ marginBottom: "0.2rem" }}
            rules={[{ required: true, message: "Line 1 is required" }]}
        >
          <Input placeholder="Line 1" />
        </Form.Item>
        <Form.Item
            name={["address", "line2"]}
            style={{ marginBottom: "0.2rem" }}
        >
          <Input placeholder="Line 2 (optional)" />
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Form.Item
          label="City"
          name={["address", "city"]}
          rules={[{ required: true, message: "City is required" }]}
          style={{ display: "inline-block", marginBottom: "0", marginRight: "0.5rem" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="State"
          name={["address", "usState"]}
          rules={[{ required: true, message: "State is required" }]}
          style={{ display: "inline-block", marginBottom: "0" }}
        >
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="Zip"
        name={["address", "zip"]}
        rules={[{ required: true, message: "Zip is required" }]}
        wrapperCol={{ span: 6 }}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
