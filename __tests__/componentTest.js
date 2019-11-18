import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ToDo from '../client/Components/ToDo';
import { isTSAnyKeyword, exportAllDeclaration } from '@babel/types';

configure({ adapter: new Adapter() });

describe('basic react component test', () => {
  let wrapper;
  const props = {
    item: {
    id: 15,
    task: 'Test',
    date: new Date(),
    completion: false,
  }
}
  beforeAll(() => {
    wrapper = shallow(<ToDo {...props} />);
  })
  it('renders todo detail divs - total of 5 including buttons', () => {
    const divShallow = wrapper.find('.todo-details');
    expect(divShallow).toHaveLength(5);
  })
})