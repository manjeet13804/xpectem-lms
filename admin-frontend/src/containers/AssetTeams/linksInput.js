import React, { Component } from 'react';
import { Input, Icon, Form } from 'antd';
import constants from 'helpers/constants';

const FormItem = Form.Item;

class linkItems extends Component {
  checkValidation = ({ valueOne, valueTwo, index, pattern, itemType }) => {
    const { setValidation } = this.props;
    const { teamMemberErrors } = constants;
    const message = teamMemberErrors[itemType];
    let error;

    if (valueOne && pattern) error = message.valid;

    if (valueTwo && !valueOne) error = message.required;

    setValidation(!!error, index);

    if (!error) return;

    return {
      validateStatus: 'error',
      help: error,
    };
  };

  render() {
    const { links, onChange, onRemove } = this.props;
    const { urlPattern, emojiPattern } = constants;

    return links.map((link, index) => {
      const { title, uri, id } = link;

      return (
        <div className="linksContainer" key={`link-${index}`}>
          <FormItem {...this.checkValidation({
            valueOne: title,
            valueTwo: uri,
            index: `title-${index}`,
            pattern: emojiPattern.test(title),
            itemType: 'title',
          })}
          >
            <Input
              id={id}
              name={`title-${index}`}
              placeholder="Title"
              onChange={event => onChange(event, index, 'title')}
              className="formInput"
              value={title}
            />
          </FormItem>
          <FormItem {...this.checkValidation({
            valueOne: uri,
            valueTwo: title,
            index: `uri-${index}`,
            pattern: !urlPattern.test(uri),
            itemType: 'uri',
          })}
          >
            <Input
              id={id}
              name={`uri-${index}`}
              placeholder="Link"
              onChange={event => onChange(event, index, 'uri')}
              className="formInput"
              value={uri}
            />
          </FormItem>
          {links.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus"
              theme="outlined"
              disabled={links.length === 1}
              onClick={() => onRemove(index)}
            />
          ) : null}
        </div>
      );
    });
  }
}

export default linkItems;
