import {
  PenTool,
  MessageSquare,
  Image,
  Send,
  Home,
  ShoppingBag,
  Mail,
  Video,
  Briefcase,
  UserCheck,
  LucideIcon,
} from "lucide-react";

export const icons: Record<string, LucideIcon> = {
  PenTool,
  MessageSquare,
  Image,
  Send,
  Home,
  ShoppingBag,
  Mail,
  Video,
  Briefcase,
  UserCheck,
};

export interface Template {
  name: string;
  icon: string;
  desc: string;
}

export const templatesList: Template[] = [
  { name: "Blog post intro", icon: "PenTool", desc: "Write a captivating blog post intro." },
  { name: "Facebook / Instagram ad copy", icon: "Image", desc: "Write a high-converting ad copy." },
  { name: "Instagram caption with hashtags", icon: "MessageSquare", desc: "Engaging captions with hashtags." },
  { name: "WhatsApp marketing message", icon: "Send", desc: "Short and compelling WhatsApp messages." },
  { name: "Real estate property description", icon: "Home", desc: "Attractive real estate descriptions." },
  { name: "Product description (ecommerce)", icon: "ShoppingBag", desc: "SEO-optimized product descriptions." },
  { name: "Email subject line + body", icon: "Mail", desc: "Professional emails for any purpose." },
  { name: "YouTube video title + description", icon: "Video", desc: "Catchy titles and SEO descriptions." },
  { name: "Business tagline / slogan", icon: "Briefcase", desc: "Memorable taglines for your business." },
  { name: "Cold outreach message (sales)", icon: "UserCheck", desc: "Persuasive cold outreach messages." },
];