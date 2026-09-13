"use client";

import { useMemo, useState } from "react";

type AdminUser = {
  id: string;
  email: string;
  fullName: string;
  headline: string;
  location: string;
  createdAt: string;
  lastSignInAt: string | null;
  bannedUntil: string | null;
  emailConfirmedAt: string | null;
  isCurrentAdmin: boolean;
};

export function AdminUsersPanel({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;
    return users.filter((user) => user.email.toLowerCase().includes(term) || user.fullName.toLowerCase().includes(term));
  }, [search, users]);

  async function deleteUser(user: AdminUser) {
    if (user.isCurrentAdmin) return;
    const confirmed = window.confirm(`Delete the account for ${user.email}? This permanently removes the account and associated user-owned data.`);
    if (!confirmed) return;

    setDeletingId(user.id);
    setError("");
    try {
      const response = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to delete user.");
      setUsers((current) => current.filter((item) => item.id !== user.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete user.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-950">{users.length} registered {users.length === 1 ? "user" : "users"}</p>
            <p className="mt-1 text-xs text-slate-500">Account access and basic profile information.</p>
          </div>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search email or name" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 sm:max-w-xs" />
        </div>
        {error ? <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p> : null}
      </div>

      <div className="divide-y divide-slate-100">
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">No users match your search.</div>
        ) : filteredUsers.map((user) => {
          const isBanned = Boolean(user.bannedUntil && new Date(user.bannedUntil).getTime() > Date.now());
          return (
            <article key={user.id} className="p-5 sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="break-all text-sm font-bold text-slate-950">{user.email || "No email"}</p>
                    {user.isCurrentAdmin ? <span className="rounded-full bg-slate-900 px-2 py-1 text-[11px] font-bold text-white">You</span> : null}
                    {isBanned ? <span className="rounded-full bg-red-100 px-2 py-1 text-[11px] font-bold text-red-700">Disabled</span> : <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-bold text-emerald-700">Active</span>}
                  </div>
                  <p className="mt-2 text-sm text-slate-700">{user.fullName || "No name added"}{user.headline ? ` · ${user.headline}` : ""}</p>
                  <p className="mt-1 text-xs text-slate-500">{user.location || "Location not set"} · Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                  <p className="mt-1 text-xs text-slate-500">Last sign in: {user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleDateString() : "Never"}</p>
                </div>
                <button type="button" onClick={() => deleteUser(user)} disabled={user.isCurrentAdmin || deletingId === user.id} className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40">{deletingId === user.id ? "Deleting..." : "Delete user"}</button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
