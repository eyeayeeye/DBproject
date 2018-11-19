import React from 'react'
import { Table, Icon, Popconfirm, message } from 'antd'
import axios from 'axios'
import _ from 'lodash'

class RouteGroupManager extends React.Component {
  state = {
    data: []
  }
  async componentDidMount() {
    const payload = { RGID: this.props.RGID }
    const { data } = await axios.post('http://localhost:3002/route_group/students', payload)
    this.setState({ data })
  }
  onDelete = async student_id => {
    const payload = { RGID: this.props.RGID, student_id }
    try {
      await axios.post('http://localhost:3002/route_group/delete-student', payload)
      this.updateOnSuccess(student_id)
      message.success('Success!', 0.3)
    } catch (e) {
      message.error('Something went wrong!', 0.3)
    }
  }
  updateOnSuccess = student_id => {
    const newData = _.filter(this.state.data, student => student.ID !== student_id)
    this.setState({ data: newData })
  }
  render() {
    const columns = [
      {
        title: 'Student ID',
        dataIndex: 'ID',
        width: 50
      },
      {
        title: 'Name',
        dataIndex: 'Name'
      },
      {
        title: 'Surname',
        dataIndex: 'Surname'
      },
      {
        title: 'Phone No.',
        dataIndex: 'Phone_no'
      },
      {
        title: 'Address',
        dataIndex: 'Address'
      },
      {
        title: 'Status',
        dataIndex: 'Status'
      },
      {
        title: '',
        render: (text, record, index) => {
          return (
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => {
                this.onDelete(record.ID)
              }}
            >
              <a className="delete">
                <span className="nav-text">Delete</span>
                <Icon type="delete" />
              </a>
            </Popconfirm>
          )
        }
      }
    ]
    return (
      <React.Fragment>
        <div className="route-group-manager-header">
          <span className="route-group-back" onClick={this.props.goBack}>
            <Icon type="left" /> Back
          </span>
          <span style={{ letterSpacing: '1px', fontSize: '20px', fontWeight: 'bold' }}>
            {`Group ${this.props.RGID} : ${this.props.Destination}`}
          </span>
        </div>
        <Table
          style={{ marginTop: '20px' }}
          columns={columns}
          dataSource={this.state.data}
          pagination={{ pageSize: 10 }}
        />
      </React.Fragment>
    )
  }
}
export default RouteGroupManager
