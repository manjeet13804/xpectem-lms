import { Column } from 'typeorm';
import * as config from 'config';
import { ApiModelProperty } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { Exclude, Expose } from 'class-transformer';
import { addDays, differenceInCalendarDays } from 'date-fns/fp';

const DEFAULT_HOURS_PER_WEEK: number = config.get(
  'studyPlan.defaultHoursPerWeek',
);

const HOURS_VARIATIONS: number[] = config.get(
  'studyPlan.hoursVariations',
);

const MAX_HOURS_VARIATION = HOURS_VARIATIONS[HOURS_VARIATIONS.length - 1];

const MONKEY_HOURS_PER_WEEK = MAX_HOURS_VARIATION + 1;

const MONKEY_HOURS_VARIATIONS = HOURS_VARIATIONS.concat([
  MONKEY_HOURS_PER_WEEK,
]);

@Expose()
export class CourseStudentStudyPlan {
  @Column({ nullable: true })
  @ApiModelProperty()
  public wishedDoneDate: Date;

  @Column({ nullable: true })
  @ApiModelProperty()
  public hoursPerWeek: number;

  public static fromApproximatelyDays(
    approximatelyDays: number,
    startAt: Date,
  ) {
    return CourseStudentStudyPlan.fromHoursPerWeek(
      DEFAULT_HOURS_PER_WEEK,
      approximatelyDays,
      startAt,
    );
  }

  public static fromHoursPerWeek(
    hoursPerWeek: number,
    approximatelyDays: number,
    startAt: Date,
  ) {
    const multiplier = DEFAULT_HOURS_PER_WEEK / hoursPerWeek;

    const wishedDoneDate = addDays(
      Math.round(approximatelyDays * multiplier),
      startAt,
    );

    return new CourseStudentStudyPlan({
      wishedDoneDate,
      hoursPerWeek,
    });
  }

  constructor(studyPlan?: Partial<CourseStudentStudyPlan>) {
    !!studyPlan && Object.assign(
      this,
      studyPlan,
    );
  }

  @Expose()
  @ApiModelProperty()
  get leftDays() {
    if (this.wishedDoneDate === null) {
      return null;
    }

    const leftDaysByStudyPlan = differenceInCalendarDays(
      Date.now(),
      this.wishedDoneDate,
    );

    if (leftDaysByStudyPlan < 0) {
      return null;
    }

    return leftDaysByStudyPlan;
  }

  @Exclude()
  public selectHoursPerWeek = (
    hoursPerWeek: number,
    approximatelyDays: number,
    startAt: Date,
  ): CourseStudentStudyPlan => {
    if (this.hoursPerWeek === hoursPerWeek) {
      return this;
    }

    const now = new Date();

    const multiplier =  DEFAULT_HOURS_PER_WEEK / hoursPerWeek;

    const daysToDoneCourseFromScratch = Math.round(
      approximatelyDays * multiplier,
    );

    const passedDaysMultiplier = this.hoursPerWeek / DEFAULT_HOURS_PER_WEEK;

    const passedDays = Math.round(
      differenceInCalendarDays(
        startAt,
        now,
      ) * passedDaysMultiplier,
    );

    const isStudentHasPreviousStudyPlan = !!this.hoursPerWeek && !!this.wishedDoneDate;

    const wishedDoneDate = isStudentHasPreviousStudyPlan
      ? addDays(
        daysToDoneCourseFromScratch - passedDays,
        now,
      )
      : addDays(
        daysToDoneCourseFromScratch,
        startAt,
      );

    return new CourseStudentStudyPlan({
      wishedDoneDate,
      hoursPerWeek,
    });
  }

  @Exclude()
  public selectWishedDoneDate = (
    wishedDoneDate: Date,
    approximatelyDays: number,
    startAt: Date,
  ): CourseStudentStudyPlan => {
    const now = new Date();

    const passedDaysMultiplier = this.hoursPerWeek / DEFAULT_HOURS_PER_WEEK;

    const passedDays = Math.round(
      differenceInCalendarDays(
        startAt,
        now,
      ) * passedDaysMultiplier,
    );

    const leftDays40hrsPerWeek = approximatelyDays - passedDays;
    const leftDays = differenceInCalendarDays(now, wishedDoneDate);

    const hours = leftDays40hrsPerWeek * DEFAULT_HOURS_PER_WEEK / leftDays;

    const hoursPerWeek = MONKEY_HOURS_VARIATIONS.reduce(
      (p: number, c: number) => (
        Math.abs(c - hours) < Math.abs(p - hours) ? c : p
      ),
    );

    if (hoursPerWeek === MONKEY_HOURS_PER_WEEK) {
      throw new BadRequestException(
        `Even at ${MAX_HOURS_VARIATION} hours `
         + 'a week you will not have time to done this course.',
      );
    }

    return new CourseStudentStudyPlan({
      wishedDoneDate,
      hoursPerWeek,
    });
  }
}
