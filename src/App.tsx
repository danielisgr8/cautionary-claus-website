import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Route } from "react-router-dom";
import { Router } from "react-router";
import "antd/dist/antd.css";
import "./App.css";
import Login from "./Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllUsers, tryAxiosRequest } from "./network-util";
import Profile from "./Profile";
import history from "./history";

const { Header, Content } = Layout;

const App = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<string>("");

  useEffect(() => {
    const storageValue = localStorage.getItem("loggedInUser");
    if (storageValue !== null) {
      setLoggedInUser(storageValue);
    } else {
      history.replace("/");
    }
  }, []);

  useEffect(() => {
    if (loggedInUser !== "") {
      localStorage.setItem("loggedInUser", loggedInUser);
      tryAxiosRequest(async () => {
        setUsers(await getAllUsers(loggedInUser));
      });
    }
  }, [loggedInUser]);

  const menu = (
    <Menu onClick={({ key }) => history.push(`/profile/${key}`)}>
      {users.length > 0
        ? [loggedInUser, ...(users.filter((user) => user !== loggedInUser))].map((user) => (
            <Menu.Item key={user} style={{ fontSize: "large" }}>
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

  const logout = (
    <LogoutOutlined style={{ position: "absolute", right: "1rem" }} onClick={() => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "/";
    }} />
  );

  return (
    <Router history={history}>
      <Layout className="App">
        <Header className="header" >
          {users.length > 0 && dropdown}
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>Confidential Claus</a>
          {loggedInUser !== "" && logout}
        </Header>
        <Content style={{ padding: "0.5rem 0.5rem" }}>
          <Route path="/" exact render={({ history }) => <Login onLogin={(username) => {
              setLoggedInUser(username);
              history.push(`/profile/${username}`);
            }} />} />
          <Route path="/profile/:username" render={({ match, history }) => <Profile history={history} username={match.params.username} loggedInUser={loggedInUser}/>} />
          <ToastContainer />
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
