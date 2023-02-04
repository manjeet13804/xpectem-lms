// @flow
import React, { Node } from 'react';
import block from 'utils/bem';
import {
  UnPublishedIcon,
  PublishedIcon,
} from 'components';
import { TERM_SHARED } from 'localise';

import './published.scss';

const bem = block('published');

const DefaultProps = {
  isPublished: false,
};

type PropType = {
  isPublished?: boolean
};

const PublishedStatus = (props: PropType): Node => {
  const { isPublished } = props;
  return (
    <div className={bem()}>
      {
        isPublished && (
          <React.Fragment>
            <PublishedIcon />
            <span className={bem('text')}>{TERM_SHARED.published}</span>
          </React.Fragment>
        )
      }
      {
        !isPublished && (
          <React.Fragment>
            <UnPublishedIcon />
            <span className={bem('text')}>{TERM_SHARED.unpublished}</span>
          </React.Fragment>
        )
      }
    </div>
  );
};

PublishedStatus.defaultProps = DefaultProps;

export default PublishedStatus;
