import React, { Component } from 'react';
import { Select } from 'antd';
import { PLACEHOLDER } from 'constants/constants';
import SubjectSelectWrapper from './subjectSelect.style';


const { qaSubject } = PLACEHOLDER;
const { Option } = Select;

const SubjectSelectObj = props => (
  <SubjectSelectWrapper>
    <Select {...props}>{props.children}</Select>
  </SubjectSelectWrapper>
);

class SubjectSelect extends Component {
  handleChange = (value, key) => {
    const keysArr = key.map(item => item.key);
    const { saveTopicsId } = this.props;
    saveTopicsId(keysArr);
  };

  render() {
    const { topics = [] } = this.props;
    return (
      <SubjectSelectObj
        mode="multiple"
        style={{ width: '100%' }}
        placeholder={qaSubject}
        onChange={this.handleChange}
        optionLabelProp="label"
      >
        {topics.map(({ id, title }) => (
          <Option key={id} value={title} id={id} label={title}>
            <span role="img" aria-label={title}>
              {title}
            </span>
          </Option>
        ))}
      </SubjectSelectObj>
    );
  }
}


export default SubjectSelect;
