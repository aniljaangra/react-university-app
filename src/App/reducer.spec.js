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
          id: 1,
          teacher: 'Rubeus Hagrid',
          attendance: ATTENDANCE.PRESENT,
          level: 2,
          subject: SUBJECTS.POTIONS_MASTER,
        },
        {
          id: 2,
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
          { attendance: ATTENDANCE.ABSENT, id: teacher.id },
        ));
      expect(reducerOutput.teachers[0]).toEqual({ ...teacher, attendance: ATTENDANCE.ABSENT });
    });
    it('should mark teacher as present correctly', () => {
      const teacher = initialData.teachers[1];
      const reducerOutput = reducer(initialData,
        setTeacherAttendance(
          { attendance: ATTENDANCE.PRESENT, id: teacher.id },
        ));
      expect(reducerOutput.teachers[1]).toEqual({ ...teacher, attendance: ATTENDANCE.PRESENT });
    });

    it('should not make any change if no update is required', () => {
      const teacher = initialData.teachers[0];
      const reducerOutput = reducer(initialData,
        setTeacherAttendance(
          { attendance: ATTENDANCE.PRESENT, id: teacher.id },
        ));
      expect(reducerOutput).toEqual(initialData);
    });
  });

  describe('schedule', () => {
    const initialData = {
      teachers: [
        {
          id: 1,
          teacher: 'Minerva McGonagall',
          attendance: ATTENDANCE.PRESENT,
          level: 3,
          subject: SUBJECTS.POTIONS_MASTER,
        },
        {
          id: 2,
          teacher: 'Rubeus Hagrid',
          attendance: ATTENDANCE.PRESENT,
          level: 2,
          subject: SUBJECTS.POTIONS_MASTER,
        },
        {
          id: 3,
          teacher: 'Horace Slughorn',
          attendance: ATTENDANCE.ABSENT,
          level: 1,
          subject: SUBJECTS.POTIONS_MASTER,
        },
        {
          id: 4,
          teacher: 'Severus Snape',
          attendance: ATTENDANCE.PRESENT,
          level: 1,
          subject: SUBJECTS.POTIONS_MASTER,
        },
      ],
      schedule: [{
        student: 'Harry Potter',
        subject: SUBJECTS.POTIONS_MASTER,
        currentTeacher: 3,
        assignedTeacher: 3,
      },
      {
        student: 'Hermione Granger',
        subject: SUBJECTS.POTIONS_MASTER,
        currentTeacher: 2,
        assignedTeacher: 2,
      },
      {
        student: 'Ron Weasley',
        subject: SUBJECTS.POTIONS_MASTER,
        currentTeacher: 1,
        assignedTeacher: 1,
      }],
    };
    it('should assign new teacher up in the hierarchy correctly', () => {
      const { currentTeacher } = initialData.schedule[1]; // Rubeus Hagrid - Level 2
      const reducerOutput = reducer(initialData,
        setTeacherAttendance(
          { attendance: ATTENDANCE.ABSENT, id: currentTeacher },
        ));
      expect(reducerOutput.schedule[1].currentTeacher)
        .toEqual(1); // Level 3
    });

    it('should not assign new teacher equal in the hierarchy', () => {
      const { currentTeacher } = initialData.schedule[0]; // Horace Slughorn - Level 1
      const reducerOutput = reducer(initialData,
        setTeacherAttendance(
          { attendance: ATTENDANCE.ABSENT, id: currentTeacher },
        ));
      expect(reducerOutput.schedule[1].teacher)
        .not.toEqual(4); // Level 1
    });

    it('should not assign any teacher if no teacher is available up in the hierarchy', () => {
      const { currentTeacher } = initialData.schedule[2]; // Minerva McGonagall - Level 3
      const reducerOutput = reducer(initialData,
        setTeacherAttendance(
          { attendance: ATTENDANCE.ABSENT, id: currentTeacher },
        ));
      expect(reducerOutput.schedule[2].currentTeacher).toEqual(NOT_ASSIGNED);
    });

    it('should not assign any teacher if all teachers are absent up in the hierarchy', () => {
      const { currentTeacher } = initialData.schedule[1]; // Minerva McGonagall - Level 3
      const reducerOutput1 = reducer(initialData,
        setTeacherAttendance(
          { attendance: ATTENDANCE.ABSENT, id: initialData.teachers[0].id },
        )); //  Mark Minerva McGonagall - Level 3 as Absent
      const reducerOutput = reducer(reducerOutput1,
        setTeacherAttendance(
          { attendance: ATTENDANCE.ABSENT, id: currentTeacher },
        )); // Mark Rubeus Hagrid - Level 2 as absent
      expect(reducerOutput.schedule[1].currentTeacher).toEqual(NOT_ASSIGNED);
    });

    it('should assign same teacher once assigned teacher is present', () => {
      const { currentTeacher } = initialData.schedule[1]; // Rubeus Hagrid - Level 2
      const reducerOutputForTeacherAbsent = reducer(initialData,
        setTeacherAttendance(
          { attendance: ATTENDANCE.ABSENT, id: currentTeacher },
        ));
      const reducerOutputForTeacherPresent = reducer(reducerOutputForTeacherAbsent,
        setTeacherAttendance(
          { attendance: ATTENDANCE.PRESENT, id: currentTeacher },
        ));
      expect(reducerOutputForTeacherPresent.schedule[1].currentTeacher)
        .toEqual(reducerOutputForTeacherPresent.schedule[1].assignedTeacher);
    });
  });
});
