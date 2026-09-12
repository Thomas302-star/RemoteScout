import Link from "next/link";
import AuthForm from "@/components/auth/auth-form";

export default function AuthShell({ mode }: { mode: "login" | "signup" }) {
  const isLogin = mode === "login";

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-5 py-10 text-[#0b1220] sm:py-16">
      <div className="mx-auto max-w-md">
        <Link href="/" className="mb-10 flex items-center justify-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-[#155eef] text-sm font-black text-white shadow-lg shadow-[#155eef]/20">R</span>
          <span className="text-lg font-extrabold tracking-tight">RemoteScout</span>
        </Link>

        <section className="rounded-[2rem] border border-[#e1e7ef] bg-white p-7 shadow-xl shadow-[#1d3557]/5 sm:p-9">
          <div className="mb-7 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#155eef]">{isLogin ? "Welcome back" : "Get started"}</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight">{isLogin ? "Sign in to RemoteScout" : "Create your account"}</h1>
            <p className="mt-3 text-sm leading-6 text-[#667085]">
              {isLogin
                ? "Sign in to access your remote job workspace."
                : "Create an account to access your remote job workspace."}
            </p>
          </div>

          <AuthForm mode={mode} />

          <p className="mt-6 text-center text-sm text-[#667085]">
            {isLogin ? "New to RemoteScout? " : "Already have an account? "}
            <Link href={isLogin ? "/signup" : "/login"} className="font-bold text-[#155eef] hover:underline">
              {isLogin ? "Create an account" : "Sign in"}
            </Link>
          </p>
        </section>

        <p className="mt-6 text-center text-xs leading-5 text-[#8a95a5]">
          RemoteScout only uses your account to provide access to the product. Job discovery features will be added in later V1 features.
        </p>
      </div>
    </main>
  );
}
