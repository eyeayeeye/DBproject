import React, { Component } from 'react'
import { Table, Divider } from 'antd'
import { Icon } from 'antd'
import axios from 'axios'
import _ from 'lodash'

import EditableTextBox from './EditableTextBox'

class HomePage extends Component {
  state = {
    data: [],
    temp_data: [],
    editting: []
  }

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:3002/all')
    const mapped = _.map(data, obj => ({ ...obj, driver: `${obj.Driver_ID}. ${obj.Name}` }))
    this.setState({ data: mapped, temp_data: mapped, editting: _.fill(Array(data.length), 0) })
  }

  onDestinationChange = (value, index) => {
    const newData = this.state.temp_data
    newData[index].destination = value
    this.setState({ temp_data: newData })
  }

  render() {
    const columns = [
      {
        title: 'RGID',
        dataIndex: 'RGID'
      },
      {
        title: 'Destination',
        dataIndex: 'Destination',
        render: (text, record, index) => {
          const oldValue = text
          return <EditableTextBox text={text} edit={this.state.editting[index]} />
        }
      },
      {
        title: 'Driver',
        dataIndex: 'driver'
      },
      {
        title: 'Actions',
        render: (text, record, index) => {
          return (
            <span>
              <a
                href="#"
                onClick={() => {
                  const newEdit = this.state.editting
                  newEdit[index] ^= 1
                  this.setState({ editting: newEdit })
                }}
              >
                <span className="nav-text">Edit</span>
                {'  '}
                <Icon type="edit" />
              </a>
              <Divider type="vertical" />
              <a href="#">
                <span className="nav-text">Delete</span>
                {'  '}
                <Icon type="delete" />
              </a>
            </span>
          )
        }
      }
    ]
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
