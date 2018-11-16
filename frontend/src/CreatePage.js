import React from 'react'
import { Input, Form, Select, Button, message } from 'antd'
import axios from 'axios'
import _ from 'lodash'

const Option = Select.Option
const inputItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 8 }
}
const selectItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 5 }
}
const buttonItemLayout = {
  wrapperCol: { span: 2, offset: 2 }
}
const FormItem = Form.Item
class CreatePage extends React.Component {
  state = {
    drivers: [],
    selected_driver_id: null,
    destination: ''
  }
  async componentDidMount() {
    const { data } = await axios.get('http://localhost:3002/drivers')
    this.setState({ drivers: data })
  }
  handleSubmit = async () => {
    const payload = {
      ID: this.state.selected_driver_id,
      destination: this.state.destination
    }
    try {
      const { data } = await axios.post('http://localhost:3002/create', payload)
      message.success('Success!', 0.3)
    } catch (e) {
      message.error('Something went wrong!', 0.3)
    }
  }
  render() {
    return (
      <Form>
        <FormItem {...inputItemLayout} label="Destination">
          <Input
            placeholder="Destination"
            value={this.state.destination}
            onChange={e => this.setState({ destination: e.target.value })}
          />
        </FormItem>
        <FormItem {...selectItemLayout} label="Driver">
          <Select onChange={e => this.setState({ selected_driver_id: Number(e) })}>
            {_.map(this.state.drivers, driver => (
              <Option key={driver.ID} value={driver.ID}>
                {driver.Name}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem {...buttonItemLayout}>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </FormItem>
      </Form>
    )
  }
}

export default CreatePage
