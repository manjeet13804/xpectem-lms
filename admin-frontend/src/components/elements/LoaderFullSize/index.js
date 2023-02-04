import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import './styles.scss';

const b = bemlds('loader-full-size');

const LoaderFullSize = ({ isLoading, textId = 'custom.loadingWord' }) => (
  <React.Fragment>
    {isLoading && (
      <Segment className={b()}>
        <Dimmer active inverted>
          <Loader size="big">
            <IntlMessages id={textId} />
          </Loader>
        </Dimmer>
      </Segment>
    )}
  </React.Fragment>
);

export default LoaderFullSize;
