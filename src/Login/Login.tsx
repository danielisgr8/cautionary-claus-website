import React from "react";
import LoginForm from "./LoginForm";
import { Tabs } from "antd";
import RegistrationForm from "./RegistrationForm";

const { TabPane } = Tabs;

interface LoginProps {
  onLogin: (username: string) => void
}

const Login = ({ onLogin }: LoginProps) => {
  return (
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="Login" key="1">
        <LoginForm onLogin={onLogin} />
      </TabPane>
      <TabPane tab="Register" key="2">
        <RegistrationForm onRegister={onLogin} />
      </TabPane>
    </Tabs>
  );
};

export default Login;
