// js/components/__tests__/Loading-test.js
jest.dontMock('../Loading');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Loading = require('../Loading').default;


describe('<Loading />', () => {

  it('should render properly', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Loading />);
    const result = renderer.getRenderOutput();

    expect(result.type).toEqual('div');
    expect(result.props.className).toEqual('loading');

    expect(result.props.children[0].type).toEqual('img');
    expect(result.props.children[0].props.src).toContain('loading.gif');
    expect(result.props.children[0].props.alt).toContain('Loading');

    expect(result.props.children[1]).toContain('Loading');
  });

});