// js/components/__tests__/MainSection-test.js
jest.dontMock('../MainSection');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const MainSection = require('../MainSection').default;


describe('<MainSection />', () => {

  it('should render properly', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<MainSection children="children" />);
    const result = renderer.getRenderOutput();

    expect(result.type).toEqual('section');
    expect(result.props.className).toEqual('main');

    expect(result.props.children).toEqual('children');
  });

});