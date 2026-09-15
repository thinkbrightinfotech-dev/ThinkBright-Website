import { THINKBRIGHT_INFO, COURSES_DATA, SERVICES_DATA } from '../data/mockData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export async function askThinkBrightAI(userQuery: string, history: { role: string; content: string }[] = []): Promise<string> {
  const queryLower = userQuery.toLowerCase().trim();

  // Guardrail 1: Sensitive matters (payments, legal, disciplinary, account credential changes)
  if (
    queryLower.includes('refund') ||
    queryLower.includes('stolen') ||
    queryLower.includes('court dispute') ||
    queryLower.includes('police') ||
    queryLower.includes('change password for someone') ||
    queryLower.includes('disciplinary') ||
    queryLower.includes('expel') ||
    queryLower.includes('sue') ||
    queryLower.includes('legal action')
  ) {
    return `For sensitive, legal, or financial authorization matters, please contact our senior administrative team directly.\n\n📍 Physical Center: ${THINKBRIGHT_INFO.location}\n📞 Direct Hotline: ${THINKBRIGHT_INFO.phones.join(' / ')}\n✉️ Official Email: ${THINKBRIGHT_INFO.email}\n\nOur human administrators will be glad to assist you confidentially.`;
  }

  // Attempt server-side Gemini API call first if reachable
  try {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: userQuery, history })
    });
    if (response.ok) {
      const data = await response.json();
      if (data && data.reply) {
        return data.reply;
      }
    }
  } catch {
    // Graceful fallback to approved local knowledge engine
  }

  // Approved Knowledge Base Engine:
  if (queryLower.includes('location') || queryLower.includes('address') || queryLower.includes('where are you') || queryLower.includes('where is')) {
    return `ThinkBright Infotech is located at:\n📍 ${THINKBRIGHT_INFO.location}.\n\nOperating Hours:\n🕒 ${THINKBRIGHT_INFO.hours}.\n\nYou can reach us on ${THINKBRIGHT_INFO.phones[0]} or ${THINKBRIGHT_INFO.phones[1]}.`;
  }

  if (queryLower.includes('phone') || queryLower.includes('call') || queryLower.includes('contact') || queryLower.includes('whatsapp') || queryLower.includes('email')) {
    return `You can reach ThinkBright Infotech via:\n📞 Phone Lines: ${THINKBRIGHT_INFO.phones.join(' / ')}\n💬 WhatsApp: https://wa.me/${THINKBRIGHT_INFO.whatsapp}\n✉️ Email: ${THINKBRIGHT_INFO.email}\n\nWe are always happy to answer your inquiries or welcome you to our hub in Ilora!`;
  }

  if (queryLower.includes('founder') || queryLower.includes('who started') || queryLower.includes('who founded') || queryLower.includes('okunade')) {
    return `ThinkBright Infotech was founded by ${THINKBRIGHT_INFO.founder}, an educator and technology professional passionate about bridging the digital divide and making practical technology skills accessible across African communities.`;
  }

  if (queryLower.includes('apprentice') || queryLower.includes('apprenticeship') || queryLower.includes('internship') || queryLower.includes('how to apply')) {
    return `The ThinkBright Apprenticeship Programme is an intensive hands-on pathway designed to transform enthusiastic learners into job-ready tech professionals!\n\nKey Highlights:\n• Practical commercial training (Web Development, Graphic Design, Software, Hardware)\n• Structured agreement & mentor guidance\n• Real-world projects & digital portfolio\n• Globally verifiable ThinkBright Certificate upon completion\n\nTo apply, click the 'Become an Apprentice' button at the top of the page, fill in the registration details, and submit your application for review!`;
  }

  if (queryLower.includes('fee') || queryLower.includes('cost') || queryLower.includes('price') || queryLower.includes('how much')) {
    return `Here is a summary of our primary course fees:\n• Computer Fundamentals: ₦25,000 (4 Weeks)\n• Microsoft Office Suite: ₦35,000 (6 Weeks)\n• Graphic Design & Prepress: ₦45,000 (8 Weeks)\n• Modern Web Development: ₦65,000 (12 Weeks)\n• Python Programming & Automation: ₦55,000 (8 Weeks)\n• Data Analysis & Power BI: ₦55,000 (8 Weeks)\n• CBT Preparation & Practice: ₦15,000 (2-4 Weeks)\n• ICT Training for Teachers: ₦30,000 (4 Weeks)\n• Digital Skills for Business: ₦30,000 (4 Weeks)\n\nWe support both online Moniepoint payments and verified manual bank transfers with automated official receipts!`;
  }

  if (queryLower.includes('cbt') || queryLower.includes('jamb') || queryLower.includes('utme')) {
    return `Our Computer-Based Testing (CBT) Preparation Programme trains candidates for JAMB UTME, WAEC, NECO, and employment exams.\n\nWe train students in the 8-key keyboard shortcut method (A, B, C, D, N, P, S, R), timer management, and conduct full simulated mock examinations with instant diagnostics. Fee is ₦15,000.`;
  }

  if (queryLower.includes('course') || queryLower.includes('what do you teach') || queryLower.includes('program')) {
    const courseList = COURSES_DATA.map(c => `• ${c.title} (${c.duration})`).join('\n');
    return `ThinkBright offers a comprehensive suite of practical technology courses:\n\n${courseList}\n\nYou can click on any course on our 'Courses' page to view complete module syllabi, practical projects, and enrollment options!`;
  }

  if (queryLower.includes('service') || queryLower.includes('printing') || queryLower.includes('photocopy') || queryLower.includes('cac') || queryLower.includes('id card')) {
    return `ThinkBright provides 4 major categories of digital and commercial services:\n1. Printing & Branding (Banners, Plastic PVC ID Cards, Booklets, Certificates, Flyers)\n2. Cyber & Online Services (JAMB/WAEC/NECO Registration, Result Checking, NIN/BVN reprint, POS)\n3. Documentation & Registration (CAC Business Registration, Affidavits, State of Origin, TRCN)\n4. Sales & Tech Support (UK-used Laptops, Accessories, Project Analysis, Stationery)\n\nYou can also submit service orders and track status directly through our website!`;
  }

  if (queryLower.includes('certificate') || queryLower.includes('verify')) {
    return `Every graduate receives a certified ThinkBright Digital Certificate equipped with a unique Certificate ID and QR code, which can be publicly verified at our website verification tool anytime by employers or academic institutions!`;
  }

  if (queryLower.includes('thinkbright labs') || queryLower.includes('labs') || queryLower.includes('software')) {
    return `ThinkBright Labs is our technology innovation arm developing software products for Africa, including the ThinkBright School Management System, CBT Testing Platform, Business OS, Digital Certificate Verification Engine, and Talent Network!`;
  }

  return `Welcome to ThinkBright Infotech — Empowering Your Digital Future!\n\nI can answer questions regarding:\n• Our Courses & Fee structure\n• Apprenticeship Applications & Guidelines\n• Printing, Cyber, CAC & Documentation Services\n• Location, Hours & Contact Numbers\n• Certificate Verification & ThinkBright Labs\n\nHow can I help you today?`;
}
