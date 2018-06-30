import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import Table, { Placeholder, Rows } from 'components/Table';

Enzyme.configure({ adapter: new Adapter() });

describe('<Table />', () => {
  it('should render nothing when data is null', () => {
    const table = shallow(<Table />);
    expect(table.html()).toEqual(null);
  });

  it('should render placeholder when data length is 0', () => {
    const table = shallow(
      <Table
        data={[]}
      />,
    );
    expect(table.find(Placeholder).exists()).toEqual(true);
  });

  it('should render Row same as data length', () => {
    const table = shallow(
      <Table
        data={[
          { code: 'A', name: 'A' },
          { code: 'B', name: 'B' },
        ]}
      />,
    );
    expect(table.find(Rows).length).toEqual(2);
  });
});
