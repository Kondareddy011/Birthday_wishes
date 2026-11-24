export const defaultCelebrant = {
  id: "celebrant_default",
  name: "Lakshmi",
  nickname: "Lakshmi",
  age: 22,
  birthDate: "2026-11-25T00:00:00",
  avatarUrl: "/photoes/IMG20260206161511.jpg",
  avatarPosition: "44% 24%",
  headline: "Celebrating 22 Years of Grace, Radiance & Excellence",
  tagline: "The world became 1000x brighter the day you arrived.",
  bio: "Dreamer, coffee lover, stargazer, and the best friend anyone could ever ask for. Here's to making this year your most unforgettable chapter yet.",
  theme: "monochrome-luxury", // 'monochrome-luxury' | 'noir-platinum' | 'obsidian-pearl'
  favoriteSongTitle: "Acoustic Birthday Melody",
  adminPin: "1234",
  giftConfig: {
    type: "hologram",
    title: "The 3D Holographic Memory Vault",
    cakeFlavor: "Traditional German Dark Forest Gateau (Schwarzwälder Kirschtorte)",
    secretMessage: "Lakshmi, your presence is pure poetry. Blow the candles, slice the cake, and step into the 3D hologram of our cherished memories!",
    voucherCode: "VIP-QUEEN-2026",
    voucherTitle: "Lifetime Hugs & Infinite Joy Pass",
    author: "Your Favorite Humans ❤️"
  }
};

export const themes = {
  "monochrome-luxury": {
    name: "Haute Couture Noir & Blanc",
    bgClass: "from-black via-zinc-950 to-neutral-950",
    accentGradient: "from-white via-slate-200 to-zinc-400",
    primaryColor: "#FFFFFF",
    secondaryColor: "#E2E8F0",
    tertiaryColor: "#94A3B8",
    borderGlow: "rgba(255, 255, 255, 0.4)",
    badgeBg: "bg-white/10 text-white border-white/30"
  },
  "noir-platinum": {
    name: "Obsidian Platinum & Silver",
    bgClass: "from-stone-950 via-zinc-950 to-black",
    accentGradient: "from-slate-100 via-zinc-300 to-slate-400",
    primaryColor: "#F8FAFC",
    secondaryColor: "#CBD5E1",
    tertiaryColor: "#64748B",
    borderGlow: "rgba(248, 250, 252, 0.35)",
    badgeBg: "bg-zinc-800/60 text-slate-200 border-zinc-700"
  },
  "cyber-hologram": {
    name: "Midnight Hologram & Cyber White",
    bgClass: "from-black via-slate-950 to-zinc-950",
    accentGradient: "from-cyan-300 via-white to-sky-400",
    primaryColor: "#06B6D4",
    secondaryColor: "#E2E8F0",
    tertiaryColor: "#38BDF8",
    borderGlow: "rgba(6, 182, 212, 0.45)",
    badgeBg: "bg-cyan-950/40 text-cyan-200 border-cyan-500/40"
  }
};

export const defaultPhotos = [
  {
    id: "p1",
    url: "/photoes/IMG-20210529-WA0000.jpg",
    caption: "Cherished memories & timeless smiles ✨",
    date: "May 2021",
    location: "Special Memory",
    tag: "Memories"
  },
  {
    id: "p2",
    url: "/photoes/IMG-20230130-WA0009.jpg",
    caption: "Unforgettable moments together 🤍",
    date: "January 2023",
    location: "Together",
    tag: "Together"
  },
  {
    id: "p3",
    url: "/photoes/IMG-20240527-WA0002.jpg",
    caption: "Pure joy & brightest laughter 🌟",
    date: "May 2024",
    location: "Celebration",
    tag: "Laughter"
  },
  {
    id: "p4",
    url: "/photoes/IMG20240622082731.jpg",
    caption: "Sunny days & carefree adventures ☀️",
    date: "June 2024",
    location: "Outdoors",
    tag: "Adventures"
  },
  {
    id: "p5",
    url: "/photoes/IMG20250319223124.jpg",
    caption: "Celebrating another beautiful milestone 🎂",
    date: "March 2025",
    location: "Milestone Night",
    tag: "Milestone"
  },
  {
    id: "p6",
    url: "/photoes/IMG20250330100454.jpg",
    caption: "Golden hour laughter & warm stories ✨",
    date: "March 2025",
    location: "Golden Hour",
    tag: "Golden Hour"
  },
  {
    id: "p7",
    url: "/photoes/IMG20250427221310.jpg",
    caption: "Under the stars with the best company 🌙",
    date: "April 2025",
    location: "Starlight",
    tag: "Night Out"
  },
  {
    id: "p8",
    url: "/photoes/IMG20250503124224.jpg",
    caption: "Road trips and spontaneous adventures 🚗",
    date: "May 2025",
    location: "Roadtrip",
    tag: "Roadtrip"
  },
  {
    id: "p9",
    url: "/photoes/IMG20250622144632.jpg",
    caption: "Summer radiance and pure happiness 🌸",
    date: "June 2025",
    location: "Summer Breeze",
    tag: "Summer"
  },
  {
    id: "p10",
    url: "/photoes/IMG20250925042906.jpg",
    caption: "Late night talks & infinite laughter 💫",
    date: "September 2025",
    location: "Squad Hangout",
    tag: "Best Times"
  },
  {
    id: "p11",
    url: "/photoes/IMG20251118150845.jpg",
    caption: "Precious memories that will last forever 💖",
    date: "November 2025",
    location: "Heartfelt",
    tag: "Forever"
  },
  {
    id: "p12",
    url: "/photoes/IMG20251222204217.jpg",
    caption: "Cozy celebrations and festive joy 🎄",
    date: "December 2025",
    location: "Holiday Season",
    tag: "Holiday"
  },
  {
    id: "p13",
    url: "/photoes/IMG20260206161511.jpg",
    caption: "Shining bright with unforgettable grace ✨",
    date: "February 2026",
    location: "Special Portrait",
    tag: "Radiance"
  },
  {
    id: "p14",
    url: "/photoes/IMG20260206161543.jpg",
    caption: "Heartwarming smiles and joyful energy 🌺",
    date: "February 2026",
    location: "Sunshine",
    tag: "Smiles"
  },
  {
    id: "p15",
    url: "/photoes/IMG_20220717_234653.jpg",
    caption: "Throwback to unforgettable times 🎞️",
    date: "July 2022",
    location: "Throwback",
    tag: "Throwback"
  },
  {
    id: "p16",
    url: "/photoes/IMG_20220904_123657.jpg",
    caption: "Weekend getaways and carefree days 🌿",
    date: "September 2022",
    location: "Getaway",
    tag: "Getaway"
  },
  {
    id: "p17",
    url: "/photoes/IMG_20231215_093809.jpg",
    caption: "Winter smiles & warm embraces ❄️",
    date: "December 2023",
    location: "Winter Days",
    tag: "Winter"
  },
  {
    id: "p18",
    url: "/photoes/IMG_20250129_182355.jpg",
    caption: "Making memories every single day 📸",
    date: "January 2025",
    location: "Daily Joy",
    tag: "Memories"
  },
  {
    id: "p19",
    url: "/photoes/IMG_20251225_222315.jpg",
    caption: "Celebrations that light up our hearts 🎁",
    date: "December 2025",
    location: "Festive Night",
    tag: "Party"
  },
  {
    id: "p20",
    url: "/photoes/IMG_20260430_194752.jpg",
    caption: "A toast to brilliance and endless joy 🥂",
    date: "April 2026",
    location: "Celebration Toast",
    tag: "Cheers"
  },
  {
    id: "p21",
    url: "/photoes/Snapchat-1015684514.jpg",
    caption: "Candid snap of authentic happiness 😄",
    date: "Snapchat Memory",
    location: "Candid Moment",
    tag: "Candid"
  },
  {
    id: "p22",
    url: "/photoes/Snapchat-1245059913.jpg",
    caption: "Fun moments captured in the blink of an eye ⚡",
    date: "Snapchat Memory",
    location: "Quick Snap",
    tag: "Snap"
  },
  {
    id: "p23",
    url: "/photoes/Snapchat-1409886660.jpg",
    caption: "Spontaneous laughter with the squad 🥳",
    date: "Snapchat Memory",
    location: "Squad",
    tag: "Squad"
  },
  {
    id: "p24",
    url: "/photoes/Snapchat-1431461707.jpg",
    caption: "Sweetest memories and happiest vibes 🌻",
    date: "Snapchat Memory",
    location: "Good Vibes",
    tag: "Vibes"
  },
  {
    id: "p25",
    url: "/photoes/Snapchat-1473785868.jpg",
    caption: "Dancing through life with grace and fun 💃",
    date: "Snapchat Memory",
    location: "Joyful Mood",
    tag: "Fun"
  },
  {
    id: "p26",
    url: "/photoes/Snapchat-1876187886.jpg",
    caption: "Golden moments that bring a smile 💛",
    date: "Snapchat Memory",
    location: "Golden Days",
    tag: "Golden"
  },
  {
    id: "p27",
    url: "/photoes/Snapchat-1918971591.jpg",
    caption: "Every picture tells a beautiful story 📖",
    date: "Snapchat Memory",
    location: "Story Time",
    tag: "Story"
  },
  {
    id: "p28",
    url: "/photoes/Snapchat-472507318.jpg",
    caption: "Unfiltered joy and pure friendship 🤍",
    date: "Snapchat Memory",
    location: "Best Friends",
    tag: "Joy"
  },
  {
    id: "p29",
    url: "/photoes/Snapchat-530851258.jpg",
    caption: "Laughter is always the best medicine 😂",
    date: "Snapchat Memory",
    location: "Laughs",
    tag: "Laughter"
  },
  {
    id: "p30",
    url: "/photoes/Snapchat-683199844.jpg",
    caption: "Living life to the fullest every day 🚀",
    date: "Snapchat Memory",
    location: "Adventure",
    tag: "Life"
  },
  {
    id: "p31",
    url: "/photoes/Snapchat-853459888.jpg",
    caption: "Cheers to another incredible chapter! 🥂",
    date: "Snapchat Memory",
    location: "New Chapter",
    tag: "Milestone"
  }
];

export const defaultWishes = [
  {
    id: "w1",
    author: "Liam Vance",
    relationship: "Best Friend",
    avatar: "🦁",
    message: "Happy 22nd birthday to the person who has seen my best, my worst, and still orders midnight pizza with me! You inspire everyone to be braver and kinder. May this year exceed every expectation! 🚀",
    timestamp: "10 mins ago",
    reactions: { love: 18, fire: 9, cheers: 24 },
    color: "from-white/10 to-white/5",
    pinned: true
  },
  {
    id: "w2",
    author: "Elena Rostova",
    relationship: "Soul Sister",
    avatar: "🌸",
    message: "To my favorite human on earth: watching you bloom into who you are has been the greatest gift. Don't ever stop chasing those high-altitude dreams! Today we celebrate YOU! 🎂✨",
    timestamp: "1 hour ago",
    reactions: { love: 29, fire: 6, cheers: 15 },
    color: "from-white/10 to-white/5",
    pinned: true
  },
  {
    id: "w3",
    author: "Marcus Chen",
    relationship: "Partner in Crime",
    avatar: "🎸",
    message: "Technically 22 now! Stay goofy, stay bold, and remember: calories from birthday cake don't count today. Let's make noise tonight! 🥂",
    timestamp: "3 hours ago",
    reactions: { love: 14, fire: 22, cheers: 31 },
    color: "from-white/10 to-white/5",
    pinned: false
  },
  {
    id: "w4",
    author: "Auntie Maya & Uncle David",
    relationship: "Family",
    avatar: "🌟",
    message: "Happy Birthday sweet Lakshmi! We are so immensely proud of the brilliant, loving woman you've become. Sending all our love and blessings across the miles! 💖",
    timestamp: "5 hours ago",
    reactions: { love: 35, fire: 4, cheers: 18 },
    color: "from-white/10 to-white/5",
    pinned: false
  },
  {
    id: "w5",
    author: "Maya Patel",
    relationship: "Colleague & Coffee Buddy",
    avatar: "☕",
    message: "Work without you would literally be 80% spreadsheets and 0% laughter! Happy birthday to the one who keeps us inspired! 💻🎉",
    timestamp: "Yesterday",
    reactions: { love: 16, fire: 7, cheers: 20 },
    color: "from-white/10 to-white/5",
    pinned: false
  }
];

export const aiTonePresets = [
  { id: "heartfelt", label: "Heartfelt & Emotional", emoji: "🥺🤍", desc: "Warm, tear-jerking, deeply meaningful" },
  { id: "funny", label: "Hilarious & Roast", emoji: "😂🔥", desc: "Playful teasing, funny memories, age roasts" },
  { id: "poetic", label: "Poetic & Lyrical", emoji: "✨🌙", desc: "Artistic prose, metaphoric, starry wonder" },
  { id: "hype", label: "Hype & Energetic", emoji: "🚀🍾", desc: "Caps-lock excitement, party vibes, legendary status" },
  { id: "rhyme", label: "Cute Rhyming Poem", emoji: "📝🎈", desc: "Bouncy, lyrical, rhyming verse" },
  { id: "short", label: "Punchy & Aesthetic", emoji: "⚡🖤", desc: "Short, modern, stylish fashion caption style" }
];

export const relationshipPresets = [
  "Best Friend",
  "Partner / Soulmate",
  "Sister",
  "Brother",
  "Mom",
  "Dad",
  "Childhood Friend",
  "Colleague",
  "Mentor",
  "Squad Member"
];
