// @flow
import React, { Node, useEffect, useState } from 'react';
import { bemlds } from 'utils';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Questions, SearchBlock, Question } from 'components';
import { FaqTopicType, FaqQuestionType } from 'models';
import { getFaq, searchFaq } from 'redux/actions';
import { getTopicsForFaq, getSearchQuestions } from 'redux/selectors';
import './styles.scss';
import Loader from 'components/elements/CustomLoader';
import {getQuestionsIsLoading} from 'redux/faq/selectors';

const b = bemlds('faq');

const defaultProps = {
  className: '',
};

type PropType = {
    className?: string,
    topics: FaqTopicType[],
    getTopics: () => void,
    questions: FaqQuestionType[],
    searchQuestions: (query: string) => void,
    // eslint-disable-next-line react/no-unused-prop-types
    match: object
};

const Faq = (
  {
    className,
    topics,
    getTopics,
    questions,
    searchQuestions,
    questionsLsLoading,
  }: PropType,
): Node => {
  useEffect(
    () => {
      getTopics();
    },
    [],
  );

  const [
    [isSearch, showSearchBlock],
    [searchText, setSearchText],
  ] = [
    useState(false),
    useState(null),
  ];

  const submitSearch = (query: string) => {
    setSearchText(query);

    if (query) {
      showSearchBlock(true);
      searchQuestions(query);
    } else {
      showSearchBlock(false);
    }
  };

  return (
    <section className={b({mix: className})}>
      {questionsLsLoading ? (
        <Loader />
      ) : (
        <>
          <SearchBlock className={b('search')} onSubmit={submitSearch} />
          {
              isSearch
                ? (
                  <div className={b('search-block')}>
                    {questions.map(
                      (
                        {
                          id: index,
                          question,
                          answer,
                        }: object,
                      ): Node => (
                        <div className={b('question-wrap')} key={`question${index}`}>
                          <Question
                            className={b('question')}
                            text={question}
                            answer={answer}
                            searchText={searchText}
                            isQa
                          />
                        </div>
                      ),
                    )}
                  </div>
                )
                : <Questions topics={topics} />
          }
        </>
      )}
    </section>
  );
};

Faq.defaultProps = defaultProps;

const mapStateToProps = (
  state: object,
  {
    section,
    match: {
      params: {
        id,
      },
    },
  }: PropType,
): object => ({
  topics: getTopicsForFaq(
    state,
    {
      section,
      courseId: Number(id),
    },
  ),
  questions: getSearchQuestions(state),
  questionsLsLoading: getQuestionsIsLoading(state),
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  {
    section,
    match: {
      params: {
        id,
      },
    },
  }: PropType,
): object => ({
  getTopics: (): void => dispatch(
    getFaq(section, Number(id)),
  ),
  searchQuestions: (query: string): void => dispatch(
    searchFaq(query, section, Number(id)),
  ),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Faq),
);
