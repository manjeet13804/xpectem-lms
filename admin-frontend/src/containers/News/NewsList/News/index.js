import withConnect from './container';
import withNewsLogic from './hoc';
import News from './component';

const logicNews = withNewsLogic(News);
const connectNews = withConnect(logicNews);

export default connectNews;
