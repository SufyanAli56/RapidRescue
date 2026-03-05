'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

interface Message {
  id: string;
  sender_id: string;
  message: string;
  created_at: string;
}

export default function ChatPage({ params }: { params: { emergencyId: string } }) {
  const { emergencyId } = params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchMessages();

    const subscription = supabase
      .channel(`chat-${emergencyId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `emergency_id=eq.${emergencyId}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from<Message>('messages')
      .select('*')
      .eq('emergency_id', emergencyId)
      .order('created_at', { ascending: true });
    if (data) setMessages(data);
  };

  const sendMessage = async () => {
    if (!text) return;
    await supabase.from('messages').insert([{ emergency_id: emergencyId, message: text }]);
    setText('');
  };

  return (
    <div className="flex flex-col h-[80vh] p-4 bg-gray-100">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((m) => (
          <div key={m.id} className="p-2 bg-white rounded shadow">
            {m.message}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 p-2 border rounded-l"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}