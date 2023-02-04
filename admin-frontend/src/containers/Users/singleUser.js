import React, { Component } from 'react';
import { Formik } from 'formik';
import {
  CustomInput,
} from 'components/formElements';
import UserListPageWrapper from './singleUser.style';
import { INPUTS_NAMES } from 'constants/inputs';
import { USER_SHEMA } from 'constants/validationShema';

class SingleUser extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef()
  }

  componentDidMount() {
    const { createRef } = this.props;
    if( createRef ) {
      createRef(this.form, this.clearForm)
    };
  }

  clearForm = () => {

  }

  onSubmit = (values) => {
    const { currentUser, userCreate, updateUser } = this.props;
    const isNewUser = !currentUser;
    if (isNewUser) {
      userCreate({values});
    } else {
      updateUser({id: currentUser.id, values});
    }
  }

  render() {
    return (
      <UserListPageWrapper>
        <div className="PageContent">
          <Formik
            initialValues={{ name: '', email: '', password: ''}}
            validationSchema={USER_SHEMA}
            onSubmit={(values, actions) => {
              this.onSubmit(values);
              actions.resetForm();
            }}
            render={({
              handleChange,
              handleBlur,
              handleReset,
              errors,
              touched,
            }) => (
              <form
                onSubmit={() => { }}
                onReset={handleReset}
                ref={this.form}
              >
                <CustomInput
                  placeholder={INPUTS_NAMES.name}
                  name={INPUTS_NAMES.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isTouched={touched[INPUTS_NAMES.name]}
                  isValid={!errors[INPUTS_NAMES.name]}
                  error={errors[INPUTS_NAMES.name]}
                  required
                />
                <CustomInput
                  placeholder={INPUTS_NAMES.email}
                  name={INPUTS_NAMES.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isTouched={touched.email}
                  isValid={!errors[INPUTS_NAMES.email]}
                  error={errors[INPUTS_NAMES.email]}
                  required
                />
              </form>
            )}
          />
        </div>
      </UserListPageWrapper>
    );
  }
}

export default SingleUser;
