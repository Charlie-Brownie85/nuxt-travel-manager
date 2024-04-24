import { defineRule, configure } from 'vee-validate';
import {
  required,
  numeric,
  between,
  alpha_num,
  min,
  max,
} from '@vee-validate/rules';

export default defineNuxtPlugin(() => {
  configure({
    generateMessage: () => {
      return 'This field is required';
    },
  });

  defineRule('required', required);
  defineRule('numeric', numeric);
  defineRule('between', between);
  defineRule('alpha_num', alpha_num);
  defineRule('min', min);
  defineRule('max', max);
  
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

  defineRule('rating', (value) => {
    // Field is empty, should pass
    if (!value || !value.length) {
      return true;
    }

    return (value >= 1 && value <= 5) ? true : 'Rating must be between 1 and 5';
  });
});
