import React, { Component } from 'react'
import logo from './logo.svg'
import { Layout, Menu, Icon } from 'antd'
import HomePage from './HomePage'
import './App.css'
const { Header, Content, Footer, Sider } = Layout

class App extends Component {
  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider breakpoint="lg" collapsedWidth="0" width="230" style={{ paddingTop: '50px' }}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Icon type="home" />
              <span className="nav-text">Home</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="plus-circle" />
              <span className="nav-text">Create</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user-add" />
              <span className="nav-text">Add/Remove students</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{}}>
          <Header style={{ background: '#fff', padding: 0, minHeight: 100 }}>
            <div
              style={{
                marginTop: '20px',
                textAlign: 'center',
                fontSize: '30px',
                fontWeight: 'bold',
                letterSpacing: '3px',
                textTransform: 'uppercase'
              }}
            >
              Route Group Management System
            </div>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <pre style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <HomePage />
            </pre>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default App
