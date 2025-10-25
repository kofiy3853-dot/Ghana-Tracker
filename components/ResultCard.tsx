import React from 'react';
import type { PhoneNumberInfo } from '../types';
import { Map } from './Map';

interface ResultCardProps {
  info: PhoneNumberInfo;
  funFact: string | null;
}

// Fix: Use React.ReactNode for the value prop, as it can be a string or a JSX element.
const InfoRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0">
    <span className="text-gray-400 text-sm">{label}</span>
    <span className="text-white font-medium text-right">{value}</span>
  </div>
);

export const ResultCard: React.FC<ResultCardProps> = ({ info, funFact }) => {
  if (!info.isValid) {
    return (
      <div className="bg-gray-800/50 border border-ghana-red/50 rounded-lg p-6 text-center animate-fade-in">
        <h3 className="text-xl font-bold text-ghana-red">Invalid Number</h3>
        <p className="mt-2 text-gray-300">This does not appear to be a valid Ghanaian mobile number. Please check the number and try again.</p>
      </div>
    );
  }

  return (
    <div className={`bg-gray-800 rounded-lg shadow-2xl overflow-hidden animate-fade-in border-t-4 ${info.operator?.color.replace('bg-', 'border-')}`}>
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {info.operator?.logo}
          </div>
          <div>
            <h3 className="text-2xl font-bold">{info.operator?.name}</h3>
            <p className="text-gray-400">Network Operator</p>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <InfoRow label="International Format" value={info.internationalFormat} />
          <InfoRow label="Local Format" value={info.localFormat} />
          <InfoRow label="Country" value={
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 12 9"><path fill="#CE1126" d="M0 0h12v9H0z"/><path fill="#FCD116" d="M0 0h12v6H0z"/><path fill="#006B3F" d="M0 0h12v3H0z"/><path fill="#000" d="m6 3.24-1.176.852.45-1.38L4.102 2.1l1.45-.002L6 .75l.448 1.348L7.9.898l-1.172.612.45 1.38z"/></svg>
                Ghana
              </span>
            } />
        </div>
         <div className="mt-6">
            <h4 className="text-gray-400 text-sm mb-2 font-semibold">General Location</h4>
            <Map location="Accra, Ghana" />
        </div>
      </div>
      {funFact && (
        <div className="bg-gray-800/50 p-4 border-t-2 border-gray-700">
            <h4 className="font-semibold text-ghana-yellow mb-1 text-sm">Did you know?</h4>
            <p className="text-gray-300 italic text-sm">{funFact}</p>
        </div>
      )}
      {!funFact && info.isValid && (
        <div className="bg-gray-800/50 p-4 border-t-2 border-gray-700">
            <p className="text-gray-400 italic text-sm animate-pulse">Fetching a fun fact...</p>
        </div>
      )}
    </div>
  );
};

// Add fade-in animation to tailwind config or a style tag if needed
const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
`;
document.head.appendChild(style);