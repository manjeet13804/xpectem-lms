import React, { PureComponent } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { COLORS } from 'constants/constants';
import { bemlds } from 'utils';
import { IntlMessages } from 'components';
import BannerDetailAdaptiveWrapper from './bannerDetailAdaptive.style';

const b = bemlds('banner-detail-adaptive');
const nav = [
  'Course content',
  'Communication',
  'Notes',
  'Certification',
  'Questions and answers',
];

const menu = (changeNavTitle) => (
  <Menu
    style={{maxWidth: '200px'}}
  >
    {nav.map((item, index) => (
      <Menu.Item key={index} onClick={() => changeNavTitle(item)}>
        <span>{item}</span>
      </Menu.Item>
    ))}
  </Menu>
);

class BannerDetailAdaptive extends PureComponent {
  render() {
    const {
      changeNavTitle,
      title,
      isCurrentNav,
    } = this.props;

    return (
      <BannerDetailAdaptiveWrapper>
        <section className={b()}>
          <div className={b('title')}>
            {title}
          </div>
          <Dropdown overlay={menu(changeNavTitle)} trigger={['click']}>
            <div className={b('dropdown')}>
              <span className={b('dropdown-title')}>
                <IntlMessages id={isCurrentNav} />
              </span>
              <Icon
                type="caret-down"
                theme="filled"
                style={{color: COLORS.white}}
              />
            </div>
          </Dropdown>
        </section>
      </BannerDetailAdaptiveWrapper>
    );
  }
}

export default BannerDetailAdaptive;

