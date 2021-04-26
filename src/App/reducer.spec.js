/**
 * Created by Anil Jangra on 4/26/2021
 */
import reducer from './reducer';

import { ATTENDANCE, NOT_ASSIGNED, SUBJECTS } from '../StudentSchedule/constants';
import { setTeacherAttendance } from '../StudentSchedule/AttendanceRecord/actions';
import initialState from './initialState';

describe('root reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('teachers', () => {
    const initialData = {
      teachers: [
        {
          teacher: 'Rubeus Hagrid',
          attendance: ATTENDANCE.PRESENT,
          level: 2,
          subject: SUBJECTS.POTIONS_MASTER,
        },
        {
          teacher: 'Horace Slughorn',
          attendance: ATTENDANCE.ABSENT,
          level: 1,
          subject: SUBJECTS.POTIONS_MASTER,
        },
      ],
      schedule: [],
    };
    it('should mark teacher as absent correctly', () => {
      const teacher = initialData.teachers[0];
      const reducerOutput = reducer(initialData,
        setTeacherAttendance(
          { attendance: ATTENDANCE.ABSENT, teacher: teacher.teacher },
        ));
      expect(reducerOutput.teachers[0]).toEqual({ ...teacher, attendance: ATTENDANCE.ABSENT });
    });
    it('should mark teacher as present correctly', () => {
      const teacher = initialData.teachers[1];
      const reducerOutput = reducer(initialData,
        setTeacherAttendance(
          { attendance: ATTENDANCE.PRESENT, teacher: teacher.teacher },
        ));
      expect(reducerOutput.teachers[1]).toEqual({ ...teacher, attendance: ATTENDANCE.PRESENT });
    });

    it('should not make any change if no update is required', () => {
      const teacher = initialData.teachers[0];
      const reducerOutput = reducer(initialData,
        setTeacherAttendance(
          { attendance: ATTENDANCE.PRESENT, teacher: teacher.teacher },
        ));
      expect(reducerOutput).toEqual(initialData);
    });
  });

  describe('schedule', () => {
    const initialData = {
      teachers: [
        {
          teacher: 'Minerva McGonagall',
          attendance: ATTENDANCE.PRESENT,
          level: 3,
          subject: SUBJECTS.POTIONS_MASTER,
        },
        {
          teacher: 'Rubeus Hagrid',
          attendance: ATTENDANCE.PRESENT,
          level: 2,
          subject: SUBJECTS.POTIONS_MASTER,
        },
        {
          teacher: 'Horace Slughorn',
          attendance: ATTENDANCE.ABSENT,
          level: 1,
          subject: SUBJECTS.POTIONS_MASTER,
        },
        {
          teacher: 'Severus Snape',
          attendance: ATTENDANCE.PRESENT,
          level: 1,
          subject: SUBJECTS.POTIONS_MASTER,
        },
      ],
      schedule: [{
        student: 'Harry Potter',
        subject: SUBJECTS.POTIONS_MASTER,
        teacher: 'Horace Slughorn',
      },
      {
        student: 'Hermione Granger',
        subject: SUBJECTS.POTIONS_MASTER,
        teacher: 'Rubeus Hagrid',
      },
      {
        student: 'Ron Weasley',
        subject: SUBJECTS.POTIONS_MASTER,
        teacher: 'Minerva McGonagall',
      }],
    };
    it('should assign new teacher up in the hierarchy correctly', () => {
      const { teacher } = initialData.schedule[1]; // Rubeus Hagrid - Level 2
      const reducerOutput = reducer(initialData,
        setTeacherAttendance(
          { attendance: ATTENDANCE.ABSENT, teacher },
        ));
      expect(reducerOutput.schedule[1].teacher)
        .toEqual('Minerva McGonagall'); // Level 3
    });

    it('should not assign new teacher equal in the hierarchy', () => {
      const { teacher } = initialData.schedule[0]; // Horace Slughorn - Level 1
      const reducerOutput = reducer(initialData,
        setTeacherAttendance(
          { attendance: ATTENDANCE.ABSENT, teacher },
        ));
      expect(reducerOutput.schedule[1].teacher)
        .not.toEqual('Severus Snape'); // Level 1
    });

    it('should not assign any teacher if no teacher is available up in the hierarchy', () => {
      const { teacher } = initialData.schedule[2]; // Minerva McGonagall - Level 3
      const reducerOutput = reducer(initialData,
        setTeacherAttendance(
          { attendance: ATTENDANCE.ABSENT, teacher },
        ));
      expect(reducerOutput.schedule[2].teacher).toEqual(NOT_ASSIGNED);
    });

    it('should not assign any teacher if all teachers are absent up in the hierarchy', () => {
      const { teacher } = initialData.schedule[2]; // Minerva McGonagall - Level 3
      const reducerOutput1 = reducer(initialData,
        setTeacherAttendance(
          { attendance: ATTENDANCE.ABSENT, teacher: initialData.teachers[0].teacher },
        )); //  Mark Minerva McGonagall - Level 3 as Absent
      const reducerOutput = reducer(reducerOutput1,
        setTeacherAttendance(
          { attendance: ATTENDANCE.ABSENT, teacher },
        )); // Mark Rubeus Hagrid - Level 2 as absent
      expect(reducerOutput.schedule[1].teacher).toEqual(NOT_ASSIGNED);
    });
  });
});
