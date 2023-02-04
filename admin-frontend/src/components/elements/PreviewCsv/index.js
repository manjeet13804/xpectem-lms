import React, { Component } from 'react';
import { bemlds } from 'utils';
import { TitleDropdown } from 'components';
import PreviewCsvWrapper from './previewCsv.style';

const b = bemlds('preview-csv');

const actualValue = (newValue) => {
  switch (newValue) {
    case ('Do not imported'):
      return null;
    case ('First name'):
      return 'firstName';
    case ('Last name'):
      return 'lastName';
    case ('E-mail address'):
      return 'email';
    case ('Telephone'):
      return 'phone';
    case ('Language'):
      return 'language';
    case ('Notifications e-mail'):
      return 'notifyEmail';
    case ('Notifications SMS'):
      return 'notifySms';
    case ('Person number'):
      return 'personNumber';
    case ('Employee number'):
      return 'employeeNumber';
    case ('Group name'):
      return 'name';
    case ('Group description - Swedish'):
      return 'description_swe';
    case ('Group description - Norwegian'):
      return 'description_nor';
    case ('Group description - English'):
      return 'description_eng';
    default:
  }
};

class PreviewCsv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayForBack: [],
    };
  }

  componentDidMount() {
    const { data } = this.props;
    const array = data[0].map(actualValue);
    this.setState({ arrayForBack: [...array] });
  }

  addValueToArrayForBack = (indexSelect, newValue) => {
    const { getArray } = this.props;
    const { arrayForBack } = this.state;
    const newArrayForBack = [...arrayForBack];

    newArrayForBack[indexSelect] = actualValue(newValue);

    this.setState({ arrayForBack: [...newArrayForBack] });
    getArray(newArrayForBack);
  };

  render() {
    const { data, type } = this.props;
    const columnName = data[0];
    const tableData = data.filter((item, index) => (index !== 0 && index <= 10));
    return (
      <PreviewCsvWrapper>
        <section className={b()} id="preview-csv-container">
          <div className={b('table')}>
            <div className={b('header')}>
              {columnName.map((item, index) => (
                <TitleDropdown
                  type={type}
                  addValue={this.addValueToArrayForBack}
                  indexSelect={index}
                  key={index}
                  className={b('column')}
                  currentOption={item}
                  allTitle={columnName}
                />
              ))}
            </div>
            { tableData.map((item, index) => (
              <div key={index} className={b('row')}>
                {item.map((row, index) => <div key={index} className={b('column')}>{row}</div>)}
              </div>
            ))}
          </div>
        </section>
      </PreviewCsvWrapper>
    );
  }
}

export default PreviewCsv;
