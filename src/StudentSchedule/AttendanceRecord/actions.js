/**
 * Created by Anil Jangra on 4/22/2021
 */
import { SET_TEACHER_ATTENDANCE } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const setTeacherAttendance = (teacher) => ({
  type: SET_TEACHER_ATTENDANCE,
  data: teacher,
});
