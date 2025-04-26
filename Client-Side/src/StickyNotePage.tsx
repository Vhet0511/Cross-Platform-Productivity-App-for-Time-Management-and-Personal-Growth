export default function StickyNotePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🗒️ Add Sticky Note</h1>
      <div className="flex flex-wrap gap-4">
        {/* Sticky Note 1 */}
        <div className="w-40 h-40 p-4 bg-yellow-200 rounded-lg shadow-md">
          <h2 className="font-semibold mb-2">Note 1</h2>
          <p className="text-sm">Buy groceries</p>
        </div>

        {/* Sticky Note 2 */}
        <div className="w-40 h-40 p-4 bg-pink-200 rounded-lg shadow-md">
          <h2 className="font-semibold mb-2">Note 2</h2>
          <p className="text-sm">Call the dentist</p>
        </div>

        {/* Sticky Note 3 */}
        <div className="w-40 h-40 p-4 bg-green-200 rounded-lg shadow-md">
          <h2 className="font-semibold mb-2">Note 3</h2>
          <p className="text-sm">Project deadline: Friday</p>
        </div>

        {/* Sticky Note 4 */}
        <div className="w-40 h-40 p-4 bg-blue-200 rounded-lg shadow-md">
          <h2 className="font-semibold mb-2">Note 4</h2>
          <p className="text-sm">Idea: AI-powered task manager</p>
        </div>
      </div>
    </div>
  );
}
