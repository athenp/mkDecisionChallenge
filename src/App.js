import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios';

const formStyle = {
  //margin: '10px',
  //width: '250ch',
  minHeight: '100vh'
};

export default class MKForm extends React.Component {

  state = {
    formData: {
      name: '',
      email: '',
      message: '',
    },
    submitted: false,
  };

  emailRef = React.createRef();

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }

  handleBlur = (event) => {
    this.emailRef.current.validate(event.target.value);
  }

  handleSubmit = () => {
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false }), 5000);
    });
    const { name, message } = this.state;
    axios.post(
      'https://nm2bangn2h.execute-api.us-west-1.amazonaws.com/default',
      { key1: `${name}, ${message}` }
    );
  }

  render() {
    const { formData, submitted } = this.state;
    return (
      <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justify="center"
      width='25ch'
      style={ formStyle }
      >
        <ValidatorForm
          ref={r => (this.form = r)}
          instantValidate={true}
          onSubmit={this.handleSubmit}
        >
          <h2>Contact us</h2>
          <TextValidator
            required
            label="Name"
            onChange={this.handleChange}
            name="name"
            type="text"
            validators={['required']}
            errorMessages={['this field is required']}
            value={formData.name}
            inputProps={{ maxLength: 70 }}
          /><br /><br />
          <TextValidator
            required
            ref={this.emailRef}
            label="Email"
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            name="email"
            type="email"
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
            value={formData.email}
            inputProps={{ maxLength: 62 }}
          /><br /><br /><br />
          <TextValidator
            id="outlined-multiline-static"
            multiline
            rows={4}
            required
            label="Message"
            onChange={this.handleChange}
            name="message"
            type="text"
            validators={['required']}
            errorMessages={['this field is required']}
            value={formData.message}
            variant="outlined"
            inputProps={{ maxLength: 250 }}
          /><br /><br />
          <Button
            type="submit"
            disabled={submitted}
          >
            {
              (submitted && 'Message sent!')
              || (!submitted && 'Submit')
            }
          </Button>
        </ValidatorForm>
      </Grid>
    );
  }
}