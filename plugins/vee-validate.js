import { defineRule, configure } from 'vee-validate';
import {
  required,
  numeric,
  between,
  alpha_num,
  min_value,
  max_value,
  integer,
  email,
} from '@vee-validate/rules';

export default defineNuxtPlugin(() => {
  configure({
    generateMessage: (context) => {

      switch (context.rule.name) {
          case 'numeric':
            return 'This field must be a number';
          case 'between':
            return `This field must be between ${context.rule.params[0]} and ${context.rule.params[1]}`;
          case 'alpha_num':
            return 'This field must be alphanumeric';
          case 'min_value':
            return `This field must be greater than or equal to ${context.rule.params[0]}`;
          case 'max_value':
            return `This field must be less than or equal to ${context.rule.params[0]}`;
          case 'integer':
            return 'This field must be an integer';
          case 'email':
            return 'This field must be a valid email';
          case 'required':
          default:
            return 'This field is required';
      }
    },
  });

  defineRule('required', required);
  defineRule('numeric', numeric);
  defineRule('between', between);
  defineRule('alpha_num', alpha_num);
  defineRule('min_value', min_value);
  defineRule('max_value', max_value);
  defineRule('integer', integer);
  defineRule('email', email);
  
  defineRule('date', (value) => {
    // Field is empty, should pass
    if (!value || !value.length) {
      return true;
    }
    
    // Check if the value is a valid date JS format
    return !isNaN(Date.parse(value)) ? true : 'Date must have a valid format (YYYY-MM-DD)';
  });
  
  defineRule('path', (value) => {
    // Field is empty, should pass
    if (!value || !value.length) {
      return true;
    }

    return /^(\/|https?:\/\/)/.test(value) ? true : 'Path must start with / or http(s)://';
  });

  defineRule('phone', (value) => {
    // Field is empty, should pass
    if (!value || !value.length) {
      return true;
    }

    return /^\+?[0-9]+$/.test(value) ? true : 'Phone must be a valid number';
  });
});
