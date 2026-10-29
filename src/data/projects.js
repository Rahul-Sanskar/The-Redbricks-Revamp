/**
 * Project data — sourced exclusively from the existing theredbricks.in website.
 * Fields marked OWNER TO CONFIRM were absent from the live site.
 *
 * Pecan-style fields added (2024 update):
 *   storeys          — floor count or structural description
 *   carpetArea       — approx carpet / built-up area (null if unknown)
 *   constructionUpdate — latest status note shown on Pecan as a badge label
 *   category         — 'Residential' | 'Commercial' (mirrors `type`)
 */

export const PROJECTS = [
  // ──────────────────────────────────────────────────────────────────────────
  // RESIDENTIAL — UPCOMING
  // ──────────────────────────────────────────────────────────────────────────
  {
    id:    'celestia',
    slug:  'celestia',
    name:  'Celestia',
    location: 'Kharghar, Navi Mumbai',
    address:  'Plot no. 108, Sector 11, Kharghar',
    type:     'Residential',
    category: 'Residential',
    config:   '3 BHK & 4 BHK',
    status:   'Upcoming',

    // Pecan-style fields
    storeys:            null,           // OWNER TO CONFIRM
    carpetArea:         null,           // OWNER TO CONFIRM
    constructionUpdate: 'Pre-launch',   // best honest descriptor from source

    rera:            null,  // Source: "CC RERA not received yet"
    launchDate:      null,  // OWNER TO CONFIRM
    possessionDate:  null,  // OWNER TO CONFIRM
    gps:             { lat: 19.0398294, lng: 73.0745024 },
    googleMapsHref:  'https://www.google.com/maps?daddr=19.0398294,73.0745024',

    image:         '/images/celestia.jpg',
    portraitImage: '/images/celestia-port.jpg',
    largeImage:    '/images/celestia-lg.jpg',
    gallery: [
      { src: '/images/celestia-lg.jpg',   alt: 'Celestia — architectural view' },
      { src: '/images/celestia.jpg',      alt: 'Celestia — exterior' },
      { src: '/images/celestia-port.jpg', alt: 'Celestia — elevation' },
    ],

    href:    '/projects/celestia/',
    tagline: '3 BHK & 4 BHK Exclusively',
    description:
      'A luxurious residential destination in Kharghar offering spacious 3 & 4 BHK residences, designed with sophisticated architecture, premium comforts, and an elevated lifestyle experience.',
    bodyText: [
      'Celestia stands as a landmark residential address in Kharghar Sector 11, delivering expansive 3 and 4 BHK homes crafted for discerning families who demand both space and quality.',
      'Each residence combines refined architecture with thoughtfully planned interiors — generous room proportions, premium fittings, and natural light throughout.',
    ],
    configurations: [
      { type: '3 BHK', details: 'Spacious residences — contact for sizes & pricing' },
      { type: '4 BHK', details: 'Expansive residences — contact for sizes & pricing' },
    ],
    amenities: [
      { label: 'Landscaped Gardens',   icon: 'garden'   },
      { label: "Children's Play Area", icon: 'play'     },
      { label: 'Podium Parking',       icon: 'parking'  },
      { label: 'Lift',                 icon: 'lift'     },
      { label: 'Power Backup',         icon: 'power'    },
      { label: '24/7 Security',        icon: 'security' },
    ],
    locationHighlights: [
      'Navi Mumbai Metro connectivity',
      'Proximity to Kharghar Railway Station',
      'Near Central Park, Kharghar',
      'Close to reputed schools and hospitals',
      'Excellent road connectivity via Sion-Panvel Highway',
    ],
    brochure:  null,
    floorPlan: null,
    featured:  true,
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id:    'crystal-corner',
    slug:  'crystal-corner',
    name:  'Crystal Corner',
    location: 'Kharghar Sector 11, Navi Mumbai',
    address:  'Plot no. 110, Sector 11, Kharghar, Raigad',
    type:     'Residential',
    category: 'Residential',
    config:   '2 BHK & 3 BHK',
    status:   'Upcoming',

    storeys:            null,
    carpetArea:         null,
    constructionUpdate: 'Pre-launch',

    rera:           null,
    launchDate:     null,
    possessionDate: null,
    gps:            { lat: 19.0380627, lng: 73.0695065 },
    googleMapsHref: 'https://www.google.com/maps?daddr=19.0380627,73.0695065',

    image:         '/images/crystal-corner-main.jpg',
    portraitImage: '/images/crystal-corner-main.jpg',
    largeImage:    '/images/crystal-corner-main.jpg',
    gallery: [
      { src: '/images/crystal-corner-main.jpg', alt: 'Crystal Corner — main elevation' },
      { src: '/images/crystal-corner-lg.webp',  alt: 'Crystal Corner — architectural view' },
      { src: '/images/crystal-corner.webp',     alt: 'Crystal Corner — exterior' },
    ],

    href:    '/projects/crystal-corner/',
    tagline: '2 BHK & 3 BHK Residences',
    description:
      'A thoughtfully crafted mixed-use development in Kharghar Sector 11, offering premium 2 & 3 BHK residences with exceptional connectivity, modern amenities, and a lifestyle designed for contemporary living.',
    bodyText: [
      "Crystal Corner occupies a prime position in Kharghar Sector 11, one of Navi Mumbai's most sought-after residential corridors.",
      'The development delivers premium 2 and 3 BHK residences that blend intelligent design with everyday convenience — close to schools, transit, and green spaces.',
    ],
    configurations: [
      { type: '2 BHK', details: 'Premium residences — contact for sizes & pricing' },
      { type: '3 BHK', details: 'Premium residences — contact for sizes & pricing' },
    ],
    amenities: [
      { label: 'Landscaped Gardens',   icon: 'garden'   },
      { label: "Children's Play Area", icon: 'play'     },
      { label: 'Podium Parking',       icon: 'parking'  },
      { label: 'Lift',                 icon: 'lift'     },
      { label: 'Power Backup',         icon: 'power'    },
      { label: '24/7 Security',        icon: 'security' },
    ],
    locationHighlights: [
      'Adjacent to Plot no. 108 — Celestia development',
      'Proximity to Kharghar Railway Station',
      'Near Central Park, Kharghar',
      'Close to reputed schools and hospitals',
      'Excellent road connectivity via Sion-Panvel Highway',
    ],
    brochure:  null,
    floorPlan: null,
    featured:  true,
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id:    'silver-crest',
    slug:  'silver-crest',
    name:  'Silver Crest',
    location: 'Nerul, Navi Mumbai',
    address:  'Plot No. 55, Sector 19A, Nerul East',
    type:     'Residential',
    category: 'Residential',
    config:   '2 BHK & 3 BHK',
    status:   'Upcoming',

    storeys:            null,
    carpetArea:         null,
    constructionUpdate: 'Pre-launch',

    rera:           null,
    launchDate:     null,
    possessionDate: null,
    gps:            { lat: 19.0275499, lng: 73.0236524 },
    googleMapsHref: 'https://www.google.com/maps?daddr=19.0275499,73.0236524',

    image:         '/images/silver-crest-main.jpg',
    portraitImage: '/images/silver-crest-main.jpg',
    largeImage:    '/images/silver-crest-main.jpg',
    gallery: [
      { src: '/images/silver-crest-main.jpg', alt: 'Silver Crest — main elevation' },
    ],

    href:    '/projects/silver-crest/',
    tagline: 'Premium 2 & 3 BHK Residences, Nerul',
    description:
      'An exclusive mixed-use development in the heart of Nerul, featuring premium 2 & 3 BHK residences that offer contemporary design, seamless connectivity, and an elevated urban lifestyle.',
    bodyText: [
      "Silver Crest brings refined residential living to Nerul's well-established Sector 19A — a location prized for its green surroundings, excellent schools, and rapid transit access.",
      'Each home is designed to deliver a premium quality of life: thoughtfully laid-out floor plans, quality fittings, and abundant natural light.',
    ],
    configurations: [
      { type: '2 BHK', details: 'Premium residences — contact for sizes & pricing' },
      { type: '3 BHK', details: 'Premium residences — contact for sizes & pricing' },
    ],
    amenities: [
      { label: 'Landscaped Gardens',   icon: 'garden'   },
      { label: "Children's Play Area", icon: 'play'     },
      { label: 'Covered Parking',      icon: 'parking'  },
      { label: 'Lift',                 icon: 'lift'     },
      { label: 'Power Backup',         icon: 'power'    },
      { label: '24/7 Security',        icon: 'security' },
    ],
    locationHighlights: [
      'Minutes from Nerul Railway Station',
      'Close to Nerul Jetty and Seawoods',
      'Proximity to DY Patil Stadium',
      'Well-connected via Palm Beach Road',
      'Near reputed schools and hospitals in Nerul',
    ],
    brochure:  null,
    floorPlan: null,
    featured:  true,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // RESIDENTIAL — ONGOING
  // ──────────────────────────────────────────────────────────────────────────
  {
    id:    'hitech-cosmos',
    slug:  'hitech-cosmos',
    name:  'Hitech Cosmos',
    location: 'Kharghar Sector 11, Navi Mumbai',
    address:  'Plot No. 106, Sec 11, Kharghar, Raigad',
    type:     'Residential',
    category: 'Residential',
    config:   '2 BHK & 3 BHK',
    status:   'Ongoing',

    storeys:            null,
    carpetArea:         null,
    constructionUpdate: 'Under Construction',

    rera:           null,
    launchDate:     null,
    possessionDate: null,
    gps:            { lat: 19.0380627, lng: 73.0695065 },
    googleMapsHref: 'https://www.google.com/maps?daddr=19.0380627,73.0695065',

    image:         '/images/hitech-cosmos.jpg',
    portraitImage: '/images/hitech-cosmos.jpg',
    largeImage:    '/images/hitech-cosmos-lg.jpg',
    gallery: [
      { src: '/images/hitech-cosmos-lg.jpg', alt: 'Hitech Cosmos — architectural view' },
      { src: '/images/hitech-cosmos.jpg',    alt: 'Hitech Cosmos — exterior' },
    ],

    href:    '/projects/hitech-cosmos/',
    tagline: '2 BHK & 3 BHK Residences, Kharghar',
    description:
      'An elegant mixed-use address in Kharghar Sector 11 featuring spacious 2 & 3 BHK residences, blending refined living, strategic location, and everyday convenience near key urban landmarks.',
    bodyText: [
      "Hitech Cosmos delivers well-crafted 2 and 3 BHK homes in the vibrant Kharghar Sector 11, one of Navi Mumbai's most active residential corridors.",
      'The development combines contemporary architecture with functional design, providing residents with quality construction and strong connectivity to the wider city.',
    ],
    configurations: [
      { type: '2 BHK', details: 'Spacious residences — contact for sizes & pricing' },
      { type: '3 BHK', details: 'Spacious residences — contact for sizes & pricing' },
    ],
    amenities: [
      { label: 'Landscaped Gardens',   icon: 'garden'   },
      { label: "Children's Play Area", icon: 'play'     },
      { label: 'Parking',              icon: 'parking'  },
      { label: 'Lift',                 icon: 'lift'     },
      { label: 'Power Backup',         icon: 'power'    },
      { label: 'Security',             icon: 'security' },
    ],
    locationHighlights: [
      'Proximity to Kharghar Railway Station',
      'Near Central Park, Kharghar',
      'Close to CIDCO Cricket Ground',
      'Excellent road connectivity via Sion-Panvel Highway',
    ],
    brochure:  null,
    floorPlan: null,
    featured:  false,
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id:    'dwarka',
    slug:  'dwarka',
    name:  'Dwarka',
    location: 'Kharghar, Navi Mumbai',
    address:  'Sector 19, Kharghar, Navi Mumbai',
    type:     'Residential',
    category: 'Residential',
    config:   '2 BHK & 3 BHK',
    status:   'Ongoing',

    storeys:            null,
    carpetArea:         null,
    constructionUpdate: 'Under Construction',

    rera:           null,
    launchDate:     null,
    possessionDate: null,
    gps:            { lat: 19.049449, lng: 73.0788479 },
    googleMapsHref: 'https://www.google.com/maps?daddr=19.049449,73.0788479',

    image:         '/images/dwarka.jpg',
    portraitImage: '/images/dwarka.jpg',
    largeImage:    '/images/dwarka-lg.jpg',
    gallery: [
      { src: '/images/dwarka-lg.jpg', alt: 'Dwarka — architectural view' },
      { src: '/images/dwarka.jpg',    alt: 'Dwarka — exterior' },
    ],

    href:    '/projects/dwarka/',
    tagline: 'Premium 2 & 3 BHK, Kharghar Sector 19',
    description:
      'A premium mixed-use development in Kharghar Sector 19, offering thoughtfully designed 2 & 3 BHK residences that combine modern living with excellent connectivity and convenience.',
    bodyText: [
      'Dwarka occupies a well-connected address in Kharghar Sector 19, offering 2 and 3 BHK residences designed for families seeking quality construction and a comfortable urban lifestyle.',
      'The development balances thoughtful design with practical amenities, providing residents with a well-rounded living experience in a growing residential neighbourhood.',
    ],
    configurations: [
      { type: '2 BHK', details: 'Premium residences — contact for sizes & pricing' },
      { type: '3 BHK', details: 'Premium residences — contact for sizes & pricing' },
    ],
    amenities: [
      { label: 'Landscaped Gardens',   icon: 'garden'   },
      { label: "Children's Play Area", icon: 'play'     },
      { label: 'Parking',              icon: 'parking'  },
      { label: 'Lift',                 icon: 'lift'     },
      { label: 'Power Backup',         icon: 'power'    },
      { label: 'Security',             icon: 'security' },
    ],
    locationHighlights: [
      'Kharghar Sector 19 — established residential zone',
      'Proximity to Kharghar Railway Station',
      'Near schools, colleges, and healthcare',
      'Good road connectivity to Pune Expressway',
    ],
    brochure:  null,
    floorPlan: null,
    featured:  false,
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id:    'mount-bliss',
    slug:  'mount-bliss',
    name:  'Mount Bliss',
    location: 'CBD Belapur, Navi Mumbai',
    address:  'Sector 30, CBD Belapur, Navi Mumbai',
    type:     'Residential',
    category: 'Residential',
    config:   'Premium Residences',
    status:   'Ongoing',

    storeys:            null,
    carpetArea:         null,
    constructionUpdate: 'Under Construction',

    rera:           null,
    launchDate:     null,
    possessionDate: null,
    gps:            { lat: 19.0253757, lng: 73.0237917 },
    googleMapsHref: 'https://www.google.com/maps?daddr=19.0253757,73.0237917',

    image:         '/images/mount-bliss.jpg',
    portraitImage: '/images/mount-bliss.jpg',
    largeImage:    '/images/mount-bliss.jpg',
    gallery: [
      { src: '/images/mount-bliss.jpg', alt: 'Mount Bliss — exterior' },
    ],

    href:    '/projects/mount-bliss/',
    tagline: 'Premium Residences, CBD Belapur',
    description:
      'Mount Bliss delivers a serene residential address that balances lush surroundings with contemporary architecture and carefully designed living spaces.',
    bodyText: [
      "Mount Bliss is positioned in Sector 30, CBD Belapur — one of Navi Mumbai's most established and well-serviced residential zones.",
      'The development offers premium residences crafted for those who value tranquil living without sacrificing urban connectivity.',
    ],
    configurations: [
      { type: 'Premium Residences', details: 'Contact us for available configurations and pricing' },
    ],
    amenities: [
      { label: 'Landscaped Gardens',   icon: 'garden'   },
      { label: "Children's Play Area", icon: 'play'     },
      { label: 'Covered Parking',      icon: 'parking'  },
      { label: 'Lift',                 icon: 'lift'     },
      { label: 'Power Backup',         icon: 'power'    },
      { label: 'Security',             icon: 'security' },
    ],
    locationHighlights: [
      "CBD Belapur — Navi Mumbai's financial hub",
      'Close to CBD Belapur Railway Station',
      'Near CIDCO offices and commercial centres',
      'Excellent connectivity to Mumbai via expressway',
    ],
    brochure:  null,
    floorPlan: null,
    featured:  false,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // COMMERCIAL — ONGOING
  // ──────────────────────────────────────────────────────────────────────────
  {
    id:    'trident-elevation',
    slug:  'trident-elevation',
    name:  'Trident Elevation',
    location: 'Mahape, Navi Mumbai',
    address:  'Mahape MIDC, Thane, Navi Mumbai',
    type:     'Commercial',
    category: 'Commercial',
    config:   'Office Spaces & Retail Shops',
    status:   'Ongoing',

    // Sourced from source listing: "Recreational Floors: 10 and 31st"
    storeys:            '31+ Storeys',
    carpetArea:         null,
    constructionUpdate: 'Under Construction',

    rera:           null,
    launchDate:     null,
    possessionDate: null,
    gps:            null,
    googleMapsHref: null,

    image:         '/images/trident.jpg',
    portraitImage: '/images/trident-lg.jpg',
    largeImage:    '/images/trident-lg.jpg',
    gallery: [
      { src: '/images/trident-lg.jpg', alt: 'Trident Elevation — architectural view' },
      { src: '/images/trident.jpg',    alt: 'Trident Elevation — exterior' },
    ],

    href:    '/projects/trident-elevation/',
    tagline: 'Premium Commercial Spaces, Mahape',
    description:
      'A modern commercial development in Mahape featuring premium office spaces and retail shops, strategically positioned to serve businesses, professionals, and investors in a rapidly growing commercial hub.',
    bodyText: [
      'Trident Elevation rises in Mahape MIDC — a rapidly expanding commercial precinct in Navi Mumbai that is home to leading IT and manufacturing companies.',
      'The development offers premium office floors and retail spaces with an emphasis on modern work environments and business-ready infrastructure.',
    ],
    configurations: [
      { type: 'Office Spaces', details: 'Multiple floor configurations — contact for sizes & pricing' },
      { type: 'Retail Shops',  details: 'Ground floor retail — contact for sizes & pricing' },
    ],
    amenities: [
      { label: 'Gym',               icon: 'gym'        },
      { label: 'Conference Room',   icon: 'conference' },
      { label: 'Cafeteria',         icon: 'cafeteria'  },
      { label: 'Indoor Games',      icon: 'games'      },
      { label: 'Canteen',           icon: 'cafeteria'  },
      { label: 'Brainstorming Area',icon: 'conference' },
      { label: 'Outdoor Sitting',   icon: 'garden'     },
      { label: 'Hangout Area',      icon: 'play'       },
    ],
    amenitiesNote: 'Recreational floors on 10th and 31st levels',
    locationHighlights: [
      'Mahape MIDC — established industrial & commercial zone',
      'Strong road connectivity to Thane and Mumbai',
      'Proximity to Airoli and Ghansoli stations',
      'Close to leading IT parks and corporate campuses',
    ],
    brochure:  null,
    floorPlan: null,
    featured:  false,
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id:    'business-square',
    slug:  'business-square',
    name:  'Business Square',
    location: 'Nerul MIDC, Navi Mumbai',
    address:  'MIDC, Nerul, Navi Mumbai, 400007',
    type:     'Commercial',
    category: 'Commercial',
    config:   'Office Spaces & Retail Shops',
    status:   'Ongoing',

    storeys:            null,
    carpetArea:         null,
    constructionUpdate: 'Under Construction',

    rera:           null,
    launchDate:     null,
    possessionDate: null,
    gps:            { lat: 19.0407090, lng: 73.0290566 },
    googleMapsHref: 'https://www.google.com/maps?daddr=19.0407090,73.0290566',

    image:         '/images/business-square.jpg',
    portraitImage: '/images/business-square-lg.jpg',
    largeImage:    '/images/business-square-lg.jpg',
    gallery: [
      { src: '/images/business-square-lg.jpg', alt: 'Business Square — architectural view' },
      { src: '/images/business-square.jpg',    alt: 'Business Square — exterior' },
    ],

    href:    '/projects/business-square/',
    tagline: 'Premium Commercial, Nerul MIDC',
    description:
      'A landmark commercial destination in Nerul MIDC offering premium office spaces and retail shops, thoughtfully designed for businesses, entrepreneurs, and discerning investors seeking long-term growth.',
    bodyText: [
      "Business Square occupies a strategic position in Nerul MIDC, one of Navi Mumbai's most active commercial zones, with strong road and rail connectivity.",
      'The development provides modern office floors and ground-level retail spaces designed for businesses that demand a professional, prestigious address.',
    ],
    configurations: [
      { type: 'Office Spaces', details: 'Multiple configurations — contact for sizes & pricing' },
      { type: 'Retail Shops',  details: 'Ground floor retail — contact for sizes & pricing' },
    ],
    amenities: [
      { label: 'High-Speed Lifts',    icon: 'lift'     },
      { label: 'Covered Parking',     icon: 'parking'  },
      { label: 'Power Backup',        icon: 'power'    },
      { label: '24/7 Security',       icon: 'security' },
      { label: 'Fire Safety Systems', icon: 'security' },
    ],
    locationHighlights: [
      'Nerul MIDC — prime commercial zone',
      'Minutes from Nerul Railway Station',
      'Close to Palm Beach Road',
      'Proximity to DY Patil Stadium',
      'Easy access to Mumbai-Pune Expressway',
    ],
    brochure:  null,
    floorPlan: null,
    featured:  false,
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id:    'hitech-one-x',
    slug:  'hitech-one-x',
    name:  'Hitech One X',
    location: 'Nerul MIDC, Navi Mumbai',
    address:  'MIDC, Nerul, Navi Mumbai 400007',
    type:     'Commercial',
    category: 'Commercial',
    config:   'Office Spaces & Retail Shops',
    status:   'Ongoing',

    storeys:            null,
    carpetArea:         null,
    constructionUpdate: 'Under Construction',

    rera:           null,
    launchDate:     null,
    possessionDate: null,
    gps:            { lat: 19.0331086, lng: 73.0299387 },
    googleMapsHref: 'https://www.google.com/maps?daddr=19.0331086,73.0299387',

    image:         '/images/hitech-onex.jpg',
    portraitImage: '/images/hitech-onex-lg.jpg',
    largeImage:    '/images/hitech-onex-lg.jpg',
    gallery: [
      { src: '/images/hitech-onex-lg.jpg', alt: 'Hitech One X — architectural view' },
      { src: '/images/hitech-onex.jpg',    alt: 'Hitech One X — exterior' },
    ],

    href:    '/projects/hitech-one-x/',
    tagline: 'Contemporary Commercial, Nerul MIDC',
    description:
      'A contemporary commercial development in Nerul MIDC featuring premium offices and retail spaces, crafted to support thriving businesses and deliver exceptional investment potential.',
    bodyText: [
      'Hitech One X is a well-positioned commercial development in Nerul MIDC, designed for enterprises looking for a modern, efficient workspace in a thriving business district.',
      'The building offers flexible office configurations and retail units on the lower floors, supported by professional-grade infrastructure and strong transport links.',
    ],
    configurations: [
      { type: 'Office Spaces', details: 'Flexible configurations — contact for sizes & pricing' },
      { type: 'Retail Shops',  details: 'Ground level retail — contact for sizes & pricing' },
    ],
    amenities: [
      { label: 'High-Speed Lifts', icon: 'lift'     },
      { label: 'Covered Parking',  icon: 'parking'  },
      { label: 'Power Backup',     icon: 'power'    },
      { label: '24/7 Security',    icon: 'security' },
    ],
    locationHighlights: [
      'Nerul MIDC — established commercial zone',
      'Close to Nerul Railway Station',
      'Palm Beach Road connectivity',
      'Near IT parks and industrial hubs',
    ],
    brochure:  null,
    floorPlan: null,
    featured:  false,
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id:    '16seventeen-atelier',
    slug:  '16seventeen-atelier',
    name:  '16Seventeen Atelier',
    location: 'Vashi, Navi Mumbai',
    address:  'Near Mafco Market, Vashi, Navi Mumbai',
    type:     'Commercial',
    category: 'Commercial',
    config:   'Office Spaces & Retail Shops',
    status:   'Ongoing',

    storeys:            null,
    carpetArea:         null,
    constructionUpdate: 'Under Construction',

    rera:           null,
    launchDate:     null,
    possessionDate: null,
    gps:            null,
    googleMapsHref: null,

    image:         '/images/16seventeen.jpg',
    portraitImage: '/images/16seventeen.jpg',
    largeImage:    '/images/16seventeen.jpg',
    gallery: [
      { src: '/images/16seventeen.jpg', alt: '16Seventeen Atelier — main elevation' },
    ],

    href:    '/projects/16seventeen-atelier/',
    tagline: 'Premium Commercial, Vashi',
    description:
      "A premium commercial address near Mafco Market, Vashi, offering thoughtfully designed office spaces and retail outlets in one of Navi Mumbai's most strategic business locations.",
    bodyText: [
      "16Seventeen Atelier brings a premium commercial offering to Vashi — Navi Mumbai's most established commercial and retail hub, directly connected to Mumbai via the Vashi Bridge.",
      'The development provides professional-grade office spaces and retail outlets in an address that combines prestige with exceptional daily connectivity for employees, clients, and customers.',
    ],
    configurations: [
      { type: 'Office Spaces',  details: 'Multiple configurations — contact for sizes & pricing' },
      { type: 'Retail Outlets', details: 'Ground floor retail — contact for sizes & pricing' },
    ],
    amenities: [
      { label: 'High-Speed Lifts', icon: 'lift'     },
      { label: 'Covered Parking',  icon: 'parking'  },
      { label: 'Power Backup',     icon: 'power'    },
      { label: '24/7 Security',    icon: 'security' },
    ],
    locationHighlights: [
      "Vashi — Navi Mumbai's prime commercial hub",
      'Proximity to Vashi Railway Station',
      'Near Mafco Market and Inorbit Mall',
      'Direct access to Vashi-Mumbai bridges',
      'Well-connected to Thane and Belapur',
    ],
    brochure:  null,
    floorPlan: null,
    featured:  false,
  },
]

// ─── Derived exports ─────────────────────────────────────────────────────────
export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured)

export const RESIDENTIAL_PROJECTS = PROJECTS.filter((p) => p.category === 'Residential')
export const COMMERCIAL_PROJECTS  = PROJECTS.filter((p) => p.category === 'Commercial')
export const ONGOING_PROJECTS     = PROJECTS.filter((p) => p.status === 'Ongoing')
export const UPCOMING_PROJECTS    = PROJECTS.filter((p) => p.status === 'Upcoming')

// Note: No "Delivered" projects exist in the current portfolio.
// The DeliveredProjectsPage communicates this honestly and focuses on company track record.
export const DELIVERED_PROJECTS = []

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug) ?? null
}

export function getRelatedProjects(currentId, count = 3) {
  const current = PROJECTS.find((p) => p.id === currentId)
  if (!current) return PROJECTS.slice(0, count)
  const sameType = PROJECTS.filter((p) => p.id !== currentId && p.type === current.type)
  const others   = PROJECTS.filter((p) => p.id !== currentId && p.type !== current.type)
  return [...sameType, ...others].slice(0, count)
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',               href: '/'                   },
  { label: 'About Us',           href: '/about-us/'          },
  { label: 'Projects',           href: '/projects/'          },
  { label: 'Delivered Projects', href: '/delivered-projects/'},
  { label: 'Services',           href: '/services/'          },
  { label: 'Contact',            href: '/contact-us/'        },
]

// ─── Shared constants ─────────────────────────────────────────────────────────
export const CONTACT = {
  phone:     '+91 99874 32055',
  phoneHref: 'tel:+919987432055',
  email:     'theredbricks.in@gmail.com',
  emailHref: 'mailto:theredbricks.in@gmail.com',
  whatsapp:  'https://wa.me/919987432055',
  address:   'Navi Mumbai, Maharashtra, India',
}

export const STATS = [
  { value: '20+',     label: 'Years of Industry Expertise' },
  { value: '5,000+',  label: 'Satisfied Investors'         },
  { value: '5 Lakh+', label: 'Sq. Ft. Inventory Sold'      },
  { value: '3 Lakh+', label: 'Sq. Ft. In Planning'         },
]

export const LOCATIONS = ['Kharghar', 'CBD Belapur', 'Nerul', 'Vashi', 'Thane']
