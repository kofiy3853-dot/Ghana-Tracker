import type React from 'react';

export interface OperatorInfo {
  name: string;
  // Fix: Use React.ReactNode for better type compatibility with JSX elements.
  logo: React.ReactNode;
  prefixes: string[];
  color: string;
}

export interface PhoneNumberInfo {
  isValid: boolean;
  operator: OperatorInfo | null;
  internationalFormat: string;
  localFormat: string;
}
