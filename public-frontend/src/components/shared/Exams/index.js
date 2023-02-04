// @flow
import React, {
  Node,
  useState,
} from 'react';
import { Theme } from '../CourseChapter/components';
import ExamView from './components/examView';
import './styles.scss';

const defaultProps = {
  exams: [],
};


const getStatus = (isCompleted, isStarted) => {
  if (isCompleted && isStarted) {
    return 2;
  }

  if (!isCompleted) {
    return 1;
  }
};

const Exams = ({
  exams,
}): Node => {
  const [
    examId,
    selectExam,
  ] = useState(null);

  const currentExam = examId && exams.find(
    ({ id }): boolean => id === examId,
  );

  if (exams.length === 0) {
    return null;
  }

  const closeModal = () => selectExam(null);
  return (
    <>
      {exams.map((exam): Node => (
        <Theme
          key={exam.id}
          title={exam.name}
          learnStatus={getStatus(exam.isCompleted, exam.isStarted)}
          onClickExam={() => selectExam(exam.id)}
        />
      ))}
      {
          currentExam && (<ExamView exam={currentExam} close={closeModal} />
          )
      }
    </>
  );
};

Exams.defaultProps = defaultProps;

export default Exams;
