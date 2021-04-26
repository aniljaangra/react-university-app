/**
 * Created by Anil Jangra on 4/22/2021
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

const Scheduler = ({ studentSchedule }) => (
  <>
    <h1 style={{ textAlign: 'center' }}>
      Current Schedule
    </h1>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: 'lightgray' }}>
            <TableCell><strong>Student</strong></TableCell>
            <TableCell><strong>Subject</strong></TableCell>
            <TableCell><strong>Teacher</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentSchedule.map(({ teacher, student, subject }) => (
            <TableRow key={student}>
              <TableCell>{student}</TableCell>
              <TableCell>{subject}</TableCell>
              <TableCell>{teacher}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

Scheduler.propTypes = {
  studentSchedule: PropTypes.arrayOf(
    PropTypes.shape({
      teacher: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      student: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
export default Scheduler;
