import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LayoutWrapper from 'components/utility/layoutWrapper';
import PageHeader from 'components/utility/pageHeader';
import { Tabs } from 'antd';
import { Box } from './newsList.style';
import NewsTabs from './newsTabs.style';
import NewsSources from './NewsSources';
import NewsList from './NewsList';
import {
  NEWS_PATH,
  OPTIONS,
  NEWS,
} from './params';

const propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const defaultProps = {
  match: {},
};

class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: null,
    };
  }

  componentWillMount() {
    const { match: { params }, history } = this.props;
    const { type } = params;

    if (!type || !OPTIONS[type]) {
      history.push({
        pathname: NEWS_PATH,
      });

      this.setState({
        currentTab: NEWS,
      });
    } else {
      this.setState({
        currentTab: type,
      });
    }
  }

  getHeader = tab => OPTIONS[tab].title;

  onTabSelect = (key) => {
    const { history } = this.props;

    this.setState({
      currentTab: key,
    });

    history.push({
      pathname: `/dashboard/news/${key}`,
    });
  }

  render() {
    const { currentTab } = this.state;
    const { match } = this.props;

    return (
      <NewsTabs>
        <LayoutWrapper>
          <PageHeader>
            {this.getHeader(currentTab)}
          </PageHeader>
          <Box>
            <Tabs onChange={this.onTabSelect} type="card" style={{ minHeight: '50vh' }} activeKey={currentTab}>
              <Tabs.TabPane tab={OPTIONS.news.title} key={OPTIONS.news.tabKey}>
                <NewsList match={match} />
              </Tabs.TabPane>
              <Tabs.TabPane tab={OPTIONS.news_sources.title} key={OPTIONS.news_sources.tabKey}>
                <NewsSources match={match} />
              </Tabs.TabPane>
            </Tabs>
          </Box>
        </LayoutWrapper>
      </NewsTabs>
    );
  }
}

EventList.defaultProps = defaultProps;
EventList.propTypes = propTypes;

export default EventList;
