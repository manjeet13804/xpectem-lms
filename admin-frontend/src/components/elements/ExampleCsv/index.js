import React, { Component } from 'react';
import { bemlds } from 'utils';
import IntlMessages from 'components/utility/intlMessages';
import { columnName, dataOrgAdmins, dataGroups } from './example';
import ExampleCsvWrapper from './exampleCsv.style';

const b = bemlds('example-csv');

const switchTemplate = (type) => {
  switch(type) {
    case ('OrgAdmins'):
      return dataOrgAdmins;
    case ('Groups'):
      return dataGroups;
    default:
      return null;
  }
};

class ExampleCsv extends Component {
  render() {
    const { type } = this.props;

    return (
      <ExampleCsvWrapper>
        <section className={b()}>
          <div className={b('title')}>
            <IntlMessages id="orgAdmins.importExampleTitle" />
          </div>
          <div className={b('table')}>
            <div className={b('header')}>
              {columnName.map((item, index) =>
                <div key={index} className={b('column')}>{item}</div>
              )}
            </div>
            {switchTemplate(type).map((item, index) =>
              <div key={index} className={b('row')}>
                {item.map( (row, index) => <div key={index} className={b('column')}>{row}</div>)}
              </div>
            )}
          </div>
        </section>
      </ExampleCsvWrapper>
    );
  }
}

export default ExampleCsv;
