export const MONUMENTS = [
  {
    id: 1, name: "Taj Mahal", city: "Agra", state: "Uttar Pradesh",
    era: "Mughal", year: "1632–1653", category: "Mausoleum",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1280&q=80",
    thumbnail: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80",
    description: "A UNESCO World Heritage Site, the Taj Mahal is an ivory-white marble mausoleum commissioned by Mughal emperor Shah Jahan in memory of his wife Mumtaz Mahal.",
    facts: ["22,000 artisans worked on it", "Minarets tilt slightly outward", "Changes color through the day", "Inscribed on 1983 UNESCO list"],
    tourPoints: ["Main Gate (Darwaza-i-Rauza)", "Reflecting Pool", "Main Mausoleum", "Mosque", "Guest House", "Mehtab Bagh"]
  },
  {
    id: 2, name: "Hampi Ruins", city: "Hampi", state: "Karnataka",
    era: "Vijayanagara", year: "14th–16th Century", category: "Ancient City",
    image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?auto=format&fit=crop&w=1280&q=80",
    thumbnail: "https://images.unsplash.com/photo-1609920658906-8223bd289001?auto=format&fit=crop&w=400&q=80",
    description: "Once the capital of the Vijayanagara Empire, Hampi is a UNESCO-listed site of over 500 monuments spread over 4,000 acres.",
    facts: ["Over 500 monuments", "Former capital of a rich empire", "Tungabhadra River setting", "Dravidian architecture peak"],
    tourPoints: ["Virupaksha Temple", "Vittala Temple", "Stone Chariot", "Queen's Bath", "Lotus Mahal", "Elephant Stables"]
  },
  {
    id: 3, name: "Qutub Minar", city: "Delhi", state: "Delhi",
    era: "Delhi Sultanate", year: "1193", category: "Minaret",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1280&q=80",
    thumbnail: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80",
    description: "The Qutub Minar is a 73-metre tall minaret and UNESCO World Heritage Site, the world's tallest brick minaret.",
    facts: ["73 metres tall", "World's tallest brick minaret", "Five distinct storeys", "Built by Qutb ud-Din Aibak"],
    tourPoints: ["Qutub Minar Tower", "Quwwat-ul-Islam Mosque", "Iron Pillar", "Iltutmish's Tomb", "Alai Darwaza", "Alai Minar"]
  },
  {
    id: 4, name: "Ajanta Caves", city: "Aurangabad", state: "Maharashtra",
    era: "Satavahana/Vakataka", year: "2nd BC – 6th AD", category: "Rock-cut Caves",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1280&q=80",
    thumbnail: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80",
    description: "30 rock-cut Buddhist cave monuments with paintings and sculptures considered masterpieces of Buddhist religious art.",
    facts: ["30 rock-cut caves", "UNESCO site since 1983", "Rediscovered in 1819", "Buddhist art masterpieces"],
    tourPoints: ["Cave 1 (Bodhisattva)", "Cave 2 (Mahaparinirvana)", "Cave 9 (Chaitya)", "Cave 16 (Dying Princess)", "Cave 17 (Flying Apsara)", "Cave 26 (Reclining Buddha)"]
  },
  {
    id: 5, name: "Mysore Palace", city: "Mysuru", state: "Karnataka",
    era: "Wadiyar Dynasty", year: "1912", category: "Royal Palace",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1280&q=80",
    thumbnail: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80",
    description: "The official residence of the Wadiyar dynasty, illuminated by nearly 100,000 light bulbs during the Dasara festival.",
    facts: ["100,000 light bulbs at Dasara", "Indo-Saracenic architecture", "Designed by Henry Irwin", "Second most visited in India"],
    tourPoints: ["Golden Throne Hall", "Durbar Hall", "Ambavilas Palace", "Kalyana Mandapa", "Wrestling Hall", "Museum of Royal Artifacts"]
  },
  {
    id: 6, name: "Gateway of India", city: "Mumbai", state: "Maharashtra",
    era: "British Raj", year: "1924", category: "Arch Monument",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1280&q=80",
    thumbnail: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=400&q=80",
    description: "A 26-metre arch monument built during the British Raj, commemorating the visit of King George V and Queen Mary in 1911.",
    facts: ["26 metres tall", "Built in basalt rock", "Last British troops left here", "Indo-Saracenic design"],
    tourPoints: ["Main Arch", "Waterfront Promenade", "Harbour Views", "Cuffe Parade Vista", "Taj Mahal Palace Hotel", "Ferry Jetty"]
  }
];

export const FESTIVALS = [
  { name: "Diwali", month: "Oct–Nov", desc: "Festival of Lights — lamps, fireworks, and sweets symbolise the victory of light over darkness.", color: "#F59E0B" },
  { name: "Holi", month: "Mar", desc: "Festival of Colors — vibrant powder colors celebrate spring and the triumph of good over evil.", color: "#EC4899" },
  { name: "Durga Puja", month: "Sep–Oct", desc: "Nine-day celebration of Goddess Durga's victory over Mahishasura. Grandest in West Bengal.", color: "#8B5CF6" },
  { name: "Navratri", month: "Sep–Oct", desc: "Nine nights of dance, music and fasting dedicated to the divine feminine.", color: "#EF4444" },
  { name: "Eid ul-Fitr", month: "Varies", desc: "End of Ramadan celebrated with prayers, feasting, and giving of charity across India.", color: "#10B981" },
  { name: "Pongal", month: "Jan", desc: "Tamil harvest festival thanking the Sun God with freshly cooked rice and sugarcane.", color: "#F97316" },
];

export const ART_FORMS = [
  { name: "Bharatanatyam", state: "Tamil Nadu", type: "Dance", desc: "One of India's oldest classical dance forms, known for expressive gestures (mudras) and footwork." },
  { name: "Madhubani", state: "Bihar", type: "Painting", desc: "Ancient folk art from Mithila region featuring geometric patterns and mythological themes." },
  { name: "Kathak", state: "North India", type: "Dance", desc: "A classical dance form emphasizing storytelling through intricate footwork and expressive gestures." },
  { name: "Warli", state: "Maharashtra", type: "Tribal Art", desc: "Tribal art using basic geometric shapes to depict scenes of daily life and nature." },
  { name: "Carnatic Music", state: "South India", type: "Music", desc: "A system of music based on ancient Hindu traditions, primarily from the southern states." },
  { name: "Pattachitra", state: "Odisha", type: "Painting", desc: "Traditional cloth-based scroll painting with mythological narratives in natural pigments." },
];

export const QUIZ_QUESTIONS = [
  { q: "In which city is the Taj Mahal located?", opts: ["Delhi", "Agra", "Jaipur", "Lucknow"], ans: 1 },
  { q: "Which empire built the Hampi ruins?", opts: ["Mughal", "Maratha", "Vijayanagara", "Chola"], ans: 2 },
  { q: "How tall is the Qutub Minar?", opts: ["52m", "63m", "73m", "83m"], ans: 2 },
  { q: "The Ajanta Caves are famous for?", opts: ["Mughal Art", "Buddhist Art", "Hindu Art", "Jain Art"], ans: 1 },
  { q: "Which festival is known as the Festival of Colors?", opts: ["Diwali", "Navratri", "Holi", "Pongal"], ans: 2 },
  { q: "Bharatanatyam originates from which state?", opts: ["Kerala", "Andhra Pradesh", "Tamil Nadu", "Karnataka"], ans: 2 },
];

export const ROLES = ["Cultural Enthusiast", "Content Creator", "Tour Guide", "Admin"];