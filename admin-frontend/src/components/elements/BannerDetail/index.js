import React, { PureComponent } from 'react';
import { bemlds } from 'utils';
import { IntlMessages } from 'components';
import BannerDetailWrapper from './bannerDetail.style';

const b = bemlds('banner-detail');

class BannerDetail extends PureComponent {
  render() {
    const {
      changeNavTitle,
      title,
      isCurrentNav,
      doneAt,
    } = this.props;

    const nav = doneAt ? [
      'courseDetails.courseTab',
      'courseDetails.communicationTab',
      'courseDetails.notesTable',
      'courseDetails.certificationTab',
      'courseDetails.qaTab',
    ] : [
      'courseDetails.courseTab',
      'courseDetails.communicationTab',
      'courseDetails.notesTable',
      'courseDetails.qaTab',
    ];

    const handleChangeNavTitle = (key) => {
      changeNavTitle(key);
    };

    return (
      <BannerDetailWrapper>
        <section className={b()}>
          <div className={b('title')}>
            {title}
          </div>
          <div className={b('block')}>
            {nav.map(item => (
              <div
                key={item}
                role="button"
                onClick={() => handleChangeNavTitle(item)}
                className={b('block-item', { active: item === isCurrentNav })}
              >
                <IntlMessages id={item} />
              </div>
            ))}
          </div>
        </section>
      </BannerDetailWrapper>
    );
  }
}

export default BannerDetail;
