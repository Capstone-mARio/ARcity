import React from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { register, instructionsVisible } from '../../../redux/reducers/authReducer';
import { watchLocation } from '../../../redux/reducers/locationReducer';
import Form from '../../SubComponents/Form';

const fields = [
    {
        key: 'email',
        label: "Email Address",
        placeholder: "Email Address",
        autoFocus: false,
        secureTextEntry: false,
        type: "email"
    },
    {
        key: 'username',
        label: "Username",
        placeholder: "Username",
        autoFocus: false,
        secureTextEntry: false,
        type: "text"
    },
    {
        key: 'password',
        label: "Password",
        placeholder: "Password",
        autoFocus: false,
        secureTextEntry: true,
        type: "password"
    },
    {
        key: 'confirm_password',
        label: "Confirm Password",
        placeholder: "Confirm Password",
        autoFocus: false,
        secureTextEntry: true,
        type: "confirm_password"
    }
];

const error = {
    general: "",
    email: "",
    password: "",
    confirm_password: ""
}

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages
        this.props.register(data, this.onSuccess, this.onError);
        this.props.watchLocation();
        this.props.instructionsVisible(true, true);
    }

    onSuccess(user) {
        Actions.Main();
    }

    onError(error) {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }
        this.setState({error: errObj});
    }

    render() {
        return (
            <Form fields={fields}
                  showLabel={false}
                  onSubmit={this.onSubmit}
                  buttonTitle={"Sign up"}
                  error={this.state.error}/>
        );
    }
}

const mapDispatchToProps = dispatch => ({
  instructionsVisible: (instructions, initial) => dispatch(instructionsVisible(instructions, initial)),
  register: (data, onSuccess, onErr) => dispatch(register(data, onSuccess, onErr)),
  watchLocation: () => dispatch(watchLocation()),
});

export default connect(null, mapDispatchToProps)(Register);
