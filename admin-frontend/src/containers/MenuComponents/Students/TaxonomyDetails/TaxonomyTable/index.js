import React from 'react';
import {
  DefaultButton,
  TrashIcon,
  Checkbox,
  CustomTextInput,
} from 'components';
import { bemlds } from 'utils';
import IntlMessages from 'components/utility/intlMessages';
import PropTypes from 'prop-types';


const form = bemlds('taxonomy-form');
const item = bemlds('form-item');

const propTypes = {
  taxonomies: PropTypes.arr,
  handleAddRow: PropTypes.func,
  handleRemoveRow: PropTypes.func,
  handleChangeTaxonomy: PropTypes.func,
  handleCheck: PropTypes.func,
  handleBlur: PropTypes.func,
  validationErrors: PropTypes.func,
};

const defaultProps = {
  taxonomies: [],
  handleAddRow: () => null,
  handleRemoveRow: () => null,
  handleChangeTaxonomy: () => null,
  handleCheck: () => null,
  handleBlur: () => null,
  validationErrors: () => null,
};

const TaxonomyTable = ({
  taxonomies,
  handleAddRow,
  handleRemoveRow,
  handleChangeTaxonomy,
  handleCheck,
  handleBlur,
  validationErrors,
}) => (
  <section className={form()}>
    <table className={form('form-table')}>
      <tbody>
        {taxonomies.length > 0 && (
          <tr>
            <th>
              <div className={item('label')}>
                <IntlMessages id="students.metaDataNameLabel" />
              </div>
            </th>
            <th>
              <div className={item('label')}>
                <IntlMessages id="students.metaDataFormatLabel" />
              </div>
            </th>
            <th>
              <div className={item('label')}>
                <IntlMessages id="students.metaDataMandatoryLabel" />
              </div>
            </th>
            <th>
              <div className={item('label')}>
                <IntlMessages id="students.metaDataDeleteLabel" />
              </div>
            </th>
          </tr>
        )}
        {taxonomies.map((row) => {
          const err = validationErrors.find(error => error.id === row.id);
          return (
            <tr key={row.id} className={form('form-row')}>
              <td className={item()}>
                <CustomTextInput
                  name="title"
                  onChange={e => handleChangeTaxonomy(e, row.id)}
                  className={item('input')}
                  type="text"
                  value={row.title}
                  onBlur={e => handleBlur(e, row.id)}
                  error={err && err.errText}
                />
              </td>
              <td className={item()}>
                <CustomTextInput
                  name="format"
                  onChange={e => handleChangeTaxonomy(e, row.id)}
                  className={item('input')}
                  type="text"
                  value={row.format}
                />
              </td>
              <td className={item()}>
                <div className={item('check-box')}>
                  <Checkbox
                    name="mandatory"
                    value={row.mandatory}
                    handleCheck={(value, name) => handleCheck(value, name, row.id)}
                  />
                </div>
              </td>
              <td className={item()}>
                <div onClick={() => handleRemoveRow(row.id)} className={item('delete-button')}>
                  <TrashIcon width={18} height={18} />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <div className={form('add-button')}>
      <DefaultButton
        onClick={handleAddRow}
        textId="students.addNewMetaData"
      />
    </div>
  </section>
);

TaxonomyTable.propTypes = propTypes;
TaxonomyTable.defaultProps = defaultProps;
export default TaxonomyTable;
