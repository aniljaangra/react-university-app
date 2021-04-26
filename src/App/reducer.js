/**
 * Created by Anil Jangra on 4/22/2021
 */
import { ATTENDANCE, SET_TEACHER_ATTENDANCE, NOT_ASSIGNED } from '../StudentSchedule/constants';
import initialState from './initialState';

const { PRESENT, ABSENT } = ATTENDANCE;

const updateData = ({ teachers, schedule }, data) => {
  const teacherIndex = teachers.findIndex(
    ({ teacher }) => teacher === data.teacher,
  );
  if (data.attendance === ABSENT) {
    const updatedTeachers = [
      ...teachers.slice(0, teacherIndex),
      { ...teachers[teacherIndex], attendance: ABSENT },
      ...teachers.slice(teacherIndex + 1),
    ];
    const availableTeachers = updatedTeachers
      .filter(
        ({ attendance, level }) => attendance === PRESENT && level > teachers[teacherIndex].level,
      )
      .sort((teacher1, teacher2) => teacher1.level - teacher2.level);
    return {
      teachers: updatedTeachers,
      schedule: schedule.map((scheduleData) => {
        if (
          scheduleData.teacher === data.teacher
            || scheduleData.teacher === NOT_ASSIGNED
        ) {
          return {
            ...scheduleData,
            teacher: availableTeachers.length ? availableTeachers[0].teacher : NOT_ASSIGNED,
          };
        }
        return scheduleData;
      }),
    };
  }
  return {
    teachers: [
      ...teachers.slice(0, teacherIndex),
      { ...teachers[teacherIndex], attendance: PRESENT },
      ...teachers.slice(teacherIndex + 1),
    ],
    schedule: schedule.map((scheduleData) => {
      if (scheduleData.teacher === NOT_ASSIGNED) {
        return { ...scheduleData, teacher: data.teacher };
      }
      return scheduleData;
    }),
  };
};
export default function scheduleReducer(state = initialState, { type, data }) {
  switch (type) {
    case SET_TEACHER_ATTENDANCE:
      return updateData(state, data);

    default:
      return state;
  }
}
