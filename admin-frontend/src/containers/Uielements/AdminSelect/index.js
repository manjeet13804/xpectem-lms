import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { PropTypes } from 'prop-types';
import { PLACEHOLDER } from 'constants/constants';
import AdminSelectWrapper from './adminSelect.style';

const defaultProps = {
  admins: [],
  saveAdminId: null,
};

const propTypes = {
  admins: PropTypes.arrayOf(PropTypes.object),
  saveAdminId: PropTypes.func,
};

const defaultPropsObj = {
  children: [],
};

const propTypesObj = {
  children: PropTypes.arrayOf(PropTypes.object),
};

const { qaSubject } = PLACEHOLDER;
const { Option } = Select;

const AdminSelectObj = (props) => {
  const { children } = props;
  return (
    <AdminSelectWrapper>
      <Select {...props}>{children}</Select>
    </AdminSelectWrapper>
  );
};

class AdminSelect extends PureComponent {
  state = {
    search: '',
  }

  handleChange = (value, key) => {
    const { saveAdminId, admins } = this.props;
    const findAdmin = admins.find(item => item.id === Number(key.key));
    const adminValue = `${findAdmin.firstName} ${findAdmin.lastName}`;
    this.setState({ search: adminValue });
    saveAdminId(key.key);
  };

  handleSearch = (e) => {
    this.setState({ search: e });
  }

  render() {
    const { search } = this.state;
    const { admins } = this.props;

    return (
      <AdminSelectObj
        style={{ width: '100%' }}
        placeholder={qaSubject}
        onChange={this.handleChange}
        optionLabelProp="label"
        value={search}
        onSearch={this.handleSearch}
        showSearch
        filterOption={
          (input, option) => option.props.value.toLowerCase().includes(input.toLowerCase())
        }
      >
        {admins.map(({ id, firstName, lastName }) => (
          <Option key={id} value={`${firstName}${lastName}${id}`} label={id}>
            <span role="img" aria-label={id}>
              {`${firstName} ${lastName}`}
            </span>
          </Option>
        ))}
      </AdminSelectObj>
    );
  }
}


AdminSelect.propTypes = propTypes;
AdminSelect.defaultProps = defaultProps;
AdminSelectObj.propTypes = propTypesObj;
AdminSelectObj.defaultProps = defaultPropsObj;


export default AdminSelect;
