import profilephoto from './assets/profile.jpg';
export default function ProfilePage() {
  return (
    <div className="p-6 flex-row w-full mx-auto">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
        <img src={profilephoto} alt="item.alt" className="w-full h-full rounded-full"/>
        </div>
        <div>
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-gray-500 text-sm">johndoe@example.com</p>
        </div>
      </div>

      {/* Options List */}
      <div className="bg-white rounded-xl shadow divide-y">
        <OptionItem title="🛠️ Edit Profile" />
        <OptionItem title="⚙️ Settings" />
        <OptionItem title="🔒 Privacy" />
        <OptionItem title="📊 Activity Log" />
        <OptionItem title="🚪 Log Out" />
      </div>
    </div>
  );
}

// Helper component for each profile option
function OptionItem({ title }: { title: string }) {
  return (
    <div className="p-4 hover:bg-gray-50 cursor-pointer text-gray-700 font-medium">
      {title}
    </div>
  );
}
