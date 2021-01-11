import React from "react";
import { Layout, Menu, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./App.css";

const { Header, Content } = Layout;

const App = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1">
        nav 1
      </Menu.Item>
      <Menu.Item key="2">
        nav 2
      </Menu.Item>
      <Menu.Item key="3">
        nav 3
      </Menu.Item>
      <Menu.Item key="4">
        nav 4
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="App">
      <Header className="header" >
        <Dropdown overlay={menu} trigger={["click"]}>
          <UserOutlined style={{ position: "absolute", left: "0.5rem" }}/>
        </Dropdown>
        <p>Confidential Claus</p>
      </Header>
      <Layout>
        <Content>
          <p>Content</p>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
