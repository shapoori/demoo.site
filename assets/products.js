/**
 * دمو سایت - بانک اطلاعاتی جامع مکمل‌های ورزشی با تصاویر واقعی باکیفیت
 * تمام اطلاعات و ساختار منطبق با استانداردهای تغذیه ورزشی و طراحی استیچ
 */

const PRODUCTS = [
  {
    id: 'whey-gold-standard',
    name: 'پروتئین وی گلد استاندارد ۱۰۰٪',
    englishName: '100% Whey Gold Standard',
    brand: 'Optimum Nutrition',
    brandFa: 'اپتیموم نوتریشن',
    category: 'whey',
    categoryFa: 'پروتئین وی و ایزوله',
    price: 4950000,
    originalPrice: 5800000,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 342,
    badge: 'پرفروش‌ترین',
    badgeType: 'hot',
    inStock: true,
    isFlashSale: true,
    flashSaleEndsInSeconds: 28400,
    image: 'assets/images/whey-gold.jpg',
    imageColor: '#1A2234',
    accentColor: '#FF6B00',
    weights: ['۲.۲۷ کیلوگرم (۵ پوند)', '۹۰۰ گرم (۲ پوند)'],
    flavors: ['دابل ریچ چاکلت', 'وانیل فرانسوی', 'توت‌فرنگی وحشی', 'موز اسموتی'],
    servings: '۷۴ سروینگ',
    proteinPerServing: '۲۴ گرم پروتئین خالص',
    bcaaPerServing: '۵.۵ گرم BCAA طبیعی',
    description: 'پرفروش‌ترین پروتئین وی در سراسر جهان حاوی وی ایزوله به عنوان منبع اصلی با سرعت جذب فوق‌العاده بالا برای ریکاوری و عضله‌سازی بدون چربی.',
    nutritionFacts: {
      servingSize: '۳۰.۴ گرم (یک اسکوپ)',
      calories: '۱۲۰ کیلوکالری',
      protein: '۲۴ گرم',
      carbs: '۳ گرم',
      fat: '۱.۵ گرم',
      sugar: '۱ گرم',
      sodium: '۱۳۰ میلی‌گرم'
    },
    features: [
      'حاوی پروتئین وی ایزوله با خلوص بالا',
      'بیش از ۵ گرم BCAA در هر وعده',
      'حلالیت سریع در آب یا شیر حتی بدون شیکر',
      'دارای تاییدیه آزمایشگاهی و لیبل اصالت کالا'
    ]
  },
  {
    id: 'iso-100-dymatize',
    name: 'پروتئین هیدرولیز شده ایزو ۱۰۰ دایماتیز',
    englishName: 'ISO 100 Hydrolyzed Whey',
    brand: 'Dymatize',
    brandFa: 'دایماتیز',
    category: 'whey',
    categoryFa: 'پروتئین وی و ایزوله',
    price: 6200000,
    originalPrice: 7100000,
    discountPercent: 13,
    rating: 5.0,
    reviewsCount: 189,
    badge: 'انتخاب حرفه‌ای‌ها',
    badgeType: 'pro',
    inStock: true,
    isFlashSale: false,
    image: 'assets/images/iso-100.jpg',
    imageColor: '#0E1726',
    accentColor: '#0284C7',
    weights: ['۲.۳ کیلوگرم (۵ پوند)'],
    flavors: ['گورمت چاکلت', 'کوکی اند کرم', 'کره بادام زمینی'],
    servings: '۷۱ سروینگ',
    proteinPerServing: '۲۵ گرم وی هیدرولیز شده',
    bcaaPerServing: '۵.۵ گرم BCAA شاخه‌دار',
    description: 'سریع‌ترین پروتئین قابل جذب با فیلتراسیون میکرو برای دوران چربی‌سوزی و تفکیک عضلانی بدون ذره‌ای گلوتن یا چربی اضافی.',
    nutritionFacts: {
      servingSize: '۳۲ گرم (یک اسکوپ)',
      calories: '۱۱۰ کیلوکالری',
      protein: '۲۵ گرم',
      carbs: '۱ گرم',
      fat: '۰.۵ گرم',
      sugar: '۰ گرم',
      sodium: '۱۶۰ میلی‌گرم'
    },
    features: [
      'صد درصد وی ایزوله هیدرولیز شده فوق سریع',
      'کمتر از ۱ گرم کربوهیدرات و بدون چربی',
      'مناسب ورزشکاران در فاز کات و آماده‌سازی مسابقه',
      'دارای بچ‌نامبر معتبر و تست دوپینگ WADA'
    ]
  },
  {
    id: 'creatine-monohydrate-creapure',
    name: 'کراتین مونوهیدرات ۱۰۰٪ میکرونایزد کره‌پیور',
    englishName: '100% Micronized Creatine Monohydrate',
    brand: 'Optimum Nutrition',
    brandFa: 'اپتیموم نوتریشن',
    category: 'creatine',
    categoryFa: 'کراتین',
    price: 1850000,
    originalPrice: 2200000,
    discountPercent: 16,
    rating: 4.8,
    reviewsCount: 420,
    badge: 'ضمانت اصالت آزمایشگاهی',
    badgeType: 'lab',
    inStock: true,
    isFlashSale: true,
    flashSaleEndsInSeconds: 19500,
    image: 'assets/images/creatine.jpg',
    imageColor: '#1F2937',
    accentColor: '#10B981',
    weights: ['۳۰۰ گرم', '۶۰۰ گرم'],
    flavors: ['بدون طعم (طبیعی)', 'سیب ترش'],
    servings: '۶۰ الی ۱۲۰ سروینگ',
    proteinPerServing: '۵ گرم کراتین خالص میکرونایزد',
    bcaaPerServing: 'صفر',
    description: 'افزایش چشمگیر توان عضلانی، استقامت بی‌هوازی و حجم سلولی با کراتین خالص کره‌پیور بدون طعم‌دهنده یا افزودنی شیمیایی.',
    nutritionFacts: {
      servingSize: '۵ گرم (یک پیمانه)',
      calories: '۰ کیلوکالری',
      protein: '۰ گرم',
      carbs: '۰ گرم',
      fat: '۰ گرم',
      sugar: '۰ گرم',
      sodium: '۰ میلی‌گرم'
    },
    features: [
      'ذرات ۹۹.۹٪ میکرونایز شده برای حل شوندگی آنی',
      'افزایش تولید ATP در تمرینات پرفشار بدنسازی',
      'بدون عوارض گوارشی و کاملا تست شده',
      'قابل ترکیب با انواع پروتئین وی یا کربوهیدرات'
    ]
  },
  {
    id: 'xtend-bcaa-original',
    name: 'آمینو اسید شاخه‌دار اکستند اصل BCAA',
    englishName: 'Xtend Original BCAA 7G',
    brand: 'Scivation',
    brandFa: 'سایویشن اکستند',
    category: 'amino',
    categoryFa: 'آمینو اسید و BCAA',
    price: 2450000,
    originalPrice: 2900000,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 275,
    badge: 'هیدراتاسیون برتر',
    badgeType: 'hot',
    inStock: true,
    isFlashSale: false,
    image: 'assets/images/xtend-bcaa.jpg',
    imageColor: '#1E1B4B',
    accentColor: '#EC4899',
    weights: ['۴۲۰ گرم (۳۰ سروینگ)', '۱.۲ کیلوگرم (۹۰ سروینگ)'],
    flavors: ['هندوانه یخ‌زده', 'بلوبری تمشک', 'انبه گرمسیری'],
    servings: '۳۰ سروینگ',
    proteinPerServing: '۷ گرم BCAA نسبت ۲:۱:۱',
    bcaaPerServing: '۷ گرم BCAA + الکترولیت',
    description: 'فرمول علمی شماره یک ریکاوری حین تمرین حاوی الکترولیت‌های حیاتی و گلوتامین جهت جلوگیری از تحلیل عضلانی و کاهش خستگی.',
    nutritionFacts: {
      servingSize: '۱۴ گرم (یک اسکوپ)',
      calories: '۰ کیلوکالری',
      protein: '۰ گرم',
      carbs: '۰ گرم',
      fat: '۰ گرم',
      sugar: '۰ گرم',
      sodium: '۲۲۰ میلی‌گرم'
    },
    features: [
      '۷ گرم BCAA اثبات شده با نسبت بهینه ۲:۱:۱',
      '۲.۵ گرم گلوتامین برای تسریع ترمیم بافت فیبر عضلانی',
      'حاوی الکترولیت‌های آبرسان برای جلوگیری از افت فشار',
      'بدون قند و کالری افزوده'
    ]
  },
  {
    id: 'c4-original-pre-workout',
    name: 'پمپ قبل تمرین سی فور اورجینال سلیکور',
    englishName: 'Cellucor C4 Original Pre-Workout',
    brand: 'Cellucor',
    brandFa: 'سلیکور',
    category: 'pre-workout',
    categoryFa: 'پمپ و قبل تمرین',
    price: 2150000,
    originalPrice: 2600000,
    discountPercent: 17,
    rating: 4.7,
    reviewsCount: 310,
    badge: 'انرژی و تمرکز انفجاری',
    badgeType: 'fire',
    inStock: true,
    isFlashSale: true,
    flashSaleEndsInSeconds: 14200,
    image: 'assets/images/c4-preworkout.jpg',
    imageColor: '#311005',
    accentColor: '#FF6B00',
    weights: ['۳۹۰ گرم (۶۰ سروینگ)', '۱۹۵ گرم (۳۰ سروینگ)'],
    flavors: ['فروت پانچ', 'یخ توت‌فرنگی', 'پرتقال خونی'],
    servings: '۶۰ سروینگ',
    proteinPerServing: '۱۵۰ میلی‌گرم کافئین خالص',
    bcaaPerServing: '۱.۶ گرم بتا آلانین کارنوسین',
    description: 'انرژی انفجاری، پمپاژ خون عضلانی ماکزیمم و تمرکز ذهنی بالا با فرمول کلاسیک و پرطرفدار C4 آمریکا.',
    nutritionFacts: {
      servingSize: '۶.۵ گرم',
      calories: '۵ کیلوکالری',
      protein: '۰ گرم',
      carbs: '۱ گرم',
      fat: '۰ گرم',
      sugar: '۰ گرم',
      sodium: '۰ میلی‌گرم'
    },
    features: [
      '۱۵۰ میلی‌گرم کافئین بی‌آب برای بیداری عصب و عضله',
      '۱.۶ گرم کارنوسین بتا آلانین ضد خستگی لاکتیک',
      '۱ گرم کراتین نیترات جهت گشادی عروق خونی (Pump)',
      'بدون کرش یا افت ناگهانی انرژی پس از تمرین'
    ]
  },
  {
    id: 'mass-tech-extreme-2000',
    name: 'گینر مس تک اکستریم ۲۰۰۰ ماسل تک',
    englishName: 'MuscleTech Mass-Tech Extreme 2000',
    brand: 'MuscleTech',
    brandFa: 'ماسل تک',
    category: 'gainer',
    categoryFa: 'گینر و افزایش وزن',
    price: 6800000,
    originalPrice: 7900000,
    discountPercent: 14,
    rating: 4.8,
    reviewsCount: 165,
    badge: 'ماکزیمم افزایش وزن',
    badgeType: 'hot',
    inStock: true,
    isFlashSale: false,
    image: 'assets/images/mass-tech.jpg',
    imageColor: '#171717',
    accentColor: '#DC2626',
    weights: ['۱۰ کیلوگرم (۲۲ پوند)', '۵ کیلوگرم (۱۱ پوند)'],
    flavors: ['تریپل چاکلت براونی', 'وانیل میلک شیک'],
    servings: '۲۰ الی ۴۰ سروینگ سنگین',
    proteinPerServing: '۸۰ گرم پروتئین مولتی فاز',
    bcaaPerServing: '۱۷.۲ گرم BCAA و کراتین',
    description: 'هیولای افزایش وزن و حجم عضلانی برای افراد لاغر اندام و بدنسازان سخت‌رشد (Hardgainers) با بیش از ۲۰۰۰ کالری در هر وعده.',
    nutritionFacts: {
      servingSize: '۵۷۰ گرم با ۲ فنجان شیر',
      calories: '۲۱۱۰ کیلوکالری',
      protein: '۸۰ گرم',
      carbs: '۴۴۰ گرم',
      fat: '۵ گرم',
      sugar: '۲۰ گرم',
      sodium: '۵۰۰ میلی‌گرم'
    },
    features: [
      'دارای ۸۰ گرم پروتئین چند مرحله‌ای با جذب ترکیبی',
      '۱۰ گرم کراتین خالص برای افزایش قطعی قدرت',
      'بیش از ۴۰۰ گرم کربوهیدرات کمپلکس بدون قند مضر',
      'غنی شده با ۲۰ نوع ویتامین و ماده معدنی کمیاب'
    ]
  },
  {
    id: 'multivitamin-animal-pak',
    name: 'مولتی ویتامین و پکت تمرینی انیمال پک یونیورسال',
    englishName: 'Universal Nutrition Animal Pak 44 Packs',
    brand: 'Universal Nutrition',
    brandFa: 'یونیورسال',
    category: 'vitamins',
    categoryFa: 'ویتامین و سلامتی',
    price: 3600000,
    originalPrice: 4200000,
    discountPercent: 14,
    rating: 5.0,
    reviewsCount: 512,
    badge: 'افسانه بدنسازی',
    badgeType: 'lab',
    inStock: true,
    isFlashSale: false,
    image: 'assets/images/animal-pak.jpg',
    imageColor: '#262626',
    accentColor: '#EAB308',
    weights: ['بسته ۴۴ عددی (۴۴ پک)'],
    flavors: ['بدون طعم (کپسول و قرص)'],
    servings: '۴۴ پک کامل روزانه',
    proteinPerServing: 'کمپلکس ویتامین + اسید آمینه',
    bcaaPerServing: 'آنزیم گوارش و سم‌زدایی کبد',
    description: 'بنیادی‌ترین مکمل سلامت و توان زیستی تاریخ ورزش حرفه‌ای. تضمین‌کننده تمام نیازهای ویتامینی، مینرال‌ها، آنزیم‌ها و آنتی‌اکسیدان‌ها.',
    nutritionFacts: {
      servingSize: '۱ الی ۲ پک در روز',
      calories: '۴۰ کیلوکالری',
      protein: '۶ گرم',
      carbs: '۴ گرم',
      fat: '۱ گرم',
      sugar: '۰ گرم',
      sodium: '۱۰ میلی‌گرم'
    },
    features: [
      'شامل ۸۵+ ماده مغذی تقویتی درجه دارویی',
      'کمپلکس کامل سلامت کبد، مفاصل و دستگاه ایمنی',
      'افزایش جذب بهینه سایر مکمل‌های پروتئینی',
      'انتخاب قهرمانان مستر المپیا از سال ۱۹۸۳'
    ]
  },
  {
    id: 'glutamine-musclepharm',
    name: 'گلوتامین پودری ۳۰۰ گرمی ماسل فارم',
    englishName: 'MusclePharm Core Series Glutamine',
    brand: 'MusclePharm',
    brandFa: 'ماسل فارم',
    category: 'amino',
    categoryFa: 'آمینو اسید و BCAA',
    price: 1650000,
    originalPrice: 1950000,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 140,
    badge: 'ترمیم بافت عضلانی',
    badgeType: 'lab',
    inStock: true,
    isFlashSale: false,
    image: 'assets/images/glutamine.jpg',
    imageColor: '#064E3B',
    accentColor: '#10B981',
    weights: ['۳۰۰ گرم (۶۰ سروینگ)', '۶۰۰ گرم'],
    flavors: ['بدون طعم'],
    servings: '۶۰ سروینگ',
    proteinPerServing: '۵ گرم ال-گلوتامین دارویی',
    bcaaPerServing: 'صفر',
    description: 'کاهش کوفتگی عضلانی پس از تمرین، تقویت سیستم ایمنی بدن و جلوگیری از هدررفت عضلانی در رژیم‌های فشرده.',
    nutritionFacts: {
      servingSize: '۵ گرم',
      calories: '۰ کیلوکالری',
      protein: '۵ گرم',
      carbs: '۰ گرم',
      fat: '۰ گرم',
      sugar: '۰ گرم',
      sodium: '۰ میلی‌گرم'
    },
    features: [
      '۱۰۰٪ ال-گلوتامین تخمیر شده گیاهی و خالص',
      'بهبود سلامت روده و بالا بردن راندمان جذب پروتیین',
      'کاهش زمان بازیابی فیبرهای آسیب دیده',
      'تست عدم وجود مواد ممنوعه اینفورمد چویس'
    ]
  }
];

// توابع کمکی قالب‌بندی اعداد و مبالغ
function formatPrice(number) {
  if (number === undefined || number === null) return '۰';
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function toPersianDigits(num) {
  if (num === null || num === undefined) return '';
  const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/[0-9]/g, function(w) {
    return id[+w];
  });
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}
