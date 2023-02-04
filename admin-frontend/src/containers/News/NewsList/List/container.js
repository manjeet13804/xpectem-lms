import { connect } from 'react-redux';
import newsActions from 'redux/news/actions';
import assetActions from 'redux/assets/actions';

const mapState = ({
  news,
  assets: { assets, filterAssets },
}) => ({ ...news, assets, filterAssets });


const withConnect = Component => (
  connect(
    mapState,
    {
      ...newsActions,
      ...assetActions,
    },
  )(Component)
);

export default withConnect;
