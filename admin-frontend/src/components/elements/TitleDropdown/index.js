import React, { Component } from 'react';
import { bemlds } from 'utils';
import { Select } from 'semantic-ui-react';
import _ from 'lodash';
import TitleDropdownWrapper from './titleDropdown.style';

const b = bemlds('title-dropdown');

const orgAdmins = [
  { id: 'Do not imported', name: 'Do not imported' },
  { id: 'First name', name: 'First name' },
  { id: 'Last name', name: 'Last name' },
  { id: 'E-mail address', name: 'E-mail address' },
  { id: 'Telephone', name: 'Telephone' },
  { id: 'Language', name: 'Language' },
  { id: 'Notifications e-mail', name: 'Notifications e-mail' },
  { id: 'Notifications SMS', name: 'Notifications SMS' },
];

const students = [
  { id: 'Do not imported', name: 'Do not imported' },
  { id: 'First name', name: 'First name' },
  { id: 'Last name', name: 'Last name' },
  { id: 'E-mail address', name: 'E-mail address' },
  { id: 'Telephone', name: 'Telephone' },
  { id: 'Language', name: 'Language' },
  { id: 'Notifications e-mail', name: 'Notifications e-mail' },
  { id: 'Notifications SMS', name: 'Notifications SMS' },
  { id: 'Note', name: 'Note' },
];

const groups = [
  { id: 'Do not imported', name: 'Do not imported' },
  { id: 'Group name', name: 'Group name' },
  { id: 'Group description - Swedish', name: 'Group description - Swedish' },
  { id: 'Group description - Norwegian', name: 'Group description - Norwegian' },
  { id: 'Group description - English', name: 'Group description - English' },
];

const switchTemplate = (type, data) => {
  switch (type) {
    case ('OrgAdmins'):
      return orgAdmins;
    case ('Groups'):
      return groups;
    case ('Students'):
      return _.unionBy([...students, ...data.map(title => ({ id: title, name: title }))], 'id');
    default:
      return null;
  }
};

class TitleDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: [],
      value: '',
    };
  }

  componentDidMount() {
    const { currentOption, type, allTitle = [] } = this.props;

    this.setState({
      title: switchTemplate(type, allTitle),
      value: currentOption,
    });
  }

  selectTitle = (e, data) => {
    const { indexSelect, addValue } = this.props;
    const { value } = data;
    this.setState({ value });
    addValue(indexSelect, value);
  };

  render() {
    const { title, value } = this.state;

    const titleList = title.map(item => ({
      key: item.id,
      value: item.id,
      text: item.name,
    }));

    return (
      <TitleDropdownWrapper>
        <div className={b()}>
          {titleList && titleList.some(item => item.value === value) ? (
            <Select
              onChange={this.selectTitle}
              options={titleList}
              value={value}
              className={b('select').toString()}
            />
          ) : <div>{value}</div>}
        </div>
      </TitleDropdownWrapper>
    );
  }
}

export default TitleDropdown;
