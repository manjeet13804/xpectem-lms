// @flow
import React, { Node, useEffect, useState } from 'react';
import { bemlds } from 'utils';
import testCourseLogo from 'assets/images/test-course-logo.png';
import './styles.scss';
import { connect } from 'react-redux';
import { getUserFirstName, getMyOrganisationInformation } from 'redux/selectors';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import { getInformationAboutMyOrganization } from '../../../redux/actions';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const b = bemlds('about-company');

type PropType = {
  firstName: string,
  organisationInformation: object
};

const getText = (name: string): string => `Hi ${name}!`;

const AboutCompany = (props: PropType): Node => {
  const [textarea, setTextArea] = useState(null);
  const { firstName, organisationInformation } = props;

  const {
    logoImageUri,
    userWelcomeText,
  } = organisationInformation;

  useEffect(() => {
    if (userWelcomeText) {
      const text = EditorState.createWithContent(convertFromRaw(JSON.parse(userWelcomeText)));
      setTextArea(text);
    }
  }, [userWelcomeText]);
  return (
    <section className={b()}>
      <img className={b('logo')} src={logoImageUri || testCourseLogo} alt="Cours" />
      <div>
        <span className={b('text')}>{getText(firstName)}</span>
        <Editor
          editorState={textarea}
          toolbarHidden
          editorClassName={b('text')}
        />
      </div>
    </section>
  );
};

const mapStateToProps = (state: object): string => ({
  firstName: getUserFirstName(state),
  organisationInformation: getMyOrganisationInformation(state),
});

const mapDispatchToProps = {
  getOrganisationInfo: getInformationAboutMyOrganization,
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutCompany);
