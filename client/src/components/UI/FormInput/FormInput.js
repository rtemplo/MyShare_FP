import React from 'react';
import classes from './FormInput.css';

import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";

import customInputStyle from "assets/jss/material-dashboard-pro-react/components/customInputStyle.jsx";

// key={formElement.id}
// elementType={formElement.config.elementType} 
// elementConfig={formElement.config.elementConfig} 
// value={formElement.config.value} 
// errorMessage={errorMessage} 
// invalid={!formElement.config.valid} 
// shouldValidate={formElement.config.validation}
// touched={formElement.config.touched}
// changed={(event) => this.inputChangedHandler(event, formElement.id)} />

const input = (props) => {
  const {
    elementType, 
    elementConfig, 
    value, 
    errorMessage,
    invalid,
    shouldValidate,
    touched,
    changed
  } = props

  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (invalid && shouldValidate && touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (elementType) {
    case ('input'):
      inputElement = <input 
        className={inputClasses.join(' ')} 
        {...elementConfig} 
        value={value} 
        onChange={changed}/>;
      break;
    case ('textarea'):
      inputElement = <textarea 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={value} 
        onChange={changed}/>;
      break;
    case ('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={changed} >
          {elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>{option.displayValue}</option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = <input 
      className={inputClasses.join(' ')} 
      {...elementConfig} 
      value={value} 
      onChange={changed}/>;
  }

  let validationError = null;
  if (invalid && touched && errorMessage) {
    validationError = <p className={classes.ValidationError}>{errorMessage}</p>;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  )
}

export default input;
