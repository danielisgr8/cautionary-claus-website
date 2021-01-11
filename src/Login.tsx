import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { getUser } from "./network-util";
import { toast } from "react-toastify";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface LoginProps {
  onLogin: (username: string) => void
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState<string | undefined>(undefined);

  useEffect(() => {
    if(username !== undefined) {
      const call = async () => {
        try {
          await getUser(username, username);
          onLogin(username);
        } catch (error) {
          toast.error(error.response.data);
        }
      }
      call();
      setUsername(undefined);
    }
  }, [username, onLogin]);

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={(values) => setUsername(values.username)}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
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

export default Login;
