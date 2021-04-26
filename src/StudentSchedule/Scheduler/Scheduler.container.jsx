/**
 * Created by Anil Jangra on 4/22/2021
 */
import React from 'react';
import { useSelector } from 'react-redux';
import SchedulerComponent from './Scheduler';

const Scheduler = () => {
  const studentSchedule = useSelector(({ schedule }) => schedule);
  return <SchedulerComponent studentSchedule={studentSchedule} />;
};

export default Scheduler;
