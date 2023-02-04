// @flow
import React, {Component} from 'react';
import {sharedClass} from 'utils/className';
import block from 'utils/bem';
import {FORMS, TERM_SHARED} from 'localise/en';
import './upload-file-student-form.scss';

type PropsType = {
  importFile: () => void
};

const bem = block('upload-file-student-form');
const btn = block('btn');

const form = sharedClass('form', bem());
const btnSubmit = sharedClass(bem('submit'), 'btn');

const btnCancel = sharedClass(btn({cancel: true}), bem('btn-cancel'));

class UploadFileStudentForm extends Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      fileName: FORMS.fileNoSelected,
      disable: true,
      file: null,
    };
  }

  selectFile = (e: SyntheticEvent) => {
    this.setState({
      fileName: e.target.files[0].name,
      disable: false,
      file: e.target.files[0],
    });
  };

  onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const {importFile} = this.props;
    const {file} = this.state;
    importFile(file);
  }

  render(): Node {
    const {fileName, disable} = this.state;
    return (
      <form className={form} onSubmit={this.onSubmit}>
        <section className={bem('content')}>
          <p className={bem('text')}>{FORMS.descriptionUpload}</p>
          <label htmlFor="file" className={bem('upload')}>
            <input type="file" id="file" onChange={this.selectFile} accept=".csv, .xls, .xlsx" />
            <div className="btn">{FORMS.file}</div>
            <div className="input">{fileName}</div>
          </label>
        </section>
        <hr className="line" />
        <section className={bem('buttons')}>
          <button type="button" className={btnCancel}>
            {TERM_SHARED.abort}
          </button>
          <button
            type="submit"
            disabled={disable}
            className={btnSubmit}
          >
            {TERM_SHARED.upload}
          </button>
        </section>

      </form>
    );
  }
}


export default UploadFileStudentForm;
