"use client";

import Link from "next/link";
import {
  PenTool,
  MessageSquare,
  Image,
  Send,
  Home,
  ShoppingBag,
  Mail,
  Youtube,
  Briefcase,
  UserCheck,
} from "lucide-react";

// icon mapping (more stable than direct reference)
const icons = {
  PenTool,
  MessageSquare,
  Image,
  Send,
  Home,
  ShoppingBag,
  Mail,
  Youtube,
  Briefcase,
  UserCheck,
};

export const templatesList = [
  { name: "Blog post intro", icon: "PenTool", desc: "Write a captivating blog post intro." },
  { name: "Facebook / Instagram ad copy", icon: "Image", desc: "Write a high-converting ad copy." },
  { name: "Instagram caption with hashtags", icon: "MessageSquare", desc: "Engaging captions with hashtags." },
  { name: "WhatsApp marketing message", icon: "Send", desc: "Short and compelling WhatsApp messages." },
  { name: "Real estate property description", icon: "Home", desc: "Attractive real estate descriptions." },
  { name: "Product description (ecommerce)", icon: "ShoppingBag", desc: "SEO-optimized product descriptions." },
  { name: "Email subject line + body", icon: "Mail", desc: "Professional emails for any purpose." },
  { name: "YouTube video title + description", icon: "Youtube", desc: "Catchy titles and SEO descriptions." },
  { name: "Business tagline / slogan", icon: "Briefcase", desc: "Memorable taglines for your business." },
  { name: "Cold outreach message (sales)", icon: "UserCheck", desc: "Persuasive cold outreach messages." },
];

export default function Templates() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Writing Templates
        </h1>
        <p className="text-slate-500">
          Choose a template below to start generating content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templatesList.map((t, i) => {
          const Icon = icons[t.icon];

          return (
            <Link
              key={i}
              href={`/dashboard/generator/${encodeURIComponent(t.name)}`}
              className="group bg-white rounded-3xl p-6 border border-slate-200 hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col"
            >
              <div className="w-14 h-14 bg-slate-50 group-hover:bg-primary/10 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors mb-6">
                {Icon && <Icon size={28} />}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {t.name}
              </h3>

              <p className="text-slate-500 text-sm flex-1">{t.desc}</p>

              <div className="mt-6 text-primary font-semibold text-sm group-hover:underline">
                Use Template →
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}