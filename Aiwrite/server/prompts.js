const getPrompt = (templateName, inputs, language, tone) => {
  const baseLanguage = language === 'Hindi' ? 'in Hindi language' : 'in English language';
  const baseTone = tone ? `Tone of voice: ${tone}.` : '';

  switch (templateName) {
    case 'Blog post intro ':
      return `Write a captivating blog post intro about ${inputs.topic}. Target audience: ${inputs.audience}. ${baseLanguage}. ${baseTone}`;
    case 'Facebook / Instagram ad copy':
      return `Write a high-converting Facebook/Instagram ad copy for a product named ${inputs.productName}. Product description: ${inputs.description}. ${baseLanguage}. ${baseTone}`;
    case 'Instagram caption with hashtags':
      return `Write an engaging Instagram caption about ${inputs.topic}. Include relevant hashtags. ${baseLanguage}. ${baseTone}`;
    case 'WhatsApp marketing message':
      return `Write a short and compelling WhatsApp marketing message promoting ${inputs.offer}. Target audience: ${inputs.audience}. ${baseLanguage}. ${baseTone}`;
    case 'Real estate property description':
      return `Write an attractive real estate property description for ${inputs.propertyDetails}. Location: ${inputs.location}. ${baseLanguage}. ${baseTone}`;
    case 'Product description (ecommerce)':
      return `Write an SEO-optimized ecommerce product description for ${inputs.productName}. Features: ${inputs.features}. ${baseLanguage}. ${baseTone}`;
    case 'Email subject line + body':
      return `Write an email subject line and body for ${inputs.purpose}. Recipient: ${inputs.recipient}. ${baseLanguage}. ${baseTone}`;
    case 'YouTube video title + description':
      return `Write a catchy YouTube video title and SEO-friendly description about ${inputs.videoTopic}. Keywords: ${inputs.keywords}. ${baseLanguage}. ${baseTone}`;
    case 'Business tagline / slogan':
      return `Generate 5 catchy and memorable business taglines or slogans for a company named ${inputs.companyName} that does ${inputs.industry}. ${baseLanguage}. ${baseTone}`;
    case 'Cold outreach message (sales)':
      return `Write a persuasive cold outreach sales message to ${inputs.prospect} offering ${inputs.offer}. ${baseLanguage}. ${baseTone}`;
    default:
      return `Generate content about ${inputs.topic} ${baseLanguage}. ${baseTone}`;
  }
};

module.exports = { getPrompt };
