// @flow
import React, { Node, Component, SyntheticEvent } from 'react';
import { STUDYPLAN } from 'localise';
import { STUDY_PLAN } from 'constants/constants';
import { bemlds } from 'utils';
import './styles.scss';


const { hoursPerWeek } = STUDYPLAN;
const b = bemlds('work-time-select');

const { labels } = STUDY_PLAN;

const DefaultProps = {
  className: '',
};

type PropType = {
  className?: string,
  value: number,
  saveData: () => void
};

class WorkTimeSelect extends Component<PropType> {
  constructor(props: PropType) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.checkClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.checkClick);
  }

  checkClick = (e: SyntheticEvent) => {
    const isBlockClick = this.block.contains(e.target);
    if (!isBlockClick) {
      this.close();
    }
  };

  openList = () => {
    const { isOpen } = this.state;
    this.setState({isOpen: !isOpen});
  };

  close = () => {
    this.setState({isOpen: false});
  };

  selectValue = (value: number): function => () => {
    const {saveData} = this.props;
    saveData(value);
    this.close();
  };

  saveRoot = (node: SyntheticEvent) => {
    this.block = node;
  };

  render(): Node {
    const { isOpen } = this.state;
    const { className, value } = this.props;
    return (
      <section className={b({ mix: className })} ref={this.saveRoot}>
        <span className={b('title')}>{hoursPerWeek}</span>
        <span className={b('value')}>{value}</span>
        <button className={b('open-btn', {open: isOpen})} type="button" onClick={this.openList} />
        <ul className={b('list', {open: isOpen})}>
          {
            labels.map((item: number): Node => (
              <li className={b('list-item')} key={`mob-${item}`}>
                <button
                  className={b('list-item-btn', {active: value === item})}
                  type="button"
                  onClick={this.selectValue(item)}
                >
                  {item}
                </button>
              </li>
            ))
          }
        </ul>
      </section>
    );
  }
}

WorkTimeSelect.defaultProps = DefaultProps;

export default WorkTimeSelect;
