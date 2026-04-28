"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Sparkles, LayoutDashboard, FileText, History, User, LogOut, Loader2, Menu, X } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const { data } = await axios.get(`${API_URL}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(data);
      } catch (error) {
        localStorage.removeItem("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router, pathname]); // Re-fetch on pathname change to update credits

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (!user) return null;

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Templates", href: "/dashboard/templates", icon: FileText },
    { name: "History", href: "/dashboard/history", icon: History },
    { name: "Account", href: "/dashboard/account", icon: User },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const percentageUsed = Math.min((user.wordsUsed / user.wordsLimit) * 100, 100);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2 text-primary font-bold text-xl">
          <Sparkles size={24} />
          WriteFlow
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-slate-900 text-slate-300 w-64 flex flex-col transition-transform duration-300 z-40 md:relative md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-16 flex items-center gap-2 px-6 font-bold text-xl text-white border-b border-slate-800">
          <div className="bg-primary/20 p-1.5 rounded-lg text-primary">
            <Sparkles size={20} />
          </div>
          WriteFlow AI
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive ? "bg-primary text-white" : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <link.icon size={20} />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-xl p-4 mb-4">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-medium text-slate-300">Credits Used</span>
              <span className="text-white">{user.wordsUsed} / {user.plan === 'pro' ? '∞' : user.wordsLimit}</span>
            </div>
            <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${percentageUsed > 90 ? 'bg-red-500' : 'bg-primary'}`}
                style={{ width: `${user.plan === 'pro' ? 0 : percentageUsed}%` }}
              />
            </div>
            {user.plan === 'free' && (
              <Link href="/dashboard/account" className="block mt-4 text-center text-sm text-primary font-medium hover:text-white transition-colors">
                Upgrade Plan →
              </Link>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden pt-16 md:pt-0 relative">
        {/* Topbar desktop */}
        <header className="hidden md:flex h-16 bg-white border-b border-slate-200 items-center justify-end px-8 shrink-0">
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium">
              <span className="text-slate-500">Plan:</span>{" "}
              <span className="uppercase text-primary bg-primary/10 px-2 py-1 rounded text-xs font-bold">{user.plan}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white font-bold text-sm">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
