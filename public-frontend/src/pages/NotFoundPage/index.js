// @flow
import React, { Node } from 'react';
import { ERRORS } from 'localise';

function NotFoundPage(): Node {
  return <h1>{ERRORS.pageNotFound}</h1>;
}

export default NotFoundPage;
