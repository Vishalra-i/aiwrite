"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Copy, Calendar, FileText } from "lucide-react";
import toast from "react-hot-toast";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const { data } = await axios.get(`${API_URL}/api/history`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(data);
      } catch (error) {
        toast.error("Failed to fetch history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Generation History</h1>
        <p className="text-slate-500">View and copy your previously generated content.</p>
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
            <FileText size={40} />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No history yet</h3>
          <p className="text-slate-500 max-w-sm">You haven't generated any content yet. Head over to templates to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
              <div className="p-6 md:w-1/3 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 mb-4 w-max">
                  <Calendar size={14} />
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{item.templateName}</h3>
                <div className="text-sm text-slate-500 mb-4">
                  <span className="font-medium text-slate-700">Words used:</span> {item.wordCount}
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Inputs</p>
                  {Object.entries(item.inputs).map(([key, val]: any) => (
                    <div key={key} className="text-sm">
                      <span className="font-medium text-slate-700 capitalize">{key}: </span>
                      <span className="text-slate-500">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 md:w-2/3 flex flex-col bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Output</span>
                  <button
                    onClick={() => copyToClipboard(item.generatedText)}
                    className="flex items-center gap-2 text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Copy size={16} /> Copy
                  </button>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-slate-700 whitespace-pre-wrap text-sm leading-relaxed max-h-64 overflow-y-auto border border-slate-100">
                  {item.generatedText}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
