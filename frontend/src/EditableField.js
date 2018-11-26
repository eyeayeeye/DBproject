import React from 'react'
import { Input, Select } from 'antd'
import _ from 'lodash'

const Option = Select.Option

class EditableField extends React.Component {
  renderInputField = () => {
    return <Input className="edit-input" value={this.props.value} onChange={e => this.props.onChange(e.target.value)} />
  }
  renderSelectField = () => {
    return (
      <Select
        className="edit-select"
        value={this.props.current_driver_id}
        onChange={value => this.props.onChange(value)}
      >
        <Option key={0} value={null}>
          -
        </Option>
        {_.map(this.props.drivers, driver => (
          <Option key={driver.ID} value={driver.ID}>
            {`${driver.Name} ${driver.Surname}`}
          </Option>
        ))}
      </Select>
    )
  }
  render() {
    // console.log(this.props.drivers, this.props.value)
    if (this.props.edit) {
      return this.props.type === 'input' ? this.renderInputField() : this.renderSelectField()
    }
    return <span>{this.props.value}</span>
  }
}

export default EditableField
