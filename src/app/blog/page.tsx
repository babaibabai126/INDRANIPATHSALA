import Link from "next/link";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { FloatingButtons } from "@/components/landing/FloatingButtons";

export const metadata = {
  title: "Blog | Indrani Pathsala — D.Pharm Study Tips & Exam Prep",
  description:
    "15 SEO-optimized blog articles for D.Pharm students covering PCI syllabus, Exit Exam prep, MCQ strategies, study tips, and Bengali translations.",
};

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string[]; // paragraphs
};

const POSTS: BlogPost[] = [
  {
    slug: "d-pharm-exit-exam-complete-guide",
    title: "D.Pharm Exit Exam 2026: সম্পূর্ণ গাইড — সিলেবাস থেকে প্রস্তুতি পর্যন্ত",
    excerpt:
      "PCI-এর নতুন Exit Exam প্যাটার্ন, সিলেবাস বিশ্লেষণ, প্রশ্ন প্যাটার্ন, এবং কীভাবে প্রথম বারেই পাশ করবেন তার সম্পূর্ণ গাইড।",
    date: "2026-09-24",
    readTime: "8 min",
    category: "Exit Exam",
    content: [
      "Pharmacy Council of India (PCI) 2020 সাল থেকে D.Pharm-এর শেষে একটি Exit Exam চালু করেছে। এই পরীক্ষায় উত্তীর্ণ না হলে ছাত্রছাত্রীরা ফার্মেসি প্র্যাকটিস লাইসেন্স পাবেন না। তাই প্রতিটি D.Pharm ছাত্রছাত্রীর জন্যই এই পরীক্ষা অত্যন্ত গুরুত্বপূর্ণ।",
      "Exit Exam-এ দুটি পেপার থাকে — পেপার ১ (Pharmaceutics, Pharmaceutical Chemistry, Pharmacognosy) এবং পেপার ২ (Pharmacology, Pharmacotherapy, Clinical Pharmacy)। প্রতিটি পেপারে ৫০টি MCQ থাকে এবং প্রতিটি সঠিক উত্তরের জন্য ২ নম্বর পাওয়া যায়। মোট ২০০ নম্বরের মধ্যে ১০০ নম্বর পেলেই পাশ বলে গণ্য হবে।",
      "প্রস্তুতির জন্য প্রথমেই PCI ER-2020 সিলেবাসটি ভালোভাবে বুঝে নিন। প্রতিটি chapter থেকে কী কী টপিক থেকে প্রশ্ন আসতে পারে তার বিশ্লেষণ করুন। আমাদের Premium Suggestive Notes এই বিশ্লেষণ আগে থেকেই করে রাখে — যাতে আপনার সময় বাঁচে।",
      "MCQ প্রস্তুতির জন্য প্রতিদিন অন্তত ৫০টি প্রশ্ন অনুশীলন করুন। FIB (Fill in the Blank) এবং SAQ (Short Answer Question) ও পরীক্ষায় আসতে পারে। Chapter-wise Summary পড়ে মূল ধারণাগুলো এক নজরে ঝালিয়ে নিন।",
      "পরীক্ষার আগের সপ্তাহে কোনো নতুন chapter ধরবেন না। যা পড়েছেন তা রিভিশন করুন। Smart Revision Material ব্যবহার করুন যা শেষ মুহূর্তের সম্বল হিসেবে কাজে দেয়। পরীক্ষার দিন শান্ত থাকুন এবং আত্মবিশ্বাসে পরীক্ষা দিন।",
    ],
  },
  {
    slug: "pci-er-2020-syllabus-explained",
    title: "PCI ER-2020 Syllabus সম্পূর্ণ ব্যাখ্যা — D.Pharm 1st & 2nd Year",
    excerpt:
      "Pharmacy Council of India-এর ER-2020 সিলেবাসের প্রতিটি chapter বিশদভাবে ব্যাখ্যা করা হয়েছে — কোন chapter থেকে কত নম্বর আসবে।",
    date: "2026-09-22",
    readTime: "6 min",
    category: "Syllabus",
    content: [
      "PCI ER-2020 (Education Regulations 2020) হলো ভারতের ফার্মেসি কাউন্সিল কর্তৃক প্রকাশিত সর্বশেষ D.Pharm সিলেবাস। এটি পুরোনো ER-1991 সিলেবাসকে প্রতিস্থাপন করেছে এবং আরও আধুনিক, ক্লিনিকাল-ভিত্তিক শিক্ষার উপর জোর দেয়।",
      "1st Year-এ পাঁচটি বিষয় থাকে: Pharmaceutics, Pharmaceutical Chemistry, Pharmacognosy, Human Anatomy & Physiology, এবং Social Pharmacy। প্রতিটি বিষয়ের থিয়োরি পেপার ৭৫ নম্বরের এবং প্র্যাকটিক্যাল ২৫ নম্বরের হয়।",
      "2nd Year-এও পাঁচটি বিষয় আছে: Pharmacology, Community Pharmacy & Management, Biochemistry & Clinical Pathology, Pharmacotherapeutics, এবং Hospital & Clinical Pharmacy। এখানেও একই নম্বর বিন্যাস প্রযোজ্য।",
      "সিলেবাসটি বুঝতে হলে প্রতিটি chapter-এর ব্যাপকতা (weightage) জানা প্রয়োজন। কিছু chapter থেকে প্রতি বছর বেশি প্রশ্ন আসে — যেমন Pharmaceutics-এ Formulation এবং Pharmacology-এ Drug Interactions। এই বিশ্লেষণ আমাদের Notes-এ প্রতিটি chapter-এর শুরুতে দেওয়া আছে।",
      "বাংলা মাধ্যমের ছাত্রছাত্রীদের জন্য ইংরেজি টার্মগুলো বুঝতে অসুবিধা হতে পারে। তাই আমাদের Combo Notes-এ প্রতিটি chapter-এর বাংলা translation সাথে দেওয়া হয়েছে।",
    ],
  },
  {
    slug: "best-d-pharm-notes-bengali",
    title: "D.Pharm বাংলা নোটস — কেন বাংলা translation প্রস্তুতিতে সাহায্য করে",
    excerpt:
      "বাংলা মাধ্যমের ছাত্রছাত্রীদের জন্য D.Pharm বাংলা নোটস কেন জরুরি এবং কীভাবে এটি আপনার রেজাল্ট উন্নত করতে সাহায্য করে।",
    date: "2026-09-20",
    readTime: "5 min",
    category: "Study Tips",
    content: [
      "পশ্চিমবঙ্গের অধিকাংশ D.Pharm কলেজে ইংরেজি মাধ্যমে পড়ানো হয়, কিন্তু ছাত্রছাত্রীদের অধিকাংশই বাংলা মাধ্যমে পড়ে এসেছে। ফলে ইংরেজি টার্ম বুঝতে অসুবিধা হয় এবং মূল কনসেপ্ট পরিষ্কার হয় না।",
      "বাংলা translation সহ নোটস ব্যবহার করলে ছাত্রছাত্রীরা সহজেই জটিল ফার্মেসি টার্মগুলো বুঝতে পারে। যেমন 'Pharmacokinetics' শব্দটি বাংলায় বুঝলে সহজে মনে থাকে — কীভাবে ওষুধ শরীরে শোষিত, বিতরণ, বিপাকিত এবং নির্গত হয়।",
      "আমাদের Combo Notes-এ প্রতিটি chapter-এর ইংরেজি ব্যাখ্যার পাশে বাংলা translation দেওয়া আছে। এতে ছাত্রছাত্রীরা দ্রুত বুঝতে পারে এবং দীর্ঘস্থায়ী স্মৃতিতে সংরক্ষণ করতে পারে।",
      "গ্রামীণ এলাকার ছাত্রছাত্রীদের জন্য এটি বিশেষভাবে সাহায্যকারী। তারা অনেক সময় ইংরেজি বই কেনার সামর্থ্য রাখেন না, অথবা বইয়ের ভাষা বুঝতে না পেরে হতাশ হয়ে পড়েন। বাংলা নোটস তাদের আত্মবিশ্বাস ফিরিয়ে দেয়।",
      "পরীক্ষায় ভালো নম্বর পেতে হলে শুধু মুখস্থ নয়, বুঝে পড়া জরুরি। বাংলা translation সহ নোটস আপনাকে বুঝে পড়তে সাহায্য করবে এবং আপনার রেজাল্ট উন্নত করবে।",
    ],
  },
  {
    slug: "vvi-mcq-d-pharm-exam",
    title: "VVI MCQ Strategy: কীভাবে D.Pharm Exam-এ সর্বোচ্চ MCQ সঠিক উত্তর দেবেন",
    excerpt:
      "D.Pharm পরীক্ষায় MCQ প্রশ্নের সঠিক উত্তর দেওয়ার কৌশল — কীভাবে সময় বাঁচাবেন এবং ভুল কম করবেন।",
    date: "2026-09-18",
    readTime: "4 min",
    category: "Exam Tips",
    content: [
      "D.Pharm পরীক্ষায় MCQ (Multiple Choice Question) অংশে ভালো নম্বর পেতে হলে শুধু পড়া জানা যথেষ্ট নয় — সঠিক কৌশলও দরকার। প্রতিটি MCQ-তে ৪টি অপশন থাকে এবং এর মধ্যে শুধু একটি সঠিক।",
      "প্রথমে সহজ প্রশ্নগুলো উত্তর দিন। যেগুলো দেখেই উত্তর জানা যায়, সেগুলো দ্রুত solve করুন। কঠিন প্রশ্ন পেলে সেগুলো skip করে পরে ফিরে আসুন। এতে সময় বাঁচে এবং আত্মবিশ্বাস বাড়ে।",
      "Elimination method ব্যবহার করুন — ৪টি অপশনের মধ্যে যে ২টি সম্ভাব্য নয় সেগুলো বাদ দিন। এরপর বাকি ২টির মধ্যে সঠিকটি বেছে নিন। এই কৌশল বিশেষ করে কঠিন প্রশ্নে কাজে দেয়।",
      "নেতিবাচক মার্কিং থাকলে অনুমানে উত্তর দেবেন না। কিন্তু নেতিবাচক মার্কিং না থাকলে অন্তত একটি অপশন নির্বাচন করুন — সম্ভাবনা থাকে যে সঠিক হতে পারে।",
      "আমাদের VVI MCQ collection-এ বিগত ১০ বছরের প্রশ্ন বিশ্লেষণ করে সবচেয়ে গুরুত্বপূর্ণ MCQ সংগ্রহ করা হয়েছে। এগুলো অনুশীলন করলে আপনি পরীক্ষার ধরন বুঝতে পারবেন এবং সঠিক উত্তর দেওয়ার ক্ষমতা বাড়াবেন।",
    ],
  },
  {
    slug: "pharmaceutics-chapter-wise-summary",
    title: "Pharmaceutics Chapter-wise Summary — 1st Year প্রস্তুতির সবচেয়ে সহজ উপায়",
    excerpt:
      "Pharmaceutics-এর প্রতিটি chapter-এর সংক্ষিপ্ত সারাংশ যা পরীক্ষার আগে রিভিশনের জন্য দারুণ কাজে দেবে।",
    date: "2026-09-16",
    readTime: "7 min",
    category: "Subject Notes",
    content: [
      "Pharmaceutics হলো D.Pharm 1st Year-এর সবচেয়ে গুরুত্বপূর্ণ বিষয়। এতে ১০টি chapter আছে এবং প্রতিটি থেকে পরীক্ষায় প্রশ্ন আসে। সম্পূর্ণ সিলেবাস একবারে পড়া কঠিন, তাই chapter-wise summary রিভিশনের জন্য দারুণ।",
      "Chapter 1: History of Pharmacy — ফার্মেসির ইতিহাস, ভারতে ফার্মেসি শিক্ষার বিকাশ, Pharmacy Council of India গঠন। এই chapter থেকে সাধারণত ২-৩টি প্রশ্ন আসে।",
      "Chapter 2: Dosage Forms — বিভিন্ন ধরনের dosage form যেমন tablet, capsule, syrup, injection ইত্যাদি। প্রতিটির সুবিধা ও অসুবিধা। এই chapter থেকে প্রশ্ন বেশি আসে।",
      "Chapter 3: Formulation — tablet, capsule ইত্যাদি কীভাবে তৈরি করা হয়, কী কী উপাদান লাগে, manufacturing process। বিস্তারিত ব্যাখ্যা দরকার।",
      "Chapter 4: Dispensing Pharmacy — prescription পড়া, compounding, labeling। বাস্তব কেস স্টাডি।",
      "Chapter 5-10: অন্যান্য গুরুত্বপূর্ণ chapter — Pharmaceutical Calculations, Unit Operations, Sterile Products, Immunology, ইত্যাদি।",
      "আমাদের Notes-এ প্রতিটি chapter-এর সারাংশ ১-২ পৃষ্ঠায় দেওয়া আছে। পরীক্ষার আগের রাতে শুধু এই summaries পড়লেই মূল পয়েন্টগুলো মনে পড়ে যাবে।",
    ],
  },
  {
    slug: "pharmacology-made-easy-bengali",
    title: "Pharmacology বাংলায় সহজ করে — 2nd Year প্রস্তুতির সম্পূর্ণ গাইড",
    excerpt:
      "Pharmacology-এর জটিল টপিকগুলো বাংলায় সহজ ভাষায় ব্যাখ্যা করা হয়েছে — drug classification থেকে drug interaction পর্যন্ত।",
    date: "2026-09-14",
    readTime: "9 min",
    category: "Subject Notes",
    content: [
      "Pharmacology হলো D.Pharm 2nd Year-এর সবচেয়ে কঠিন বিষয় বলে বিবেচিত। কারণ এতে প্রচুর ওষুধের নাম, ক্রিয়া, পার্শ্বপ্রতিক্রিয়া মনে রাখতে হয়। কিন্তু সঠিক পদ্ধতিতে পড়লে এটি আসলে খুব আনন্দদায়ক।",
      "Pharmacology-কে মূলত দুটি ভাগে ভাগ করা যায় — Pharmacokinetics এবং Pharmacodynamics। Pharmacokinetics হলো শরীর কীভাবে ওষুধের উপর ক্রিয়া করে (ADME: Absorption, Distribution, Metabolism, Excretion)। Pharmacodynamics হলো ওষুধ কীভাবে শরীরের উপর ক্রিয়া করে।",
      "Drug Classification মনে রাখা সহজ উপায় — প্রতিটি drug class কে একটি ক্লিনিকাল ব্যবহারের সাথে যুক্ত করুন। যেমন Beta-blockers মনে রাখুন hypertension এবং heart disease-এর সাথে। এতে শুধু নাম নয়, ব্যবহারও মনে থাকবে।",
      "Drug Interactions বুঝতে হলে প্রতিটি ওষুধের mechanism of action পরিষ্কার করা দরকার। দুটি ওষুধ একসাথে দিলে কী হবে তা আগে থেকে জানা যায়। এটি ক্লিনিকাল প্র্যাকটিসে খুব গুরুত্বপূর্ণ।",
      "বিগত বছরের প্রশ্ন দেখুন — কোন কোন টপিক থেকে বেশি প্রশ্ন আসে তা বুঝতে পারবেন। সাধারণত Antibiotics, CVS Drugs, NSAIDs, এবং Autonomic Drugs থেকে বেশি প্রশ্ন আসে।",
      "আমাদের Pharmacology Combo Notes-এ প্রতিটি drug class-এর বাংলা ব্যাখ্যা সহ টেবিল চার্ট দেওয়া আছে। এটি আপনার প্রস্তুতিকে অনেক সহজ করবে।",
    ],
  },
  {
    slug: "year-back-students-strategy",
    title: "Year-Back Students-এর জন্য বিশেষ কৌশল — কীভাবে পরীক্ষায় পাশ করবেন",
    excerpt:
      "Year-back পড়া ছাত্রছাত্রীদের জন্য বিশেষ প্রস্তুতি পদ্ধতি — আত্মবিশ্বাস ফেরানোর উপায় এবং পড়ার কৌশল।",
    date: "2026-09-12",
    readTime: "6 min",
    category: "Motivation",
    content: [
      "Year-back পড়া ছাত্রছাত্রীদের জন্য পরিস্থিতি খুব কঠিন হয়। সহপাঠীরা উপরের ব্যাচে চলে গেছে, নিজের আত্মবিশ্বাস কমে গেছে, পরিবারের চাপ আছে। কিন্তু সঠিক পদ্ধতিতে প্রস্তুতি নিলে পরীক্ষায় পাশ করা সম্ভব।",
      "প্রথমে নিজের ভুলগুলো বিশ্লেষণ করুন — আগের বার কেন ফেল করেছেন? পড়া শেষ হয়নি, নাকি পরীক্ষায় ভয় পেয়েছেন, নাকি প্রশ্ন বুঝতে পারেননি? কারণ বুঝলেই সমাধান সহজ হয়।",
      "আগের বার যে chapter থেকে বেশি প্রশ্ন এসেছিল সেগুলো বিশেষভাবে পড়ুন। বিগত বছরের প্রশ্ন সংগ্রহ করে প্র্যাকটিস করুন। এতে ধরন বুঝতে পারবেন।",
      "পড়ার সময় বেশি কিছু ধরতে চাইবেন না। কম কিন্তু ভালোভাবে পড়ুন। মুখস্থ না করে বুঝে পড়ুন। Chapter-wise Summary ব্যবহার করুন যাতে মূল পয়েন্ট এক জায়গায় পান।",
      "আত্মবিশ্বাস ফেরাতে প্রতিদিন ছোট ছোট লক্ষ্য নির্ধারণ করুন এবং সেগুলো পূরণ করুন। প্রতিটি সফলতা আপনার আত্মবিশ্বাস বাড়াবে।",
      "আমাদের Premium Suggestive Notes বিশেষভাবে year-back ছাত্রছাত্রীদের জন্য সাহায্যকারী — কারণ এতে শুধু পরীক্ষায় আসার সম্ভাবনা থাকা প্রশ্নগুলো ফোকাস করা হয়েছে।",
    ],
  },
  {
    slug: "d-pharm-vs-b-pharm-difference",
    title: "D.Pharm বনাম B.Pharm — কোনটি আপনার জন্য সঠিক?",
    excerpt:
      "D.Pharm এবং B.Pharm-এর মধ্যে পার্থক্য — কোর্স সময়, খরচ, ক্যারিয়ার সুযোগ এবং কোনটি কখন বেছে নেবেন।",
    date: "2026-09-10",
    readTime: "5 min",
    category: "Career",
    content: [
      "ভারতে ফার্মেসি শিক্ষায় দুটি প্রধান কোর্স আছে — D.Pharm (Diploma in Pharmacy) যা ২ বছরের এবং B.Pharm (Bachelor of Pharmacy) যা ৪ বছরের। দুটির মধ্যে পার্থক্য বুঝে সঠিক সিদ্ধান্ত নেওয়া জরুরি।",
      "D.Pharm দ্রুত ক্যারিয়ার শুরু করতে চাওয়াদের জন্য ভালো। মাত্র ২ বছরে সম্পন্ন হয় এবং তারপরই ফার্মেসিতে কাজ শুরু করা যায়। খরচও কম। কিন্তু career growth সীমিত।",
      "B.Pharm যারা দীর্ঘমেয়াদে ফার্মাসিউটিক্যাল ইন্ডাস্ট্রি, রিসার্চ, বা ক্লিনিকাল ফার্মেসিতে ক্যারিয়ার গড়তে চান তাদের জন্য ভালো। ৪ বছরের কোর্স কিন্তু career growth অনেক বেশি।",
      "D.Pharm করার পরও B.Pharm-এ ল্যাটারাল এন্ট্রি সম্ভব — ২য় বর্ষে সরাসরি ভর্তি হতে পারবেন। এটি যারা প্রথমে D.Pharm দিয়ে শুরু করতে চান তাদের জন্য ভালো অপশন।",
      "ক্যারিয়ার সুযোগ: D.Pharm-এর পর মূলত রিটেইল ফার্মেসি, হাসপাতাল ফার্মেসিতে কাজ পাওয়া যায়। B.Pharm-এর পর ইন্ডাস্ট্রি, রিসার্চ, কোয়ালিটি কন্ট্রোল, রেগুলেটরি অ্যাফেয়ার্স ইত্যাদিতে কাজ পাওয়া যায়।",
      "সিদ্ধান্ত নেওয়ার আগে আপনার ক্যারিয়ার লক্ষ্য, সময় এবং আর্থিক অবস্থা বিবেচনা করুন। যদি দ্রুত কাজ শুরু করতে চান তাহলে D.Pharm, আর দীর্ঘমেয়াদী ক্যারিয়ার চাইলে B.Pharm।",
    ],
  },
  {
    slug: "smart-revision-techniques-pharmacy",
    title: "Smart Revision Techniques — ফার্মেসি পরীক্ষার আগের শেষ ৭ দিন",
    excerpt:
      "পরীক্ষার আগের সপ্তাহে কীভাবে smart revision করবেন যাতে সব মনে থাকে — প্রমাণিত পদ্ধতি।",
    date: "2026-09-08",
    readTime: "5 min",
    category: "Study Tips",
    content: [
      "পরীক্ষার আগের সপ্তাহ হলো সবচেয়ে গুরুত্বপূর্ণ সময়। এই সময়ে নতুন কিছু ধরবেন না — যা পড়েছেন তা রিভিশন করুন। সঠিক রিভিশন পদ্ধতি জানা থাকলে সব মনে থাকবে।",
      "Spaced Repetition পদ্ধতি ব্যবহার করুন — একই chapter কে ক্রমশ বড় বিরতিতে রিভিশন করুন। প্রথম দিন পড়ে রাখুন, তৃতীয় দিন আবার দেখুন, সপ্তম দিন আবার। এতে দীর্ঘস্থায়ী স্মৃতিতে চলে যায়।",
      "Active Recall পদ্ধতি — পড়ার পরিবর্তে নিজেকে প্রশ্ন করুন। Chapter পড়ার পর বই বন্ধ করে নিজে যা মনে আছে তা লিখুন। যা মনে পড়ে না সেটি আবার পড়ুন। এটি passive reading-এর চেয়ে ৫০% বেশি কার্যকর।",
      "Chapter-wise Summary ব্যবহার করুন। সম্পূর্ণ chapter আবার পড়ার সময় নেই — শুধু মূল পয়েন্টগুলো ঝালিয়ে নিন। আমাদের Notes-এ প্রতিটি chapter-এর summary আছে যা দ্রুত রিভিশনের জন্য পারফেক্ট।",
      "Practice Question দিয়ে শেষ করুন — VVI MCQ এবং SAQ solve করুন। এতে আপনি বুঝতে পারবেন কোন chapter-এ দুর্বলতা আছে। সেই chapter-টা আরেকবার রিভিশন করুন।",
      "শেষ দিন শুধু light revision করুন, নতুন কিছু ধরবেন না। ভালো ঘুমাবেন, পরীক্ষার দিন সকালে শান্ত থাকুন। আত্মবিশ্বাস সবচেয়ে বড় অস্ত্র।",
    ],
  },
  {
    slug: "d-pharm-career-opportunities-2026",
    title: "D.Pharm Career Opportunities 2026 — কোথায় কাজ পাবেন",
    excerpt:
      "D.Pharm পাশ করার পর কোথায় কোথায় কাজ পাবেন, বেতন কেমন হবে, এবং কীভাবে ক্যারিয়ার গড়বেন।",
    date: "2026-09-06",
    readTime: "6 min",
    category: "Career",
    content: [
      "D.Pharm পাশ করার পর ছাত্রছাত্রীদের বিভিন্ন ক্যারিয়ার সুযোগ থাকে। ভারতে ফার্মেসি সেক্টর দ্রুত বর্ধমান এবং দক্ষ ফার্মাসিস্টদের চাহিদা প্রচুর।",
      "রিটেইল ফার্মেসি: মেডিকেল স্টোরে ফার্মাসিস্ট হিসেবে কাজ। শুরুতে বেতন ১০,০০০-১৫,০০০ টাকা মাসে, অভিজ্ঞতা বাড়লে বাড়ে। নিজের ফার্মেসি খোলার সুযোগও আছে।",
      "হাসপাতাল ফার্মেসি: সরকারি ও বেসরকারি হাসপাতালে ফার্মাসিস্ট পদ। বেতন ১৫,০০০-২৫,০০০ টাকা শুরুতে। সরকারি হাসপাতালে পেমেন্ট ভালো এবং সুবিধা বেশি।",
      "ফার্মাসিউটিক্যাল ইন্ডাস্ট্রি: কিছু কোম্পানি D.Pharm ধারকদের Production, Quality Control বা Packaging-এ নিয়োগ দেয়। বেতন ১২,০০০-২০,০০০ টাকা শুরুতে।",
      "Pharma Sales / Medical Representative: ওষুধ কোম্পানির হয়ে ডাক্তারদের কাছে প্রমোশন। বেতন + ইনসেনটিভ — ভালো হলে মাসে ৩০,০০০+ টাকা সম্ভব।",
      "নিজের ব্যবসা: ড্রাগ লাইসেন্স নিয়ে নিজের ফার্মেসি খুলতে পারেন। আয় আপনার পরিশ্রম ও বিনিয়োগের উপর নির্ভর করবে। দোকান খোলার জন্য কিছু অতিরিক্ত লাইসেন্স ও প্রশিক্ষণ লাগবে।",
      "ক্যারিয়ার গড়তে চাইলে পরে B.Pharm, Pharm.D, বা MBA করতে পারেন। ক্লিনিকাল ফার্মেসি, ফার্মাকোভিজিলেন্স, রেগুলেটরি অ্যাফেয়ার্স ইত্যাদি ক্ষেত্রে উচ্চতর শিক্ষা নেওয়া যায়।",
    ],
  },
  {
    slug: "drug-formulations-tablet-capsule",
    title: "Tablet ও Capsule Formulation — Pharmaceutics বিস্তারিত গাইড",
    excerpt:
      "Tablet এবং capsule কীভাবে তৈরি হয়, কী উপাদান লাগে, manufacturing process — সব বিস্তারিত।",
    date: "2026-09-04",
    readTime: "7 min",
    category: "Pharmaceutics",
    content: [
      "Tablet এবং capsule হলো সবচেয়ে জনপ্রিয় dosage form। এগুলি সহজে বহন করা যায়, সঠিক ডোজ দেওয়া যায়, এবং shelf life বেশি। Pharmaceutics-এ এই টপিকটি থেকে প্রতি বছর প্রশ্ন আসে।",
      "Tablet Formulation-এ মূল উপাদানগুলো হলো: Active Pharmaceutical Ingredient (API), Diluent (যেমন lactose), Binder (যেমন starch), Disintegrant (যেমন croscarmellose), Lubricant (যেমন magnesium stearate), এবং Glidant।",
      "Tablet Manufacturing Process: প্রথমে সব উপাদান ওজন করা হয়, তারপর mixing, granulation (wet বা dry), drying, screening, এবং tablet compression machine-এ চাপ দিয়ে tablet তৈরি করা হয়।",
      "Capsule দুই ধরনের হয় — Hard Gelatin Capsule এবং Soft Gelatin Capsule। Hard capsule সাধারণত powder বা granules-এর জন্য, soft capsule liquid বা semi-solid এর জন্য।",
      "Quality Control Tests: Tablet-এর জন্য weight variation, hardness, friability, disintegration time, dissolution test করা হয়। এগুলো না পাশ করলে tablet মার্কেটে ছাড়া যায় না।",
      "আমাদের Pharmaceutics Notes-এ এই সব টপিকের বিস্তারিত ব্যাখ্যা সহ diagram দেওয়া আছে। বাংলা translation সহ বুঝতে সুবিধা হবে।",
    ],
  },
  {
    slug: "drug-interactions-clinical-pharmacy",
    title: "Drug Interactions — ক্লিনিকাল ফার্মেসিতে গুরুত্ব ও প্রকারভেদ",
    excerpt:
      "Drug-drug interaction, drug-food interaction কী, কেন জানা জরুরি, এবং কীভাবে রোগীকে কাউন্সেল করবেন।",
    date: "2026-09-02",
    readTime: "6 min",
    category: "Clinical Pharmacy",
    content: [
      "Drug Interaction হলো যখন একটি ওষুধের ক্রিয়া অন্য ওষুধ, খাবার, বা পানীয়র প্রভাবে পরিবর্তিত হয়। কিছু interaction সাধারণ, কিছু গুরুতর স্বাস্থ্য সমস্যা তৈরি করতে পারে।",
      "Drug-Drug Interaction: দুটি বা ততোধিক ওষুধ একসাথে নিলে। যেমন Warfarin + Aspirin = রক্তক্ষরণ বাড়ে। Azithromycin + Antacid = Azithromycin-এর শোষণ কমে।",
      "Drug-Food Interaction: কিছু খাবার ওষুধের ক্রিয়াকে প্রভাবিত করে। Grapefruit juice কিছু ওষুধের (যেমন statins) রক্তে মাত্রা বাড়িয়ে দেয়। Milk antibiotics-এর সাথে নেওয়া উচিত নয়।",
      "Mechanism: Pharmacokinetic interaction (ADME-তে প্রভাব) এবং Pharmacodynamic interaction (একই receptor বা pathway-তে প্রভাব)। CYP450 enzyme-এর inhibition বা induction সবচেয়ে সাধারণ কারণ।",
      "রোগী কাউন্সেলিং: রোগীকে তার সব ওষুধ এবং supplements সম্পর্কে জিজ্ঞাসা করুন। সম্ভাব্য interaction সম্পর্কে সতর্ক করুন। কোন ওষুধ কখন নিতে হবে তা পরিষ্কার বলে দিন।",
      "আমাদের Combo Notes-এ drug interaction-এর সবচেয়ে গুরুত্বপূর্ণ combinations একটি টেবিলে দেওয়া আছে। পরীক্ষায় এবং ক্লিনিকাল প্র্যাকটিসে দুটোতেই কাজে দেবে।",
    ],
  },
  {
    slug: "anatomy-physiology-d-pharm",
    title: "Human Anatomy & Physiology — D.Pharm 1st Year সহজ প্রস্তুতি",
    excerpt:
      "মানব দেহতত্ত্ব ও শারীরবিদ্যা — সব সিস্টেম সহজ বাংলায় ব্যাখ্যা করা হয়েছে।",
    date: "2026-08-30",
    readTime: "8 min",
    category: "Anatomy",
    content: [
      "Human Anatomy & Physiology হলো D.Pharm 1st Year-এর একটি গুরুত্বপূর্ণ বিষয়। এতে মানবদেহের বিভিন্ন সিস্টেম, অঙ্গ-প্রত্যঙ্গের গঠন এবং ক্রিয়া সম্পর্কে পড়ানো হয়।",
      "Skeletal System: 206টি হাড় আছে মানবদেহে। হাড়ের গঠন, প্রকারভেদ, জয়েন্ট সমূহ। এই chapter থেকে সাধারণত ৩-৪টি প্রশ্ন আসে।",
      "Cardiovascular System: হৃদয়ের গঠন, রক্ত চলাচল, cardiac cycle, blood pressure। এই chapter খুবই গুরুত্বপূর্ণ কারণ Pharmacology-তেও এর ব্যবহার আছে।",
      "Respiratory System: ফুসফুসের গঠন, শ্বাস-প্রশ্বাস প্রক্রিয়া, gas exchange। সাধারণ রোগ যেমন asthma, COPD সম্পর্কে ধারণা।",
      "Digestive System: পরিপাক নালির গঠন, পরিপাক প্রক্রিয়া, এনজাইম সমূহ। লিভার ও প্যানক্রিয়াসের ক্রিয়া।",
      "Nervous System: সেন্ট্রাল ও পেরিফেরাল নার্ভাস সিস্টেম, ব্রেনের গঠন, নিউরন, synapse। এটি Pharmacology-এর জন্যও জরুরি।",
      "বাংলা translation সহ পড়লে জটিল টার্ম যেমন 'diastole', 'synapse', 'peristalsis' সহজে বোঝা যায়। আমাদের Combo Notes-এ প্রতিটি সিস্টেমের বাংলা ব্যাখ্যা দেওয়া আছে।",
    ],
  },
  {
    slug: "pharmacognosy-herbal-medicine",
    title: "Pharmacognosy — ভেষজ ওষুধ সম্পর্কে সম্পূর্ণ ধারণা",
    excerpt:
      "Pharmacognosy বা ভেষজ ওষুধ বিজ্ঞান — গুরুত্বপূর্ণ chapter, কী কী পড়বেন, এবং পরীক্ষায় কীভাবে ভালো করবেন।",
    date: "2026-08-28",
    readTime: "5 min",
    category: "Pharmacognosy",
    content: [
      "Pharmacognosy হলো প্রাকৃতিক উৎস থেকে প্রাপ্ত ওষুধের অধ্যয়ন — মূলত উদ্ভিদ, প্রাণী ও খনিজ উৎস। এটি D.Pharm 1st Year-এর একটি আকর্ষণীয় বিষয়।",
      "মূল টপিক সমূহ: ভেষজ ওষুধের ইতিহাস, classification of crude drugs, cultivation, collection, processing, এবং quality control of medicinal plants।",
      "গুরুত্বপূর্ণ ভেষজ ওষুধ: Senna (laxative), Digitalis (cardiac), Vinca (anticancer), Cinchona (antimalarial), Opium (analgesic), Aloe (skin), Tulsi (respiratory)।",
      "Alkaloids, Glycosides, Tannins, Volatile Oils — এই secondary metabolites সম্পর্কে ভালোভাবে জানতে হবে। প্রতিটির রাসায়নিক গঠন ও ক্লিনিকাল ব্যবহার।",
      "Indian Pharmacopoeia-এ উল্লেখিত ভেষজ ওষুধগুলো বিশেষভাবে পড়ুন। কারণ পরীক্ষায় সাধারণত এগুলো থেকেই প্রশ্ন আসে।",
      "Pharmacognosy-তে ভালো করতে হলে মনে রাখার কৌশল দরকার — mnemonic, diagram, এবং chart ব্যবহার করুন। আমাদের Notes-এ প্রতিটি ভেষজ ওষুধের ছবি, নাম, ব্যবহার একটি টেবিলে সাজানো আছে।",
    ],
  },
];

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Top nav */}
      <header className="border-b border-border bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            <span className="bn">ওয়েবসাইটে ফিরে যান</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
            <BookOpen className="h-3.5 w-3.5" />
            Blog & Articles
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Indrani Pathsala Blog
          </h1>
          <p className="bn mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            D.Pharm প্রস্তুতি, PCI সিলেবাস, Exit Exam, ক্যারিয়ার গাইড এবং আরও অনেক কিছু —
            সবকিছু বাংলায় সহজ ভাষায়।
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-xl"
            >
              <div className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider">
                <span className="rounded-full bg-primary/15 px-2.5 py-1 text-primary">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>
              <h2 className="bn text-lg font-bold leading-snug text-foreground">
                {post.title}
              </h2>
              <p className="bn mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-[11px] text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-primary transition hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
