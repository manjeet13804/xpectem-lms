import { connect } from 'react-redux';
import Form from 'components/uielements/form';
import newsActions from 'redux/news/actions';
import assetActions from 'redux/assets/actions';
import sourceActions from 'redux/newsSources/actions';

function mapState({
  news,
  assets: assetState,
  newsSources: sourcesState,
}) {
  const { assets } = assetState;
  const { newsSources } = sourcesState;

  return { ...news, newsSources, assets };
}

const withConnect = (Component) => {
  const wrappedComponent = Form.create()(Component);

  return connect(
    mapState,
    {
      ...newsActions,
      ...assetActions,
      ...sourceActions,
    },
  )(wrappedComponent);
};


export default withConnect;
