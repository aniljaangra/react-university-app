/**
 * Created by Anil Jangra on 4/22/2021
 */
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setTeacherAttendance } from './actions';
import AttendanceRecordComponent from './AttendanceRecord';

const AttendanceRecord = () => {
  const attendanceData = useSelector(({ teachers }) => teachers);
  const dispatch = useDispatch();
  const onSelect = (event, teacherId) => {
    dispatch(setTeacherAttendance({ id: teacherId, attendance: event.target.value }));
  };
  return (
    <AttendanceRecordComponent
      onSelect={onSelect}
      attendanceData={attendanceData}
    />
  );
};

export default AttendanceRecord;
