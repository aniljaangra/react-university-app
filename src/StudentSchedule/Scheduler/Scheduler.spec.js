import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import Scheduler from './Scheduler';

describe('Scheduler', () => {
  it('renders correctly', () => {
    const tree = shallow(<Scheduler />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
