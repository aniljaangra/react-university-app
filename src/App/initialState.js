/**
 * Created by Anil Jangra on 4/22/2021
 */
import { ATTENDANCE, SUBJECTS } from '../StudentSchedule/constants';

const { PRESENT } = ATTENDANCE;
const { POTIONS_MASTER } = SUBJECTS;
const initialState = {
  teachers: [
    {
      teacher: 'Professor Dumbledore',
      attendance: PRESENT,
      level: 4,
      subject: POTIONS_MASTER,
    },
    {
      teacher: 'Minerva McGonagall',
      attendance: PRESENT,
      level: 3,
      subject: POTIONS_MASTER,
    },
    {
      teacher: 'Rubeus Hagrid',
      attendance: PRESENT,
      level: 2,
      subject: POTIONS_MASTER,
    },
    {
      teacher: 'Horace Slughorn',
      attendance: PRESENT,
      level: 1,
      subject: POTIONS_MASTER,
    },
    {
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
      teacher: 'Horace Slughorn',
    },
    {
      student: 'Hermione Granger',
      subject: POTIONS_MASTER,
      teacher: 'Rubeus Hagrid',
    },
    {
      student: 'Ron Weasley',
      subject: POTIONS_MASTER,
      teacher: 'Severus Snape',
    },
    {
      student: 'Draco Malfoy',
      subject: POTIONS_MASTER,
      teacher: 'Horace Slughorn',
    },
    {
      student: 'Padma Patil',
      subject: POTIONS_MASTER,
      teacher: 'Rubeus Hagrid',
    },
    {
      student: 'Luna Lovegood',
      subject: POTIONS_MASTER,
      teacher: 'Severus Snape',
    },
  ],
};
export default initialState;
