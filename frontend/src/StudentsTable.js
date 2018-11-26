import React from 'react'
import { Table } from 'antd'
import axios from 'axios'
import _ from 'lodash'

class StudentsTable extends React.Component {
  state = {
    data: []
  }
  async componentDidMount() {
    const { data } = await axios.get('http://localhost:3002/students')
    this.setState({ data })
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
        title: 'Blood Type',
        dataIndex: 'Blood_type'
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
        title: 'RGID',
        dataIndex: 'RGID',
        render: (text, record, fields) => {
          if (text != null) return text
          return '-'
        }
      }
    ]
    return (
      <React.Fragment>
        <span style={{ letterSpacing: '1px', fontSize: '20px', fontWeight: 'bold' }}> Students </span>
        <Table columns={columns} dataSource={this.state.data} pagination={{ pageSize: 10 }} />
      </React.Fragment>
    )
  }
}
export default StudentsTable
