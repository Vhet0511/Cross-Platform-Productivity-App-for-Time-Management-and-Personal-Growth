export default function NotificationPage() {
  return (
    <div className="p-6">
      {/* Top Heading */}
      <h1 className="text-2xl font-bold mb-6">🔔 Notifications</h1>

      {/* Inbox-style card area */}
      <div className="bg-white border rounded-lg shadow-sm divide-y">
        {/* Simulating an empty inbox with one section */}
        <div className="p-6 text-center text-gray-500">
          <p className="text-xl mb-2">📭</p>
          <p className="text-base font-medium">You have no notifications</p>
          <p className="text-sm text-gray-400">Your alerts, updates, and reminders will appear here.</p>
        </div>
      </div>
    </div>
  );
}
