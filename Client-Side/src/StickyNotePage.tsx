// src/pages/StickyNotePage.tsx
import StickyNoteCreate from './StickyNoteCreate';
import StickyNoteView from './StickyNoteView';

export default function StickyNotePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sticky Notes</h1>
      
      {/* Sticky Note Creation Form */}
      <StickyNoteCreate />
      
      {/* View Sticky Notes */}
      <StickyNoteView />
    </div>
  );
}
