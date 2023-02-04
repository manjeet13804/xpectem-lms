import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
import { bemlds } from 'utils';
import { DATE_FORMATS } from 'constants/constants';
import SearchAdminBlockWrapper from './searchAdminBlock.style';

const b = bemlds('admin-search');
const { yearMonthDay } = DATE_FORMATS;

class SearchAdminBlock extends Component {

  render() {
    const {
      obj,
      url,
      onClick,
      lmsGroup,
    } = this.props;

    const {
      firstName,
      lastName,
      lmsGroups,
      userEmail,
      createdAt,
    } = obj;

    return (
      <SearchAdminBlockWrapper>
        <Link onClick={onClick} className={b('link')} to={url} >
         <div className={b()}>
           <div className={b('name')}>
             {`${firstName} ${lastName}`}
           </div>
           {lmsGroups && lmsGroups.length > 0 && (
             <div className={b('option')}>
               {lmsGroups.map(({name, id}) => (
                 <span className={b('groupName')} key={id}>{name}</span>
               ))}
             </div>
           )}
           {lmsGroup && (
             <div className={b('option')}>
               <span className={b('groupName')}>{lmsGroup}</span>
             </div>
           )}
           {userEmail && userEmail.length > 0 &&(
            <div className={b('option')}>
              {userEmail.map(({email, id}) => (
                <span className={b('groupName')} key={id}>{email}</span>
              ))}
            </div>
           )}
           <div className={b('option')}>
               <span className={b('groupName')}>
                 {`Created ${moment(createdAt).format(yearMonthDay)}`}
               </span>
           </div>
         </div>
        </Link>
      </SearchAdminBlockWrapper>
    );
  }
}

export default SearchAdminBlock;
