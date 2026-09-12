import Link from "next/link";

const categories = [
  "Development",
  "Design",
  "Marketing",
  "Writing",
  "Customer Support",
  "Sales",
  "Product",
  "Web3 & AI",
];

const steps = [
  {
    number: "01",
    title: "Discover",
    text: "Find remote opportunities collected from legitimate sources in one place.",
  },
  {
    number: "02",
    title: "Evaluate",
    text: "Review the important job details and see where each opportunity comes from.",
  },
  {
    number: "03",
    title: "Apply",
    text: "Open the original application page and take the next step with the source.",
  },
];

const benefits = [
  {
    title: "Less searching",
    text: "Spend less time jumping between job boards, company pages, and scattered listings.",
  },
  {
    title: "Clear job details",
    text: "Keep the information that matters visible before you decide whether a role fits.",
  },
  {
    title: "Source first",
    text: "Every opportunity keeps its original source and application link for a clearer path forward.",
  },
];

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] text-[#0b1220]">
      <header className="sticky top-0 z-50 border-b border-[#e4e9f0]/80 bg-[#f7f9fc]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-2.5" aria-label="RemoteScout home">
            <span className="grid size-9 place-items-center rounded-xl bg-[#155eef] text-sm font-black text-white shadow-lg shadow-[#155eef]/20">R</span>
            <span className="text-lg font-extrabold tracking-tight">RemoteScout</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#5f6b7a] md:flex" aria-label="Main navigation">
            <a className="transition hover:text-[#155eef]" href="#how-it-works">How it works</a>
            <a className="transition hover:text-[#155eef]" href="#categories">Categories</a>
            <a className="transition hover:text-[#155eef]" href="#why-remotescout">Why RemoteScout</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="rounded-full border border-[#d8e0ea] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#0b1220] transition hover:border-[#155eef] hover:text-[#155eef] sm:px-4">
              Log in
            </Link>
            <Link href="/signup" className="inline-flex items-center justify-center rounded-full bg-[#0b1220] px-3.5 py-2.5 text-sm font-semibold !text-white transition hover:-translate-y-0.5 hover:bg-[#155eef] sm:px-4">
              <span className="text-white">Sign up</span>
            </Link>
          </div>
        </div>
      </header>

      <section id="top" className="relative">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[760px] -translate-x-1/2 rounded-full bg-[#dbeafe] blur-3xl opacity-60" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d9e2ef] bg-white px-3.5 py-2 text-xs font-semibold text-[#155eef] shadow-sm">
              <span className="size-1.5 rounded-full bg-[#155eef]" />
              Remote jobs, organized
            </div>
            <h1 className="max-w-3xl text-5xl font-black tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Find remote jobs without the endless search.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f6b7a] sm:text-xl">
              RemoteScout brings remote opportunities from trusted sources into one organized experience, so you can spend less time searching and more time finding work that fits.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#155eef] px-6 py-3.5 text-sm font-bold !text-white shadow-xl shadow-[#155eef]/20 transition hover:-translate-y-0.5 hover:bg-[#0b4dcc]">
                <span className="text-white">Create your account</span> <ArrowIcon />
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-[#d8e0ea] bg-white px-6 py-3.5 text-sm font-bold text-[#0b1220] transition hover:border-[#155eef] hover:text-[#155eef]">
                Log in
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 rounded-[2rem] bg-[#155eef]/10 blur-2xl" />
            <div className="relative rounded-[2rem] border border-[#dfe6ef] bg-white p-4 shadow-2xl shadow-[#1d3557]/10 sm:p-5">
              <div className="flex items-center justify-between border-b border-[#edf0f5] pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a95a5]">RemoteScout</p>
                  <p className="mt-1 text-sm font-bold">Your next opportunity</p>
                </div>
                <div className="grid size-9 place-items-center rounded-xl bg-[#eef4ff] text-[#155eef]"><SearchIcon /></div>
              </div>
              <div className="mt-4 rounded-2xl border border-[#e7ecf2] bg-[#f8fafc] p-3">
                <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
                  <span className="grid size-10 place-items-center rounded-xl bg-[#eaf1ff] text-xs font-black text-[#155eef]">DEV</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">Remote software role</p>
                    <p className="mt-1 text-xs text-[#7a8696]">Development · Remote</p>
                  </div>
                  <span className="rounded-full bg-[#eefbf4] px-2.5 py-1 text-[10px] font-bold text-[#18864b]">Remote</span>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#e7ecf2] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8a95a5]">Source</p>
                  <p className="mt-2 text-sm font-bold">Original listing</p>
                </div>
                <div className="rounded-2xl border border-[#e7ecf2] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8a95a5]">Next step</p>
                  <p className="mt-2 text-sm font-bold">Review & apply</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-[#e4e9f0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#155eef]">How it works</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">A simpler path from search to application.</h2>
            <p className="mt-4 leading-7 text-[#5f6b7a]">RemoteScout is designed around the few steps that matter when you are looking for your next remote role.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number} className="rounded-3xl border border-[#e4e9f0] bg-[#f8fafc] p-7">
                <span className="text-sm font-black text-[#155eef]">{step.number}</span>
                <h3 className="mt-10 text-xl font-extrabold">{step.title}</h3>
                <p className="mt-3 leading-7 text-[#5f6b7a]">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why-remotescout">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#155eef]">Why RemoteScout</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Built around the job seeker.</h2>
              <p className="mt-4 leading-7 text-[#5f6b7a]">The goal is simple: make remote job discovery clearer, more focused, and easier to act on.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {benefits.map((benefit) => (
                <article key={benefit.title} className="rounded-3xl border border-[#e4e9f0] bg-white p-6 shadow-sm">
                  <div className="grid size-10 place-items-center rounded-xl bg-[#eef4ff] text-sm font-black text-[#155eef]">+</div>
                  <h3 className="mt-5 font-extrabold">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5f6b7a]">{benefit.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="bg-[#0b1220] text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8bb5ff]">Explore by category</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Remote work across the roles you care about.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#aab5c5]">From technical roles to creative, growth, support, and emerging digital work, RemoteScout is designed for a broad remote workforce.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.map((category) => (
              <div key={category} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]">
                {category}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="get-started">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#155eef] px-7 py-12 text-white shadow-2xl shadow-[#155eef]/20 sm:px-12 sm:py-16">
            <div className="absolute -right-24 -top-24 size-72 rounded-full border-[40px] border-white/10" />
            <div className="relative max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#dbeafe]">Start with a better search</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Your next remote opportunity should not be buried across ten tabs.</h2>
              <p className="mt-4 max-w-xl leading-7 text-[#dbeafe]">RemoteScout is being built to give job seekers one focused place to discover, evaluate, and act on remote opportunities.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold !text-[#155eef] transition hover:-translate-y-0.5">
                  <span className="text-[#155eef]">Create your account</span> <ArrowIcon />
                </Link>
                <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/20">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e4e9f0] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-[#6b7685] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 RemoteScout. Find remote work in one place.</p>
          <p>Built for remote job seekers.</p>
        </div>
      </footer>
    </main>
  );
}
