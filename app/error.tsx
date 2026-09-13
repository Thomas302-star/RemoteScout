"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f9fc] px-5 text-[#0b1220]">
      <section className="w-full max-w-lg rounded-3xl border border-[#e4e9f0] bg-white p-7 text-center shadow-sm sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#155eef]">Something went wrong</p>
        <h1 className="mt-3 text-2xl font-black tracking-tight">We could not load this page.</h1>
        <p className="mt-3 text-sm leading-6 text-[#667085]">
          Try again. If the problem continues, return to your dashboard and continue from there.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-[#155eef] px-5 py-3 text-sm font-bold text-white hover:bg-[#0b4dcc]"
          >
            Try again
          </button>
          <a
            href="/dashboard"
            className="rounded-full border border-[#d8e0ea] bg-white px-5 py-3 text-sm font-bold hover:border-[#155eef] hover:text-[#155eef]"
          >
            Dashboard
          </a>
        </div>
      </section>
    </main>
  );
}
