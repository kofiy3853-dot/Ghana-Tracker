
import { OPERATORS } from '../constants';
import type { PhoneNumberInfo } from '../types';

export const parsePhoneNumber = (input: string): PhoneNumberInfo | null => {
  if (!input) return null;

  // 1. Sanitize input
  const sanitized = input.replace(/[\s-()+]/g, '');

  // 2. Normalize to 9-digit format
  let numberBody: string;
  if (sanitized.startsWith('233')) {
    numberBody = sanitized.substring(3);
  } else if (sanitized.startsWith('0')) {
    numberBody = sanitized.substring(1);
  } else {
    numberBody = sanitized;
  }

  // 3. Validate length
  if (numberBody.length !== 9 || !/^\d{9}$/.test(numberBody)) {
    return {
      isValid: false,
      operator: null,
      internationalFormat: '',
      localFormat: '',
    };
  }

  // 4. Find operator
  const prefix = numberBody.substring(0, 2);
  const operator = OPERATORS.find(op => op.prefixes.includes(prefix));

  if (!operator) {
    return {
      isValid: false,
      operator: null,
      internationalFormat: `+233 ${numberBody}`,
      localFormat: `0${numberBody}`,
    };
  }

  // 5. Format and return
  return {
    isValid: true,
    operator,
    internationalFormat: `+233 ${prefix} ${numberBody.substring(2, 5)} ${numberBody.substring(5)}`,
    localFormat: `0${prefix} ${numberBody.substring(2, 5)} ${numberBody.substring(5)}`,
  };
};
