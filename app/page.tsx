import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h1 className="text-4xl font-bold text-red-600 text-center">
        🚨 RapidRescue
      </h1>
      <p className="text-center max-w-md">
        RapidRescue is a real-time emergency help platform. Quickly alert
        nearby volunteers and get assistance in any emergency.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/emergency"
          className="bg-red-600 text-white px-6 py-4 rounded font-bold hover:bg-red-700 text-center"
        >
          Send Emergency
        </Link>
        <Link
          href="/dashboard"
          className="bg-blue-600 text-white px-6 py-4 rounded font-bold hover:bg-blue-700 text-center"
        >
          Volunteer Dashboard
        </Link>
        <Link
          href="/map"
          className="bg-green-600 text-white px-6 py-4 rounded font-bold hover:bg-green-700 text-center"
        >
          View Map
        </Link>
      </div>

      <p className="text-gray-500 text-sm mt-4 text-center">
        All locations and alerts are updated in real-time using Supabase
        Realtime and WebSockets.
      </p>
    </div>
  );
}