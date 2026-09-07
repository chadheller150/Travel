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
      date:'Tue Oct 20', airline:'Air Canada / Porter',
      duration:'~3h 25m', note:'Arrive early afternoon'
    },
    returning: {
      from:'YUL', to:'AUS', fromCity:'Montreal', toCity:'Austin',
      date:'Sat Oct 24', airline:'Air Canada',
      duration:'~4h 15m', note:'Evening departure'
    }
  },

  train: {
    route:'Toronto → Montreal', carrier:'VIA Rail',
    date:'Wed Oct 21', departures:'6:32am, 8:32am, 11:38am, 3:23pm, 5:08pm, 6:08pm',
    duration:'~5 hours', price:'CA$39-143/person',
    note:'Book early for cheapest fares. Scenic ride through Ontario countryside.'
  },

  rental: {
    city:'Montreal', dates:'Oct 23-24 (Fri-Sat)',
    note:'Pickup downtown Montreal, drop off at YUL airport',
    est:'~CA$50-70/day', purpose:'Explore outside the city + drive to airport'
  },

  days: {
    day1: {
      title:'Arrival Day — Toronto',
      date:'Tuesday, October 20',
      city:'Toronto',
      items: [
        { time:'~12:30-1:00 PM', title:'Land at Toronto Pearson (YYZ)', desc:'Grab bags, get through customs', tag:'transport', drive:'' },
        { time:'~2:00 PM', title:'Check into Toronto Lodging', desc:'Drop bags, freshen up', tag:'lodging', drive:'30-45 min from YYZ via UP Express or taxi' },
        { time:'~3:30 PM', title:'Late Lunch / Early Explore', desc:'Grab food near lodging — St. Lawrence Market or King West area', tag:'food', drive:'' },
        { time:'~5:00 PM', title:'CN Tower + Harbourfront', desc:'Iconic skyline views, sunset from the observation deck. Walk the waterfront after.', tag:'activity', drive:'10-15 min walk from downtown' },
        { time:'~7:30 PM', title:'Dinner — Aera or Bar Etc.', desc:'Trendy, design-forward dining. Reservations recommended.', tag:'food', drive:'' },
        { time:'~10:00 PM', title:'Church-Wellesley Village', desc:'Toronto\'s LGBTQ+ district. Crews and Tangos for drag shows, The Drink for cocktails, Woody\'s for the classic bar vibe.', tag:'activity', drive:'10 min taxi from downtown' }
      ]
    },
    day2: {
      title:'Toronto → Montreal',
      date:'Wednesday, October 21',
      city:'Toronto → Montreal',
      items: [
        { time:'Morning', title:'Toronto Brunch', desc:'KOST for skyline views, or Lady Marmalade / The Drake for aesthetic brunch', tag:'food', drive:'' },
        { time:'~10:00-11:00 AM', title:'Last Toronto Stops', desc:'Kensington Market, Graffiti Alley, or Distillery District for photos', tag:'activity', drive:'5-15 min between spots' },
        { time:'Early Afternoon', title:'VIA Rail to Montreal', desc:'Board at Union Station. ~5 hour scenic ride through Ontario. Book Business class for more legroom + meal included.', tag:'transport', drive:'' },
        { time:'~6:00-7:00 PM', title:'Arrive in Montreal', desc:'Gare Centrale (Central Station). Right downtown.', tag:'transport', drive:'' },
        { time:'~7:30 PM', title:'Check into Montreal Lodging', desc:'Drop bags, refresh', tag:'lodging', drive:'5-10 min walk from Gare Centrale' },
        { time:'~9:00 PM', title:'Dinner — Bouillon Bilk or Le Violon', desc:'Sleek minimalist fine dining (Bouillon Bilk) or warm elegant vibes (Le Violon)', tag:'food', drive:'' },
        { time:'~11:00 PM', title:'Le Village Night Out', desc:'Montreal\'s LGBTQ+ district. Complexe Sky (rooftop + drag), Cabaret Mado (drag shows), Club Unity (dance floors)', tag:'activity', drive:'10 min from downtown' }
      ]
    },
    day3: {
      title:'Olivia Rodrigo + Birthday Vibes',
      date:'Thursday, October 22',
      city:'Montreal',
      items: [
        { time:'~10:00 AM', title:'Sleep In + Brunch', desc:'Dandy (Old Montreal, chic), Regine Cafe (rococo decor), or Bar George (glamorous)', tag:'food', drive:'' },
        { time:'~12:30 PM', title:'Old Montreal Exploring', desc:'Cobblestone streets, Notre-Dame Basilica ($16 entry), Old Port waterfront, Ferris wheel ($25)', tag:'activity', drive:'Walkable district' },
        { time:'~3:00 PM', title:'Afternoon Free Time', desc:'Mount Royal lookout for fall foliage views, Jean-Talon Market for snacks, or relax at lodging', tag:'activity', drive:'' },
        { time:'~5:00 PM', title:'Pre-Concert Dinner', desc:'Something quick near Centre Bell — grab food downtown', tag:'food', drive:'' },
        { time:'7:00 PM', title:'🎵 Olivia Rodrigo @ Centre Bell', desc:'Jessica + Adriel attending! 1909 Avenue des Canadiens-de-Montreal. Doors likely 6:00 PM.', tag:'concert', drive:'' },
        { time:'During Concert', title:'Chad, Haydee, Lulu — Alt Plans', desc:'Explore Plateau / Mile End, dinner at Mon Lapin or Agrikol (tropical vibes), bar hop', tag:'activity', drive:'' },
        { time:'~10:30 PM', title:'Regroup + Nightlife', desc:'Meet up after the concert. Late drinks in Le Village or Plateau', tag:'activity', drive:'' }
      ]
    },
    day4: {
      title:'Explore Day — Rental Car',
      date:'Friday, October 23',
      city:'Montreal + Surrounds',
      items: [
        { time:'~9:30 AM', title:'Pick Up Rental Car', desc:'Downtown Montreal location (Avis/Hertz on Metcalfe or Maisonneuve)', tag:'transport', drive:'' },
        { time:'~10:30 AM', title:'Mont-Royal Park', desc:'Drive or walk up for the best fall foliage panorama of the city. The Kondiaronk Belvedere lookout is stunning in October.', tag:'activity', drive:'15 min from downtown' },
        { time:'~12:30 PM', title:'Brunch / Lunch', desc:'Mile End area — Fairmount Bagels or St-Viateur Bagels (Montreal classics), then browse boutiques', tag:'food', drive:'10 min from Mont-Royal' },
        { time:'~2:30 PM', title:'Montreal Botanical Garden + Gardens of Light', desc:'Massive gardens with fall colors. Gardens of Light evening show (if running) is magical.', tag:'activity', drive:'20 min from Mile End' },
        { time:'~5:00 PM', title:'Back to Lodging to Freshen Up', desc:'Rest before birthday dinner', tag:'lodging', drive:'15 min' },
        { time:'~7:30 PM', title:'Birthday Dinner — Celeste or Marcus', desc:'Celeste (luminous atrium, elegant) or Marcus at Four Seasons (skyline terrace). This is THE dinner.', tag:'food', drive:'10-15 min' },
        { time:'~10:00 PM', title:'Birthday Night Out', desc:'Le Village for the full Montreal nightlife experience. Complexe Sky rooftop, Club Unity, Cabaret Mado', tag:'activity', drive:'' }
      ]
    },
    day5: {
      title:'Departure Day',
      date:'Saturday, October 24',
      city:'Montreal → Austin',
      items: [
        { time:'~9:00 AM', title:'Wake Up + Pack', desc:'Clean up lodging, get organized', tag:'lodging', drive:'' },
        { time:'~10:30 AM', title:'Final Montreal Brunch', desc:'Leméac (upscale Parisian), La Fabrique (Plateau), or Cafe Parvis (urban oasis)', tag:'food', drive:'' },
        { time:'~12:30 PM', title:'Last Stops', desc:'Pick up souvenirs, maple syrup, poutine one last time', tag:'activity', drive:'' },
        { time:'~2:00 PM', title:'Saint Joseph\'s Oratory', desc:'Stunning hilltop basilica with city views. Worth a 45-min stop.', tag:'activity', drive:'15 min from downtown' },
        { time:'~4:00 PM', title:'Drive to YUL Airport', desc:'Return rental car at airport. Give 30 min for return process.', tag:'transport', drive:'25-30 min from downtown' },
        { time:'~5:00 PM', title:'Arrive at Airport', desc:'Check in, go through security, grab duty free', tag:'transport', drive:'' },
        { time:'Evening', title:'Fly Home to Austin', desc:'Air Canada YUL → AUS. ~4h 15m. Back in Texas!', tag:'transport', drive:'' }
      ]
    }
  },

  dining: {
    toronto: [
      { name:'KOST', type:'Brunch', price:'$$$$', desc:'44th-floor rooftop brunch with panoramic skyline views. Stunning for photos.', cuisine:'Contemporary', neighborhood:'Financial District' },
      { name:'The Drake Hotel', type:'Brunch', price:'$$', desc:'Art-forward hotel restaurant with buzzy weekend brunch. Great cocktails.', cuisine:'Canadian Modern', neighborhood:'Queen West' },
      { name:'Lady Marmalade', type:'Brunch', price:'$$', desc:'East End brunch staple. Long lines but worth it. Cash-friendly.', cuisine:'Brunch', neighborhood:'Leslieville' },
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
      { name:'La Fabrique', type:'Brunch', price:'$$', desc:'Beautifully plated dishes in polished Plateau setting.', cuisine:'Brunch', neighborhood:'Plateau' }
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
    { name:'Distillery District', lat:43.6503, lng:-79.3596, emoji:'📸', city:'Toronto' },
    { name:'Kensington Market', lat:43.6545, lng:-79.4005, emoji:'🛍️', city:'Toronto' },
    { name:'Church-Wellesley Village', lat:43.6658, lng:-79.3810, emoji:'🏳️‍🌈', city:'Toronto' },
    { name:'Union Station (VIA Rail)', lat:43.6453, lng:-79.3806, emoji:'🚂', city:'Toronto' },
    { name:'Montreal Gare Centrale', lat:45.4996, lng:-73.5673, emoji:'🚂', city:'Montreal' },
    { name:'Old Montreal / Notre-Dame', lat:45.5046, lng:-73.5566, emoji:'⛪', city:'Montreal' },
    { name:'Centre Bell (Olivia Rodrigo)', lat:45.4961, lng:-73.5693, emoji:'🎵', city:'Montreal' },
    { name:'Mont-Royal Park', lat:45.5048, lng:-73.5874, emoji:'🍁', city:'Montreal' },
    { name:'Le Village', lat:45.5195, lng:-73.5540, emoji:'🏳️‍🌈', city:'Montreal' },
    { name:'Jean-Talon Market', lat:45.5362, lng:-73.6153, emoji:'🛒', city:'Montreal' },
    { name:'Montreal Botanical Garden', lat:45.5593, lng:-73.5617, emoji:'🌿', city:'Montreal' },
    { name:'Saint Joseph\'s Oratory', lat:45.4917, lng:-73.6170, emoji:'⛪', city:'Montreal' },
    { name:'YUL Airport', lat:45.4707, lng:-73.7407, emoji:'✈️', city:'Montreal' }
  ],

  budget: [
    { item:'Flights (AUS↔YYZ/YUL)', est:'$250-400', per:'person', note:'Round trip estimate' },
    { item:'VIA Rail (Toronto→Montreal)', est:'CA$39-143', per:'person', note:'Book early for best price' },
    { item:'Toronto Lodging (1 night)', est:'$50-80', per:'person/night', note:'Split 5 ways' },
    { item:'Montreal Lodging (3 nights)', est:'$50-80', per:'person/night', note:'Split 5 ways' },
    { item:'Rental Car (2 days)', est:'CA$100-140', per:'total split 5', note:'Oct 23-24' },
    { item:'Olivia Rodrigo Tickets', est:'Varies', per:'person', note:'Jessica + Adriel' },
    { item:'Dining (~5 days)', est:'$200-350', per:'person', note:'Mix of budget + splurge' },
    { item:'Nightlife', est:'$80-150', per:'person', note:'Covers + drinks' },
    { item:'Activities/Attractions', est:'$50-100', per:'person', note:'CN Tower, Basilica, Ferris wheel, etc.' }
  ],

  payments: [
    { item:'VIA Rail Tickets', cost:0, per:0, due:'TBD', note:'Book as group when available' },
    { item:'Olivia Rodrigo Tickets', cost:0, per:0, due:'TBD', note:'Jessica + Adriel only' },
    { item:'Rental Car', cost:0, per:0, due:'Oct 23', note:'Split 5 ways at pickup' }
  ]
};
