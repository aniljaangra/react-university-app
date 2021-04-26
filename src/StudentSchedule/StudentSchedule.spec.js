import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import StudentSchedule from './StudentSchedule';

describe('StudentSchedule', () => {
  it('renders correctly', () => {
    const tree = shallow(<StudentSchedule />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
