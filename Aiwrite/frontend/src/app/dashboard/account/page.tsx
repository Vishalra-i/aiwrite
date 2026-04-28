"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, CheckCircle2, Zap, AlertTriangle } from "lucide-react";
import Script from "next/script";

export default function Account() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const { data } = await axios.get(`${API_URL}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(data);
    } catch (error) {
      toast.error("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpgrade = async (plan: string) => {
    setProcessing(true);
    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const { data: order } = await axios.post(`${API_URL}/api/payment/create-order`, { plan }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "WriteFlow AI",
        description: `Upgrade to ${plan} plan`,
        order_id: order.id,
        handler: async function (response: any) {
          try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            await axios.post(`${API_URL}/api/payment/verify`, {
              ...response,
              plan
            }, {
              headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Payment successful! Plan upgraded.");
            fetchUser();
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#7C3AED",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Failed to initiate payment");
    } finally {
      setProcessing(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  const percentageUsed = Math.min((user.wordsUsed / user.wordsLimit) * 100, 100);

  return (
    <div className="max-w-5xl mx-auto">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Account & Billing</h1>
        <p className="text-slate-500">Manage your subscription and usage.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Profile Info */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Profile Details</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Name</label>
              <p className="text-lg font-medium text-slate-900 mt-1">{user.name}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Email</label>
              <p className="text-lg font-medium text-slate-900 mt-1">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Current Plan</label>
              <div className="mt-2 inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold uppercase text-sm">
                <Zap size={16} />
                {user.plan}
              </div>
            </div>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <h2 className="text-xl font-bold mb-6 relative z-10">Usage this month</h2>
          
          <div className="relative z-10">
            <div className="flex justify-between items-end mb-2">
              <span className="text-4xl font-extrabold">{user.wordsUsed.toLocaleString()}</span>
              <span className="text-slate-400 font-medium">/ {user.plan === 'pro' ? 'Unlimited' : user.wordsLimit.toLocaleString()} words</span>
            </div>
            
            <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden mt-4">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${percentageUsed > 90 ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 to-primary'}`}
                style={{ width: `${user.plan === 'pro' ? 0 : percentageUsed}%` }}
              />
            </div>
            
            {user.plan !== 'pro' && percentageUsed > 80 && (
              <p className="mt-4 text-sm text-red-400 font-medium flex items-center gap-2">
                <AlertTriangle size={16} />
                You are running low on credits. Upgrade your plan to continue using WriteFlow.
              </p>
            )}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-6">Upgrade Plan</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Starter */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative flex flex-col">
          {user.plan === 'starter' && (
             <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-3xl uppercase">Current Plan</div>
          )}
          <h3 className="text-2xl font-bold mb-2">Starter</h3>
          <p className="text-slate-500 mb-6">For creators and small businesses.</p>
          <div className="mb-6">
            <span className="text-4xl font-extrabold">₹499</span>
            <span className="text-slate-500">/mo</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            {['30,000 words per month', 'All 10 templates', 'Priority email support'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700">
                <CheckCircle2 className="text-primary" size={20} />
                {item}
              </li>
            ))}
          </ul>
          <button 
            onClick={() => handleUpgrade('starter')}
            disabled={processing || user.plan === 'starter' || user.plan === 'pro'}
            className="w-full py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? <Loader2 className="animate-spin mx-auto" size={24} /> : user.plan === 'starter' ? 'Current Plan' : 'Upgrade to Starter'}
          </button>
        </div>

        {/* Pro */}
        <div className="bg-gradient-to-b from-primary to-blue-600 rounded-3xl p-8 shadow-xl text-white relative flex flex-col">
          {user.plan === 'pro' && (
             <div className="absolute top-0 right-0 bg-white text-primary text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-3xl uppercase">Current Plan</div>
          )}
          <h3 className="text-2xl font-bold mb-2">Pro</h3>
          <p className="text-primary-foreground/80 mb-6">For agencies and heavy users.</p>
          <div className="mb-6">
            <span className="text-4xl font-extrabold">₹1299</span>
            <span className="text-primary-foreground/80">/mo</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            {['Unlimited words', 'All 10 templates', '24/7 Priority support'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white">
                <CheckCircle2 className="text-white" size={20} />
                {item}
              </li>
            ))}
          </ul>
          <button 
            onClick={() => handleUpgrade('pro')}
            disabled={processing || user.plan === 'pro'}
            className="w-full py-3 rounded-xl bg-white text-primary font-bold hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? <Loader2 className="animate-spin mx-auto text-primary" size={24} /> : user.plan === 'pro' ? 'Current Plan' : 'Upgrade to Pro'}
          </button>
        </div>
      </div>
    </div>
  );
}
