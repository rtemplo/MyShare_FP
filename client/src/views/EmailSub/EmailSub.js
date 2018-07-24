import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '../../components/CustomButtons/Button'
import FormInput from '../../components/FormInput/FormInput'

import { checkValidity } from '../../shared/validation'
import createEmailSub from '../../queries/createEmailSub'

// style for this view
import emailSubFormStyle from "../../assets/jss/views/emailSubFormStyle"

class EmailSub extends Component {
  state = {
    emailSubForm: {
      firstName: {
        elementType: 'input',
        labelText: "First Name",
        elementConfig: {
          type: 'text',
          placeholder: 'First Name'
        },
        value: '',
        validation: {
          required: true,
          errorMessage: 'Please enter your first name.'
        },
        valid: false,
        touched: false        
      },
      lastName: {
        elementType: 'input',
        labelText: "Last Name",
        elementConfig: {
          type: 'text',
          placeholder: 'Last Name'
        },
        value: '',
        validation: {
          required: true,
          errorMessage: 'Please enter your first name.'
        },
        valid: false,
        touched: false       
      },
      email: {
        elementType: 'input',
        labelText: "Email Address",
        elementConfig: {
          type: 'text',
          placeholder: 'Valid Email Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
          errorMessage: 'Please enter a valid email address.'
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedEmailSubForm = {
      ...this.state.emailSubForm
    }
    /* 
      Because the spread operator above is a shallow copy, referencing sub objects 
      will still point to the original object which violates the immutibility principle.
      To get around this we spread the specific sub object below.
    */
    const updatedFormElement = {
      ...updatedEmailSubForm[inputIdentifier]
    }

    updatedFormElement.value = event.target.value
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true

    updatedEmailSubForm[inputIdentifier] = updatedFormElement

    let formIsValid = true;
    for (let inputIdentifier in updatedEmailSubForm) {
      formIsValid = updatedEmailSubForm[inputIdentifier].valid && formIsValid
    }

    this.setState({emailSubForm: updatedEmailSubForm, formIsValid: formIsValid})
  }

  onSubmit = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.emailSubForm) {
      formData[formElementIdentifier] = this.state.emailSubForm[formElementIdentifier].value;
    }

    //console.log(formData)

    this.props.mutate({
      variables: { 
        ...formData
      }
    }).then(() => {
      console.log('added');
      //this.setState({first: ''});
    }).catch((e) => {
      console.log(e)
    });
  }

  render() {
    console.log(this.state.formIsValid)
    const { classes } = this.props

    const formElementsArray = []
    for (let key in this.state.emailSubForm) {
      formElementsArray.push({
        id: key, 
        config: this.state.emailSubForm[key]
      });
    }

    let form = (
      <form onSubmit={this.onSubmit} >
        {formElementsArray.map(formElement => {
          let errorMessage = null;
          if (formElement.config.validation) {
            errorMessage = formElement.config.validation.errorMessage
          }

          return (<FormInput 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            labelText = {formElement.config.labelText}
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value} 
            errorMessage={errorMessage} 
            invalid={!formElement.config.valid} 
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} 
            formControlProps={{fullWidth: true}}/>
          );
        })}
        <Button 
          color="rose" 
          onClick={this.onSubmit} 
          className={classes.registerButton} 
          disabled={!this.state.formIsValid} 
        >Submit
        </Button>
      </form>
    );    


    return (
      <div className={classes.EmailSub}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default graphql(createEmailSub)(withStyles(emailSubFormStyle)(EmailSub))