import Link from "next/link";

const categories = ["Development", "Design", "Marketing", "Writing", "Support", "Sales", "Product", "Web3 & AI"];

const steps = [
  ["01", "Search", "Tell RemoteScout what kind of remote work you want."],
  ["02", "Compare", "Scan the details that matter before opening the original listing."],
  ["03", "Move", "Save a role, apply through the source, and keep your progress organized."],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function SearchIcon() {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8"/><path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] text-[#111111]">
      <header className="sticky top-0 z-50 border-b border-[#deddd6] bg-[#f5f4ef]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="RemoteScout home">
            <span className="grid size-9 place-items-center bg-[#111111] text-sm font-black text-white">R</span>
            <span className="text-[17px] font-black tracking-[-0.02em]">RemoteScout</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#686862] md:flex" aria-label="Main navigation">
            <a href="#how-it-works" className="hover:text-[#111111]">How it works</a>
            <a href="#categories" className="hover:text-[#111111]">Categories</a>
            <a href="#why" className="hover:text-[#111111]">Why RemoteScout</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className="px-3 py-2 text-sm font-bold hover:text-[#1457ff] sm:px-4">Log in</Link>
            <Link href="/signup" className="bg-[#1457ff] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#0b3fc4]">Sign up</Link>
          </div>
        </div>
      </header>

      <section className="border-b border-[#deddd6]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1fr_.82fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
          <div className="animate-rise-in">
            <p className="mb-6 inline-flex items-center gap-2 border border-[#d6d4cc] bg-[#eeece5] px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-[#55554f]">Remote work, focused</p>
            <h1 className="max-w-4xl text-[3.35rem] font-black leading-[.94] tracking-[-0.065em] sm:text-6xl lg:text-[5.7rem]">Stop searching everywhere. Start finding work.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#66665f] sm:text-xl">RemoteScout brings remote opportunities from trusted sources into one place, with the details you need to decide what is worth your time.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 bg-[#1457ff] px-6 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0b3fc4]">Find remote jobs <Arrow /></Link>
              <Link href="/login" className="inline-flex items-center justify-center border border-[#cfcfc7] bg-white px-6 py-3.5 text-sm font-black transition hover:border-[#111111]">I already have an account</Link>
            </div>
          </div>

          <div className="animate-rise-in lg:pl-4" style={{ animationDelay: "100ms" }}>
            <div className="border border-[#d4d2ca] bg-white shadow-[18px_18px_0_#dcdad1]">
              <div className="flex items-center justify-between border-b border-[#e4e2da] px-5 py-4">
                <div className="flex items-center gap-2 text-sm font-black"><span className="size-2.5 rounded-full bg-[#1457ff]"/>Job search</div>
                <span className="text-xs font-bold text-[#88877f]">REMOTE ONLY</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 border border-[#cfcfc7] bg-[#fafaf7] px-4 py-3.5">
                  <SearchIcon />
                  <span className="text-sm font-semibold text-[#77776f]">Frontend Developer</span>
                </div>
                <div className="mt-5 border-t border-[#e7e5de]">
                  {[["Senior Frontend Engineer", "Northstar", "$95k–$125k"], ["Product Designer", "Fieldnote", "$80k–$105k"], ["Growth Manager", "Orbit Labs", "Remote"]].map(([title, company, meta]) => (
                    <div key={title} className="flex items-center gap-3 border-b border-[#e7e5de] py-5">
                      <span className="grid size-10 shrink-0 place-items-center bg-[#111111] text-[10px] font-black text-white">{company.slice(0,2).toUpperCase()}</span>
                      <div className="min-w-0 flex-1"><p className="truncate text-sm font-black">{title}</p><p className="mt-1 text-xs font-semibold text-[#85847c]">{company} · Remote</p></div>
                      <span className="hidden text-xs font-black text-[#1457ff] sm:block">{meta}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#77776f]"><span>3 opportunities</span><span className="text-[#1457ff]">View all ↗</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-b border-[#deddd6] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#1457ff]">The workflow</p><h2 className="mt-3 max-w-xl text-3xl font-black tracking-[-0.04em] sm:text-5xl">A better way to look for remote work.</h2></div><p className="max-w-sm text-sm leading-6 text-[#6d6d67]">Less tab switching. Less noise. More attention on the opportunities that actually fit.</p></div>
          <div className="mt-14 grid border-y border-[#deddd6] md:grid-cols-3 md:border-l">
            {steps.map(([number, title, text]) => <article key={number} className="border-b border-[#deddd6] px-1 py-8 md:border-b-0 md:border-r md:px-7 lg:py-10"><span className="text-xs font-black text-[#1457ff]">{number}</span><h3 className="mt-12 text-2xl font-black tracking-tight">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-[#6d6d67]">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="why" className="border-b border-[#deddd6] bg-[#111111] text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#8facff]">Why RemoteScout</p><h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-5xl">Built for the person doing the searching.</h2></div><div className="grid gap-0 sm:grid-cols-3">{[["01","One place","Bring opportunities from trusted sources into one focused workspace."],["02","Useful detail","See work setup, employment type, salary, skills, source, and more."],["03","Keep moving","Save roles and track applications without losing your place."]].map(([n,t,d])=><div key={n} className="border-t border-white/15 px-0 py-6 sm:border-l sm:border-t-0 sm:px-6"><span className="text-xs font-black text-[#8facff]">{n}</span><h3 className="mt-7 font-black">{t}</h3><p className="mt-3 text-sm leading-6 text-[#a9aaa6]">{d}</p></div>)}</div></div>
        </div>
      </section>

      <section id="categories" className="border-b border-[#deddd6]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#1457ff]">Explore roles</p><h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-5xl">Work across your field.</h2></div><p className="max-w-md text-sm leading-6 text-[#6d6d67]">Development, design, growth, support, and more. Search for the kind of work you want next.</p></div><div className="mt-12 grid grid-cols-2 border-l border-t border-[#deddd6] sm:grid-cols-4">{categories.map((category)=><div key={category} className="border-b border-r border-[#deddd6] bg-white px-5 py-7 text-sm font-black transition hover:bg-[#eeece5]">{category}<span className="ml-2 text-[#1457ff]">↗</span></div>)}</div></div>
      </section>

      <section><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><div className="flex flex-col justify-between gap-8 bg-[#1457ff] px-7 py-12 text-white sm:px-12 lg:flex-row lg:items-end"><div className="max-w-2xl"><p className="text-xs font-black uppercase tracking-[0.16em] text-[#dce5ff]">Your next search</p><h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-5xl">Make remote job hunting feel manageable.</h2></div><Link href="/signup" className="inline-flex w-fit items-center gap-2 bg-white px-6 py-3.5 text-sm font-black text-[#1457ff] transition hover:-translate-y-0.5">Create your account <Arrow /></Link></div></div></section>

      <footer className="border-t border-[#deddd6] bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-xs font-semibold text-[#77776f] sm:flex-row sm:items-center sm:justify-between lg:px-8"><p>© 2026 RemoteScout</p><p>Find remote work in one place.</p></div></footer>
    </main>
  );
}
