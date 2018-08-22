import React from 'react';
import AuthTextInput from '../../../components/SubComponents/AuthTextInput';
import renderer from 'react-test-renderer';

const fields = [
  {
    key: 'username',
    label: 'Username',
    placeholder: 'Username',
    autoFocus: false,
    secureTextEntry: false,
    value: '',
    type: 'text',
  },
];

const firstField = fields[0];

test('renders AuthTextInput correctly', () => {
  const tree = renderer
    .create(
      <AuthTextInput
        key={firstField.key}
        label={firstField.label}
        showLabel={true}
        placeholder={firstField.placeholder}
        autoFocus={firstField.autoFocus}
        onChangeText={text => this.onChange(firstField.key, text)}
        secureTextEntry={firstField.secureTextEntry}
        keyboardType={undefined}
        value={'Test Username'}
        error={'Test Error'}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
