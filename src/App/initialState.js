/**
 * Created by Anil Jangra on 4/22/2021
 */
import { ATTENDANCE, SUBJECTS } from '../StudentSchedule/constants';

const { PRESENT } = ATTENDANCE;
const { POTIONS_MASTER } = SUBJECTS;
const initialState = {
  teachers: [
    {
      id: 1,
      teacher: 'Professor Dumbledore',
      attendance: PRESENT,
      level: 4,
      subject: POTIONS_MASTER,
    },
    {
      id: 2,
      teacher: 'Minerva McGonagall',
      attendance: PRESENT,
      level: 3,
      subject: POTIONS_MASTER,
    },
    {
      id: 3,
      teacher: 'Rubeus Hagrid',
      attendance: PRESENT,
      level: 2,
      subject: POTIONS_MASTER,
    },
    {
      id: 4,
      teacher: 'Horace Slughorn',
      attendance: PRESENT,
      level: 1,
      subject: POTIONS_MASTER,
    },
    {
      id: 5,
      teacher: 'Severus Snape',
      attendance: PRESENT,
      level: 1,
      subject: POTIONS_MASTER,
    },
  ],
  schedule: [
    {
      student: 'Harry Potter',
      subject: POTIONS_MASTER,
      currentTeacher: 4,
      assignedTeacher: 4,
    },
    {
      student: 'Hermione Granger',
      subject: POTIONS_MASTER,
      currentTeacher: 3,
      assignedTeacher: 3,
    },
    {
      student: 'Ron Weasley',
      subject: POTIONS_MASTER,
      currentTeacher: 5,
      assignedTeacher: 5,
    },
    {
      student: 'Draco Malfoy',
      subject: POTIONS_MASTER,
      currentTeacher: 4,
      assignedTeacher: 4,
    },
    {
      student: 'Padma Patil',
      subject: POTIONS_MASTER,
      currentTeacher: 3,
      assignedTeacher: 3,
    },
    {
      student: 'Luna Lovegood',
      subject: POTIONS_MASTER,
      currentTeacher: 5,
      assignedTeacher: 5,
    },
  ],
};
export default initialState;
