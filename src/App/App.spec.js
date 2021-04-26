import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import StudentSchedule from '../StudentSchedule/StudentSchedule';
import App from './App';
import initialState from './initialState';

describe('App', () => {
  it('renders correctly', () => {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders StudentSchedule component correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(StudentSchedule).length).toEqual(1);
  });

  it('passes initial state to Provider correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Provider).prop('store').getState()).toEqual(initialState);
  });
});
