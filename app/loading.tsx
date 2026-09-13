export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f9fc] px-5 text-[#0b1220]">
      <div className="flex items-center gap-3 rounded-2xl border border-[#e4e9f0] bg-white px-5 py-4 shadow-sm" role="status" aria-live="polite">
        <span className="size-5 animate-spin rounded-full border-2 border-[#d8e0ea] border-t-[#155eef]" aria-hidden="true" />
        <span className="text-sm font-semibold text-[#475467]">Loading RemoteScout...</span>
      </div>
    </main>
  );
}
