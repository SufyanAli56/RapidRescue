'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface Emergency {
  id: string;
  message: string;
  latitude: number;
  longitude: number;
  status: string;
}

export default function DashboardPage() {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);

  useEffect(() => {
    fetchEmergencies();

    const subscription = supabase
      .channel('emergencies')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'emergencies' },
        (payload) => {
          setEmergencies((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchEmergencies = async () => {
    const { data, error } = await supabase
      .from('emergencies')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setEmergencies(data);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🗂 Active Emergencies</h1>
      <div className="space-y-3">
        {emergencies.map((e) => (
          <div
            key={e.id}
            className="bg-white p-3 rounded shadow flex justify-between items-center"
          >
            <span>{e.message}</span>
            <span className="text-gray-500 text-sm">{e.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}