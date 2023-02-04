import withConnect from './container';
import withListLogic from './hoc';
import List from './component';

const logicList = withListLogic(List);
const connectList = withConnect(logicList);

export default connectList;
