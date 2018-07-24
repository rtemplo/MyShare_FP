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
import customInputStyle from "assets/jss/components/customInputStyle";


const formInput = (props) => {
  const {
    key:id,
    elementType, 
    labelText,
    elementConfig, 
    value, 
    errorMessage,
    invalid,
    shouldValidate,
    touched,
    changed,
    formControlProps,
    white,
    inputRootCustomClasses,
    labelProps,
    inputProps
  } = props

  let inputElement = null;
  // const inputClasses = [classes.InputElement];

  const error = (invalid && shouldValidate && touched) ? true : false;
  const success = !invalid  

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white
  });
  let formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }
  let feedbackClasses = classes.feedback;
  if (inputProps !== undefined) {
    if (inputProps.endAdornment !== undefined) {
      feedbackClasses = feedbackClasses + " " + classes.feedbackRight;
    }
  }

  switch (elementType) {
    case ('input'):
      inputElement = <FormControl {...formControlProps} className={formControlClasses}>
        {labelText !== undefined ? (
          <InputLabel
            className={classes.labelRoot + " " + labelClasses}
            htmlFor={id}
            {...labelProps}
          >
            {labelText}
          </InputLabel>
        ) : null}
        <Input
          classes={{
            input: inputClasses,
            root: marginTop,
            disabled: classes.disabled,
            underline: underlineClasses
          }}
          id={id}
          onChange={changed}
          {...inputProps}
        />
        {error ? (
          <Clear className={feedbackClasses + " " + classes.labelRootError} />
        ) : success ? (
          <Check className={feedbackClasses + " " + classes.labelRootSuccess} />
        ) : null}
      </FormControl>        
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

export default withStyles(customInputStyle)(formInput);
