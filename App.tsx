
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PhoneInputForm } from './components/PhoneInputForm';
import { ResultCard } from './components/ResultCard';
import { getFunFact } from './services/geminiService';
import { parsePhoneNumber } from './utils/phoneNumberUtils';
import type { PhoneNumberInfo } from './types';

const App: React.FC = () => {
  const [phoneNumberInfo, setPhoneNumberInfo] = useState<PhoneNumberInfo | null>(null);
  const [funFact, setFunFact] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = useCallback(async (phoneNumber: string) => {
    setIsLoading(true);
    setError(null);
    setPhoneNumberInfo(null);
    setFunFact(null);

    const info = parsePhoneNumber(phoneNumber);

    if (info && info.isValid && info.operator) {
      setPhoneNumberInfo(info);
      try {
        const fact = await getFunFact(info.operator.name);
        setFunFact(fact);
      } catch (e) {
        console.error("Failed to fetch fun fact:", e);
        setFunFact("Could not load a fun fact at this time.");
      }
    } else {
      setPhoneNumberInfo({
        isValid: false,
        operator: null,
        internationalFormat: '',
        localFormat: ''
      });
      setError("Please enter a valid Ghanaian mobile number (e.g., 024 123 4567).");
    }

    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-md mx-auto">
        <Header />
        <main>
          <PhoneInputForm onSubmit={handleLookup} isLoading={isLoading} />
          {error && !isLoading && (
            <div className="mt-6 text-center text-ghana-red animate-pulse">
              {error}
            </div>
          )}
          <div className="mt-6">
            {phoneNumberInfo && !isLoading && (
              <ResultCard info={phoneNumberInfo} funFact={funFact} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
