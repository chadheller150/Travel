/* ============================================================
   DATA.JS — All trip data in one place
   ============================================================ */

var TRIP = {
  crew: [
    { name:'Adriel', role:'Birthday Boy', emoji:'🎂', color:'var(--accent-gold)' },
    { name:'Chad', role:'Planner', emoji:'✨', color:'var(--accent)' },
    { name:'Haydee', role:'Adriel\'s Mom', emoji:'💛', color:'var(--burgundy)' },
    { name:'Lulu', role:'The Energy', emoji:'🔥', color:'var(--forest)' },
    { name:'Jessica', role:'Concert Buddy', emoji:'🎶', color:'#8886e6' }
  ],
  people: ['Adriel','Chad','Haydee','Lulu','Jessica'],

  flights: {
    outbound: {
      from:'AUS', to:'YYZ', fromCity:'Austin', toCity:'Toronto',
      date:'Tue Oct 20', depart:'11:35 AM', arrive:'~4:00 PM',
      airline:'TBD', duration:'~3h 25m',
      note:'Arrive mid-afternoon — customs + bags by ~4:45'
    },
    returning: {
      from:'YUL', to:'AUS', fromCity:'Montreal', toCity:'Austin',
      date:'Sat Oct 24', depart:'4:40 PM', arrive:'~7:55 PM',
      airline:'TBD', duration:'~4h 15m',
      note:'Need to be at YUL by ~2:30 PM'
    }
  },

  train: {
    route:'Toronto → Montreal', carrier:'VIA Rail',
    date:'Wed Oct 21', depart:'11:38 AM', arrive:'5:05 PM',
    duration:'~5h 27m', price:'CA$39-143/person',
    note:'Book early for cheapest fares. Scenic ride through Ontario countryside. Board at Union Station.'
  },

  rental: {
    city:'Montreal', dates:'Oct 23-24 (Fri-Sat)',
    note:'Pickup downtown Montreal, drop off at YUL airport',
    est:'~CA$50-70/day', purpose:'Nature drive + explore further out + drive to airport'
  },

  days: {
    day1: {
      title:'Arrival Day — Toronto',
      date:'Tuesday, October 20',
      city:'Toronto',
      items: [
        { time:'11:35 AM', title:'Depart Austin (AUS)', desc:'Flight to Toronto Pearson. ~3h 25m flight.', tag:'transport', drive:'' },
        { time:'~4:00 PM', title:'Land at Toronto Pearson (YYZ)', desc:'Grab bags, clear customs. Should be out by ~4:45.', tag:'transport', drive:'' },
        { time:'~5:30 PM', title:'Check into Toronto Lodging', desc:'Drop bags, freshen up quickly', tag:'lodging', drive:'30-45 min from YYZ via UP Express ($12.35) or taxi' },
        { time:'~6:15 PM', title:'CN Tower', desc:'Iconic skyline views — catch golden hour/sunset from the observation deck ($43 CAD). Book tickets online in advance to skip the line.', tag:'activity', drive:'10-15 min walk from downtown' },
        { time:'~8:00 PM', title:'Dinner — Aera or Bar Etc.', desc:'Aera: trendy fine dining, seasonal tasting menus ($$$$). Bar Etc: design-forward cocktails + food ($$$). Reserve ahead.', tag:'food', drive:'5-10 min walk from CN Tower' },
        { time:'~10:00 PM', title:'Church-Wellesley Village', desc:'Toronto\'s LGBTQ+ district. Crews and Tangos (drag shows), The Drink (stylish cocktails), Woody\'s (classic bar).', tag:'activity', drive:'10 min taxi from downtown' }
      ]
    },
    day2: {
      title:'Toronto Art + Train to Montreal',
      date:'Wednesday, October 21',
      city:'Toronto → Montreal',
      items: [
        { time:'~8:30 AM', title:'Brunch', desc:'Lady Marmalade (East End staple, $$), The Drake (art-forward, $$), or Light Cafe (cute + aesthetic)', tag:'food', drive:'' },
        { time:'~10:00 AM', title:'Art Gallery of Ontario (AGO)', desc:'Toronto\'s premier art museum. Stunning Frank Gehry redesign. $30 admission (free under 25 with ON ID). Allow 1-1.5 hours.', tag:'activity', drive:'10 min from most brunch spots' },
        { time:'~11:15 AM', title:'Head to Union Station', desc:'Quick walk or taxi to Union Station. Grab snacks + drinks for the train.', tag:'transport', drive:'10-15 min from AGO' },
        { time:'11:38 AM', title:'VIA Rail to Montreal', desc:'Board at Union Station. 5.5 hour scenic ride through Ontario countryside. Business class includes meal + more legroom.', tag:'transport', drive:'' },
        { time:'5:05 PM', title:'Arrive in Montreal', desc:'Gare Centrale (Central Station). Right in the heart of downtown.', tag:'transport', drive:'' },
        { time:'~5:45 PM', title:'Check into Montreal Lodging', desc:'Drop bags, refresh, settle in', tag:'lodging', drive:'5-10 min walk from Gare Centrale' },
        { time:'~7:30 PM', title:'Dinner — Bouillon Bilk or Le Violon', desc:'Bouillon Bilk: sleek minimalist fine dining ($$$$). Le Violon: warm, elegant French ($$$). Both need reservations.', tag:'food', drive:'' },
        { time:'~10:00 PM', title:'Le Village Night Out', desc:'Montreal\'s LGBTQ+ district. Complexe Sky (rooftop + multiple floors), Cabaret Mado (drag shows), Club Unity (dance floors)', tag:'activity', drive:'10 min from downtown' }
      ]
    },
    day3: {
      title:'Olivia Rodrigo + Birthday Vibes',
      date:'Thursday, October 22',
      city:'Montreal',
      items: [
        { time:'~10:00 AM', title:'Sleep In + Brunch', desc:'Dandy (chic Old Montreal, $$$), Regine Cafe (rococo decor, $$), or Bar George (glamorous mansion, $$$$)', tag:'food', drive:'' },
        { time:'~12:00 PM', title:'Montreal Museum of Fine Arts (MMFA)', desc:'World-class collection on Sherbrooke Street. Allow 1.5-2 hours. Great for art lovers.', tag:'activity', drive:'10 min from Old Montreal' },
        { time:'~2:00 PM', title:'Old Montreal Exploring', desc:'Cobblestone streets, Notre-Dame Basilica ($16 entry, stunning interior), Old Port waterfront, Ferris wheel ($25)', tag:'activity', drive:'Walkable district' },
        { time:'~4:00 PM', title:'Phi Centre', desc:'Stunning private art space in a renovated Old Montreal heritage building. Free/low-cost. The building itself is part of the experience.', tag:'activity', drive:'In Old Montreal — walkable' },
        { time:'~5:30 PM', title:'Pre-Concert Dinner', desc:'Quick dinner near Centre Bell. Grab something downtown before the show.', tag:'food', drive:'10 min walk' },
        { time:'7:00 PM', title:'🎵 Olivia Rodrigo @ Centre Bell', desc:'Jessica + Adriel! 1909 Ave des Canadiens-de-Montreal. Doors likely 6:00 PM.', tag:'concert', drive:'' },
        { time:'During Concert', title:'Chad, Haydee, Lulu — Alt Plans', desc:'Explore Plateau / Mile End neighborhoods. Dinner at Mon Lapin (inventive small plates, $$$) or Agrikol (tropical Haitian, $$). Bar hop along Saint-Laurent.', tag:'activity', drive:'' },
        { time:'~10:30 PM', title:'Regroup + Nightlife', desc:'Meet up after the concert. Late drinks in Le Village or Plateau. Complexe Sky rooftop if weather allows.', tag:'activity', drive:'' }
      ]
    },
    day4: {
      title:'Nature + Explore Day — Rental Car',
      date:'Friday, October 23',
      city:'Montreal + Laurentians',
      items: [
        { time:'~8:30 AM', title:'Pick Up Rental Car', desc:'Downtown Montreal (Avis/Hertz on Metcalfe or Maisonneuve)', tag:'transport', drive:'' },
        { time:'~9:00 AM', title:'Montreal Botanical Garden', desc:'One of the world\'s largest botanical gardens. Stunning fall colors in October. Gardens of Light if evening show is running. Allow 2-2.5 hours.', tag:'activity', drive:'20 min from downtown' },
        { time:'~11:30 AM', title:'Drive North to the Laurentians', desc:'Scenic Route 117 through Saint-Sauveur and Sainte-Adele. Peak fall foliage territory — rolling hills covered in red, orange, gold. The drive itself is the attraction.', tag:'activity', drive:'~1 hour from Botanical Garden' },
        { time:'~12:30 PM', title:'Lunch in Saint-Sauveur or Val-David', desc:'Charming mountain village with cafes, bakeries, and craft shops. Browse the main street.', tag:'food', drive:'Along the route' },
        { time:'~2:00 PM', title:'Mont-Tremblant Area', desc:'Stunning resort village at the base of the mountain. Take the panoramic gondola for incredible fall views from the summit. Walk the pedestrian village.', tag:'activity', drive:'30 min from Val-David' },
        { time:'~4:00 PM', title:'Drive Back to Montreal', desc:'Scenic return drive. ~1.5 hours back to the city. Stop for photos along the way — the light is gorgeous in late afternoon.', tag:'transport', drive:'~1.5 hours' },
        { time:'~6:00 PM', title:'Back to Lodging — Freshen Up', desc:'Rest and get ready for birthday dinner', tag:'lodging', drive:'' },
        { time:'~8:00 PM', title:'Birthday Dinner — Celeste or Marcus', desc:'Celeste: luminous atrium, grand and elegant ($$$$). Marcus at Four Seasons: skyline terrace, celebrity chef ($$$$). THIS is THE dinner. Reserve well ahead.', tag:'food', drive:'10-15 min' },
        { time:'~10:30 PM', title:'Birthday Night Out', desc:'Le Village for the full experience. Complexe Sky rooftop, Club Unity dance floors, Cabaret Mado drag show', tag:'activity', drive:'' }
      ]
    },
    day5: {
      title:'Departure Day',
      date:'Saturday, October 24',
      city:'Montreal → Austin',
      items: [
        { time:'~9:00 AM', title:'Wake Up + Pack', desc:'Clean up lodging, get organized. Check out.', tag:'lodging', drive:'' },
        { time:'~10:00 AM', title:'Final Montreal Brunch', desc:'Leméac (upscale Parisian, $$$), La Fabrique (polished Plateau, $$), or Cafe Parvis (urban oasis greenery)', tag:'food', drive:'' },
        { time:'~11:30 AM', title:'Saint Joseph\'s Oratory', desc:'Stunning hilltop basilica — one of the largest churches in the world. Incredible city views from the top. Worth 45 min.', tag:'activity', drive:'15 min from downtown' },
        { time:'~12:30 PM', title:'Last Stops + Souvenirs', desc:'Grab maple syrup, one last poutine. Quick stroll through any missed spots.', tag:'activity', drive:'' },
        { time:'~1:30 PM', title:'Drive to YUL Airport', desc:'Return rental car at airport. Allow 30 min for car return process.', tag:'transport', drive:'25-30 min from downtown' },
        { time:'~2:30 PM', title:'Arrive at Airport', desc:'Check in, go through security, grab duty-free goodies', tag:'transport', drive:'' },
        { time:'4:40 PM', title:'Fly Home to Austin', desc:'YUL → AUS. ~4h 15m. Land at ~7:55 PM. Back in Texas!', tag:'transport', drive:'' }
      ]
    }
  },

  dining: {
    toronto: [
      { name:'KOST', type:'Brunch', price:'$$$$', desc:'44th-floor rooftop brunch with panoramic skyline views. Stunning for photos.', cuisine:'Contemporary', neighborhood:'Financial District' },
      { name:'The Drake Hotel', type:'Brunch', price:'$$', desc:'Art-forward hotel restaurant with buzzy weekend brunch. Great cocktails.', cuisine:'Canadian Modern', neighborhood:'Queen West' },
      { name:'Lady Marmalade', type:'Brunch', price:'$$', desc:'East End brunch staple. Long lines but worth it. Cash-friendly.', cuisine:'Brunch', neighborhood:'Leslieville' },
      { name:'Light Cafe', type:'Brunch', price:'$$', desc:'Cute, soft, playful. Cozy and highly Instagram-worthy.', cuisine:'Cafe', neighborhood:'Downtown' },
      { name:'Aera', type:'Dinner', price:'$$$$', desc:'Trendy fine dining. Scene-y room, seasonal tasting menus.', cuisine:'Contemporary', neighborhood:'King West' },
      { name:'Bar Etc.', type:'Dinner', price:'$$$', desc:'Design-forward cocktail bar + restaurant. Playful edge, great drinks.', cuisine:'Modern', neighborhood:'Downtown' },
      { name:'St. Lawrence Market', type:'Lunch/Snacks', price:'$', desc:'Iconic indoor market. Peameal bacon sandwich is a must-try.', cuisine:'Market', neighborhood:'Old Town' }
    ],
    montreal: [
      { name:'Dandy', type:'Brunch', price:'$$$', desc:'Chic retro-modern Old Montreal spot. Instagram-worthy interiors.', cuisine:'Contemporary', neighborhood:'Old Montreal' },
      { name:'Regine Cafe', type:'Brunch', price:'$$', desc:'Elaborate plating, rococo-inspired decor. Very aesthetic.', cuisine:'Brunch', neighborhood:'Plateau' },
      { name:'Bar George', type:'Brunch', price:'$$$$', desc:'Glamorous brunch in a stunning historic mansion. Movie-set vibes.', cuisine:'British-French', neighborhood:'Downtown' },
      { name:'Bouillon Bilk', type:'Dinner', price:'$$$$', desc:'Sleek, minimalist fine dining. One of Montreal\'s best restaurants.', cuisine:'Contemporary French', neighborhood:'Downtown' },
      { name:'Le Violon', type:'Dinner', price:'$$$', desc:'Minimalist warmth, elegant and refined. Beautiful atmosphere.', cuisine:'French', neighborhood:'Plateau' },
      { name:'Celeste', type:'Dinner', price:'$$$$', desc:'Luminous atrium setting, grand and elegant. Perfect for a birthday dinner.', cuisine:'Contemporary', neighborhood:'Downtown' },
      { name:'Marcus', type:'Dinner', price:'$$$$', desc:'Four Seasons restaurant with gorgeous terrace. Celebrity chef Marcus Samuelsson.', cuisine:'Canadian-Ethiopian', neighborhood:'Downtown' },
      { name:'Mon Lapin', type:'Dinner', price:'$$$', desc:'Acclaimed contemporary wine bar with inventive small plates.', cuisine:'Contemporary', neighborhood:'Mile End' },
      { name:'Agrikol', type:'Dinner', price:'$$', desc:'Tropical, highly photogenic Haitian restaurant. Great rum cocktails.', cuisine:'Haitian', neighborhood:'Sainte-Catherine' },
      { name:'Leméac', type:'Brunch', price:'$$$', desc:'Upscale Parisian institution in Outremont. Classic and reliable.', cuisine:'French Bistro', neighborhood:'Outremont' },
      { name:'La Fabrique', type:'Brunch', price:'$$', desc:'Beautifully plated dishes in polished Plateau setting.', cuisine:'Brunch', neighborhood:'Plateau' },
      { name:'Cafe Parvis', type:'Brunch', price:'$$', desc:'Urban oasis cafe with greenery and vintage accents. Visually gorgeous.', cuisine:'Cafe', neighborhood:'Downtown' }
    ]
  },

  nightlife: {
    toronto: [
      { name:'Crews & Tangos', type:'Drag Bar + Club', cover:'Varies ($5-15)', hours:'Open late', desc:'Toronto\'s signature queer nightlife. Drag shows, high energy, dancing.' },
      { name:'Woody\'s / Sailor', type:'Bar', cover:'Free most nights', hours:'Open late', desc:'Classic Village anchor bar. Multiple levels, mixed crowd.' },
      { name:'The Drink', type:'Cocktail Bar', cover:'Free', hours:'Until 2am', desc:'Stylish, modern queer-friendly cocktail spot. Less clubby, more lounge.' },
      { name:'Pegasus on Church', type:'Bar', cover:'Free', hours:'Until 2am', desc:'Relaxed Village bar. Pool tables, games, easygoing.' },
      { name:'El Convento Rico', type:'Club', cover:'$10-15', hours:'Open late', desc:'Latin music + drag. High energy, great dancing.' }
    ],
    montreal: [
      { name:'Complexe Sky', type:'Mega Club', cover:'$10-20', hours:'Until 3am+', desc:'One of Canada\'s biggest gay clubs. Multiple floors, rooftop terrace, drag shows.' },
      { name:'Cabaret Mado', type:'Drag Venue', cover:'$10-15', hours:'Shows nightly', desc:'Montreal\'s premier drag venue. Nightly performances, great energy.' },
      { name:'Club Unity', type:'Dance Club', cover:'$10-15', hours:'Until 3am+', desc:'Inclusive nightclub with multiple dance floors + rooftop.' },
      { name:'Bar Renard', type:'Cocktail Bar', cover:'Free', hours:'Until 3am', desc:'Trendy LGBTQ-friendly bar with terrace. Young mixed crowd.' },
      { name:'Bar Le Cocktail', type:'Club', cover:'Varies', hours:'Until 3am', desc:'Village nightlife staple. Drag + queer club energy.' }
    ]
  },

  locations: [
    { name:'Toronto Pearson (YYZ)', lat:43.6777, lng:-79.6248, emoji:'✈️', city:'Toronto' },
    { name:'CN Tower', lat:43.6426, lng:-79.3871, emoji:'🗼', city:'Toronto' },
    { name:'St. Lawrence Market', lat:43.6487, lng:-79.3716, emoji:'🥘', city:'Toronto' },
    { name:'Art Gallery of Ontario (AGO)', lat:43.6536, lng:-79.3925, emoji:'🎨', city:'Toronto' },
    { name:'Distillery District', lat:43.6503, lng:-79.3596, emoji:'📸', city:'Toronto' },
    { name:'Kensington Market', lat:43.6545, lng:-79.4005, emoji:'🛍️', city:'Toronto' },
    { name:'Church-Wellesley Village', lat:43.6658, lng:-79.3810, emoji:'🏳️‍🌈', city:'Toronto' },
    { name:'Union Station (VIA Rail)', lat:43.6453, lng:-79.3806, emoji:'🚂', city:'Toronto' },
    { name:'Montreal Gare Centrale', lat:45.4996, lng:-73.5673, emoji:'🚂', city:'Montreal' },
    { name:'Old Montreal / Notre-Dame', lat:45.5046, lng:-73.5566, emoji:'⛪', city:'Montreal' },
    { name:'Montreal Museum of Fine Arts', lat:45.4986, lng:-73.5794, emoji:'🎨', city:'Montreal' },
    { name:'Phi Centre', lat:45.5040, lng:-73.5545, emoji:'🖼️', city:'Montreal' },
    { name:'Centre Bell (Olivia Rodrigo)', lat:45.4961, lng:-73.5693, emoji:'🎵', city:'Montreal' },
    { name:'Mont-Royal Park', lat:45.5048, lng:-73.5874, emoji:'🍁', city:'Montreal' },
    { name:'Le Village', lat:45.5195, lng:-73.5540, emoji:'🏳️‍🌈', city:'Montreal' },
    { name:'Jean-Talon Market', lat:45.5362, lng:-73.6153, emoji:'🛒', city:'Montreal' },
    { name:'Montreal Botanical Garden', lat:45.5593, lng:-73.5617, emoji:'🌿', city:'Montreal' },
    { name:'Saint Joseph\'s Oratory', lat:45.4917, lng:-73.6170, emoji:'⛪', city:'Montreal' },
    { name:'Mont-Tremblant', lat:46.2094, lng:-74.5850, emoji:'🏔️', city:'Laurentians' },
    { name:'Saint-Sauveur', lat:45.9325, lng:-74.1724, emoji:'🍂', city:'Laurentians' },
    { name:'YUL Airport', lat:45.4707, lng:-73.7407, emoji:'✈️', city:'Montreal' }
  ],

  budget: [
    { item:'Flights (AUS to YYZ + YUL to AUS)', est:'$250-400', per:'person', note:'Round trip estimate' },
    { item:'VIA Rail (Toronto to Montreal)', est:'CA$39-143', per:'person', note:'11:38 AM departure — book early' },
    { item:'Toronto Lodging (1 night)', est:'$50-80', per:'person/night', note:'Split 5 ways' },
    { item:'Montreal Lodging (3 nights)', est:'$50-80', per:'person/night', note:'Split 5 ways' },
    { item:'Rental Car (2 days)', est:'CA$100-140', per:'total split 5', note:'Oct 23-24, drop at YUL' },
    { item:'Olivia Rodrigo Tickets', est:'Varies', per:'person', note:'Jessica + Adriel only' },
    { item:'Dining (~5 days)', est:'$200-350', per:'person', note:'Mix of budget + splurge' },
    { item:'Nightlife', est:'$80-150', per:'person', note:'Covers + drinks' },
    { item:'Activities', est:'$60-120', per:'person', note:'CN Tower ($43), AGO ($30), Basilica ($16), Gondola, Botanical Garden' }
  ],

  payments: [
    { item:'VIA Rail Tickets', cost:0, per:0, due:'TBD', note:'Book as group when available' },
    { item:'Olivia Rodrigo Tickets', cost:0, per:0, due:'TBD', note:'Jessica + Adriel only' },
    { item:'Rental Car', cost:0, per:0, due:'Oct 23', note:'Split 5 ways at pickup' }
  ]
};
