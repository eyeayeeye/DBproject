import React from 'react'
import { Input } from 'antd'

class EditableTextBox extends React.Component {

  renderInputField = () => {
    return <Input value={this.props.text} onChange={this.props.onChange}  />
  }
  render() {
    return this.props.edit ? this.renderInputField() : <span>{this.props.text}</span>
  }
}

export default EditableTextBox
