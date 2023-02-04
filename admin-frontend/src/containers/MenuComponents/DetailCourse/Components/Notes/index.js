import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import studentsActions from 'redux/students/actions';
import {
  getNoteStudentsFp,
  getNoteValueStudentsFp,
} from 'selectors';
import _ from 'lodash';
import qs from 'qs';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import {
  TextFormatSimple,
} from 'components';
import NotesWrapper from './notes.style';

const b = bemlds('notes');
const btn = bemlds('button');

class Notes extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      imageSrc: null,
      isEdit: false,
    };
  }

  handleClickEdit = () => {
    this.setState({ isEdit: true });
  };

  handleSaveDescription = (value) => {
    const { changeDescriptionStudents } = this.props;
    changeDescriptionStudents(value);
  };

  handleSaveNote = () => {
    const {
      addNotesStudents,
      addValueToNote,
      noteValue,
      idStudent,
    } = this.props;

    const body = _.pickBy({
      note: noteValue,
    }, _.identity);

    if (noteValue) {
      addNotesStudents(qs.stringify(body), idStudent);
      addValueToNote(noteValue);
    }

    this.setState({ isEdit: false });
  };

  componentWillMount() {
    const { getNotesStudents, idStudent } = this.props;
    getNotesStudents(idStudent);
  }

  render() {
    const { isEdit } = this.state;
    const {
      note,
      noteValue,
    } = this.props;

    const isNoteUndefined = !isEdit && (typeof note === 'undefined');
    const isNoteEdit = isEdit && note && !noteValue;
    const isNoteRender = !isEdit && note;

    return (
      <LayoutContent>
        <NotesWrapper>
          <section className={b()}>
            <div className={b('title')}>
              <IntlMessages id="notes.title" />
            </div>
            <div className={b('block')}>
              {isNoteUndefined && (
                <div className={b('save')}>
                  <TextFormatSimple
                    saveDescription={this.handleSaveDescription}
                    note={note}
                    name="note"
                    disabled={!noteValue}
                  />
                  <div className={btn()}>
                    <button
                      className={btn('save')}
                      onClick={this.handleSaveNote}
                    >
                      <IntlMessages id="notes.saveBtn" />
                    </button>
                  </div>
                </div>
              )}

              {isNoteEdit && (
                <div className={b('save')}>
                  <TextFormatSimple
                    saveDescription={this.handleSaveDescription}
                    note={note}
                    name="note"
                  />
                  <div className={btn()}>
                    <button
                      className={btn('save')}
                      onClick={this.handleSaveNote}
                      disabled={!note}
                    >
                      <IntlMessages id="notes.saveBtn" />
                    </button>
                  </div>
                </div>
              )}

              {isNoteRender && (
                <div className={b('edit')}>
                  <textarea
                    value={note}
                    className={b('edit-text')}
                    disabled
                  />
                  <div className={btn()}>
                    <button
                      className={btn('save')}
                      onClick={this.handleClickEdit}
                    >
                      <IntlMessages id="notes.editBtn" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </NotesWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const note = getNoteStudentsFp(state);
  const noteValue = getNoteValueStudentsFp(state);

  return {
    note,
    noteValue,
  };
};

export default connect(
  mapStateToProps,
  {
    ...studentsActions,
  },
)(Notes);

