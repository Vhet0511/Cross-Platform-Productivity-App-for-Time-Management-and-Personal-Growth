export default function NotificationPage() {
  const staticNotifications = [
    "✅ Account created successfully",
    "🔐 Logged in to your account",
    "📲 Session started on your device",
    "🕒 Last login recorded",
    "🔄 Preferences synced across devices"
  ];

  return (
    <div className="p-6">
      {/* Top Heading */}
      <h1 className="text-2xl font-bold mb-6">🔔 Notifications</h1>

      {/* Inbox-style card area */}
      <div className="bg-white border rounded-lg shadow-sm divide-y">
        {staticNotifications.map((note, index) => (
          <div
            key={index}
            className="p-4 mb-4 bg-gray-50 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <p className="text-sm text-gray-800">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
