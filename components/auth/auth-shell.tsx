import Link from "next/link";
import AuthForm from "@/components/auth/signup-auth-form";

export default function AuthShell({ mode }: { mode: "login" | "signup" }) {
  const isLogin = mode === "login";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f9fc] px-4 py-7 text-[#0b1220] sm:px-5 sm:py-16">
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="mb-7 flex items-center justify-center gap-2.5 sm:mb-10">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#155eef] text-sm font-black text-white shadow-lg shadow-[#155eef]/20">R</span>
          <span className="text-lg font-extrabold tracking-tight">RemoteScout</span>
        </Link>
        <section className="rounded-[1.5rem] border border-[#e1e7ef] bg-white p-5 shadow-xl shadow-[#1d3557]/5 sm:rounded-[2rem] sm:p-9">
          <div className="mb-6 text-center sm:mb-7">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#155eef]">{isLogin ? "Welcome back" : "Get started"}</p>
            <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">{isLogin ? "Sign in to RemoteScout" : "Create your account"}</h1>
            <p className="mt-3 text-sm leading-6 text-[#667085]">{isLogin ? "Sign in to access your remote job workspace." : "Create an account to access your remote job workspace."}</p>
          </div>
          <AuthForm mode={mode} />
          <p className="mt-6 text-center text-sm leading-6 text-[#667085]">
            {isLogin ? "New to RemoteScout? " : "Already have an account? "}
            <Link href={isLogin ? "/signup" : "/login"} className="font-bold text-[#155eef] hover:underline">{isLogin ? "Create an account" : "Sign in"}</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
