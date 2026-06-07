// ============================================
// UTILITIES NEPAL - DATA MODULE
// ============================================

const APP_DATA = {
  // Nepali Date Data (approximate mapping for 2000-2090 BS)
  nepaliMonths: [
    { bs: "बैशाख", en: "Baisakh", days: 31 },
    { bs: "जेठ", en: "Jestha", days: 31 },
    { bs: "असार", en: "Asar", days: 31 },
    { bs: "साउन", en: "Shrawan", days: 31 },
    { bs: "भदौ", en: "Bhadra", days: 31 },
    { bs: "असोज", en: "Ashwin", days: 30 },
    { bs: "कार्तिक", en: "Kartik", days: 30 },
    { bs: "मंसिर", en: "Mangsir", days: 30 },
    { bs: "पुष", en: "Poush", days: 29 },
    { bs: "माघ", en: "Magh", days: 29 },
    { bs: "फाल्गुन", en: "Falgun", days: 29 },
    { bs: "चैत", en: "Chaitra", days: 30 }
  ],

  // BS to AD reference: BS 2081 = AD 2024-2025
  bsReference: { bsYear: 2081, adYear: 2024, adMonth: 4, adDay: 14 },

  // Festivals (simplified for common ones)
  festivals: [
    { bsMonth: 1, bsDay: 1, name: "Nepali New Year", nepali: "नेपाली नयाँ वर्ष" },
    { bsMonth: 1, bsDay: 11, name: "Labor Day", nepali: "मजदुर दिवस" },
    { bsMonth: 3, bsDay: 15, name: "Rice Plantation Day", nepali: "धान दिवस" },
    { bsMonth: 4, bsDay: 1, name: "Gunla", nepali: "गुँलापर्व" },
    { bsMonth: 6, bsDay: 1, name: "Dashain Ghatasthapana", nepali: "दशैं घटस्थापना" },
    { bsMonth: 6, bsDay: 11, name: "Dashain Tika", nepali: "दशैं टिका" },
    { bsMonth: 7, bsDay: 1, name: "Tihar Laxmi Puja", nepali: "तिहार लक्ष्मी पूजा" },
    { bsMonth: 7, bsDay: 5, name: "Bhai Tika", nepali: "भाइटीका" },
    { bsMonth: 9, bsDay: 1, name: "Maghe Sankranti", nepali: "माघे संक्रान्ति" },
    { bsMonth: 11, bsDay: 1, name: "Shree Panchami", nepali: "श्री पञ्चमी" },
    { bsMonth: 11, bsDay: 11, name: "Maha Shivaratri", nepali: "महाशिवरात्रि" },
    { bsMonth: 12, bsDay: 1, name: "Ghode Jatra", nepali: "घोडेजात्रा" },
    { bsMonth: 12, bsDay: 8, name: "New Year Eve", nepali: "नयाँ वर्षको पूर्वसन्ध्या" }
  ],

  // Currency fallback rates (NPR base)
  currencyRates: {
    NPR: 1, USD: 0.0075, INR: 0.625, EUR: 0.0069,
    GBP: 0.0059, AUD: 0.0113, CNY: 0.054, JPY: 1.14
  },
  currencyNames: {
    NPR: "Nepalese Rupee", USD: "US Dollar", INR: "Indian Rupee",
    EUR: "Euro", GBP: "British Pound", AUD: "Australian Dollar",
    CNY: "Chinese Yuan", JPY: "Japanese Yen"
  },
  currencyFlags: {
    NPR: "🇳🇵", USD: "🇺🇸", INR: "🇮🇳", EUR: "🇪🇺",
    GBP: "🇬🇧", AUD: "🇦🇺", CNY: "🇨🇳", JPY: "🇯🇵"
  },

  // Nepal Cities for Weather
  nepalCities: [
    { name: "Kathmandu", lat: 27.7172, lon: 85.3240 },
    { name: "Pokhara", lat: 28.2096, lon: 83.9856 },
    { name: "Lalitpur", lat: 27.6647, lon: 85.3188 },
    { name: "Bharatpur", lat: 27.6782, lon: 84.4294 },
    { name: "Birgunj", lat: 27.0105, lon: 84.8774 },
    { name: "Biratnagar", lat: 26.4525, lon: 87.2718 },
    { name: "Dharan", lat: 26.8146, lon: 87.2837 },
    { name: "Butwal", lat: 27.7000, lon: 83.4500 },
    { name: "Hetauda", lat: 27.4250, lon: 85.0322 },
    { name: "Nepalgunj", lat: 28.0500, lon: 81.6167 },
    { name: "Dhangadhi", lat: 28.7000, lon: 80.5833 },
    { name: "Janakpur", lat: 26.7280, lon: 85.9250 }
  ],

  // Study Data - Formulas
  studyData: {
    formulas: [
      {
        id: "gpa-calc",
        category: "accounting",
        title: "GPA Calculation Formula",
        body: "GPA = Σ(Grade Point × Credit Hours) / Σ(Credit Hours)",
        nepali: "GPA = Σ(ग्रेड पाइन्ट × क्रेडिट घण्टा) / Σ(क्रेडिट घण्टा)",
        example: "If you get 3.6 in English (4 credits), 3.2 in Math (5 credits): GPA = (3.6×4 + 3.2×5) / (4+5) = 3.38"
      },
      {
        id: "net-profit",
        category: "accounting",
        title: "Net Profit / Net Loss",
        body: "Net Profit = Total Revenue - Total Expenses",
        nepali: "कुल नाफा = कुल आम्दानी - कुल खर्च",
        example: "Revenue: Rs. 500,000, Expenses: Rs. 350,000 → Net Profit = Rs. 150,000"
      },
      {
        id: "current-ratio",
        category: "accounting",
        title: "Current Ratio",
        body: "Current Ratio = Current Assets / Current Liabilities",
        nepali: "चालु अनुपात = चालु सम्पत्ति / चालु दायित्व",
        example: "Current Assets: Rs. 200,000, Current Liabilities: Rs. 100,000 → Ratio = 2:1"
      },
      {
        id: "roi",
        category: "accounting",
        title: "Return on Investment (ROI)",
        body: "ROI = (Net Profit / Investment) × 100%",
        nepali: "लगानी प्रतिफल = (कुल नाफा / लगानी) × १००%",
        example: "Investment: Rs. 100,000, Profit: Rs. 25,000 → ROI = 25%"
      },
      {
        id: "depreciation-sl",
        category: "accounting",
        title: "Straight Line Depreciation",
        body: "Annual Depreciation = (Cost - Salvage Value) / Useful Life",
        nepali: "वार्षिक मूल्यह्रास = (लागत - बचत मूल्य) / उपयोगी जीवन",
        example: "Cost: Rs. 100,000, Salvage: Rs. 10,000, Life: 5 years → Depreciation = Rs. 18,000/year"
      },
      {
        id: "elasticity",
        category: "economics",
        title: "Price Elasticity of Demand",
        body: "Ed = (% Change in Quantity Demanded) / (% Change in Price)",
        nepali: "मागको मूल्य लचकता = (माग गरिएको मात्रामा प्रतिशत परिवर्तन) / (मूल्यमा प्रतिशत परिवर्तन)",
        example: "Price increases 10%, demand falls 20% → Ed = -2 (Elastic)"
      },
      {
        id: "gdp",
        category: "economics",
        title: "GDP (Gross Domestic Product)",
        body: "GDP = C + I + G + (X - M)",
        nepali: "GDP = उपभोग + लगानी + सरकारी खर्च + (निर्यात - आयात)",
        example: "C=500, I=200, G=150, X=100, M=80 → GDP = 870 billion"
      },
      {
        id: "inflation",
        category: "economics",
        title: "Inflation Rate",
        body: "Inflation = ((Current CPI - Previous CPI) / Previous CPI) × 100",
        nepali: "मुद्रास्फीति दर = ((वर्तमान CPI - अघिल्लो CPI) / अघिल्लो CPI) × १००",
        example: "CPI this year: 120, last year: 110 → Inflation = 9.09%"
      },
      {
        id: "compound-interest",
        category: "economics",
        title: "Compound Interest",
        body: "A = P(1 + r/n)^(nt)",
        nepali: "चक्रिय ब्याज = मूलधन(१ + दर/संख्या)^(संख्या×समय)",
        example: "P=Rs.10,000, r=10%, n=1, t=3 → A = Rs.13,310"
      },
      {
        id: "supply-demand",
        category: "economics",
        title: "Market Equilibrium",
        body: "Equilibrium occurs where Quantity Demanded = Quantity Supplied",
        nepali: "बजार सन्तुलन = माग गरिएको मात्रा = आपूर्ति गरिएको मात्रा",
        example: "At price Rs. 50, demand = 100 units, supply = 100 units → Equilibrium price = Rs. 50"
      },
      {
        id: "margin",
        category: "business",
        title: "Profit Margin",
        body: "Profit Margin = (Net Income / Revenue) × 100%",
        nepali: "नाफा मार्जिन = (कुल आम्दानी / आम्दानी) × १००%",
        example: "Revenue: Rs. 500,000, Net Income: Rs. 75,000 → Margin = 15%"
      },
      {
        id: "break-even",
        category: "business",
        title: "Break-Even Point",
        body: "BEP = Fixed Costs / (Selling Price per Unit - Variable Cost per Unit)",
        nepali: "ब्रेक-इभेन बिन्दु = स्थिर लागत / (प्रति इकाइ बिक्री मूल्य - प्रति इकाइ चल लागत)",
        example: "Fixed: Rs. 50,000, SP: Rs. 100, VC: Rs. 60 → BEP = 1,250 units"
      },
      {
        id: "swot",
        category: "business",
        title: "SWOT Analysis",
        body: "S = Strengths, W = Weaknesses, O = Opportunities, T = Threats",
        nepali: "S = शक्तिहरू, W = कमजोरीहरू, O = अवसरहरू, T = चुनौतीहरू",
        example: "Strength: Strong brand. Weakness: Limited capital. Opportunity: New market. Threat: Competition."
      },
      {
        id: "marketing-mix",
        category: "business",
        title: "Marketing Mix (4Ps)",
        body: "Product, Price, Place, Promotion",
        nepali: "उत्पादन, मूल्य, स्थान, प्रवर्द्धन",
        example: "Product: Quality tea. Price: Affordable. Place: Kathmandu & Pokhara. Promotion: Social media."
      },
      {
        id: "balance-sheet",
        category: "accounting",
        title: "Balance Sheet Equation",
        body: "Assets = Liabilities + Owner's Equity",
        nepali: "सम्पत्ति = दायित्व + मालिकको इक्विटी",
        example: "Assets: Rs. 500,000 = Liabilities: Rs. 200,000 + Equity: Rs. 300,000"
      },
      {
        id: "trial-balance",
        category: "accounting",
        title: "Trial Balance",
        body: "Total Debits = Total Credits",
        nepali: "कुल डेबिट = कुल क्रेडिट",
        example: "All debit balances from ledger accounts must equal all credit balances."
      },
      {
        id: "inventory",
        category: "accounting",
        title: "Inventory Turnover",
        body: "Inventory Turnover = Cost of Goods Sold / Average Inventory",
        nepali: "इन्भेन्टरी टर्नओभर = बिक्री गरिएको वस्तुको लागत / औसत इन्भेन्टरी",
        example: "COGS: Rs. 400,000, Avg Inventory: Rs. 100,000 → Turnover = 4 times"
      },
      {
        id: "liquidity",
        category: "accounting",
        title: "Liquidity Ratio",
        body: "Quick Ratio = (Current Assets - Inventory) / Current Liabilities",
        nepali: "द्रुत अनुपात = (चालु सम्पत्ति - इन्भेन्टरी) / चालु दायित्व",
        example: "Current Assets: 200k, Inventory: 80k, Current Liabilities: 100k → Quick Ratio = 1.2"
      }
    ],

    definitions: [
      {
        id: "demand",
        category: "economics",
        title: "Demand",
        body: "The quantity of a good or service that consumers are willing and able to purchase at various prices during a given time period.",
        nepali: "निश्चित समयावधिमा विभिन्न मूल्यमा उपभोक्ताहरूले किन्न चाहने र सक्ने वस्तु वा सेवाको मात्रा।"
      },
      {
        id: "supply",
        category: "economics",
        title: "Supply",
        body: "The total amount of a good or service available to consumers at various prices.",
        nepali: "विभिन्न मूल्यमा उपभोक्ताहरूलाई उपलब्ध वस्तु वा सेवाको कुल मात्रा।"
      },
      {
        id: "inflation-def",
        category: "economics",
        title: "Inflation",
        body: "A sustained increase in the general price level of goods and services in an economy over a period of time.",
        nepali: "अर्थतन्त्रमा निश्चित अवधिमा वस्तु र सेवाहरूको सामान्य मूल्य स्तरमा निरन्तर वृद्धि।"
      },
      {
        id: "gdp-def",
        category: "economics",
        title: "Gross Domestic Product (GDP)",
        body: "The total monetary value of all finished goods and services produced within a country's borders in a specific time period.",
        nepali: "निश्चित समयावधिमा एक देशको सीमाभित्र उत्पादन गरिएका सबै तयार वस्तु र सेवाहरूको कुल मौद्रिक मूल्य।"
      },
      {
        id: "monopoly",
        category: "economics",
        title: "Monopoly",
        body: "A market structure where a single seller dominates the entire market with no close substitutes.",
        nepali: "बजार संरचना जहाँ एक विक्रेताले नजिकको विकल्प बिना सम्पूर्ण बजारमा हावी हुन्छ।"
      },
      {
        id: "entrepreneurship",
        category: "business",
        title: "Entrepreneurship",
        body: "The process of designing, launching, and running a new business, taking on financial risks in the hope of profit.",
        nepali: "नयाँ व्यवसाय डिजाइन गर्ने, सुरु गर्ने र सञ्चालन गर्ने प्रक्रिया, नाफाको आशामा वित्तीय जोखिम लिने।"
      },
      {
        id: "marketing",
        category: "business",
        title: "Marketing",
        body: "The activity, set of institutions, and processes for creating, communicating, delivering, and exchanging offerings that have value for customers.",
        nepali: "ग्राहकहरूका लागि मूल्यवान प्रस्तावहरू सिर्जना गर्ने, सञ्चार गर्ने, वितरण गर्ने र आदानप्रदान गर्ने गतिविधि र प्रक्रिया।"
      },
      {
        id: "leadership",
        category: "business",
        title: "Leadership",
        body: "The ability to guide, direct, and influence people to achieve organizational goals.",
        nepali: "संगठनात्मक लक्ष्यहरू प्राप्त गर्न मानिसहरूलाई मार्गदर्शन गर्ने, निर्देशन दिने र प्रभाव पार्ने क्षमता।"
      },
      {
        id: "ledger",
        category: "accounting",
        title: "Ledger",
        body: "A book or collection of accounts in which all transactions are recorded.",
        nepali: "एक पुस्तक वा खाताहरूको संग्रह जसमा सबै कारोबारहरू रेकर्ड गरिन्छ।"
      },
      {
        id: "journal",
        category: "accounting",
        title: "Journal",
        body: "A chronological record of all financial transactions before they are posted to the ledger.",
        nepali: "खातामा पोस्ट गर्नुअघि सबै वित्तीय कारोबारहरूको कालानुक्रमिक रेकर्ड।"
      },
      {
        id: "assets",
        category: "accounting",
        title: "Assets",
        body: "Economic resources owned by a business that have future economic value.",
        nepali: "व्यवसायद्वारा स्वामित्व गरिएका आर्थिक स्रोतहरू जसको भविष्यमा आर्थिक मूल्य हुन्छ।"
      },
      {
        id: "liabilities",
        category: "accounting",
        title: "Liabilities",
        body: "Financial obligations or debts owed by a business to external parties.",
        nepali: "व्यवसायले बाह्य पक्षहरूलाई तिर्नुपर्ने वित्तीय दायित्व वा ऋण।"
      }
    ]
  },

  // Radio Stations
  radioStations: [
    { name: "Kantipur FM", freq: "96.1", city: "Kathmandu", category: "news", url: "https://radio-broadcast.ekantipur.com/stream" },
    { name: "Hits FM", freq: "91.2", city: "Kathmandu", category: "music", url: "https://usa9.fastcast4u.com/proxy/hitsfm912" },
    { name: "Image FM", freq: "97.9", city: "Kathmandu", category: "music", url: "https://radio.imagefm.com.np/stream" },
    { name: "Radio Nepal", freq: "AM 792", city: "Kathmandu", category: "news", url: "https://radionepal.gov.np/live" },
    { name: "Radio Audio", freq: "106.3", city: "Kathmandu", category: "music", url: "https://stream.zeno.fm/0mgzunsxqeruv" },
    { name: "BBC Nepali", freq: "Online", city: "Kathmandu", category: "news", url: "https://stream.live.vc.bbcmedia.co.uk/bbc_nepali_radio" },
    { name: "Ujyaalo Radio", freq: "90.4", city: "Kathmandu", category: "news", url: "https://stream.ujyaaloonline.com/live" },
    { name: "Radio Sagarmatha", freq: "102.4", city: "Kathmandu", category: "talk", url: "https://radiosagarmatha.org.np/stream" },
    { name: "Radio Lumbini", freq: "96.8", city: "Butwal", category: "regional", url: "https://radiolumbini.org/stream" },
    { name: "Radio Pokhara", freq: "95.8", city: "Pokhara", category: "regional", url: "https://radiopokhara.com/stream" },
    { name: "Radio Birgunj", freq: "98.6", city: "Birgunj", category: "regional", url: "https://radiobirgunj.com/stream" },
    { name: "Radio Dharan", freq: "88.8", city: "Dharan", category: "regional", url: "https://radiodharan.org/stream" },
    { name: "Radio Janakpur", freq: "97.0", city: "Janakpur", category: "regional", url: "https://radiojanakpur.com/stream" },
    { name: "Radio Surkhet", freq: "90.2", city: "Surkhet", category: "regional", url: "https://radiosurkhet.org/stream" },
    { name: "Radio Dhangadhi", freq: "91.8", city: "Dhangadhi", category: "regional", url: "https://radiodhangadhi.com/stream" },
    { name: "Radio Annapurna", freq: "94.0", city: "Pokhara", category: "news", url: "https://radioannapurna.com/stream" },
    { name: "Radio Triveni", freq: "100.6", city: "Bharatpur", category: "regional", url: "https://radiotriveni.org/stream" },
    { name: "Radio Makwanpur", freq: "101.8", city: "Hetauda", category: "regional", url: "https://radiomakwanpur.org/stream" },
    { name: "Radio Bheri", freq: "105.4", city: "Nepalgunj", category: "regional", url: "https://radiobheri.com/stream" },
    { name: "Radio Narayani", freq: "103.6", city: "Bharatpur", category: "regional", url: "https://radionarayani.org/stream" }
  ],

  // Job Listings (Sample Data)
  jobs: [
    {
      id: 1, title: "Frontend Developer", company: "F1Soft International", type: "Full-time",
      location: "Kathmandu", salary: "Rs. 40,000 - 80,000", posted: "2 days ago",
      description: "Build modern web applications using React/Vue. Experience with responsive design required.",
      requirements: ["HTML/CSS/JS", "React or Vue", "2+ years experience"]
    },
    {
      id: 2, title: "Data Analyst", company: "WorldLink Communications", type: "Full-time",
      location: "Kathmandu", salary: "Rs. 35,000 - 60,000", posted: "3 days ago",
      description: "Analyze network data and generate insights. SQL and Python skills required.",
      requirements: ["SQL", "Python", "Data Visualization"]
    },
    {
      id: 3, title: "UI/UX Designer", company: "Cedar Gate Technologies", type: "Full-time",
      location: "Lalitpur", salary: "Rs. 45,000 - 75,000", posted: "1 week ago",
      description: "Design user interfaces for healthcare software. Figma expertise required.",
      requirements: ["Figma", "User Research", "Prototyping"]
    },
    {
      id: 4, title: "Software Engineer Intern", company: "Leapfrog Technology", type: "Internship",
      location: "Kathmandu", salary: "Rs. 15,000 - 25,000", posted: "5 days ago",
      description: "6-month internship program. Learn full-stack development with mentorship.",
      requirements: ["Basic programming", "Eagerness to learn", "CS student"]
    },
    {
      id: 5, title: "Digital Marketing Specialist", company: "Daraz Nepal", type: "Full-time",
      location: "Kathmandu", salary: "Rs. 30,000 - 50,000", posted: "4 days ago",
      description: "Manage social media campaigns and SEO. E-commerce experience preferred.",
      requirements: ["Social Media", "SEO", "Content Creation"]
    },
    {
      id: 6, title: "Mobile App Developer", company: "Nepal Telecom", type: "Full-time",
      location: "Kathmandu", salary: "Rs. 50,000 - 90,000", posted: "1 week ago",
      description: "Develop Android/iOS apps for telecom services. Flutter or React Native preferred.",
      requirements: ["Flutter/React Native", "API Integration", "3+ years"]
    },
    {
      id: 7, title: "Content Writer", company: "OnlineKhabar", type: "Part-time",
      location: "Remote", salary: "Rs. 15,000 - 30,000", posted: "2 days ago",
      description: "Write news articles and features. Nepali and English fluency required.",
      requirements: ["Nepali & English", "Journalism", "SEO writing"]
    },
    {
      id: 8, title: "DevOps Engineer", company: "CloudFactory", type: "Full-time",
      location: "Kathmandu", salary: "Rs. 60,000 - 100,000", posted: "3 days ago",
      description: "Manage CI/CD pipelines and cloud infrastructure. AWS/Azure experience required.",
      requirements: ["AWS/Azure", "Docker/K8s", "CI/CD"]
    },
    {
      id: 9, title: "Business Analyst", company: "Nabil Bank", type: "Full-time",
      location: "Kathmandu", salary: "Rs. 45,000 - 70,000", posted: "1 week ago",
      description: "Analyze banking operations and recommend improvements. MBA preferred.",
      requirements: ["MBA or equivalent", "Data Analysis", "Banking knowledge"]
    },
    {
      id: 10, title: "Graphic Designer Intern", company: "Creative Agency Nepal", type: "Internship",
      location: "Pokhara", salary: "Rs. 10,000 - 15,000", posted: "6 days ago",
      description: "3-month internship. Work on branding and social media designs.",
      requirements: ["Photoshop/Illustrator", "Creativity", "Design student"]
    }
  ],

  internships: [
    {
      id: 101, title: "Software Engineering Intern", company: "Google", type: "Internship",
      location: "USA / Remote", deadline: "Dec 15, 2026", link: "https://careers.google.com",
      description: "Summer internship for CS students. Competitive stipend and housing provided."
    },
    {
      id: 102, title: "Data Science Intern", company: "Microsoft", type: "Internship",
      location: "India / Remote", deadline: "Nov 30, 2026", link: "https://careers.microsoft.com",
      description: "Work on real-world ML projects. Python and statistics background required."
    },
    {
      id: 103, title: "Web Development Intern", company: "F1Soft", type: "Internship",
      location: "Kathmandu", deadline: "Rolling", link: "https://f1soft.com/careers",
      description: "Learn modern web development with mentorship from senior developers."
    },
    {
      id: 104, title: "AI/ML Intern", company: "Leapfrog", type: "Internship",
      location: "Kathmandu", deadline: "Rolling", link: "https://lftechnology.com",
      description: "Work on AI projects. Strong math and programming skills required."
    }
  ],

  scholarships: [
    {
      id: 201, title: "Erasmus Mundus Scholarship", provider: "EU",
      amount: "Full tuition + €1,400/month", deadline: "Jan 15, 2027",
      link: "https://erasmus-plus.ec.europa.eu", level: "Masters",
      description: "Study in Europe with full funding. Open to all Nepali graduates."
    },
    {
      id: 202, title: "Fulbright Scholarship", provider: "US Embassy Nepal",
      amount: "Full funding", deadline: "Jun 30, 2026",
      link: "https://np.usembassy.gov", level: "Masters/PhD",
      description: "Study in the USA. Excellent academic record and leadership required."
    },
    {
      id: 203, title: "DAAD Scholarship", provider: "Germany",
      amount: "Full tuition + €934/month", deadline: "Oct 15, 2026",
      link: "https://daad.de", level: "Masters/PhD",
      description: "Study in Germany. German language skills preferred but not mandatory."
    },
    {
      id: 204, title: "Japanese Government (MEXT)", provider: "Japan",
      amount: "Full funding + stipend", deadline: "May 15, 2026",
      link: "https://mext.go.jp", level: "Bachelors/Masters/PhD",
      description: "Study in Japan. Japanese language training provided."
    },
    {
      id: 205, title: "Chevening Scholarship", provider: "UK Government",
      amount: "Full tuition + living expenses", deadline: "Nov 1, 2026",
      link: "https://chevening.org", level: "Masters",
      description: "Study in the UK. 2+ years work experience required."
    }
  ]
};

// Make available globally
window.APP_DATA = APP_DATA;
