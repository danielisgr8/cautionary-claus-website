import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import Login from "./Login";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllUsers } from "./network-util";

const { Header, Content } = Layout;

const App = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<string | undefined>(undefined);

  useEffect(() => {
    if(loggedInUser !== undefined) {
      const call = async () => {
        try {
          setUsers(await getAllUsers(loggedInUser));
        } catch (error) {
          toast.error(error.response.data);
        }
      };
      call();
    }
  }, [loggedInUser]);

  const menu = (
    <Menu>
      {users.length > 0
        ? [loggedInUser, ...(users.filter((user) => user !== loggedInUser))].map((user) => (
            <Menu.Item key={user}>
              {user}
            </Menu.Item>
          ))
        : undefined}
    </Menu>
  );

  const dropdown = (
    <Dropdown overlay={menu} trigger={["click"]}>
      <UserOutlined style={{ position: "absolute", left: "1rem" }}/>
    </Dropdown>
  );

  return (
    <Router>
      <Layout className="App">
        <Header className="header" >
          {users.length > 0 && dropdown}
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>Confidential Claus</a>
        </Header>
        <Content style={{ padding: "0.5rem 0.5rem" }}>
          <Route path="/" exact render={({ history }) => <Login onLogin={(username) => {
              setLoggedInUser(username);
              history.push(`/profile/${username}`);
            }} />} />
          <ToastContainer />
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
