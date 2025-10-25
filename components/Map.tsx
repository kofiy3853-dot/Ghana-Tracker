import React from 'react';

interface MapProps {
  location: string;
}

export const Map: React.FC<MapProps> = ({ location }) => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return (
      <div className="aspect-video w-full bg-gray-700 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">Map API key is not configured.</p>
      </div>
    );
  }

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(location)}`;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border-2 border-gray-700">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapSrc}
        title={`Map of ${location}`}
      >
      </iframe>
    </div>
  );
};