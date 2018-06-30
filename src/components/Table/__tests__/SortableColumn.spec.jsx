import React from 'react';
import Enzyme, { shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import SortableColumn from 'components/Table/SortableColumn';

Enzyme.configure({ adapter: new Adapter() });

describe('<SortableColumn />', () => {
  it('should render no indicator when code is not same as sort', () => {
    const table = shallow(
      <SortableColumn
        sort={{ type: 'name', desc: false }}
        code="code"
      >
        Test
      </SortableColumn>,
    );
    expect(table.children().first().text()).toEqual('Test');
  });

  it('should render proper indicator when code is same as sort and desc is false', () => {
    const table = render(
      <SortableColumn
        sort={{ type: 'code', desc: false }}
        code="code"
      >
        Test
      </SortableColumn>,
    );
    expect(table.text()).toEqual('Test ⇧');
  });

  it('should render proper indicator when code is same as sort and desc is true', () => {
    const table = render(
      <SortableColumn
        sort={{ type: 'code', desc: true }}
        code="code"
      >
        Test
      </SortableColumn>,
    );
    expect(table.text()).toEqual('Test ⇩');
  });
});
