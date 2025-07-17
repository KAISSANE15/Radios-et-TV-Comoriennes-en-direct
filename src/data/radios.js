export const radios = [
  {
    id: 1,
    name: "ORTC Radio",
    frequency: "101.2 FM",
    location: "Moroni",
    category: "Généraliste",
    description: "Radio officielle des Comores",
    streamUrl: "https://stream.vestaradio.com/RadioMRV", // Found on fmstream.org (MRV Radio Océan Indien, but ORTC is also listed there)
    website: "https://ortc.km",
    logo: "./src/assets/images/ortc.jpeg",
    isOnline: true,
    listeners: 1250
  },
  {
    id: 2,
    name: "Radio L\"info Kwezi",
    frequency: "95.5 FM",
    location: "Moroni",
    category: "Actualités",
    description: "L\"information en continu",
    streamUrl: "https://stream.kwezi.com/live", // Placeholder, needs verification
    website: "https://infokwezi.com",
    logo: "./src/assets/images/kwezi.jpeg",
    isOnline: true,
    listeners: 890
  },
  {
    id: 3,
    name: "Radio Mparano",
    frequency: "98.3 FM",
    location: "Anjouan",
    category: "Musique",
    description: "La radio de la musique comorienne",
    streamUrl: "https://radio2.pro-fhi.net:19015/stream", // Found on fmstream.org
    website: "https://mparano.com",
    logo: "./src/assets/images/comores.png",
    isOnline: true,
    listeners: 675
  },
  {
    id: 4,
    name: "Radio Comores Infos",
    frequency: "102.7 FM",
    location: "Moroni",
    category: "Actualités",
    description: "Toute l\"actualité des Comores",
    streamUrl: "https://radio.comoresinfos.com/stream",
    website: "https://comoresinfos.com",
    logo: "./src/assets/images/comores.png",
    isOnline: false,
    listeners: 0
  },
  {
    id: 5,
    name: "RCM13 Radio",
    frequency: "107.8 FM",
    location: "Marseille",
    category: "Diaspora",
    description: "Radio Comores Marseille",
    streamUrl: "https://stream.vestaradio.com/RCM13", // Found on fmstream.org
    website: "https://rcm13.fr",
    logo: "./src/assets/images/rcm.png",
    isOnline: true,
    listeners: 1450
  },
  {
    id: 6,
    name: "Domoni Inter",
    frequency: "96.8 FM",
    location: "Domoni",
    category: "Généraliste",
    description: "Radio locale de Domoni",
    streamUrl: "http://domoni-inter.org:8000/live",
    website: "http://domoni-inter.org:8000/live",
    logo: "./src/assets/images/Domoni.jpeg",
    isOnline: true,
    listeners: 320
  },
  {
    id: 7,
    name: "Midayi FM",
    frequency: "99.1 FM",
    location: "Mutsamudu",
    category: "Musique",
    description: "Radio musicale d\"Anjouan",
    streamUrl: "https://radio2.pro-fhi.net:19015/stream", // Found on fmstream.org
    website: "https://midayi.com",
    logo: "./src/assets/images/midayi.jpeg",
    isOnline: true,
    listeners: 580
  },
  {
    id: 8,
    name: "Casm FM",
    frequency: "104.5 FM",
    location: "Moroni",
    category: "Jeunesse",
    description: "Radio des jeunes",
    streamUrl: "http://casmfm.ice.infomaniak.ch/casmfm-32.mp3",
    website: "https://casmfm.com",
    logo: "./src/assets/images/CASM.jpeg",
    isOnline: true,
    listeners: 750
  },
  {
    id: 9,
    name: "Hayba FM",
    frequency: "97.2 FM",
    location: "Fomboni",
    category: "Culture",
    description: "Radio culturelle de Mohéli",
    streamUrl: "https://radio.hayba.com/stream", // Placeholder, needs verification
    website: "https://hayba.com",
    logo: "./src/assets/images/hayba.jpeg",
    isOnline: true,
    listeners: 290
  },
  {
    id: 10,
    name: "ACMC Radio",
    frequency: "100.4 FM",
    location: "Moroni",
    category: "Religieux",
    description: "Radio de l\"Association Culturelle Musulmane",
    streamUrl: "https://radio.acmc.com/stream", // Placeholder, needs verification
    website: "https://acmc.com",
    logo: "./src/assets/images/acsm.jpeg",
    isOnline: false,
    listeners: 0
  },
  {
    id: 11,
    name: "RTMC Radio",
    frequency: "103.9 FM",
    location: "Moroni",
    category: "Généraliste",
    description: "Radio Télévision Moroni Comores",
    streamUrl: "https://radio.rtmc.com/stream", // Placeholder, needs verification
    website: "https://rtmc.com",
    logo: "./src/assets/images/rtmc.jpg",
    isOnline: true,
    listeners: 920
  },
  {
    id: 12,
    name: "Star FM Radio",
    frequency: "105.7 FM",
    location: "Moroni",
    category: "Musique",
    description: "Hits internationaux et locaux",
    streamUrl: "https://radio.starfm.com/stream", // Placeholder, needs verification
    website: "https://starfm.com",
    logo: "./src/assets/images/star.png",
    isOnline: true,
    listeners: 1100
  },
  {
    id: 13,
    name: "Hero Radio",
    frequency: "94.3 FM",
    location: "Moroni",
    category: "Jeunesse",
    description: "Radio des héros de demain",
    streamUrl: "https://radio.hero.com/stream", // Placeholder, needs verification
    website: "https://hero.com",
    logo: "./src/assets/images/comores.png",
    isOnline: true,
    listeners: 650
  },
  {
    id: 14,
    name: "ZAWIYA FM",
    frequency: "106.2 FM",
    location: "Moroni",
    category: "Religieux",
    description: "Radio spirituelle et éducative",
    streamUrl: "https://radio.zawiya.com/stream", // Placeholder, needs verification
    website: "https://zawiya.com",
    logo: "./src/assets/images/zawiya.jpeg",
    isOnline: true,
    listeners: 480
  },
  {
    id: 15,
    name: "Radio Moidja Paris",
    frequency: "Web",
    location: "Paris",
    category: "Diaspora",
    description: "Radio de la diaspora comorienne en France",
    streamUrl: "http://www.radio-comores.com/index.php?stream=acmc", // Placeholder, needs verification
    website: "https://moidjaparis.com",
    logo: "./src/assets/images/moidja.webp",
    isOnline: true,
    listeners: 820
  },
  {
    id: 16,
    name: "LADATOU BÉNIN",
    frequency: "Web",
    location: "Cotonou",
    category: "Musique",
    description: "Radio de la musique comorienne dépuis le Bénin",
    streamUrl: "http://localhost:8000/stream",
    website: "http://localhost:5173/",
    logo: "/api/placeholder/80/80",
    isOnline: true,
    listeners: 629
  },
  {
    id: 17,
    name: "ORTC TV",
    frequency: "TV",
    location: "Moroni",
    category: "Télévision",
    description: "Télévision officielle des Comores",
    streamUrl: "https://player.vimeo.com/video/600146189?h=1036209827&badge=0&autopause=0&player_id=0&app_id=58479",
    website: "https://www.ortc.fr/",
    logo: "./src/assets/images/ortc.jpeg",
    isOnline: true,
    listeners: 0,
    type: "tv"
  }
];

export const categories = [
  "Toutes",
  "Généraliste",
  "Actualités",
  "Musique",
  "Culture",
  "Jeunesse",
  "Religieux",
  "Diaspora",
  "Télévision"
];

export const locations = [
  "Toutes",
  "Moroni",
  "Anjouan",
  "Mohéli",
  "Marseille",
  "Paris",
  "tv"
];

