import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import HomePage from './HomePage'
import CreatePage from './CreatePage'
import './App.css'
const { Header, Content, Footer, Sider } = Layout

class App extends Component {
  state = {
    view: 1
  }
  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider breakpoint="lg" collapsedWidth="0" width="230" style={{ paddingTop: '50px' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={(item, key, keyPath) => {
              this.setState({ view: Number(item.key) })
            }}
          >
            <Menu.Item key={1}>
              <Icon type="home" />
              <span className="nav-text">Home</span>
            </Menu.Item>
            <Menu.Item key={2}>
              <Icon type="plus-circle" />
              <span className="nav-text">Create</span>
            </Menu.Item>
            <Menu.Item key={3}>
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
          <Content style={{ margin: '24px 25px 0' }}>
            <pre style={{ padding: 24, background: '#fff', minHeight: 250, width: '100%', textAlign: 'center' }}>
              {this.state.view === 1 ? <HomePage /> : <CreatePage />}
            </pre>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default App
