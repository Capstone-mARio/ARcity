import React from 'react';
import Form from '../../../components/SubComponents/Form';
import renderer from 'react-test-renderer';

const onSubmit = data => {
  this.setState({ error: error }); //clear out error messages

  //attach user id
  const { user } = this.props;
  data['uid'] = user.uid;
  data['coins'] = 0;
  data['games'] = '[]';
  data['objects'] = '[]';

  this.props.createUser(data, this.onSuccess, this.onError);
  this.props.instructionsVisible(true);
};

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

test('renders Form correctly', () => {
  const tree = renderer
    .create(
      <Form
        fields={fields}
        showLabel={false}
        onSubmit={onSubmit}
        buttonTitle={'CONTINUE'}
        error={{}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
