import React, { Component } from 'react'
import { Table, Divider, Button, message, Popconfirm } from 'antd'
import { Icon } from 'antd'
import axios from 'axios'
import _ from 'lodash'

import EditableField from './EditableField'
import RouteGroupManager from './RouteGroupManager'

class HomePage extends Component {
  state = {
    data: [],
    temp_data: [],
    editting: [],
    drivers: [],
    is_browse: 0
  }

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:3002/all')
    const { data: drivers } = await axios.get('http://localhost:3002/drivers')
    const mapped = _.map(data, obj => ({ ...obj, driver: `${obj.Driver_ID}. ${obj.Name}` }))
    this.setState({ data: mapped, temp_data: mapped, editting: _.fill(Array(data.length), 0), drivers })
  }

  onDestinationChange = index => value => {
    const newData = [...this.state.temp_data]
    newData[index].Destination = value
    this.setState({ temp_data: newData })
  }

  onDriverChange = index => driver_id => {
    const newData = [...this.state.temp_data]
    const newDriver = _.head(_.filter(this.state.drivers, driver => driver.ID === driver_id))
    newData[index] = { ...newData[index], Driver_ID: newDriver.ID, Name: newDriver.Name }
    this.setState({ temp_data: newData })
  }
  handleSubmit = index => async () => {
    const payload = {
      RGID: this.state.temp_data[index].RGID,
      Destination: this.state.temp_data[index].Destination,
      driver_id: this.state.temp_data[index].Driver_ID
    }
    try {
      await axios.post('http://localhost:3002/edit', payload)
      const newEdit = [...this.state.editting]
      newEdit[index] ^= 1
      this.setState({ data: this.state.temp_data, editting: newEdit })
      message.success('Success!', 0.3)
    } catch (e) {
      message.error('Something went wrong!', 0.3)
    }
  }
  handleCancel = index => () => {
    const newEdit = [...this.state.editting]
    newEdit[index] ^= 1
    this.setState({ temp_data: this.state.data, editting: newEdit })
  }
  onDelete = index => async () => {
    const payload = {
      RGID: this.state.data[index].RGID
    }
    try {
      const { data } = await axios.post('http://localhost:3002/route_group/delete', payload)
      const newData = [...this.state.data]
      newData.splice(index, 1)
      this.setState({ data: newData })
      message.success('Success!', 0.3)
    } catch (e) {
      message.error('Something went wrong!', 0.3)
    }
  }
  render() {
    const columns = [
      {
        title: 'RGID',
        dataIndex: 'RGID',
        width: 50
      },
      {
        title: 'Destination',
        dataIndex: 'Destination',
        render: (text, record, index) => {
          return (
            <EditableField
              type="input"
              value={this.state.temp_data[index].Destination}
              edit={this.state.editting[index]}
              onChange={this.onDestinationChange(index)}
            />
          )
        },
        width: 300
      },
      {
        title: 'Driver',
        dataIndex: 'driver',
        render: (text, record, index) => {
          const value = `${this.state.temp_data[index].Driver_ID} : ${this.state.temp_data[index].Name}`
          return (
            <EditableField
              type="select"
              value={value}
              drivers={this.state.drivers}
              current_driver_id={this.state.temp_data[index].Driver_ID}
              edit={this.state.editting[index]}
              onChange={this.onDriverChange(index)}
            />
          )
        },
        width: 300
      },
      {
        title: 'Actions',
        render: (text, record, index) => {
          return this.state.editting[index] ? (
            <span>
              <Button type="primary" shape="circle" icon="check" size="small" onClick={this.handleSubmit(index)} />
              <Button type="danger" shape="circle" icon="cross" size="small" onClick={this.handleCancel(index)} />
            </span>
          ) : (
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
                <Icon type="edit" />
              </a>
              <Divider type="vertical" />
              <a
                href="#"
                onClick={() => {
                  this.setState({ is_browse: this.state.is_browse ^ 1, selected_index: index })
                }}
              >
                <span className="nav-text">Manage</span>
                <Icon type="setting" />
              </a>
              <Divider type="vertical" />
              <Popconfirm title="Are you sure to delete this task?" onConfirm={this.onDelete(index)}>
                <a className="delete">
                  <span className="nav-text">Delete</span>
                  <Icon type="delete" />
                </a>
              </Popconfirm>
            </span>
          )
        },
        width: 100
      }
    ]
    return (
      <div style={{ textAlign: 'center', width: '100%', height: '100%' }}>
        {this.state.is_browse ? (
          <RouteGroupManager
            RGID={this.state.data[this.state.selected_index].RGID}
            Destination={this.state.data[this.state.selected_index].Destination}
            goBack={() => {
              this.setState({ is_browse: this.state.is_browse ^ 1 })
            }}
          />
        ) : (
          <React.Fragment>
            <span style={{ letterSpacing: '1px', fontSize: '20px', fontWeight: 'bold' }}> {'Route Groups Table'} </span>
            <Table
              style={{ marginTop: '20px' }}
              columns={columns}
              dataSource={this.state.data}
              pagination={{ pageSize: 10 }}
            />
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default HomePage
