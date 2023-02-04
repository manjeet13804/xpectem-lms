const reducerAssignments = ({ payload, state, transformStudentLogs }) => {
  const {
    value,
    courseTopicId,
    assignmentId,
    studLogId,
    lessonId,
    completedAt,
    data,
    assignId: currentAssignmentId,
  } = payload;
  const assignId = currentAssignmentId || assignmentId;
  const {
    courseContent,
    courseContent: { course = {} },
  } = state;
  const { courseTopics } = course;


  if (lessonId) {
    const newTopics = courseTopics.map((item) => {
      if (item.topic.id === courseTopicId) {
        const newLessons = item.topic.lessons.map((lesson) => {
          if (lesson.id === lessonId) {
            const { assignments } = lesson;
            return {
              ...lesson,
              assignments: assignments.map((assignment) => {
                if (assignment.id === assignId) {
                  return {
                    ...assignment,
                    studentLogs: transformStudentLogs({
                      studLogId,
                      completedAt,
                      studentLogs: assignment.studentLogs,
                      status: value,
                    }),
                  };
                }

                return assignment;
              }),
            };
          }

          return lesson;
        });
        return {
          ...item,
          lessons: newLessons,
        };
      }

      return item;
    });

    return {
      ...state,
      courseContent: {
        ...courseContent,
        course: {
          ...course,
          courseTopics: [...newTopics],
        },
      },
    };
  }
  const indexCourseTopic = courseTopics.findIndex(({ topic: { id } }) => id === courseTopicId);

  const {
    topic,
    topic: { assignments },
  } = courseTopics[indexCourseTopic];

  const indexAssignment = assignments.findIndex(({ id }) => id === assignId);

  const { studentLogs } = assignments[indexAssignment];

  const newStudentLogs = transformStudentLogs({
    studLogId,
    completedAt,
    studentLogs,
    data,
    status: value,
  });

  const newAssignments = [...assignments];
  newAssignments[indexAssignment] = {
    ...newAssignments[indexAssignment],
    studentLogs: newStudentLogs,
  };

  const newTopic = {
    ...topic,
    assignments: newAssignments,
  };

  const newCourseTopics = [...courseTopics];
  newCourseTopics[indexCourseTopic] = {
    ...newCourseTopics[indexCourseTopic],
    topic: newTopic,
  };

  return {
    ...state,
    courseContent: {
      ...courseContent,
      course: {
        ...course,
        courseTopics: [...newCourseTopics],
      },
    },
  };
};

export default reducerAssignments;
