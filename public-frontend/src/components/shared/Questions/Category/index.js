// @flow
import React, { Node, useState } from 'react';
import { bemlds } from 'utils';
import { PlusIcon, MinusIcon, Question } from 'components';
import './styles.scss';

const b = bemlds('category');

const DefaultProps = {
  className: '',
};

type PropType = {
  className?: string,
  name: string,
  questions: object[]
};


const Category = ({ className, name, questions }: PropType): Node => {
  const [isOpen, changeStatus] = useState(false);

  const onClick = () => {
    changeStatus(!isOpen);
  };

  return (
    <div className={b({mix: className})}>
      <span className={b('category-title')}>{name}</span>
      <button className={b('category-btn')} onClick={onClick} type="button">
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </button>
      <div className={b('question-list', {open: isOpen})}>
        {
          questions.map(({id, question, answer}: object): Node => (
            <div className={b('question-wrap')} key={`question${id}`}>
              <Question className={b('question')} text={question} answer={answer} isQa />
            </div>
          ))
        }
      </div>
    </div>
  );
};

Category.defaultProps = DefaultProps;

export default Category;
