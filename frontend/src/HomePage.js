import React, { Component } from 'react'
import { Table, Divider, Tag } from 'antd'
import { Layout, Menu, Icon } from 'antd'
import axios from 'axios'

const columns = [
  {
    title: 'RGID',
    dataIndex: 'RGID'
  },
  {
    title: 'Destination',
    dataIndex: 'Destination'
  },
  {
    title: 'Driver_ID',
    dataIndex: 'Driver_ID'
  },
  {
    title: 'Actions',
    render: (text, record) => {
      console.log(record)
      return (
        <span>
          <a href="javascript:;">
            <span className="nav-text">Edit</span>
            {'  '}
            <Icon type="edit" />
          </a>
          <Divider type="vertical" />
          <a href="javascript:;">
            <span className="nav-text">Delete</span>
            {'  '}
            <Icon type="delete" />
          </a>
        </span>
      )
    }
  }
]

class HomePage extends Component {
  state = {
    data: []
  }

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:3002/all')
    this.setState({ data: data })
  }

  render() {
    return (
      <div style={{ textAlign: 'center', width: '100%', height: '100%' }}>
        <span style={{ letterSpacing: '1px', fontSize: '20px', fontWeight: 'bold' }}> {'Route Groups Table'} </span>
        <Table
          style={{ marginTop: '20px' }}
          columns={columns}
          dataSource={this.state.data}
          pagination={{ pageSize: 10 }}
        />
      </div>
    )
  }
}

export default HomePage
