import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {
  createUser,
  instructionsVisible,
} from '../../../redux/reducers/authReducer';
import Form from '../../SubComponents/Form';

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

const error = {
  general: '',
  username: '',
};

class CompleteProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      error: error,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  onSubmit(data) {
    this.setState({ error: error }); //clear out error messages

    //attach user id
    const { user } = this.props;
    data['uid'] = user.uid;
    data['coins'] = 0;
    data['games'] = '[]';
    data['objects'] = '[]';

    this.props.createUser(data, this.onSuccess, this.onError);
    this.props.instructionsVisible(true);
  }

  onSuccess() {
    Actions.Main();
  }

  onError(error) {
    let errObj = this.state.error;

    if (error.hasOwnProperty('message')) {
      errObj['general'] = error.message;
    } else {
      let keys = Object.keys(error);
      keys.map((key, index) => {
        errObj[key] = error[key];
      });
    }

    this.setState({ error: errObj });
  }

  render() {
    return (
      <Form
        fields={fields}
        showLabel={false}
        onSubmit={this.onSubmit}
        buttonTitle={'CONTINUE'}
        error={this.state.error}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  instructionsVisible: bool => dispatch(instructionsVisible(bool)),
  createUser: (data, onSuccess, onErr) =>
    dispatch(createUser(data, onSuccess, onErr)),
});

export default connect(
  null,
  mapDispatchToProps
)(CompleteProfile);
