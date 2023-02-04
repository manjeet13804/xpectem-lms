import React from 'react';
import NewsLogic from './logic';


const withNewsLogic = (Component) => {
  const NewsHOC = props => (
    <NewsLogic
      {...props}
      component={({ ...rest }) => <Component {...rest} />}
    />
  );

  return NewsHOC;
};

export default withNewsLogic;
