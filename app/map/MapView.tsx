'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface Emergency {
  id: string;
  message: string;
  latitude: number;
  longitude: number;
}

export default function MapView() {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);

  useEffect(() => {
    fetchEmergencies();

    const subscription = supabase
      .channel('emergencies-map')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'emergencies' },
        (payload) => {
          setEmergencies((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, []);

  const fetchEmergencies = async () => {
    const { data } = await supabase.from('emergencies').select('*');
    if (data) setEmergencies(data);
  };

  return (
    <MapContainer center={[31.5204, 74.3587]} zoom={13} className="h-[80vh] w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {emergencies.map((e) => (
        <Marker key={e.id} position={[e.latitude, e.longitude]}>
          <Popup>{e.message}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}