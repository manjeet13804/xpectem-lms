import React, { Component } from 'react';
import { InputNumber, Row, Col } from 'antd';
import { SliderX } from '../../../components/uielements/slider';
import SliderNumberWrapper from './sliderNumber.style';

class SliderNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 1,
    };
  }

  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  };

  render() {
    return (
      <SliderNumberWrapper>
        <Row>
         <Col span={1} style={{marginTop: '5px'}}>
           1
         </Col>
          <Col span={12}>
            <SliderX min={1} max={20} onChange={this.onChange} value={this.state.inputValue} />
          </Col>
          <Col span={2}>
            10
          </Col>
          <Col span={6}>
            <InputNumber
              min={1}
              max={20}
              style={{ marginLeft: 16 }}
              value={this.state.inputValue}
              onChange={this.onChange}
            />
          </Col>
        </Row>
      </SliderNumberWrapper>
    );
  }
}

export default SliderNumber;