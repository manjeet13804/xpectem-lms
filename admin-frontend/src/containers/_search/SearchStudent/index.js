import IntlMessages from 'components/utility/intlMessages';
import { SearchPersonForm } from 'components';
import _ from 'lodash';
import qs from 'qs';
import React, {useState} from 'react';

const SearchStudent = (props) => {
  const {
    clearOrg,currStudent,
    clearGroups,
    clearCourses,
    clearLmsAdmins
  } = props;
  const [user, setUser] = useState({
    firstName:"",
    lastName: '',
    email: '',
    isDeactivated: false
  })
  const handleChange = ({ target: {name, value} }) =>{
    setUser({...user, [name]: value})
  }
  const {searchStudents} = props
  const handleSearchStudents = () => {
    clearOrg();
    clearGroups();
    clearCourses();
    clearLmsAdmins();
    const query = _.pickBy(user, _.identity);
    searchStudents(qs.stringify(query));
  }
  return (
    <div>
      <div>
        <SearchPersonForm
          {...user}
          onChange={handleChange}
          checkboxLabel={<IntlMessages id="tutors.checkboxLabel" />}
          onSearch={handleSearchStudents}
          findButtonTextId="organisations.searchBtn"
        />
        <span>{currStudent? currStudent.name: ''}</span>
      </div>
    </div>
  )
}

export default SearchStudent
