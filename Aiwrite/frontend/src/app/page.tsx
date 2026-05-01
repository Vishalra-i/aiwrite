import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Zap, Globe, Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
            <Sparkles size={24} />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            WriteFlow AI
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="text-slate-600 hover:text-primary font-medium transition-colors">
            Log in
          </Link>
          <Link href="/register" className="bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5">
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-20 pb-32 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-200 shadow-sm mb-8 text-sm font-medium text-slate-600 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          Powered by Gemini 2.0 Flash
        </div>
        
        <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 max-w-4xl mx-auto leading-tight">
          Write 10x faster with <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
            Next-Gen AI Generation
          </span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Create high-converting blogs, ad copies, emails, and more in seconds. Overcome writer&apos;s block and scale your content creation effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 hover:-translate-y-1">
            Start Writing Free
            <ArrowRight size={20} />
          </Link>
          <p className="text-sm text-slate-500 sm:hidden">No credit card required</p>
        </div>
        <p className="hidden sm:block text-sm text-slate-500 mt-4">No credit card required • 2,000 free words • Cancel anytime</p>

        {/* Dashboard Preview mockup */}
        <div className="mt-20 relative mx-auto max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10 h-full w-full" />
          <div className="glass-card rounded-2xl p-2 md:p-4 shadow-2xl ring-1 ring-slate-900/5">
            <div className="rounded-xl overflow-hidden bg-white shadow-sm border border-slate-100 flex h-[400px]">
              {/* Fake Sidebar */}
              <div className="w-64 bg-slate-50 border-r border-slate-100 hidden md:block p-4">
                <div className="h-4 w-24 bg-slate-200 rounded mb-8" />
                <div className="space-y-3">
                  <div className="h-8 w-full bg-primary/10 rounded" />
                  <div className="h-8 w-full bg-slate-200 rounded" />
                  <div className="h-8 w-full bg-slate-200 rounded" />
                </div>
              </div>
              {/* Fake Content */}
              <div className="flex-1 p-6 md:p-8">
                <div className="h-8 w-48 bg-slate-200 rounded mb-6" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="h-32 rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <div className="h-6 w-10 bg-slate-200 rounded-full mb-4" />
                      <div className="h-4 w-3/4 bg-slate-200 rounded mb-2" />
                      <div className="h-3 w-1/2 bg-slate-200 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="bg-white py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to scale content</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Our platform provides 10+ custom templates engineered to get the best outputs from Gemini 2.0 Flash.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Generate full articles in seconds, not hours." },
              { icon: Globe, title: "Multi-language", desc: "Support for both English and Hindi outputs." },
              { icon: Lock, title: "Secure & Private", desc: "Your data is secured with enterprise-grade encryption." }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 relative z-10" id="pricing">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Start for free, upgrade when you need more power.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="glass-card rounded-3xl p-8 flex flex-col relative bg-white">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-slate-500 mb-6">Perfect for trying out the platform.</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold">₹0</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['2,000 words per month', 'All 10 templates', 'Standard support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="text-primary" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="w-full py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-colors text-center">
                Get Started
              </Link>
            </div>

            {/* Starter */}
            <div className="glass-card rounded-3xl p-8 flex flex-col relative bg-primary text-purple-600 shadow-2xl scale-105 z-10">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-orange-400 to-rose-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <p className="text-slate-500 mb-6">For creators and small businesses.</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold">₹499</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['30,000 words per month', 'All 10 templates', 'Priority email support', 'Access to new features'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="text-primary" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="w-full py-3 rounded-xl bg-white text-primary font-semibold hover:bg-slate-50 transition-colors text-center shadow-lg">
                Upgrade to Starter
              </Link>
            </div>

            {/* Pro */}
            <div className="glass-card rounded-3xl p-8 flex flex-col relative bg-white">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-slate-500 mb-6">For agencies and heavy users.</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold">₹1299</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Unlimited words', 'All 10 templates', '24/7 Priority support', 'Custom templates request'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="text-primary" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="w-full py-3 rounded-xl border-2 border-slate-200 text-slate-900 font-semibold hover:border-primary hover:text-primary transition-colors text-center">
                Get Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" size={20} />
            <span className="font-bold text-slate-900">WriteFlow AI</span>
          </div>
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} WriteFlow AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
