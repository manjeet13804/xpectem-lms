// @flow
import React, { Node } from 'react';
import { bemlds } from 'utils';
import { TERM_SHARED } from 'localise';
import { FaqTopicType } from 'models';
import Category from './Category';
import './styles.scss';

const b = bemlds('questions');

const defaultProps = {
  className: '',
};

type PropType = {
  className?: string,
  topics: FaqTopicType[]
};

const { frequentlyAskedQuestions } = TERM_SHARED;

const Questions = (
  {
    className,
    topics,
  }: PropType,
): Node => (
  <section className={b({mix: className})}>
    <span className={b('title')}>{frequentlyAskedQuestions}</span>
    <hr className={b('separator')} />
    <div className={b('questions-block')}>
      {
          topics.map(({id: categoryId, questions, title}: object): Node => (
            <div className={b('category-wrap')} key={categoryId}>
              <Category
                className={b('category')}
                questions={questions}
                name={title}
              />
            </div>
          ))
        }
    </div>
  </section>
);

Questions.defaultProps = defaultProps;

export default Questions;
