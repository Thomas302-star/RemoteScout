import Link from "next/link";

const categories = ["Development", "Design", "Marketing", "Writing", "Support", "Sales", "Product", "Web3 & AI"];
const steps = [
  ["01", "Search", "Tell us what kind of role you want."],
  ["02", "Compare", "Scan the details that actually matter."],
  ["03", "Apply", "Go straight to the original listing."],
];

function Arrow() { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] text-[#171916]">
      <header className="sticky top-0 z-50 border-b border-[#dedfd8]/80 bg-[#f5f4ef]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="#top" className="rs-focus flex items-center gap-3 rounded-lg">
            <span className="grid size-9 place-items-center bg-[#174c3a] text-sm font-black text-[#d9ef62]">RS</span>
            <span className="text-[17px] font-black tracking-[-.03em]">RemoteScout</span>
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] font-bold text-[#6c7169] md:flex">
            <Link className="rs-focus rounded" href="#how-it-works">How it works</Link>
            <Link className="rs-focus rounded" href="#categories">Roles</Link>
            <Link className="rs-focus rounded" href="#why">Why RemoteScout</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className="rs-focus rounded-lg px-3 py-2.5 text-sm font-bold hover:bg-white">Log in</Link>
            <Link href="/signup" className="rs-focus rounded-lg bg-[#171916] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#174c3a]">Get started</Link>
          </div>
        </div>
      </header>

      <section id="top" className="rs-grid border-b border-[#dedfd8]">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 border border-[#cfd2c8] bg-[#eeeee7] px-3 py-1.5 text-[11px] font-black uppercase tracking-[.14em] text-[#174c3a]"><span className="size-1.5 rounded-full bg-[#174c3a]" /> Remote work, made easier</div>
            <h1 className="max-w-4xl text-[3.2rem] font-black leading-[.96] tracking-[-.065em] sm:text-6xl lg:text-[5.7rem]">Stop hunting.<br /><span className="text-[#174c3a]">Start finding.</span></h1>
            <p className="mt-7 max-w-xl text-[17px] leading-8 text-[#62675f]">RemoteScout brings remote opportunities from trusted sources into one focused place, so you can spend less time searching and more time deciding what is worth applying to.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="rs-focus inline-flex items-center justify-center gap-2 bg-[#174c3a] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#10372a]">Find a job <Arrow /></Link>
              <Link href="/login" className="rs-focus inline-flex items-center justify-center border border-[#cfd2c8] bg-[#f5f4ef] px-6 py-3.5 text-sm font-black hover:bg-white">I already have an account</Link>
            </div>
          </div>

          <div className="relative">
            <div className="border border-[#cfd2c8] bg-white p-3 shadow-[14px_14px_0_#dfe5bf] sm:p-4">
              <div className="flex items-center justify-between border-b border-[#e5e6e0] px-2 pb-4">
                <div><p className="text-[10px] font-black uppercase tracking-[.16em] text-[#8a8f86]">Job search</p><p className="mt-1 font-black">Frontend · Remote</p></div>
                <span className="border border-[#d7dfbd] bg-[#f2f7d8] px-2.5 py-1 text-[10px] font-black text-[#174c3a]">24 results</span>
              </div>
              <div className="mt-3 border border-[#e1e3dc] bg-[#fafaf7] p-4">
                <div className="flex items-start gap-3">
                  <div className="grid size-11 shrink-0 place-items-center bg-[#174c3a] text-xs font-black text-[#d9ef62]">N</div>
                  <div className="min-w-0 flex-1"><p className="font-black">Frontend Engineer</p><p className="mt-1 text-xs text-[#73786f]">Northstar · Remote · Full time</p></div>
                  <span className="text-xs font-black text-[#174c3a]">$90k+</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2"><span className="bg-[#eef0e8] px-2.5 py-1 text-[10px] font-bold">React</span><span className="bg-[#eef0e8] px-2.5 py-1 text-[10px] font-bold">TypeScript</span><span className="bg-[#eef0e8] px-2.5 py-1 text-[10px] font-bold">Remote</span></div>
                <div className="mt-5 flex items-center justify-between border-t border-[#e5e6e0] pt-4"><span className="text-[11px] text-[#7a7f76]">Posted 2 days ago</span><span className="text-xs font-black text-[#174c3a]">View role →</span></div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="border border-[#e1e3dc] p-4"><p className="text-[10px] font-black uppercase tracking-wider text-[#8a8f86]">Source</p><p className="mt-2 text-sm font-bold">Original listing</p></div>
                <div className="border border-[#e1e3dc] p-4"><p className="text-[10px] font-black uppercase tracking-wider text-[#8a8f86]">Next</p><p className="mt-2 text-sm font-bold">Review & apply</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-b border-[#dedfd8] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div><p className="text-xs font-black uppercase tracking-[.16em] text-[#174c3a]">The simple version</p><h2 className="mt-3 text-3xl font-black tracking-[-.04em] sm:text-4xl">Three moves.<br />No busywork.</h2></div>
            <div className="grid border-t border-[#dedfd8] sm:grid-cols-3 sm:border-t-0">
              {steps.map(([number, title, text]) => <article key={number} className="border-b border-[#dedfd8] py-6 sm:border-l sm:border-b-0 sm:px-6 sm:first:border-l-0"><p className="text-xs font-black text-[#174c3a]">{number}</p><h3 className="mt-8 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-[#6c7169]">{text}</p></article>)}
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="border-b border-[#dedfd8] bg-[#f5f4ef]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl"><p className="text-xs font-black uppercase tracking-[.16em] text-[#174c3a]">Less noise</p><h2 className="mt-3 text-3xl font-black tracking-[-.04em] sm:text-5xl">The details should help you decide.</h2><p className="mt-5 leading-7 text-[#6c7169]">See where a listing came from, what the role is, where it can be done, and how to apply. Nothing important should be buried.</p></div>
          <div className="mt-12 grid border-y border-[#dedfd8] md:grid-cols-3 md:divide-x md:divide-[#dedfd8]">
            {[['01','One place','Stop opening the same dozen tabs every time you search.'],['02','Clear context','Get the job details and source before you commit time.'],['03','Your shortlist','Save interesting roles and keep applications organized.']].map(([n,t,x]) => <article key={n} className="py-7 md:px-7 md:first:pl-0"><span className="text-xs font-black text-[#174c3a]">{n}</span><h3 className="mt-5 text-xl font-black">{t}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-[#6c7169]">{x}</p></article>)}
          </div>
        </div>
      </section>

      <section id="categories" className="bg-[#174c3a] text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-black uppercase tracking-[.16em] text-[#d9ef62]">Explore roles</p><h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-.04em] sm:text-5xl">Whatever you do, start your search here.</h2></div><p className="max-w-sm text-sm leading-6 text-[#c4d1c9]">Development, design, growth, support, sales, product and more.</p></div>
          <div className="mt-12 grid grid-cols-2 border-l border-t border-white/15 sm:grid-cols-4">{categories.map((category) => <div key={category} className="border-b border-r border-white/15 px-5 py-6 text-sm font-black transition hover:bg-white/5">{category}</div>)}</div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"><div className="flex flex-col gap-8 bg-[#d9ef62] p-7 sm:p-12 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-2xl"><p className="text-xs font-black uppercase tracking-[.16em] text-[#174c3a]">Ready when you are</p><h2 className="mt-3 text-3xl font-black tracking-[-.04em] sm:text-5xl">Make the next search count.</h2></div><Link href="/signup" className="rs-focus inline-flex w-fit items-center gap-2 bg-[#171916] px-6 py-3.5 text-sm font-black text-white hover:bg-[#174c3a]">Create your account <Arrow /></Link></div></div>
      </section>

      <footer className="border-t border-[#dedfd8] bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-xs font-semibold text-[#73786f] sm:flex-row sm:justify-between lg:px-8"><p>© 2026 RemoteScout</p><p>Find remote work in one place.</p></div></footer>
    </main>
  );
}
