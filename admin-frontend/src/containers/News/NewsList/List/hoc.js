import React from 'react';
import ListLogic from './logic';


const withListHOC = (Component) => {
  const ListHOC = props => (
    <ListLogic
      {...props}
      component={({ ...rest }) => <Component {...rest} />}
    />
  );

  return ListHOC;
};

export default withListHOC;
