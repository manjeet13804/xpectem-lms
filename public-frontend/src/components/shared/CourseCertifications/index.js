// @flow
import React, { Component, Node } from 'react';
import { format } from 'date-fns';
import { bemlds, timeCheck } from 'utils';
import { SERTIFICATION_EXAM } from 'localise';
import { DialogPopup, InfoPopup } from 'components';
import { CertificationType } from 'models';
import FailedIcon from './components/FailedIcon';
import PassedIcon from './components/PassedIcon';
import './styles.scss';

const formatStartAt = (startAt: Date): string => format(
  new Date(startAt),
  'dd MMMM yyyy HH:mm',
);

const getCertificationTitle = (
  {
    city,
    street,
    zip,
    startAt,
  }: CertificationType,
): string => [
  city,
  street,
  zip,
  formatStartAt(startAt),
]
  .filter(Boolean)
  .join(', ');

const POPUP_TOGGLE_BOOKING = 'toggle-booking';
const POPUP_ERROR_BOOKING = 'error-booking';

const b = bemlds('certification-tab');
const logs = bemlds('logs');

const {
  title,
  subTitle,
  description,
  cancelBtn,
  reservePlace,
  reserveText,
  cancelText,
  cancelErrorText,
  reserveErrorText,
  logsTitle,
  totalLogs,
} = SERTIFICATION_EXAM;

const defaultProps = {
  className: '',
};

type PropType = {
  className?: string,
  makeBooking: (certificationId: number) => void,
  cancelBooking: (certificationId: number) => void,
  certifications: CertificationType[]
};

class CourseCertifications extends Component<PropType> {
  state = {
    popup: null,
    errorText: null,
    certification: null,
  };

  constructor(props: PropType) {
    super(props);
    this.block = React.createRef();
  }

  tryBook = (certificationId: number): function => () => {
    const { certifications } = this.props;

    const isNotAlreadyBooked = certifications.every(
      ({ isBooked }: object): boolean => !isBooked,
    );

    const certification = certifications.find(
      ({ id }: CertificationType): boolean => id === certificationId,
    );

    this.setState(
      isNotAlreadyBooked
        ? {
          popup: POPUP_TOGGLE_BOOKING,
          certification,
        }
        : {
          popup: POPUP_ERROR_BOOKING,
          errorText: reserveErrorText,
        },
    );
  };

  tryCancel = (certificationId: number): function => () => {
    const { certifications } = this.props;

    const certification = certifications.find(
      ({ id }: CertificationType): boolean => id === certificationId,
    );

    this.setState(
      timeCheck(
        new Date(certification.startAt),
        new Date(),
      )
        ? {
          popup: POPUP_TOGGLE_BOOKING,
          certification,
        }
        : {
          popup: POPUP_ERROR_BOOKING,
          errorText: cancelErrorText,
        },
    );
  };

  toggleBooking = () => {
    const { certification } = this.state;
    const { makeBooking, cancelBooking } = this.props;

    if (certification.isBooked) {
      cancelBooking(certification.id);
    } else {
      makeBooking(certification.id);
    }

    this.setState({
      popup: null,
      certification: null,
    });
  };

  cancelToggleBooking = () => {
    this.setState({
      popup: null,
      certification: null,
    });
  };

  closeErrorBooking = () => {
    this.setState({
      popup: null,
      errorText: null,
    });
  };

  generateToggleText = (): string => {
    const {
      certification: {
        city,
        startAt,
        isBooked,
      },
    } = this.state;

    return `${isBooked ? cancelText : reserveText} ${city}, ${formatStartAt(startAt)}?`;
  };

  render(): Node {
    const {
      popup,
      errorText,
    } = this.state;

    const {
      className,
      certifications,
      currentMyCourse,
      certificationsLogs = [],
    } = this.props;

    const { title: courseTitle } = currentMyCourse;

    const toggleBookingText = popup === POPUP_TOGGLE_BOOKING ? this.generateToggleText() : null;

    return (
      <section className={b({mix: className})}>
        <span className={b('title')}>{`${title} ${courseTitle}`}</span>
        <span className={b('description')}>{description}</span>
        <div className={b('dates-block')}>
          <span className={b('dates-block-title')}>{subTitle}</span>
          {
            certifications.map((
              {
                id,
                isBooked,
                ...certification
              }: object,
            ): Node => (
              <div className={b('list-item', { reserve: isBooked })} key={id}>
                <span className={b('list-item-text')}>
                  {getCertificationTitle(certification)}
                </span>
                {
                  isBooked
                    ? (
                      <button
                        className={b('list-item-btn')}
                        type="button"
                        onClick={this.tryCancel(id)}
                      >
                        {cancelBtn}
                      </button>
                    )
                    : (
                      <button
                        className={b('list-item-btn')}
                        type="button"
                        onClick={this.tryBook(id)}
                      >
                        {reservePlace}
                      </button>
                    )
                }
              </div>
            ))
          }
        </div>
        {popup === POPUP_TOGGLE_BOOKING && (
          <DialogPopup
            className={b('popup')}
            text={toggleBookingText}
            callbackYes={this.toggleBooking}
            callbackNo={this.cancelToggleBooking}
          />
        )}
        {popup === POPUP_ERROR_BOOKING && (
          <InfoPopup
            className={b('popup')}
            text={errorText}
            callback={this.closeErrorBooking}
          />
        )}
        <div className={logs()}>
          <div className={logs('title')}>
            <span>{logsTitle}</span>
          </div>
          <div className={logs('totla')}>
            <span>
              <span>{totalLogs}</span>
              {certificationsLogs.length}
            </span>
          </div>
          <div className={logs('list')}>
            {certificationsLogs && certificationsLogs.map((el: object, i: number): Node => (
              <div key={el.id} className={logs('item', { dark: i % 2 })}>
                <div className={logs('item-image')}>
                  {el.isPassed ? <PassedIcon /> : <FailedIcon />}
                </div>
                <div className={logs('item-info')}>
                  <p>{el.date}</p>
                  <p>{el.results}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

CourseCertifications.defaultProps = defaultProps;

export default CourseCertifications;
