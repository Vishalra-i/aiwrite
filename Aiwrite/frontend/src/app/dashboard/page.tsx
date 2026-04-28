import Link from "next/link";
import { ArrowRight, PenLine, FileText, Settings, Sparkles } from "lucide-react";

export default function DashboardHome() {
  const quickTemplates = [
    { name: "Blog post intro", desc: "Start your blog with a bang", icon: PenLine },
    { name: "Facebook / Instagram ad copy", desc: "High-converting ad copies", icon: Sparkles },
    { name: "Email subject line + body", desc: "Professional emails instantly", icon: FileText },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to your Dashboard</h1>
        <p className="text-slate-500">Here's an overview of your account and quick actions.</p>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to create something amazing?</h2>
          <p className="text-primary-foreground/80 mb-6">Explore our library of 10+ custom-tuned AI templates to generate exactly what you need.</p>
          <Link href="/dashboard/templates" className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-lg">
            Browse All Templates
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Sparkles className="text-primary" size={24} />
            Popular Templates
          </h3>
          <div className="grid gap-4">
            {quickTemplates.map((t, i) => (
              <Link 
                key={i} 
                href={`/dashboard/generator/${encodeURIComponent(t.name)}`}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <t.icon size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{t.name}</h4>
                  <p className="text-sm text-slate-500">{t.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/dashboard/history" className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <FileText size={24} />
              </div>
              <span className="font-semibold text-slate-700">View History</span>
            </Link>
            <Link href="/dashboard/account" className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
                <Settings size={24} />
              </div>
              <span className="font-semibold text-slate-700">Manage Account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
