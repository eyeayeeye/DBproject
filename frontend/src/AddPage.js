import React from 'react'
import { Input, Form, Select, Button, message } from 'antd'
import axios from 'axios'
import _ from 'lodash'

const Option = Select.Option

const inputItemLayout = {
  labelCol: { span: 3, offset: 0 },
  wrapperCol: { span: 8 }
}
const selectItemLayout = {
  labelCol: { span: 3, offset: 0 },
  wrapperCol: { span: 5 }
}
const buttonItemLayout = {
  wrapperCol: { span: 2, offset: 3 }
}
const FormItem = Form.Item

class AddPage extends React.Component {
  state = {
    student: [],
    selected_student_ID: null,
    RGID: ''
  }
  async componentDidMount() {
    const { data } = await axios.get('http://localhost:3002/get-student')
    this.setState({ student: data })
  }
  handleSubmit = async () => {
    const payload = {
      ID: this.state.selected_student_ID,
      rgid: this.state.RGID
    }
    const { data } = await axios.post('http://localhost:3002/add-student', payload)
    if (data.message == 'error') {
      message.error('Something went wrong!', 0.3)
    } else {
      message.success('Success!', 0.3)
    }
  }

  render() {
    return (
      <React.Fragment>
        <span style={{ letterSpacing: '1px', fontSize: '20px', fontWeight: 'bold' }}>Add student to a Route Group</span>
        <Form>
          <FormItem {...inputItemLayout} label="Enter RGID">
            <Input
              placeholder="Enter RGID"
              value={this.state.RGID}
              onChange={e => this.setState({ RGID: e.target.value })}
            />
          </FormItem>
          <FormItem {...selectItemLayout} label="Select Student">
            <Select
              {...selectItemLayout}
              label="Select Student"
              showSearch
              placeholder="Select a student"
              optionFilterProp="children"
              onChange={e => this.setState({ selected_student_ID: Number(e) })}
              filterOption={(input, option) => option.props.student.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {_.map(this.state.student, student => (
                <Option key={student.ID} value={student.ID}>
                  {student.ID + ' : ' + student.Name + ' ' + student.Surname}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </FormItem>
        </Form>
      </React.Fragment>
    )
  }
}

export default AddPage
