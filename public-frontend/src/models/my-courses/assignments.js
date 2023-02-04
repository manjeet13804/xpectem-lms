// @flow

const AssignmentLogStatuses = {
  Started: 'started',
  Completed: 'completed',
  Passed: 'passed',
  Failed: 'failed',
};

type AssignmentLogType = {
    id: number,
    points: number,
    status: $Values<typeof AssignmentLogStatuses>,
    startedAt: Date,
    completedAt: Date,
    approvedAt: Date
};

const AssignmentTypes = {
  WebForm: 1,
  File: 2,
};

const isManualAssignment = (
  type: $Values<AssignmentTypes>,
): boolean => type === AssignmentTypes.File;

const isAutoAssignment = (
  type: $Values<AssignmentTypes>,
): boolean => type === AssignmentTypes.WebForm;

type AssignmentType = {
    id: number,
    name: string,
    description: string | null,
    maxTries: number,
    type: $Values<typeof AssignmentTypes>,
    log: AssignmentLogType | null,
    url: string | null,
    todayTries: number,
    totalTries: number
};

export {
  AssignmentLogStatuses,
  AssignmentLogType,
  AssignmentTypes,
  isManualAssignment,
  isAutoAssignment,
  AssignmentType,
};
