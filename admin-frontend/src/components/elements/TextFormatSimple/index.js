import React, { Component } from 'react';
import { bemlds } from 'utils';
import IntlMessages from 'components/utility/intlMessages';
import {
  BoldFaceSvg,
  CursiveFaceSvg,
  LeftAlignSvg,
  RightAlignSvg,
  CenterAlignSvg,
  DotListSvg,
  NumberListSvg,
} from 'components';
import { Select } from 'antd';
import TextFormatSimpleWrapper from './textFormatSimple.style';

const Option = Select.Option;

const title = bemlds('title');
const elements = bemlds('elements');
const area = bemlds('textarea');

class TextFormatSimple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textarea: '',
    };
  }
  onChange = ({ target: { value } }) => {
    const {
      saveDescription,
      name: descriptionName,
      idTopic,
      idQuestion,
      formik,
    } = this.props;
    this.setState({ textarea: value });
    if (formik) {
      saveDescription(descriptionName, value.trim());
      return;
    }
    if (!idTopic || !idQuestion) {
      saveDescription(value.trim(), descriptionName);
    } else {
      saveDescription(idTopic, idQuestion, value.trim(), descriptionName);
    }
  };

  componentWillMount() {
    const { note } = this.props;

    if (note) { this.setState({ textarea: note }); }
  }

  componentDidUpdate(prevProps) {
    const { note } = this.props;
    if (prevProps.note !== note) {
      this.setState({ textarea: note });
    }
  };

  render() {
    const { isValid, formik } = this.props;
    const { textarea } = this.state;

    return (
      <TextFormatSimpleWrapper>
        <section className={title()}>
          <div className={title('text')}>
            <IntlMessages id="textFormat.textFormat" />
          </div>
          <div className={title('language')} />
        </section>
        <section className={elements()}>
          <section className={elements('text-type')}>
            <div className={elements('text-type__bold')}>
              <BoldFaceSvg />
            </div>
            <div className={elements('text-type__cursive')}>
              <CursiveFaceSvg />
            </div>
          </section>
          <section className={elements('text-position')}>
            <div className={elements('text-position__left')}>
              <LeftAlignSvg />
            </div>
            <div className={elements('text-position__center')}>
              <CenterAlignSvg />
            </div>
            <div className={elements('text-position__right')}>
              <RightAlignSvg />
            </div>
          </section>
          <section className={elements('text-list')}>
            <DotListSvg />
            <NumberListSvg />
          </section>
          <Select
            className={elements('select-paragraph')}
            showSearch
            style={{ width: 160 }}
            placeholder="Paragraph"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Header1"><IntlMessages id="textFormat.headerOne" /></Option>
            <Option value="Header2"><IntlMessages id="textFormat.headerTwo" /></Option>
          </Select>
          <Select
            className={elements('select-language')}
            showSearch
            style={{ width: 160 }}
            placeholder="Paragraph"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          />
        </section>
        <section className={area()}>
          <textarea
            className={area('input', { error: formik && !isValid })}
            value={textarea}
            onChange={this.onChange}
          />
        </section>
      </TextFormatSimpleWrapper>
    );
  }
}

export default TextFormatSimple;
