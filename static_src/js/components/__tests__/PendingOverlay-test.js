// js/components/__tests__/PendingOverlay-test.js
jest.dontMock('../PendingOverlay');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const PendingOverlay = require('../PendingOverlay').default;


describe('<PendingOverlay />', () => {

  it('should render properly', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<PendingOverlay />);
    const result = renderer.getRenderOutput();

    expect(result.type).toEqual('div');
    expect(result.props.className).toEqual('overlay');

    expect(result.props.children[2].type).toEqual('img');
    expect(result.props.children[2].props.src).toContain('loading.gif');
    expect(result.props.children[2].props.alt).toContain('processing');
  });


  it('should render properly with a given text', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<PendingOverlay text="updating" />);
    const result = renderer.getRenderOutput();

    expect(result.type).toEqual('div');
    expect(result.props.className).toEqual('overlay');

    expect(result.props.children[0]).toContain('updating');

    expect(result.props.children[2].type).toEqual('img');
    expect(result.props.children[2].props.src).toContain('loading.gif');
    expect(result.props.children[2].props.alt).toContain('updating');
  });

});