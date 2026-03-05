'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function EmergencyPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmergency = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const { error } = await supabase.from('emergencies').insert([
        { message, latitude, longitude, status: 'pending' },
      ]);

      if (error) alert('Error sending emergency');
      else alert('Emergency sent!');

      setLoading(false);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">🚨 Send Emergency Alert</h1>
      <textarea
        className="border p-2 w-full max-w-md mb-4"
        placeholder="Describe the emergency..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleEmergency}
        className="bg-red-600 text-white px-6 py-3 rounded font-bold hover:bg-red-700"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Emergency'}
      </button>
    </div>
  );
}