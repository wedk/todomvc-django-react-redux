// js/components/__tests__/List-test.js
jest.dontMock('../List');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const List = require('../List').default;


describe('<List />', () => {

  it('should render properly', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<List children="children" />);
    const result = renderer.getRenderOutput();

    expect(result.type).toEqual('ul');
    expect(result.props.className).toEqual('todo-list ');

    expect(result.props.children).toEqual('children');
  });


  it('should render properly with a given concern', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<List concern="another-class" children="children" />);
    const result = renderer.getRenderOutput();

    expect(result.type).toEqual('ul');
    expect(result.props.className).toEqual('todo-list another-class');

    expect(result.props.children).toEqual('children');
  });

});