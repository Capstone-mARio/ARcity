import React from 'react';
import ResponsiveCircleButton from '../../../components/SubComponents/ResponsiveCircleButton';
import renderer from 'react-test-renderer';

test('renders ResponsiveCircleButton correctly', () => {
  const tree = renderer.create(<ResponsiveCircleButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
