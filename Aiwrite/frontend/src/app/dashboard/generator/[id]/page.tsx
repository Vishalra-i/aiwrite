"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeft, Loader2, Copy, Sparkles } from "lucide-react";

const getTemplateFields = (templateName: string) => {
  switch (templateName) {
    case 'Blog post intro': return [{ name: 'topic', label: 'Blog Topic' }, { name: 'audience', label: 'Target Audience' }];
    case 'Facebook / Instagram ad copy': return [{ name: 'productName', label: 'Product Name' }, { name: 'description', label: 'Product Description' }];
    case 'Instagram caption with hashtags': return [{ name: 'topic', label: 'Post Topic or Image Description' }];
    case 'WhatsApp marketing message': return [{ name: 'offer', label: 'Offer/Promotion Details' }, { name: 'audience', label: 'Target Audience' }];
    case 'Real estate property description': return [{ name: 'propertyDetails', label: 'Property Details (BHK, Size, etc)' }, { name: 'location', label: 'Location' }];
    case 'Product description (ecommerce)': return [{ name: 'productName', label: 'Product Name' }, { name: 'features', label: 'Key Features' }];
    case 'Email subject line + body': return [{ name: 'purpose', label: 'Email Purpose' }, { name: 'recipient', label: 'Recipient Name/Role' }];
    case 'YouTube video title + description': return [{ name: 'videoTopic', label: 'Video Topic' }, { name: 'keywords', label: 'SEO Keywords' }];
    case 'Business tagline / slogan': return [{ name: 'companyName', label: 'Company Name' }, { name: 'industry', label: 'Industry/Niche' }];
    case 'Cold outreach message (sales)': return [{ name: 'prospect', label: 'Prospect Details' }, { name: 'offer', label: 'Your Offer' }];
    default: return [{ name: 'topic', label: 'Topic' }];
  }
};

export default function Generator({ params }: { params: { id: string } }) {
  const router = useRouter();
  const templateName = decodeURIComponent(params.id);
  const fields = getTemplateFields(templateName);

  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [language, setLanguage] = useState("English");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const { data } = await axios.post(`${API_URL}/api/generate`, {
        templateName,
        inputs,
        language,
        tone
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOutput(data.generatedText);
      toast.success("Content generated successfully");
    } catch (error: unknown) {
      const err = error as { response?: { status?: number; data?: { message?: string } } };
      if (err.response?.status === 403) {
        toast.error("Credits exhausted. Please upgrade your plan.");
        router.push("/dashboard/account");
      } else {
        toast.error(err.response?.data?.message || "Failed to generate");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-6 flex items-center gap-4 shrink-0">
        <Link href="/dashboard/templates" className="p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-50 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{templateName}</h1>
          <p className="text-sm text-slate-500">Fill in the details below to generate content.</p>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-2 gap-8 min-h-0">
        {/* Input Form */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 overflow-y-auto">
          <form onSubmit={handleGenerate} className="space-y-6">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{field.label}</label>
                <textarea
                  value={inputs[field.name] || ""}
                  onChange={(e) => setInputs({ ...inputs, [field.name]: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none h-24"
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                  required
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="Professional">Professional</option>
                  <option value="Casual">Casual</option>
                  <option value="Friendly">Friendly</option>
                  <option value="Persuasive">Persuasive</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 flex justify-center items-center gap-2 disabled:opacity-70 text-lg mt-8"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <><Sparkles size={24} /> Generate Content</>}
            </button>
          </form>
        </div>

        {/* Output Area */}
        <div className="bg-slate-900 rounded-3xl p-6 flex flex-col shadow-xl overflow-hidden relative">
          <div className="flex justify-between items-center mb-4 shrink-0">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Sparkles className="text-primary" size={20} />
              Generated Result
            </h3>
            {output && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                <Copy size={16} /> Copy
              </button>
            )}
          </div>
          
          <div className="flex-1 bg-slate-800 rounded-2xl p-6 overflow-y-auto text-slate-300 relative leading-relaxed whitespace-pre-wrap">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-primary" size={40} />
                <p className="text-slate-400 font-medium">AI is crafting your content...</p>
              </div>
            ) : output ? (
              output
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center">
                  <Sparkles size={32} className="opacity-50" />
                </div>
                <p>Your generated content will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
