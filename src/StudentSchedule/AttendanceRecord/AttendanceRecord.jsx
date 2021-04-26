/**
 * Created by Anil Jangra on 4/22/2021
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  TableContainer,
  Paper,
} from '@material-ui/core';

const AttendanceRecord = ({ attendanceData, onSelect }) => (
  <>
    <h1 style={{ textAlign: 'center' }}>
      Attendance
    </h1>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: 'lightgray' }}>
            <TableCell><strong>Teacher</strong></TableCell>
            <TableCell><strong>Attendance</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceData.map(({ teacher, attendance }) => (
            <TableRow key={teacher}>
              <TableCell><label htmlFor={teacher}>{teacher}</label></TableCell>
              <TableCell>
                <Select
                  native
                  id={teacher}
                  style={{ minWidth: 120 }}
                  value={attendance}
                  onChange={(event) => onSelect(event, teacher)}
                >
                  <option label="present" value="present">Present</option>
                  <option label="absent" value="absent">Absent</option>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

AttendanceRecord.propTypes = {
  attendanceData: PropTypes.arrayOf(
    PropTypes.shape({
      teacher: PropTypes.string.isRequired,
      attendance: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default AttendanceRecord;
