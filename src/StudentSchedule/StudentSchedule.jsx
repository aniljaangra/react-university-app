/**
 * Created by Anil Jangra on 4/22/2021
 */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import AttendanceRecord from './AttendanceRecord/AttendanceRecord.container';
import Scheduler from './Scheduler/Scheduler.container';

const StudentSchedule = () => (
  <Grid container>
    <Grid item sm={5}>
      <AttendanceRecord />
    </Grid>
    <Grid item sm={1} />
    <Grid item sm={6}>
      <Scheduler />
    </Grid>
  </Grid>
);

export default StudentSchedule;
