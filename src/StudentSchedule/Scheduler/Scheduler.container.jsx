/**
 * Created by Anil Jangra on 4/22/2021
 */
import React from 'react';
import { useSelector } from 'react-redux';
import SchedulerComponent from './Scheduler';
import { NOT_ASSIGNED } from '../constants';

const selectStudentSchedule = ({ schedule, teachers }) => schedule.map((studentSchedule) => {
  if (studentSchedule.currentTeacher === NOT_ASSIGNED) {
    return { ...studentSchedule, teacher: NOT_ASSIGNED };
  }
  return {
    ...studentSchedule,
    teacher: teachers.find(({ id }) => id === studentSchedule.currentTeacher).teacher,
  };
});
const Scheduler = () => {
  const studentSchedule = useSelector(selectStudentSchedule);
  return <SchedulerComponent studentSchedule={studentSchedule} />;
};

export default Scheduler;
