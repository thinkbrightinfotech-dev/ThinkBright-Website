import { Course, ServiceItem, ProjectItem, ImpactStat, TestimonialItem, BlogPost, EventItem, CertificateRecord } from '../types';

export const THINKBRIGHT_INFO = {
  name: 'ThinkBright Infotech',
  tagline: 'Empowering Your Digital Future',
  location: 'Behind Musalat Filling Station, Okediji Area, Ilora, Oyo State, Nigeria',
  phones: ['09034836379', '09015306791'],
  email: 'thinkbrightinfotech@gmail.com',
  domain: 'thinkbrightinfotech.com',
  founder: 'Opeyemi Israel Okunade',
  hours: 'Monday – Saturday: 8:00 AM – 6:30 PM (WAT)',
  whatsapp: '2349034836379',
};

export const INITIAL_IMPACT_STATS: ImpactStat[] = [
  { id: '1', label: 'People Trained', value: 1420, suffix: '+', description: 'Students, youth and workers trained in practical digital skills' },
  { id: '2', label: 'Apprentices Enrolled', value: 85, suffix: '+', description: 'Intensive hands-on apprentices transforming into digital professionals' },
  { id: '3', label: 'Schools Reached', value: 28, suffix: '', description: 'Primary and secondary schools equipped with modern ICT support' },
  { id: '4', label: 'Teachers Trained', value: 194, suffix: '+', description: 'Educators empowered with digital pedagogy and computer tools' },
  { id: '5', label: 'Businesses Supported', value: 76, suffix: '+', description: 'MSMEs digitized with branding, software, and accounting systems' },
  { id: '6', label: 'Projects Completed', value: 312, suffix: '+', description: 'Web, branding, printing and documentation milestones delivered' },
  { id: '7', label: 'Communities Reached', value: 12, suffix: '', description: 'Rural and underserved areas connected to the digital economy' },
];

export const COURSES_DATA: Course[] = [
  {
    id: 'computer-fundamentals',
    title: 'Computer Fundamentals & Digital Literacy',
    category: 'Foundational',
    tagline: 'Master hardware, OS navigation, file systems, internet safety, and typing speed from ground zero.',
    overview: 'Designed for beginners, students, and workers seeking confidence with computers. Covers physical components, Windows OS navigation, typing fluency, file organization, cloud storage basics, and secure browsing habits.',
    duration: '4 Weeks (Physical Hands-on)',
    fee: 25000,
    featured: true,
    trainingFormat: 'Physical Hands-on at Ilora Hub',
    certification: 'ThinkBright Certificate of Digital Competence',
    modules: [
      { title: 'Computer Anatomy & Architecture', topics: ['Hardware vs Software', 'Motherboards, CPUs, Storage & RAM', 'Peripherals & Connectivity'] },
      { title: 'Operating Systems & File Management', topics: ['Windows 11 Setup', 'Directory structure & Search', 'USB drives and peripheral safety'] },
      { title: 'Keyboard Fluency & Touch Typing', topics: ['Home row technique', 'Typing accuracy drills (aiming for 40+ WPM)', 'Shortcut keys'] },
      { title: 'Internet, Email & Cyber Safety', topics: ['Web browsers & Search strategies', 'Professional Email writing', 'Phishing awareness & 2FA protection'] }
    ],
    projects: ['Personal Digital Filing System', 'Official Email Correspondence Portfolio', 'Computer Speed Benchmark & Diagnostics'],
    targetAudience: ['School leavers and SSCE candidates', 'Adult learners and civil servants', 'Beginners with zero prior computer exposure'],
    requirements: ['No prior experience required. Enthusiasm and willingness to practice.'],
    faqs: [
      { q: 'Can I attend if I have never touched a computer?', a: 'Yes! Our patient instructors start from how to turn on a PC and hold the mouse comfortably.' },
      { q: 'Is a personal laptop mandatory?', a: 'No, ThinkBright provides desktop workstations and laptops for all practical sessions at our hub.' }
    ]
  },
  {
    id: 'microsoft-office-suite',
    title: 'Microsoft Office Suite (Word, Excel, PowerPoint, Access)',
    category: 'Productivity',
    tagline: 'The gold standard for workplace and academic productivity.',
    overview: 'Comprehensive training in industry-standard office tools. Learn professional document formatting, financial spreadsheets with automated formulas, persuasive slide design, and relational database creation in Microsoft Access.',
    duration: '6 Weeks',
    fee: 35000,
    featured: true,
    trainingFormat: 'Physical Hands-on at Ilora Hub',
    certification: 'ThinkBright Professional Office Specialist Certificate',
    modules: [
      { title: 'Microsoft Word Mastery', topics: ['Styles & Typography', 'Tables, Headers/Footers, Citations', 'Mail Merge for Mass Production'] },
      { title: 'Microsoft Excel Data & Modeling', topics: ['Formulas: SUM, VLOOKUP, XLOOKUP, IF, INDEX/MATCH', 'Pivot Tables & Dynamic Charts', 'Budgeting & Financial Templates'] },
      { title: 'Microsoft PowerPoint Presentation Design', topics: ['Visual hierarchy & layout principles', 'Transitions, animations & slide masters', 'Public presentation delivery'] },
      { title: 'Microsoft Access Database Management', topics: ['Tables, primary keys & relationships', 'Queries (SQL basics)', 'Forms and automated reports generation'] }
    ],
    projects: ['Multi-page Formal Academic / Business Proposal', 'Automated Business Payroll & Inventory Sheet', 'Executive Corporate Pitch Deck', 'School Student Records Database in Access'],
    targetAudience: ['Office administrators, secretaries, and receptionists', 'Undergraduates and postgraduate researchers', 'Business owners managing their accounts'],
    requirements: ['Basic computer awareness or completion of Computer Fundamentals.'],
    faqs: [
      { q: 'Does this cover practical office scenarios?', a: 'Every module is based on real Nigerian corporate, academic, and governmental documentation tasks.' }
    ]
  },
  {
    id: 'google-workspace',
    title: 'Google Workspace Cloud Productivity (Docs, Sheets, Slides, Drive)',
    category: 'Cloud & Collaboration',
    tagline: 'Collaborate seamlessly in real-time using Google Cloud ecosystem.',
    overview: 'Modern organizations run on the cloud. Master real-time multi-user document collaboration, automated Google Forms surveys, dynamic Sheets trackers, Google Meet setups, and secure Drive folder permission architectures.',
    duration: '3 Weeks',
    fee: 25000,
    trainingFormat: 'Physical Hands-on at Ilora Hub',
    certification: 'ThinkBright Google Cloud Productivity Certificate',
    modules: [
      { title: 'Google Drive Architecture', topics: ['Shared Drives vs My Drive', 'Granular access controls', 'Storage optimization and offline sync'] },
      { title: 'Google Docs & Collaborative Editing', topics: ['Suggesting mode, version history', 'Live comments & @mentions', 'Add-ons & template galleries'] },
      { title: 'Google Sheets & Forms Automation', topics: ['Google Forms data collection', 'Automated Sheet responses', 'IMPORTRANGE & QUERY functions'] },
      { title: 'Google Meet, Calendar & Keep', topics: ['Scheduling corporate meetings', 'Shared calendars & task checklists', 'Mobile integration'] }
    ],
    projects: ['End-to-end Customer Feedback & Analysis Pipeline', 'Collaborative Corporate Strategy Workspace'],
    targetAudience: ['Remote workers and virtual assistants', 'Teachers running paperless classrooms', 'Entrepreneurs coordinating team activities'],
    requirements: ['Active Google account and basic typing skills.'],
    faqs: [{ q: 'Can I do this with my smartphone?', a: 'While we introduce the mobile apps, training is conducted on PCs for complete desktop productivity mastery.' }]
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design & Visual Brand Communication',
    category: 'Creative Tech',
    tagline: 'Master CorelDRAW, Adobe Photoshop, and Canva for high-impact print & digital design.',
    overview: 'Learn the principles of color theory, typography, composition, and visual brand identity. Gain deep hands-on mastery in creating flyers, banner billboards, social media campaigns, logos, business cards, and print-ready prepress files.',
    duration: '8 Weeks',
    fee: 45000,
    featured: true,
    trainingFormat: 'Physical Hands-on at Ilora Hub',
    certification: 'ThinkBright Certified Graphic Designer',
    modules: [
      { title: 'Design Fundamentals & Typography', topics: ['Grid systems, color harmonies', 'Font pairing and contrast', 'Visual storytelling'] },
      { title: 'CorelDRAW Vector Graphics & Print Prepress', topics: ['Pen tool mastery, nodes & curves', 'Vector tracing & logo creation', 'Color separations (CMYK vs RGB), bleed & cut marks'] },
      { title: 'Adobe Photoshop Image Manipulation', topics: ['Photo retouching & color grading', 'Layer masks & blending modes', 'Social media flyer mockups & composite artwork'] },
      { title: 'Client Briefs & Commercial Portfolio', topics: ['Pricing your design work', 'Handling printing presses', 'Packaging final vector/raster deliverables'] }
    ],
    projects: ['Full Corporate Brand Identity Kit (Logo, Letterhead, Business Card)', 'High-Resolution Event Billboard Banner (10ft x 4ft)', '10-Slide Social Media Carousel Campaign'],
    targetAudience: ['Aspiring freelance designers', 'Printers and cyber café operators', 'Social media managers and marketing teams'],
    requirements: ['Passion for creativity. No drawing talent required.'],
    faqs: [{ q: 'Do you teach print preparation?', a: 'Yes! Because ThinkBright operates an active commercial printing facility, you get hands-on experience with actual commercial printing presses.' }]
  },
  {
    id: 'web-development',
    title: 'Modern Web Development (HTML, CSS, JavaScript, React)',
    category: 'Software Engineering',
    tagline: 'Build fast, responsive, and interactive web applications for clients across the globe.',
    overview: 'From semantic HTML5 and modern CSS3/Tailwind to interactive JavaScript and React components. Learn how to architect responsive websites, integrate APIs, deploy live to cloud hosting, and write clean maintainable code.',
    duration: '12 Weeks',
    fee: 65000,
    featured: true,
    trainingFormat: 'Physical Intensive Hands-on',
    certification: 'ThinkBright Certified Frontend Web Developer',
    modules: [
      { title: 'Semantic Web & Modern CSS3', topics: ['HTML5 standards & accessibility (a11y)', 'Flexbox, CSS Grid & Tailwind CSS', 'Mobile-first responsive design'] },
      { title: 'JavaScript (ES6+) Fundamentals', topics: ['Variables, scopes, data structures', 'DOM manipulation & Event listeners', 'Async/Await, Fetch API & JSON'] },
      { title: 'React & Component Architecture', topics: ['State & Props, Hooks (useState, useEffect)', 'Component lifecycles & Tailwind UI', 'Form handling & Client routing'] },
      { title: 'Git, GitHub & Cloud Deployment', topics: ['Version control workflows', 'Pushing repositories to GitHub', 'Deploying to Vercel/Netlify with custom domains'] }
    ],
    projects: ['Fully Responsive Corporate Brand Portal', 'Interactive Nigerian E-Commerce Catalog with Cart', 'Dynamic Task Management Web App with API integration'],
    targetAudience: ['Aspiring software developers and tech careers', 'Apprentices seeking high-demand digital income', 'STEM students seeking practical portfolio skills'],
    requirements: ['Computer fundamentals and a laptop for home practice.'],
    faqs: [{ q: 'Is coding hard for beginners?', a: 'Our step-by-step curriculum breaks every concept into simple, visual analogies with daily practical coding sessions.' }]
  },
  {
    id: 'python-programming',
    title: 'Python Programming & Automation',
    category: 'Software Engineering',
    tagline: 'Learn the worlds most versatile programming language for scripts, automation, and data.',
    overview: 'Python is intuitive, powerful, and universally respected. Learn core algorithmic thinking, data structures, file handling, web scraping, task automation, and basic backend API construction.',
    duration: '8 Weeks',
    fee: 55000,
    trainingFormat: 'Physical Hands-on at Ilora Hub',
    certification: 'ThinkBright Certified Python Programmer',
    modules: [
      { title: 'Algorithmic Thinking & Python Syntax', topics: ['Variables, Loops, Functions', 'Lists, Tuples, Dictionaries', 'Error handling & Debugging'] },
      { title: 'File I/O & Automation Scripts', topics: ['Reading/writing CSV and JSON', 'Automating Excel workflows with openpyxl', 'Renaming bulk files and directories'] },
      { title: 'Web Scraping & Web Requests', topics: ['BeautifulSoup & Requests library', 'Extracting public market data', 'Handling API endpoints'] },
      { title: 'Mini Web Backend with FastAPI', topics: ['Building RESTful endpoints', 'Pydantic data validation', 'Testing APIs with Swagger UI'] }
    ],
    projects: ['Automated WhatsApp / Email Alert Script', 'Web Data Scraper with CSV Export', 'Inventory Management CLI Tool'],
    targetAudience: ['Aspiring backend engineers', 'Accountants looking to automate repetitive Excel tasks', 'Data enthusiasts'],
    requirements: ['Basic computer familiarity.'],
    faqs: [{ q: 'Can Python help me in non-tech jobs?', a: 'Yes! Automated scripts save hours of repetitive spreadsheet and data entry work every week.' }]
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis & Visualization (Excel & Power BI)',
    category: 'Data & Analytics',
    tagline: 'Transform raw business numbers into actionable, executive visual dashboards.',
    overview: 'Master the art of extracting insights from raw datasets. Clean messy data, perform statistical analysis, design interactive Power BI dashboards, and present findings that drive sound business decisions.',
    duration: '8 Weeks',
    fee: 55000,
    featured: true,
    trainingFormat: 'Physical Hands-on at Ilora Hub',
    certification: 'ThinkBright Certified Data Analyst',
    modules: [
      { title: 'Advanced Excel for Analytics', topics: ['Power Query for data cleaning', 'Complex logical calculations & lookups', 'Dynamic Pivot tables & slicers'] },
      { title: 'Data Modeling & Relational Concepts', topics: ['Star schema, Primary & Foreign keys', 'Data normalization & cleaning rules', 'Handling missing and duplicate entries'] },
      { title: 'Microsoft Power BI Essentials', topics: ['Importing diverse data sources', 'DAX fundamentals (CALCULATE, RELATED, SUMX)', 'Building dynamic visual reports'] },
      { title: 'Business Storytelling & Presentation', topics: ['KPI card design, trend lines, drill-throughs', 'Executive presentation skills', 'Portfolio building'] }
    ],
    projects: ['Nigerian Retail Supermarket Sales Dashboard', 'Healthcare Clinic Patient Metrics Tracker', 'School Academic Performance & Attendance Analytics'],
    targetAudience: ['Graduates seeking analytics jobs', 'Accountants, bankers and auditors', 'Entrepreneurs wanting clarity on sales trends'],
    requirements: ['Proficiency with basic Microsoft Excel.'],
    faqs: [{ q: 'Do I need advanced mathematics?', a: 'No, standard business arithmetic (percentages, averages, ratios) is all you need.' }]
  },
  {
    id: 'app-development',
    title: 'Mobile App Development (React Native / Flutter)',
    category: 'Software Engineering',
    tagline: 'Build cross-platform mobile apps for Android and iOS devices.',
    overview: 'Learn how to build sleek native mobile applications. Master layout components, navigation stacks, device sensors, camera and location access, local SQLite storage, and deployment to Google Play Store.',
    duration: '12 Weeks',
    fee: 70000,
    trainingFormat: 'Physical Intensive Hands-on',
    certification: 'ThinkBright Certified Mobile Developer',
    modules: [
      { title: 'Mobile UI & Native Components', topics: ['Responsive mobile layouts', 'Theme systems & dark mode', 'Gestures & touch handling'] },
      { title: 'State Management & Navigation', topics: ['Stack & Tab navigation', 'Global state with Context/Redux', 'Local storage persistence'] },
      { title: 'Backend Integration & Auth', topics: ['Connecting REST APIs', 'Firebase Authentication', 'Push notifications architecture'] },
      { title: 'Build & Release Pipeline', topics: ['Android APK & App Bundle generation', 'Google Play Developer Console overview', 'App performance profiling'] }
    ],
    projects: ['Community Marketplace Android App', 'Personal Budget & Expense Mobile Tracker'],
    targetAudience: ['Frontend developers upgrading to mobile', 'Computer science students', 'Tech entrepreneurs with mobile ideas'],
    requirements: ['Prior JavaScript or programming knowledge.'],
    faqs: [{ q: 'Can I test on my own Android phone?', a: 'Yes, you can run and test apps directly on your physical Android phone via USB debugging.' }]
  },
  {
    id: 'video-editing',
    title: 'Video Editing & Digital Content Production',
    category: 'Creative Tech',
    tagline: 'Create cinematic videos, TikTok/Reels content, documentaries, and commercial adverts.',
    overview: 'Learn Adobe Premiere Pro, CapCut Pro, and DaVinci Resolve. Master footage assembly, multi-track audio mixing, color correction, dynamic captions, lower thirds, and exporting for social media and broadcast.',
    duration: '6 Weeks',
    fee: 45000,
    trainingFormat: 'Physical Hands-on at Ilora Hub',
    certification: 'ThinkBright Certified Video Content Creator',
    modules: [
      { title: 'Visual Grammar & Timeline Editing', topics: ['Framing, cuts (J-cut, L-cut, match cut)', 'B-roll pacing & rhythmic cutting', 'Project organization & media proxies'] },
      { title: 'Audio Engineering for Video', topics: ['Voiceover noise removal & EQ', 'Music ducking & sound effects (SFX)', 'Dialogue normalization'] },
      { title: 'Color Grading & Motion Titles', topics: ['LUTs, color wheels, scopes', 'Kinetic typography & subtitle generation', 'Transitions & green-screen keying'] },
      { title: 'Social Media & Commercial Optimization', topics: ['Vertical 9:16 vs 16:9 widescreen codecs', 'Viral pacing techniques', 'Commercial client proposals'] }
    ],
    projects: ['1-Minute Viral Social Media Product Advert', '5-Minute Community Documentary Story', 'Corporate Event Highlight Reel'],
    targetAudience: ['Content creators, YouTubers & TikTokers', 'Media teams of churches and organizations', 'Videographers and event organizers'],
    requirements: ['Basic computer literacy. Laptop with discrete graphics card recommended for home use.'],
    faqs: [{ q: 'Are computers provided for rendering?', a: 'Yes, our training hub has high-performance workstations suitable for video rendering.' }]
  },
  {
    id: 'game-development',
    title: 'Game Development Fundamentals (Godot / Unity 2D)',
    category: 'Creative Tech',
    tagline: 'Design 2D game mechanics, sprite animations, physics, and interactive play.',
    overview: 'Introduction to game loops, sprite creation, 2D physics engines, character controllers, collision detection, sound effects, and exporting playable games for PC and Android.',
    duration: '8 Weeks',
    fee: 50000,
    trainingFormat: 'Physical Hands-on at Ilora Hub',
    certification: 'ThinkBright Junior Game Developer Certificate',
    modules: [
      { title: 'Game Design Theory & Ideation', topics: ['Core game loops & mechanics', 'Level design & player engagement', '2D sprites & tilemaps'] },
      { title: 'Game Engine Architecture', topics: ['Nodes, scenes, and hierarchies', 'Player movement & jump physics', 'Tile collision & triggers'] },
      { title: 'Gameplay Programming', topics: ['Scorekeeping, health bars, inventory', 'Enemy AI & patrol paths', 'Audio soundscapes & UI overlays'] },
      { title: 'Playtesting & Exporting', topics: ['Balancing game difficulty', 'Exporting to Windows EXE & Android APK', 'Publishing to itch.io'] }
    ],
    projects: ['Classic 2D Platformer Game with 3 Levels', 'Endless Runner Android Game'],
    targetAudience: ['Youth, teenagers, and creative programmers', 'Storytellers and digital artists'],
    requirements: ['Basic computer comfort.'],
    faqs: [{ q: 'Is this suitable for secondary school students?', a: 'Absolutely! It is one of our most popular programmes for enthusiastic young minds.' }]
  },
  {
    id: 'cbt-training',
    title: 'Computer-Based Testing (CBT) Preparation & Mastery',
    category: 'Education & Examination',
    tagline: 'Conquer JAMB, WAEC, NECO, and recruitment CBT exams with speed and zero panic.',
    overview: 'Specialized drill programme to eliminate computer anxiety for examination candidates. Practice with realistic JAMB/UTME CBT simulation software, keyboard shortcut navigation, 8-key method, time management, and mock exams.',
    duration: '2 to 4 Weeks',
    fee: 15000,
    featured: true,
    trainingFormat: 'Physical Hands-on at Ilora Hub',
    certification: 'ThinkBright CBT Readiness Certificate',
    modules: [
      { title: 'Exam Interface Mastery', topics: ['8-key navigation (A, B, C, D, N, P, S, R)', 'Timer management and pacing strategies', 'Reviewing flagged questions'] },
      { title: 'Mouse & Keyboard Speed', topics: ['Eliminating mouse hesitation', 'Rapid question reading & scanning', 'Handling unexpected system glitches'] },
      { title: 'Full-Length Simulation Mocks', topics: ['Timed JAMB 4-subject simulated exams', 'Instant score breakdown & diagnostics', 'Weakness correction sessions'] }
    ],
    projects: ['5 Proctored Full-Length JAMB CBT Mock Sessions with Analytics'],
    targetAudience: ['JAMB UTME candidates', 'Police, Civil Service & Bank recruitment CBT takers', 'Secondary school students'],
    requirements: ['No prior experience required.'],
    faqs: [{ q: 'Does this really improve exam scores?', a: 'Yes! Over 80% of student marks lost in CBT are due to interface hesitation, slow typing, and panic. Our students enter the exam hall 100% confident.' }]
  },
  {
    id: 'ict-for-teachers',
    title: 'Specialized ICT Training for Teachers & School Owners',
    category: 'Education & Schools',
    tagline: 'Modernize teaching pedagogy, lesson preparation, student assessment, and school administration.',
    overview: 'Empowering primary, secondary, and tertiary educators with practical digital tools. Learn how to prepare engaging multimedia lesson plans, design computerized test questions, automate report cards, and lead digital classrooms.',
    duration: '4 Weeks (Weekend & Evening Batches Available)',
    fee: 30000,
    featured: true,
    trainingFormat: 'Physical Hands-on (or on-site at partner schools)',
    certification: 'ThinkBright Certified Digital Educator',
    modules: [
      { title: 'Digital Lesson Planning & Multimedia Content', topics: ['Creating slide-based visual lessons', 'Curating educational YouTube/Open Education resources', 'Digital whiteboard tools'] },
      { title: 'Automated Student Assessment & Report Cards', topics: ['Excel grade calculation sheets with auto-grading', 'Automated report sheet generation', 'Error-free termly mark computation'] },
      { title: 'Setting Up School CBT & Quiz Banks', topics: ['Typing and formatting objective questions', 'Creating online Google Forms quizzes with auto-marking', 'Introduction to offline school CBT servers'] },
      { title: 'Parent Communication & School Branding', topics: ['WhatsApp Business for schools', 'School digital newsletters and flyers', 'Internet safety in school premises'] }
    ],
    projects: ['Termly Automated Report Sheet Template', 'Interactive Visual Curriculum Module in Slides', '100-Question Digital CBT Exam Bank'],
    targetAudience: ['School proprietors and headteachers', 'Primary and secondary school teachers', 'Education consultants in Oyo State'],
    requirements: ['Any educator passionate about enhancing teaching quality.'],
    faqs: [{ q: 'Can ThinkBright train teachers on-site at our school?', a: 'Yes! We conduct customized on-site workshops for entire school faculties across Oyo State.' }]
  },
  {
    id: 'digital-skills-for-business',
    title: 'Digital Skills for Business Owners & MSMEs',
    category: 'Entrepreneurship',
    tagline: 'Leverage social commerce, digital bookkeeping, branding, and local SEO to attract paying customers.',
    overview: 'Tailored for traders, artisans, boutique owners, and service providers. Learn how to set up Google Business profiles, craft WhatsApp Business catalogs, accept digital payments, keep digital records, and design promotional flyers.',
    duration: '4 Weeks',
    fee: 30000,
    featured: true,
    trainingFormat: 'Physical Hands-on & Practical Business Clinics',
    certification: 'ThinkBright Certified Digital Entrepreneur',
    modules: [
      { title: 'Digital Identity & Local Search', topics: ['Google Business Profile verification', 'Getting discovered on Google Maps in Ilora/Oyo', 'Professional brand identity basics'] },
      { title: 'Social Commerce & WhatsApp Mastery', topics: ['WhatsApp Business catalog setup & quick replies', 'Instagram/Facebook storefront integration', 'Customer relationship follow-ups'] },
      { title: 'Digital Bookkeeping & Invoicing', topics: ['Mobile invoicing apps (Kuda, Bumpa, Excel)', 'Tracking revenue, expenses and debts', 'Moniepoint and digital POS operations'] },
      { title: 'Mobile Graphic Design for Promos', topics: ['Creating high-converting flyers with Canva on phone/PC', 'Product photography tips with smartphones', 'Promotional copywriting'] }
    ],
    projects: ['Verified Google Business Profile setup', 'Active WhatsApp Business Showcase with 10 Products', 'Digital Business Invoicing & Cashflow Tracker'],
    targetAudience: ['Local shop owners, artisans, salon owners, bakers', 'Supermarket & pharmacy managers', 'Emerging young entrepreneurs'],
    requirements: ['A smartphone and a functional business/business idea.'],
    faqs: [{ q: 'Will this help me get more customers?', a: 'Yes! Many of our graduates report a 30% to 50% increase in customer inquiries within 3 weeks of setting up Google Business and WhatsApp catalogs.' }]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  // Printing & Branding
  {
    id: 'typesetting',
    title: 'Professional Typesetting',
    category: 'Printing & Branding',
    description: 'Accurate and rapid typing and formatting of academic projects, books, contracts, examination papers, and legal documents.',
    priceLabel: 'From ₦200 per page',
    startingPrice: 200,
    priceType: 'per_unit',
    turnaroundTime: 'Same day / 24 hours',
    requirements: ['Handwritten manuscript or audio recording', 'Specific formatting instructions if any'],
    onlineRequestAvailable: true
  },
  {
    id: 'photocopying',
    title: 'High-Volume Photocopying',
    category: 'Printing & Branding',
    description: 'Crisp black-and-white and color reproduction for school handouts, corporate briefs, forms, and manuals at wholesale rates.',
    priceLabel: 'From ₦30 per page',
    startingPrice: 30,
    priceType: 'per_unit',
    turnaroundTime: 'Immediate while you wait',
    requirements: ['Original document or digital copy'],
    onlineRequestAvailable: true
  },
  {
    id: 'general-printing',
    title: 'General Commercial Printing',
    category: 'Printing & Branding',
    description: 'Direct-to-paper digital and offset printing for reports, certificates, questionnaires, and office stationery in rich vibrant color.',
    priceLabel: 'From ₦100 per color page',
    startingPrice: 100,
    priceType: 'per_unit',
    turnaroundTime: 'Same day',
    requirements: ['PDF, Word, or CorelDRAW file format'],
    onlineRequestAvailable: true
  },
  {
    id: 'lamination',
    title: 'Hot Roll & Pouch Lamination',
    category: 'Printing & Branding',
    description: 'Heavy-duty lamination protecting certificates, identity cards, important papers, and menus from water, dust, and tearing.',
    priceLabel: 'From ₦300 per document',
    startingPrice: 300,
    priceType: 'per_unit',
    turnaroundTime: '10 - 15 minutes',
    requirements: ['Clean, uncreased document'],
    onlineRequestAvailable: false
  },
  {
    id: 'certificate-printing',
    title: 'Official Certificate Printing',
    category: 'Printing & Branding',
    description: 'Heavyweight parchment and cardstock printing with anti-forge guilloche borders, foil stamps, and QR code integration for schools and academies.',
    priceLabel: 'From ₦800 per copy',
    startingPrice: 800,
    priceType: 'per_unit',
    turnaroundTime: '24 - 48 hours',
    requirements: ['Recipient roster list in Excel', 'School or organization logo and authorized signatures'],
    onlineRequestAvailable: true
  },
  {
    id: 'banner-printing',
    title: 'Large Format Flex & Banner Printing',
    category: 'Printing & Branding',
    description: 'High-resolution weatherproof flex banners, roll-up banners, billboards, and teardrop flags for churches, events, campaigns, and shops.',
    priceLabel: 'From ₦1,200 per sq ft',
    startingPrice: 1200,
    priceType: 'per_unit',
    turnaroundTime: '24 hours',
    requirements: ['Exact dimensions (feet or inches)', 'High-resolution graphic design (or we design it for you)'],
    onlineRequestAvailable: true
  },
  {
    id: 'plastic-id-cards',
    title: 'Plastic PVC ID Card Printing',
    category: 'Printing & Branding',
    description: 'Durable credit-card size plastic PVC identity cards with barcodes, magnetic strips, and customized branded lanyards.',
    priceLabel: 'From ₦1,500 per card',
    startingPrice: 1500,
    priceType: 'per_unit',
    turnaroundTime: '24 - 48 hours',
    requirements: ['Staff / student passport photos', 'Names, blood groups, and IDs in Excel template'],
    onlineRequestAvailable: true
  },
  {
    id: 'letterhead-printing',
    title: 'Corporate Letterhead Printing',
    category: 'Printing & Branding',
    description: 'Official corporate bond paper letterheads for schools, law chambers, businesses, and government contractors.',
    priceLabel: 'From ₦15,000 per ream (500 sheets)',
    startingPrice: 15000,
    priceType: 'quote',
    turnaroundTime: '48 hours',
    requirements: ['Company RC number, registered address, logo, and phone lines'],
    onlineRequestAvailable: true
  },
  {
    id: 'invoice-receipt-printing',
    title: 'Customized Invoice & Receipt Booklets',
    category: 'Printing & Branding',
    description: 'Carbonized 2-part and 3-part numbered NCR receipt and invoice booklets with perforated stubs and serial tracking.',
    priceLabel: 'From ₦4,500 per booklet (50 pairs)',
    startingPrice: 4500,
    priceType: 'quote',
    turnaroundTime: '3 - 5 days',
    requirements: ['Company details and desired column layout'],
    onlineRequestAvailable: true
  },
  {
    id: 'flyers-brochures',
    title: 'Promotional Flyers & Tri-Fold Brochures',
    category: 'Printing & Branding',
    description: 'Glossy 150gsm art-paper flyers and multi-fold corporate brochures designed to convert readers into paying customers.',
    priceLabel: 'From ₦25,000 per 1,000 copies',
    startingPrice: 25000,
    priceType: 'quote',
    turnaroundTime: '3 - 4 days',
    requirements: ['Content text, pictures, and color preferences'],
    onlineRequestAvailable: true
  },

  // Cyber & Online Services
  {
    id: 'cyber-cafe',
    title: 'High-Speed Cyber Café Browsing',
    category: 'Cyber & Online Services',
    description: 'Reliable high-speed optical fiber internet, comfortable air-conditioned workstations, clean keyboards, and uninterrupted power backup.',
    priceLabel: 'From ₦300 / hour',
    startingPrice: 300,
    priceType: 'per_unit',
    turnaroundTime: 'Instant Walk-in',
    requirements: ['Valid identity on check-in'],
    onlineRequestAvailable: false
  },
  {
    id: 'online-registration',
    title: 'Government, Academic & Corporate Online Registration',
    category: 'Cyber & Online Services',
    description: 'Flawless submission of JAMB UTME, WAEC, NECO, NYSC mobilization, Nigerian Police/Army recruitment, and civil service portal forms.',
    priceLabel: 'From ₦1,000 service fee',
    startingPrice: 1000,
    priceType: 'per_unit',
    turnaroundTime: '30 minutes',
    requirements: ['O-level result, NIN, birth certificate, passport photograph'],
    onlineRequestAvailable: true
  },
  {
    id: 'result-checking',
    title: 'Examination Result Checking & Colored Printing',
    category: 'Cyber & Online Services',
    description: 'Instant checking and high-grade printing of WAEC, NECO, NABTEB, JAMB result slips and original admission letters.',
    priceLabel: '₦1,500 (Includes official scratch card & printout)',
    startingPrice: 1500,
    priceType: 'fixed',
    turnaroundTime: 'Immediate (5 - 10 minutes)',
    requirements: ['Candidate exam number, exam year, and examination type'],
    onlineRequestAvailable: true
  },
  {
    id: 'scratch-cards',
    title: 'WAEC & NECO Scratch Card Sales (Token PINs)',
    category: 'Cyber & Online Services',
    description: 'Direct sales of genuine WAEC, NECO, NABTEB, and JAMB e-facility checker PIN tokens with immediate SMS/WhatsApp delivery.',
    priceLabel: 'Current official market rate',
    priceType: 'fixed',
    turnaroundTime: 'Instant via WhatsApp / In-person',
    requirements: ['Payer verification'],
    onlineRequestAvailable: true
  },
  {
    id: 'school-fee-payment',
    title: 'School Fee & Remita Billing Payments',
    category: 'Cyber & Online Services',
    description: 'Direct payment processing for state and federal universities, polytechnics, colleges of education, Remita RRR, and TSA invoices.',
    priceLabel: 'Standard processing fee',
    priceType: 'fixed',
    turnaroundTime: 'Instant stamped receipt',
    requirements: ['RRR code or student matric/admission number'],
    onlineRequestAvailable: true
  },
  {
    id: 'nin-bvn-reprint',
    title: 'NIN & BVN Standard Slip Reprinting',
    category: 'Cyber & Online Services',
    description: 'High-definition full-color laminated and plastic reprint of National Identification Number (NIN) slip and verified BVN certificates.',
    priceLabel: 'From ₦1,000',
    startingPrice: 1000,
    priceType: 'per_unit',
    turnaroundTime: '15 minutes',
    requirements: ['Registered phone line or tracking ID / slip number'],
    onlineRequestAvailable: true
  },
  {
    id: 'pos-services',
    title: 'Financial POS Cash Withdrawal & Transfers',
    category: 'Cyber & Online Services',
    description: 'Moniepoint and bank-integrated instant cash withdrawals, bank transfers, utility bill payments (PHCN, DSTV, GOTV, Startimes).',
    priceLabel: 'Standard competitive POS charges',
    priceType: 'fixed',
    turnaroundTime: 'Immediate',
    requirements: ['Debit card or account details'],
    onlineRequestAvailable: false
  },

  // Documentation & Registration
  {
    id: 'birth-attestation',
    title: 'National Population Commission (NPC) Birth Certificate & Attestation',
    category: 'Documentation & Registration',
    description: 'Assistance with digital processing and verification of official NPC birth attestation certificates for school, embassy, and passport use.',
    priceLabel: 'Request Quote',
    priceType: 'quote',
    turnaroundTime: '24 - 72 hours',
    requirements: ['Hospital birth record or parental declaration, NIN of parent'],
    onlineRequestAvailable: true
  },
  {
    id: 'court-affidavit',
    title: 'High Court & Magistrate Court Affidavit Processing',
    category: 'Documentation & Registration',
    description: 'Drafting and official processing of sworn court affidavits (Declaration of Age, Change of Name, Loss of Documents, Marriage Affidavits).',
    priceLabel: 'From ₦3,500',
    startingPrice: 3500,
    priceType: 'fixed',
    turnaroundTime: 'Same day / 24 hours',
    requirements: ['Factual statement, valid identification'],
    onlineRequestAvailable: true
  },
  {
    id: 'state-of-origin',
    title: 'State & Local Government Certificate of Origin',
    category: 'Documentation & Registration',
    description: 'Facilitation of certified local government identification letter of origin from Afijio, Oyo East, Oyo West, Atiba, and across Nigeria.',
    priceLabel: 'Request Quote',
    priceType: 'quote',
    turnaroundTime: '24 - 48 hours',
    requirements: ['Family roots verification, passport photographs, NIN'],
    onlineRequestAvailable: true
  },
  {
    id: 'business-registration',
    title: 'Corporate Affairs Commission (CAC) Business Registration',
    category: 'Documentation & Registration',
    description: 'End-to-end registration of Business Names, Limited Liability Companies (Ltd), and Incorporated Trustees/NGOs with CAC Nigeria.',
    priceLabel: 'From ₦25,000 inclusive of filing fees',
    startingPrice: 25000,
    priceType: 'quote',
    turnaroundTime: '5 - 10 working days',
    requirements: ['2 proposed names, nature of business, director NIN & valid IDs'],
    onlineRequestAvailable: true
  },
  {
    id: 'trcn-services',
    title: 'Teachers Registration Council of Nigeria (TRCN) Services',
    category: 'Documentation & Registration',
    description: 'PQE examination registration, certification follow-up, and license renewal support for Nigerian professional educators.',
    priceLabel: 'Official guideline rates',
    priceType: 'quote',
    turnaroundTime: 'Depends on council window',
    requirements: ['NCE, B.Ed or PGDE certificates, TRCN number'],
    onlineRequestAvailable: true
  },

  // Sales & Tech Support
  {
    id: 'laptops-accessories',
    title: 'Certified Laptops, Desktops & Computer Accessories',
    category: 'Sales & Tech Support',
    description: 'Sales of tested UK-used and brand new HP, Dell, Lenovo laptops, SSDs, RAM upgrades, laptop chargers, mouse, flash drives, and external keyboards.',
    priceLabel: 'Laptops from ₦120,000 / Accessories from ₦1,500',
    priceType: 'quote',
    turnaroundTime: 'Immediate / In Stock',
    requirements: ['Warranty provided on all certified systems'],
    onlineRequestAvailable: true
  },
  {
    id: 'project-analysis',
    title: 'Academic & Business Project Data Analysis',
    category: 'Sales & Tech Support',
    description: 'Statistical analysis for final-year undergraduate and master’s dissertations using SPSS, Excel, and Power BI with interpreted chapter 4 results.',
    priceLabel: 'From ₦20,000 depending on scope',
    startingPrice: 20000,
    priceType: 'quote',
    turnaroundTime: '3 - 7 days',
    requirements: ['Research questionnaire / raw survey data, research questions & hypotheses'],
    onlineRequestAvailable: true
  },
  {
    id: 'stationery-supplies',
    title: 'School & Corporate Stationery Supplies',
    category: 'Sales & Tech Support',
    description: 'Bulk wholesale and retail sales of A4 duplicating papers, envelopes, markers, file jackets, staplers, registers, and pens.',
    priceLabel: 'Wholesale prices',
    priceType: 'quote',
    turnaroundTime: 'Immediate pickup or delivery',
    requirements: ['Minimum order quantities for wholesale discount'],
    onlineRequestAvailable: true
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: '1',
    name: 'Adebayo Samuel',
    role: 'Graduate Apprentice & Frontend Developer',
    location: 'Ilora, Oyo State',
    quote: 'Joining the ThinkBright Apprenticeship programme completely transformed my life. I went from knowing nothing about programming to building responsive web applications and earning my first freelance contracts right here in Ilora without relocating to Lagos.',
    rating: 5,
    programmeOrService: 'Apprenticeship & Web Development',
    category: 'student',
    impactHighlight: 'Building production websites for regional businesses',
    metric: '₦180k+ Earned',
    badge: 'Graduate Apprentice',
    verified: true
  },
  {
    id: '2',
    name: 'Mrs. Folashade Adeyemi',
    role: 'School Proprietress',
    organizationOrSchool: 'Grace Crest Academy, Oyo',
    location: 'Oyo, Oyo State',
    quote: 'ThinkBright helped our school completely automate our termly student report sheets and trained all 18 of our teachers in computer-aided lesson planning. What used to take two weeks of sleepless grading now finishes in hours. They are a game changer for rural education.',
    rating: 5,
    programmeOrService: 'School ICT Training & Digitalization',
    category: 'partner',
    impactHighlight: 'Automated terminal records for 450+ pupils',
    metric: '18 Teachers Trained',
    badge: 'Education Partner',
    verified: true
  },
  {
    id: '3',
    name: 'Alhaji Rasheed Okediji',
    role: 'Managing Director & Founder',
    organizationOrSchool: 'Okediji Agro-Processing Ltd',
    location: 'Oyo State, Nigeria',
    quote: 'ThinkBright designed our brand packaging, barcode labels, and corporate registration with absolute precision. Their work satisfied standard supermarket compliance, enabling our farm products to enter 14 major retail chains across Ibadan and Lagos within three months.',
    rating: 5,
    programmeOrService: 'Branding, Barcoding & CAC Registration',
    category: 'partner',
    impactHighlight: 'Secured entry into 14 commercial supermarket chains',
    metric: '+220% Sales Growth',
    badge: 'Enterprise Partner',
    verified: true
  },
  {
    id: '4',
    name: 'Kehinde Oyedepo',
    role: 'Undergraduate Computer Science Student',
    location: 'Afijio LGA, Oyo State',
    quote: 'I did my JAMB CBT preparation at the ThinkBright Hub. The realistic 8-key examination simulations and timer drills completely eliminated my test anxiety. I scored 284 in the UTME and secured federal university admission on merit!',
    rating: 5,
    programmeOrService: 'CBT Preparation & Mastery',
    category: 'student',
    impactHighlight: 'Scored 284 in JAMB CBT & won university admission',
    metric: '284 Score on Merit',
    badge: 'CBT Alumni',
    verified: true
  },
  {
    id: '5',
    name: 'Zainab Oladipo',
    role: 'Data Analyst & OND Graduate',
    location: 'Ilora / Afijio, Oyo State',
    quote: 'Before ThinkBright, I struggled with spreadsheet formulas. After 8 weeks of intensive Power BI and Python training, I developed an automated inventory dashboard for a local agricultural cooperative that cut stock reconciliation time by 75%.',
    rating: 5,
    programmeOrService: 'Data Analytics & Power BI',
    category: 'student',
    impactHighlight: 'Deployed real-time inventory dashboards for cooperative',
    metric: '75% Time Saved',
    badge: 'Analytics Specialist',
    verified: true
  },
  {
    id: '6',
    name: 'Pastor Emmanuel Titilayo',
    role: 'Director of Academics',
    organizationOrSchool: 'Community Model College, Fiditi',
    location: 'Fiditi, Oyo State',
    quote: 'Partnering with ThinkBright brought computers to our pupils for the very first time. Their Mobile Digital Literacy outreach touched 120 students in our community who had never operated a keyboard or mouse. The enthusiasm among parents has been overwhelming.',
    rating: 5,
    programmeOrService: 'Community Digital Inclusion Outreach',
    category: 'partner',
    impactHighlight: 'Provided first-time computer access to 120 rural pupils',
    metric: '120+ First-Time Pupils',
    badge: 'Community Partner',
    verified: true
  },
  {
    id: '7',
    name: 'Tobi Ajewole',
    role: 'Junior Mobile App Developer',
    location: 'Oyo, Oyo State',
    quote: 'The apprenticeship model at ThinkBright gave me hands-on project experience, not just textbook theory. We built real mobile apps with React Native, and our instructor reviewed my pull requests every day. It bridged the gap between school and professional tech work.',
    rating: 5,
    programmeOrService: 'Mobile App Development',
    category: 'student',
    impactHighlight: 'Shipped 2 cross-platform mobile apps to local testing users',
    metric: '2 Apps Published',
    badge: 'Certified Developer',
    verified: true
  },
  {
    id: '8',
    name: 'Olumide Bakare',
    role: 'Operations Lead',
    organizationOrSchool: 'Horizon Agro-Allied Services',
    location: 'Oyo Town',
    quote: 'From corporate business incorporation to high-speed cyber connectivity and large-format farm signage, ThinkBright has been our sole technology partner for 2 years. They represent the highest standard of technical competence in Oyo State.',
    rating: 5,
    programmeOrService: 'Corporate Tech & Printing Services',
    category: 'partner',
    impactHighlight: 'Full enterprise branding & IT infrastructure retainer',
    metric: '2-Year Retainer',
    badge: 'Strategic Partner',
    verified: true
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: '1',
    title: 'Rural School Digitization Initiative: Afijio Model Schools',
    category: 'Education',
    problem: 'Over 12 rural primary and secondary schools in Afijio and Oyo lacked any functional computer workstations or digital records, relying on paper ledgers prone to damage.',
    solution: 'ThinkBright deployed refurbished workstations, set up offline educational software, and trained 42 local teachers in digital lesson planning and automated grading.',
    technology: ['Windows 11', 'Open Educational Resources', 'Offline Wikipedia / Kiwix', 'Excel Automation'],
    client: 'Afijio Community School Network',
    results: 'Over 1,200 school children gained their first hands-on typing and computer literacy exposure; school report compilation time was reduced by 85%.',
    date: 'February 2026'
  },
  {
    id: '2',
    title: 'Corporate Brand Identity & Digital Packaging: Okediji Farms Ltd',
    category: 'Graphic Design',
    problem: 'A rising local agricultural processing business struggled with unbranded packaging that prevented them from entering supermarket shelves in Ibadan and Lagos.',
    solution: 'Designed complete visual identity, vector logo, food-grade waterproof pouch labels, and barcode packaging complying with NAFDAC guidelines.',
    technology: ['CorelDRAW 2024', 'Adobe Photoshop', 'CMYK Offset Printing'],
    client: 'Okediji Farms Nigeria',
    results: 'Brand accepted into 14 modern supermarkets across Oyo and Lagos within 3 months; sales increased by 220%.',
    date: 'January 2026'
  },
  {
    id: '3',
    title: 'ThinkBright CBT Proctored Simulator Platform (Beta)',
    category: 'App Development',
    problem: 'Local students traveling long distances to major cities just to access realistic CBT mock exam software with authentic JAMB 8-key shortcuts.',
    solution: 'Engineered an offline-first browser-based CBT application with a 5,000-question past exam bank, real-time countdown, and instant topic diagnostics.',
    technology: ['React', 'TypeScript', 'IndexedDB', 'Tailwind CSS'],
    client: 'ThinkBright Labs Internal Project',
    results: 'Used by 340+ UTME candidates in 2026 with a 94% pass rate across tested candidates.',
    date: 'March 2026'
  }
];

export const BLOG_DATA: BlogPost[] = [
  {
    id: '1',
    title: 'Bridging the Rural Digital Divide: Why Practical Tech Education Must Start at the Grassroots',
    slug: 'bridging-rural-digital-divide',
    category: 'Community Development',
    summary: 'True African technological advancement cannot occur solely in highbrow city centers. Why empowering rural communities like Ilora creates exponential economic impact.',
    content: 'For decades, quality technological training in Nigeria has been clustered around metropolitan capitals like Lagos, Abuja, and central Ibadan. Meanwhile, talented youth in semi-urban and rural areas are left with cyber cafés that offer little more than social browsing.\n\nAt ThinkBright Infotech, our founding premise is that talent is evenly distributed across humanity, but opportunity is not. When a young person in Ilora learns web development, graphic design, or Python automation, their earning potential is no longer restricted to their physical postal code. They become global knowledge workers.\n\nOur practical apprenticeship model pairs real commercial projects with rigorous mentors, ensuring that when an apprentice graduates, they possess demonstrable market value.',
    author: 'Opeyemi Israel Okunade (Founder)',
    publishedAt: 'March 10, 2026',
    readTime: '5 min read',
    tags: ['Rural Tech', 'Digital Divide', 'Youth Empowerment', 'Nigeria']
  },
  {
    id: '2',
    title: 'How AI and Python Automation Can Save Small Businesses 20 Hours Every Week',
    slug: 'ai-and-python-automation-for-small-business',
    category: 'AI',
    summary: 'From generating customer invoices to inventory alerts and WhatsApp responses, discover how simple technology tools give small businesses superpowers.',
    content: 'Most small business owners in Nigeria spend up to 40% of their day on repetitive administrative tasks: tallying daily sales books, sending receipt confirmations, retyping customer contact lists, and checking stock.\n\nWith practical technology education, small enterprises can automate these mundane tasks using simple tools like Excel formulas, Google Workspace integrations, and basic Python scripts. This frees the business owner to focus on what actually drives revenue: product quality and customer relationships.',
    author: 'ThinkBright Tech Team',
    publishedAt: 'March 4, 2026',
    readTime: '4 min read',
    tags: ['AI', 'Automation', 'MSME', 'Productivity']
  },
  {
    id: '3',
    title: '5 Costly Mistakes Students Make in Computer-Based Testing (CBT) and How to Avoid Them',
    slug: '5-costly-cbt-mistakes',
    category: 'Education',
    summary: 'Mastering the 8-key shortcut technique, time allocation, and avoiding panic during JAMB and recruitment exams.',
    content: 'Every year, thousands of brilliant Nigerian students score below their true potential in JAMB UTME not because they did not know the subject answers, but because they lost valuable minutes wrestling with the computer mouse, clicking wrong tabs, or experiencing interface panic.\n\n1. Relying on the mouse instead of keyboard shortcuts (A, B, C, D, N, P, S).\n2. Spending more than 1 minute on a difficult question on the first pass.\n3. Panicking when a timer changes color.\n4. Failing to review flagged questions before final submission.\n\nAt ThinkBright, our CBT simulation laboratory trains muscle memory so students approach their exams with supreme confidence.',
    author: 'ThinkBright Academic Dept',
    publishedAt: 'February 26, 2026',
    readTime: '6 min read',
    tags: ['JAMB', 'CBT', 'Exam Success', 'Education']
  }
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: '1',
    title: 'Ilora Community Digital Literacy & Computer Free Day',
    type: 'Computer Literacy Day',
    date: 'Saturday, April 18, 2026',
    time: '9:00 AM – 3:00 PM (WAT)',
    location: 'ThinkBright Infotech Hub, Okediji Area, Ilora',
    description: 'A free community open day providing free computer access, free typing assessments, and introductory smartphone digital skills clinics for market women and youth.',
    seatsTotal: 100,
    seatsRegistered: 68,
    status: 'Upcoming'
  },
  {
    id: '2',
    title: 'Teachers ICT Empowerment Workshop: The Paperless Classroom',
    type: 'Workshop',
    date: 'Saturday, May 2, 2026',
    time: '10:00 AM – 2:00 PM (WAT)',
    location: 'ThinkBright Innovation Hall, Ilora',
    description: 'Hands-on practical masterclass for school proprietors and teachers on automated grade sheet design, digital lesson preparation, and online quizzes.',
    seatsTotal: 50,
    seatsRegistered: 39,
    status: 'Upcoming'
  },
  {
    id: '3',
    title: 'Youth Tech Career Bootcamp: From Zero to Junior Web Developer',
    type: 'Training',
    date: 'Monday, June 1, 2026',
    time: '9:00 AM – 1:00 PM Daily',
    location: 'ThinkBright Training Lab, Ilora',
    description: 'Kick-off cohort for our flagship 3-month intensive web development and software engineering apprenticeship batch.',
    seatsTotal: 25,
    seatsRegistered: 18,
    status: 'Upcoming'
  }
];

export const INITIAL_CERTIFICATES: CertificateRecord[] = [
  {
    id: 'TB-2026-ICT-0891',
    learnerName: 'Kehinde Samuel Adeleke',
    programme: 'Computer Fundamentals & Professional Office Suite',
    completionDate: 'January 28, 2026',
    issueDate: 'February 2, 2026',
    grade: 'Distinction (92%)',
    skillsAcquired: ['Windows 11 Administration', 'Advanced Microsoft Word & Excel', 'PowerPoint Presentation Design', 'Typing Speed 48 WPM'],
    directorSignature: 'Opeyemi Israel Okunade',
    verificationUrl: 'https://thinkbrightinfotech.com/verify/TB-2026-ICT-0891',
    status: 'Valid'
  },
  {
    id: 'TB-2026-WEB-0422',
    learnerName: 'Amina Zainab Yusuf',
    programme: 'Modern Web Development & React Engineering',
    completionDate: 'February 15, 2026',
    issueDate: 'February 20, 2026',
    grade: 'Distinction (89%)',
    skillsAcquired: ['HTML5 & Modern CSS3/Tailwind', 'JavaScript (ES6+) & DOM', 'React Component Architecture', 'Git & Cloud Deployment'],
    directorSignature: 'Opeyemi Israel Okunade',
    verificationUrl: 'https://thinkbrightinfotech.com/verify/TB-2026-WEB-0422',
    status: 'Valid'
  },
  {
    id: 'TB-2026-DES-0174',
    learnerName: 'Victor Babatunde Ojo',
    programme: 'Graphic Design & Visual Brand Identity',
    completionDate: 'December 18, 2025',
    issueDate: 'December 22, 2025',
    grade: 'Credit (81%)',
    skillsAcquired: ['CorelDRAW Vector Illustration', 'Photoshop Photo Retouching & Compositing', 'Commercial Prepress & CMYK Separation', 'Brand Identity Systems'],
    directorSignature: 'Opeyemi Israel Okunade',
    verificationUrl: 'https://thinkbrightinfotech.com/verify/TB-2026-DES-0174',
    status: 'Valid'
  }
];
