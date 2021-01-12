import { Input, Form, Button } from "antd";
import React, { useEffect, useState } from "react";
import { getUser, tryAxiosRequest } from "../network-util";
import { layout, tailLayout } from "./shared";

interface LoginFormProps {
  onLogin: (username: string) => void
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState<string | undefined>(undefined);

  useEffect(() => {
    if(username !== undefined) {
      tryAxiosRequest(async () => {
        await getUser(username, username);
        onLogin(username);
      });
      setUsername(undefined);
    }
  }, [username, onLogin]);

  return (
    <Form
      {...layout}
      layout="vertical"
      name="loginForm"
      onFinish={(values) => setUsername(values.username)}
      style={{ textAlign: "left" }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Username is required" }]}
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

export default LoginForm;
