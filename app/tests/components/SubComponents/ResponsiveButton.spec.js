import React from 'react';
import ResponsiveButton from '../../../components/SubComponents/ResponsiveButton';
import renderer from 'react-test-renderer';

test('renders ResponsiveButton correctly', () => {
  const tree = renderer.create(<ResponsiveButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
