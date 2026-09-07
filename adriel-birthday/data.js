/* ============================================================
   DATA.JS — All trip data in one place
   ============================================================ */

var TRIP = {
  crew: [
    { name:'Adriel', role:'Birthday Boy', emoji:'🎂', color:'var(--accent-gold)', photo:'./photos/adriel.jpg' },
    { name:'Chad', role:'Planner', emoji:'✨', color:'var(--accent)', photo:'./photos/chad.jpg' },
    { name:'Haydee', role:'Adriel\'s Mom', emoji:'💛', color:'var(--burgundy)', photo:'./photos/haydee.jpg' },
    { name:'Lulu', role:'The Energy', emoji:'🔥', color:'var(--forest)', photo:'./photos/lulu.jpg' },
    { name:'Jessica', role:'Concert Buddy', emoji:'🎶', color:'#8886e6', photo:'./photos/jessica.jpg' }
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

  lodging: {
    address:'5945 Rue Bergevin, Montreal',
    type:'Airbnb / Rental',
    checkin:'Wed Oct 21, ~6:00 PM',
    checkout:'Sat Oct 24, ~9:30 AM',
    nights:3,
    note:'LaSalle area — ~20 min from downtown Montreal'
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
        { time:'~8:00 PM', title:'Dinner — Casual First Night', desc:'Keep it chill after a long travel day. Pai Northern Thai ($, amazing pad thai), Seven Lives Tacos ($, cult-favorite fish tacos in Kensington), or grab something near the Village before going out.', tag:'food', drive:'5-10 min walk from CN Tower' },
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
        { time:'~5:45 PM', title:'Check into Montreal — 5945 Rue Bergevin', desc:'Drop bags, refresh, settle in. LaSalle area, ~20 min from downtown.', tag:'lodging', drive:'~20 min from Gare Centrale via taxi/Uber' },
        { time:'~7:30 PM', title:'🎂 Adriel\'s Birthday Dinner', desc:'THE birthday dinner! Agrikol (tropical Haitian, fun vibes, great rum cocktails, $$), Le Violon (warm + elegant French, $$$), or Bouillon Bilk (minimalist fine dining, $$$$). Make it special — reserve ahead!', tag:'food', drive:'~20 min from lodging to downtown' },
        { time:'~10:00 PM', title:'Birthday Night Out — Le Village', desc:'Montreal\'s LGBTQ+ district for the birthday celebration! Complexe Sky (rooftop + multiple floors), Cabaret Mado (drag shows), Club Unity (dance floors)', tag:'activity', drive:'10 min from dinner area' }
      ]
    },
    day3: {
      title:'Olivia Rodrigo + Birthday Vibes',
      date:'Thursday, October 22',
      city:'Montreal',
      items: [
        { time:'~10:00 AM', title:'Sleep In + Brunch', desc:'Regine Cafe (rococo decor, great plating, $$), La Fabrique (polished Plateau, $$), or Cafe Parvis (urban oasis, $$)', tag:'food', drive:'' },
        { time:'~11:30 AM', title:'Monography Photo Studio', desc:'Self-portrait photography studio at 3674 Saint-Denis. Professional lighting + equipment — take amazing group photos and solo shots. Book ahead!', tag:'activity', drive:'5 min walk if brunching in Plateau' },
        { time:'~12:00 PM', title:'Montreal Museum of Fine Arts (MMFA)', desc:'World-class collection on Sherbrooke Street. Allow 1.5-2 hours. Great for art lovers.', tag:'activity', drive:'10 min from Plateau' },
        { time:'~2:00 PM', title:'Old Montreal Exploring', desc:'Cobblestone streets, Notre-Dame Basilica ($16 entry, stunning interior), Old Port waterfront, Ferris wheel ($25)', tag:'activity', drive:'Walkable district' },
        { time:'~4:00 PM', title:'Phi Centre', desc:'Stunning private art space in a renovated Old Montreal heritage building. Free/low-cost. The building itself is part of the experience.', tag:'activity', drive:'In Old Montreal — walkable' },
        { time:'~5:30 PM', title:'Pre-Concert Dinner', desc:'Quick and affordable near Centre Bell. Poutine from La Banquise ($), or shawarma/falafel from Boustan ($). Fuel up before the show.', tag:'food', drive:'10 min walk' },
        { time:'7:00 PM', title:'🎵 Olivia Rodrigo @ Centre Bell', desc:'Jessica + Adriel! 1909 Ave des Canadiens-de-Montreal. Doors likely 6:00 PM.', tag:'concert', drive:'' },
        { time:'During Concert', title:'Chad, Haydee, Lulu — Alt Plans', desc:'Explore Plateau / Mile End neighborhoods. Dinner at Agrikol (tropical Haitian, fun vibes, $$) or grab bagels + browse Mile End shops. Bar hop along Saint-Laurent.', tag:'activity', drive:'' },
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
        { time:'~4:00 PM', title:'Drive Back — Quartier DIX30 Stop', desc:'Huge open-air lifestyle shopping district in Brossard (South Shore). Simons, Zara, Lululemon, Uniqlo + tons of restaurants and cafes. On the way back from the Laurentians. Browse for 1-1.5 hours.', tag:'activity', drive:'~1 hour from Tremblant, 20 min from lodging' },
        { time:'~6:00 PM', title:'Back to Lodging — Freshen Up', desc:'Rest and get ready for dinner', tag:'lodging', drive:'' },
        { time:'~8:00 PM', title:'Dinner Out', desc:'Keep it relaxed after a big day. Agrikol (tropical Haitian, $$), Le Petit Dep (casual but cool, $$), or cook at the Airbnb if everyone is tired.', tag:'food', drive:'~20 min to downtown' },
        { time:'~10:00 PM', title:'Night Out or Chill', desc:'Le Village if you have energy, or game night at the Airbnb. Last night in Montreal!', tag:'activity', drive:'' }
      ]
    },
    day5: {
      title:'Departure Day',
      date:'Saturday, October 24',
      city:'Montreal → Austin',
      items: [
        { time:'~9:00 AM', title:'Wake Up + Pack', desc:'Clean up lodging, get organized. Check out.', tag:'lodging', drive:'' },
        { time:'~10:00 AM', title:'Final Montreal Brunch', desc:'La Fabrique (polished Plateau, $$), Cafe Parvis (urban oasis, $$), or bagels from Fairmount/St-Viateur ($) + coffee', tag:'food', drive:'' },
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
      { name:'Lady Marmalade', type:'Brunch', price:'$$', desc:'East End brunch staple. Long lines but worth it. Cash-friendly.', cuisine:'Brunch', neighborhood:'Leslieville' },
      { name:'Light Cafe', type:'Brunch', price:'$$', desc:'Cute, soft, playful. Cozy and highly Instagram-worthy.', cuisine:'Cafe', neighborhood:'Downtown' },
      { name:'The Drake Hotel', type:'Brunch', price:'$$', desc:'Art-forward hotel restaurant with buzzy weekend brunch. Great cocktails.', cuisine:'Canadian Modern', neighborhood:'Queen West' },
      { name:'Pai Northern Thai', type:'Dinner', price:'$', desc:'Best Thai in Toronto. Known for their pad thai and khao soi. Always busy — go early.', cuisine:'Thai', neighborhood:'Entertainment District' },
      { name:'Seven Lives Tacos', type:'Lunch', price:'$', desc:'Cult-favorite taco spot in Kensington Market. Fish tacos are legendary. Cash only.', cuisine:'Mexican', neighborhood:'Kensington Market' },
      { name:'Bar Etc.', type:'Dinner', price:'$$$', desc:'Design-forward cocktail bar + restaurant. Good vibes, great drinks.', cuisine:'Modern', neighborhood:'Downtown' },
      { name:'St. Lawrence Market', type:'Lunch/Snacks', price:'$', desc:'Iconic indoor market. Peameal bacon sandwich is a must-try.', cuisine:'Market', neighborhood:'Old Town' }
    ],
    montreal: [
      { name:'Regine Cafe', type:'Brunch', price:'$$', desc:'Elaborate plating, rococo-inspired decor. Very aesthetic.', cuisine:'Brunch', neighborhood:'Plateau' },
      { name:'La Fabrique', type:'Brunch', price:'$$', desc:'Beautifully plated dishes in polished Plateau setting.', cuisine:'Brunch', neighborhood:'Plateau' },
      { name:'Cafe Parvis', type:'Brunch', price:'$$', desc:'Urban oasis cafe with greenery and vintage accents. Visually gorgeous.', cuisine:'Cafe', neighborhood:'Downtown' },
      { name:'Agrikol', type:'Dinner', price:'$$', desc:'Tropical, highly photogenic Haitian restaurant. Great rum cocktails. Fun group vibes.', cuisine:'Haitian', neighborhood:'Sainte-Catherine' },
      { name:'Le Violon', type:'Dinner', price:'$$$', desc:'Minimalist warmth, elegant and refined. Beautiful atmosphere. Great for birthday dinner.', cuisine:'French', neighborhood:'Plateau' },
      { name:'Bouillon Bilk', type:'Dinner/Splurge', price:'$$$$', desc:'Sleek, minimalist fine dining. One of Montreal\'s best. Worth the splurge for a special night.', cuisine:'Contemporary French', neighborhood:'Downtown' },
      { name:'La Banquise', type:'Late Night', price:'$', desc:'Montreal\'s most famous poutine spot. Open 24 hours. 30+ poutine varieties.', cuisine:'Poutine', neighborhood:'Plateau' },
      { name:'Fairmount Bagels', type:'Snack', price:'$', desc:'Iconic Montreal bagel shop. Open 24 hours. Wood-fired, slightly sweet. Get a dozen to share.', cuisine:'Bagels', neighborhood:'Mile End' },
      { name:'St-Viateur Bagels', type:'Snack', price:'$', desc:'The other legendary Montreal bagel spot. Fairmount vs St-Viateur is the city\'s great debate.', cuisine:'Bagels', neighborhood:'Mile End' },
      { name:'Boustan', type:'Quick Meal', price:'$', desc:'Best shawarma and falafel in Montreal. Quick, cheap, delicious. Multiple locations.', cuisine:'Lebanese', neighborhood:'Various' }
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
    { name:'Monography Photo Studio', lat:45.5170, lng:-73.5660, emoji:'📸', city:'Montreal' },
    { name:'Quartier DIX30', lat:45.4629, lng:-73.4541, emoji:'🛍️', city:'Montreal' },
    { name:'Montreal Lodging', lat:45.4321, lng:-73.6175, emoji:'🏠', city:'Montreal' },
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
    { item:'Dining (~5 days)', est:'$150-250', per:'person', note:'Mostly affordable + 1 nice birthday dinner' },
    { item:'Nightlife', est:'$80-150', per:'person', note:'Covers + drinks' },
    { item:'Activities', est:'$60-120', per:'person', note:'CN Tower ($43), AGO ($30), Basilica ($16), Gondola, Botanical Garden' }
  ],

  payments: [
    { item:'Flights (AUS to YYZ + YUL to AUS)', cost:0, per:0, due:'Paid', note:'Already booked and paid' },
    { item:'VIA Rail Tickets', cost:0, per:0, due:'Paid', note:'Already booked and paid' },
    { item:'Olivia Rodrigo Tickets', cost:0, per:0, due:'Paid', note:'Adriel + Jessica only — already purchased' },
    { item:'Rental Car', cost:0, per:0, due:'Oct 23', note:'Split 5 ways at pickup' }
  ]
};
