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

  torontoLodging: {
    address:'151 Dan Leckie Way, Toronto',
    checkin:'Tue Oct 20',
    checkout:'Wed Oct 21',
    nights:1,
    cost:'$84/person ($422 total)',
    note:'Near CN Tower + waterfront'
  },

  lodging: {
    address:'5945 Rue Bergevin, Montreal',
    type:'Airbnb / Rental',
    checkin:'Wed Oct 21, ~6:00 PM',
    checkout:'Sat Oct 24, ~9:30 AM',
    nights:3,
    cost:'$238/person ($1,188 total)',
    note:'LaSalle area — ~20 min from downtown Montreal'
  },

  rental: {
    city:'Montreal', dates:'Oct 23-24 (Fri-Sat)',
    pickup:'3229 Taschereau Blvd, Brossard — 8:00 AM',
    dropoff:'YUL Airport — 5:00 PM',
    note:'Avis. Pickup 8am 10/23, drop at YUL 5pm 10/24',
    est:'~CA$160 total (~$32 CA/person)', purpose:'Nature drive + Laurentians + drive to airport'
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
        { time:'~3:30 PM', title:'Little Italy + Jean-Talon Market', desc:'Walk Saint-Laurent Boulevard through Little Italy — Italian cafes, bakeries, and shops. Stop at Jean-Talon Market for snacks and browsing. Check out Madonna della Difesa church for the architecture.', tag:'activity', drive:'15 min from Old Montreal via metro (Jean-Talon station)' },
        { time:'~5:00 PM', title:'Phi Centre', desc:'Stunning private art space in a renovated Old Montreal heritage building. Free/low-cost. The building itself is part of the experience.', tag:'activity', drive:'15 min back to Old Montreal' },
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
    { name:'Toronto Pearson (YYZ)', lat:43.6777, lng:-79.6248, emoji:'✈️', city:'Toronto', link:'https://maps.app.goo.gl/YYZ' },
    { name:'CN Tower', lat:43.6426, lng:-79.3871, emoji:'🗼', city:'Toronto', link:'https://www.cntower.ca' },
    { name:'St. Lawrence Market', lat:43.6487, lng:-79.3716, emoji:'🥘', city:'Toronto', link:'https://www.stlawrencemarket.com' },
    { name:'Art Gallery of Ontario (AGO)', lat:43.6536, lng:-79.3925, emoji:'🎨', city:'Toronto', link:'https://ago.ca' },
    { name:'Distillery District', lat:43.6503, lng:-79.3596, emoji:'📸', city:'Toronto', link:'https://www.thedistillerydistrict.com' },
    { name:'Kensington Market', lat:43.6545, lng:-79.4005, emoji:'🛍️', city:'Toronto', link:'https://maps.google.com/?q=Kensington+Market+Toronto' },
    { name:'Church-Wellesley Village', lat:43.6658, lng:-79.3810, emoji:'🏳️‍🌈', city:'Toronto', link:'https://maps.google.com/?q=Church-Wellesley+Village+Toronto' },
    { name:'Toronto Airbnb — 151 Dan Leckie Way', lat:43.6380, lng:-79.3957, emoji:'🏠', city:'Toronto', link:'https://maps.google.com/?q=151+Dan+Leckie+Way+Toronto' },
    { name:'Union Station (VIA Rail)', lat:43.6453, lng:-79.3806, emoji:'🚂', city:'Toronto', link:'https://www.viarail.ca' },
    { name:'Montreal Gare Centrale', lat:45.4996, lng:-73.5673, emoji:'🚂', city:'Montreal', link:'https://maps.google.com/?q=Gare+Centrale+Montreal' },
    { name:'Old Montreal / Notre-Dame', lat:45.5046, lng:-73.5566, emoji:'⛪', city:'Montreal', link:'https://www.basiliquenotredame.ca' },
    { name:'Montreal Museum of Fine Arts', lat:45.4986, lng:-73.5794, emoji:'🎨', city:'Montreal', link:'https://www.mbam.qc.ca/en' },
    { name:'Phi Centre', lat:45.5040, lng:-73.5545, emoji:'🖼️', city:'Montreal', link:'https://phi.ca/en' },
    { name:'Centre Bell (Olivia Rodrigo)', lat:45.4961, lng:-73.5693, emoji:'🎵', city:'Montreal', link:'https://www.centrebell.ca/en' },
    { name:'Mont-Royal Park', lat:45.5048, lng:-73.5874, emoji:'🍁', city:'Montreal', link:'https://maps.google.com/?q=Mont-Royal+Park+Montreal' },
    { name:'Le Village', lat:45.5195, lng:-73.5540, emoji:'🏳️‍🌈', city:'Montreal', link:'https://maps.google.com/?q=Le+Village+Montreal' },
    { name:'Jean-Talon Market', lat:45.5362, lng:-73.6153, emoji:'🛒', city:'Montreal', link:'https://www.marchespublics-mtl.com/en/marches/jean-talon-market' },
    { name:'Little Italy', lat:45.5340, lng:-73.6130, emoji:'🇮🇹', city:'Montreal', link:'https://maps.google.com/?q=Little+Italy+Montreal' },
    { name:'Montreal Botanical Garden', lat:45.5593, lng:-73.5617, emoji:'🌿', city:'Montreal', link:'https://espacepourlavie.ca/en/botanical-garden' },
    { name:'Saint Joseph\'s Oratory', lat:45.4917, lng:-73.6170, emoji:'⛪', city:'Montreal', link:'https://www.saint-joseph.org/en' },
    { name:'Monography Photo Studio', lat:45.5170, lng:-73.5660, emoji:'📸', city:'Montreal', link:'https://www.monography.ca' },
    { name:'Quartier DIX30', lat:45.4629, lng:-73.4541, emoji:'🛍️', city:'Montreal', link:'https://www.quartierdix30.com/en' },
    { name:'Avis Rental — 3229 Taschereau Blvd', lat:45.4684, lng:-73.4615, emoji:'🚗', city:'Montreal', link:'https://maps.google.com/?q=3229+Boulevard+Taschereau+Brossard' },
    { name:'Montreal Lodging', lat:45.4321, lng:-73.6175, emoji:'🏠', city:'Montreal', link:'https://maps.google.com/?q=5945+Rue+Bergevin+Montreal' },
    { name:'Mont-Tremblant', lat:46.2094, lng:-74.5850, emoji:'🏔️', city:'Laurentians', link:'https://www.tremblant.ca/en' },
    { name:'Saint-Sauveur', lat:45.9325, lng:-74.1724, emoji:'🍂', city:'Laurentians', link:'https://maps.google.com/?q=Saint-Sauveur+Quebec' },
    { name:'YUL Airport', lat:45.4707, lng:-73.7407, emoji:'✈️', city:'Montreal', link:'https://www.admtl.com/en' }
  ],

  budget: [
    { item:'Flights (AUS to YYZ + YUL to AUS)', est:'Paid', per:'person', note:'Already booked' },
    { item:'VIA Rail (Toronto to Montreal)', est:'Paid', per:'person', note:'Already booked' },
    { item:'Toronto Lodging (1 night)', est:'$84', per:'person', note:'$422 total / 5 — due Sep 13' },
    { item:'Montreal Lodging (3 nights)', est:'$238', per:'person', note:'$1,188 total / 5 — due Sep 13' },
    { item:'Rental Car (2 days)', est:'~CA$32', per:'person', note:'~$160 CA total / 5. Avis, Taschereau Blvd' },
    { item:'Olivia Rodrigo Tickets', est:'Varies', per:'person', note:'Jessica + Adriel only' },
    { item:'Dining (~5 days)', est:'$150-250', per:'person', note:'Mostly affordable + 1 nice birthday dinner' },
    { item:'Nightlife', est:'$80-150', per:'person', note:'Covers + drinks' },
    { item:'Activities', est:'$60-120', per:'person', note:'CN Tower ($43), AGO ($30), Basilica ($16), Gondola, Botanical Garden' }
  ],

  // Outfit event labels (keyed by data-outfit key from day rendering)
  outfitEvents: [
    { key:'day1-3', label:'Tue — CN Tower', day:'Tuesday 10/20' },
    { key:'day1-4', label:'Tue — Dinner', day:'Tuesday 10/20' },
    { key:'day1-5', label:'Tue — Church-Wellesley Village', day:'Tuesday 10/20' },
    { key:'day2-0', label:'Wed — Toronto Brunch', day:'Wednesday 10/21' },
    { key:'day2-1', label:'Wed — AGO', day:'Wednesday 10/21' },
    { key:'day2-6', label:'Wed — Birthday Dinner', day:'Wednesday 10/21' },
    { key:'day2-7', label:'Wed — Le Village Night Out', day:'Wednesday 10/21' },
    { key:'day3-0', label:'Thu — Brunch', day:'Thursday 10/22' },
    { key:'day3-1', label:'Thu — Monography Photo Studio', day:'Thursday 10/22' },
    { key:'day3-2', label:'Thu — MMFA', day:'Thursday 10/22' },
    { key:'day3-3', label:'Thu — Old Montreal', day:'Thursday 10/22' },
    { key:'day3-4', label:'Thu — Little Italy + Jean-Talon', day:'Thursday 10/22' },
    { key:'day3-5', label:'Thu — Phi Centre', day:'Thursday 10/22' },
    { key:'day3-6', label:'Thu — Pre-Concert Dinner', day:'Thursday 10/22' },
    { key:'day3-7', label:'Thu — Olivia Rodrigo Concert', day:'Thursday 10/22' },
    { key:'day4-2', label:'Fri — Botanical Garden', day:'Friday 10/23' },
    { key:'day4-4', label:'Fri — Laurentians Lunch', day:'Friday 10/23' },
    { key:'day4-5', label:'Fri — Quartier DIX30', day:'Friday 10/23' },
    { key:'day4-7', label:'Fri — Dinner', day:'Friday 10/23' },
    { key:'day4-8', label:'Fri — Night Out', day:'Friday 10/23' },
    { key:'day5-1', label:'Sat — Final Brunch', day:'Saturday 10/24' },
    { key:'day5-2', label:'Sat — Saint Joseph Oratory', day:'Saturday 10/24' }
  ],

  // Pre-populated vote suggestions per meal (keyed by day-food-itemIndex)
  defaultVotes: {
    'day1-food-4': [
      { name:'Pai Northern Thai', link:'' },
      { name:'Seven Lives Tacos', link:'' },
      { name:'Bar Etc.', link:'' }
    ],
    'day2-food-0': [
      { name:'Lady Marmalade', link:'' },
      { name:'The Drake Hotel', link:'' },
      { name:'Light Cafe', link:'' }
    ],
    'day2-food-6': [
      { name:'Agrikol', link:'' },
      { name:'Le Violon', link:'' },
      { name:'Bouillon Bilk', link:'' }
    ],
    'day3-food-0': [
      { name:'Regine Cafe', link:'' },
      { name:'La Fabrique', link:'' },
      { name:'Cafe Parvis', link:'' }
    ],
    'day3-food-6': [
      { name:'La Banquise', link:'' },
      { name:'Boustan', link:'' }
    ],
    'day4-food-4': [
      { name:'Local cafe in Saint-Sauveur', link:'' },
      { name:'Local cafe in Val-David', link:'' }
    ],
    'day4-food-7': [
      { name:'Agrikol', link:'' },
      { name:'Le Petit Dep', link:'' },
      { name:'Cook at the Airbnb', link:'' }
    ],
    'day5-food-1': [
      { name:'La Fabrique', link:'' },
      { name:'Cafe Parvis', link:'' },
      { name:'Fairmount Bagels', link:'' },
      { name:'St-Viateur Bagels', link:'' }
    ]
  },

  payments: [
    { item:'Flights (AUS to YYZ + YUL to AUS)', cost:0, per:0, due:'Paid', note:'Already booked and paid', appliesTo:[], paidBy:['Adriel','Chad','Haydee','Lulu','Jessica'] },
    { item:'VIA Rail Tickets', cost:0, per:0, due:'Paid', note:'Already booked and paid', appliesTo:[], paidBy:['Adriel','Chad','Haydee','Lulu','Jessica'] },
    { item:'Olivia Rodrigo Tickets ($225/ea)', cost:225, per:225, due:'Jessica owes Adriel', note:'Adriel paid — Jessica owes $225', appliesTo:['Adriel','Jessica'], paidBy:['Adriel'] },
    { item:'Toronto Airbnb — 151 Dan Leckie Way ($84/person)', cost:84, per:84, due:'Sep 13', note:'$422 total / 5. Pay Haydee via Apple Pay, Venmo, or Zelle', appliesTo:[], paidBy:[] },
    { item:'Montreal Airbnb — 5945 Rue Bergevin ($238/person)', cost:238, per:238, due:'Sep 13', note:'$1,188 total / 5. Pay Haydee via Apple Pay, Venmo, or Zelle', appliesTo:[], paidBy:[] },
    { item:'Rental Car — Avis ($32 CA/person)', cost:32, per:32, due:'Oct 23', note:'~$160 CA total / 5. Pickup: 3229 Taschereau Blvd 8am. Drop: YUL 5pm.', appliesTo:[], paidBy:[] }
  ],

  /* === OUTFIT INSPO BOARDS === */
  inspoGroups: [
    { key:'guys', label:'Chad &amp; Adriel', icon:'bi-people', members:['Chad','Adriel'] },
    { key:'haydee', label:'Haydee', icon:'bi-person', members:['Haydee'] },
    { key:'girls', label:'Jessica &amp; Lulu', icon:'bi-people', members:['Jessica','Lulu'] }
  ],

  inspoSlotOrder: ['tue-flight','tue-cntower','tue-village','wed-brunch-ago','wed-train',
    'wed-birthday-dinner','wed-village-mtl','thu-photostudio','thu-oldmontreal',
    'thu-mileend','thu-concert','fri-laurentians','fri-dinner','sat-travel'],

  inspo: [
    /* ===== CHAD ===== */
    { who:'Chad', day:'Tue 10/20', icon:'bi-airplane', mood:'Travel', title:'Flight Day — AUS to YYZ',
      img:'outfit-boards/web/m-tue-flight.jpg',
      note:'Comfortable leaving Texas, layered for a 45&deg;F landing.',
      pieces:['Dark stretch travel trousers','Charcoal long-sleeve henley','Lightweight zip bomber','White leather sneakers','Merino beanie in the bag'] },

    { who:'Chad', day:'Tue 10/20', icon:'bi-building', mood:'Golden Hour', title:'CN Tower + First Dinner',
      img:'outfit-boards/web/m-tue-cntower.jpg',
      note:'Cool-weather layering with first-night polish. Wind up top at the observation deck.',
      pieces:['Dark slim chinos','Forest or navy merino crewneck','Structured wool overcoat','Suede Chelsea boots','Silver watch + thin chain'] },

    { who:'Chad', day:'Tue 10/20', icon:'bi-moon-stars', mood:'Night Out', title:'Church-Wellesley Village',
      img:'outfit-boards/web/m-tue-village.jpg',
      note:'Crews &amp; Tangos, The Drink, Woody\'s. First-night statement.',
      pieces:['Fitted black jeans','Ribbed fitted top','Cropped leather bomber','Chunky sneakers or boots','Layered silver chains'] },

    { who:'Chad', day:'Wed 10/21', icon:'bi-palette2', mood:'Smart Casual', title:'Brunch + AGO',
      img:'outfit-boards/web/m-wed-brunch-ago.jpg',
      note:'Gallery-appropriate and easy to wear straight through to Union Station.',
      pieces:['Pleated trousers','Crewneck over a collared shirt','Trench or topcoat','Leather sneakers','Tortoiseshell sunglasses'] },

    { who:'Chad', day:'Wed 10/21', icon:'bi-train-front', mood:'Comfort', title:'VIA Rail — 5.5 Hours',
      img:'outfit-boards/web/m-wed-train.jpg',
      note:'Sit-all-day comfortable, but you step off this train headed for the birthday dinner.',
      pieces:['Soft stretch wool trousers','Oatmeal cashmere crewneck','White tee underneath','Unstructured travel blazer','Suede loafers'] },

    { who:'Chad', day:'Wed 10/21', icon:'bi-cake2', mood:'Dress Up', title:'Adriel\'s Birthday Dinner',
      img:'outfit-boards/web/m-wed-birthday-dinner.jpg',
      note:'THE dinner. Agrikol, Le Violon, or Bouillon Bilk. Sharpest look of the trip.',
      pieces:['Charcoal tailored trousers','Merino turtleneck or silk shirt','Fitted blazer + overcoat','Polished Chelsea boots','Minimal silver jewelry'] },

    { who:'Chad', day:'Wed 10/21', icon:'bi-stars', mood:'Big Night', title:'Le Village — Birthday Night Out',
      img:'outfit-boards/web/m-wed-village-mtl.jpg',
      note:'Complexe Sky rooftop, Cabaret Mado, Club Unity. The loudest look you pack.',
      pieces:['Glossy black slim trousers','Sheer or ribbed fitted top','Cropped textured jacket','Chunky platform boots','Stacked chains + statement ring'] },

    { who:'Chad', day:'Thu 10/22', icon:'bi-camera2', mood:'On Camera', title:'Monography Photo Studio',
      img:'outfit-boards/web/m-thu-photostudio.jpg',
      note:'The one that matters most — solid rich color, strong silhouette, nothing busy. This is going on film.',
      pieces:['Cream wide pleated trousers','Terracotta knit polo or mock-neck','Draped warm-brown overshirt','Leather loafers','Gold chain + signet ring'] },

    { who:'Chad', day:'Thu 10/22', icon:'bi-bank', mood:'Walking Day', title:'MMFA + Old Montreal + Little Italy',
      img:'outfit-boards/web/m-thu-oldmontreal.jpg',
      note:'Cobblestones, Notre-Dame, Jean-Talon Market. Built for mileage.',
      pieces:['Slim dark denim','Rust quarter-zip sweater','Waxed shirt jacket','Suede desert boots','Beanie or flat cap'] },

    { who:'Chad', day:'Thu 10/22', icon:'bi-cup-straw', mood:'Evening', title:'Mile End + Plateau Bar Hop',
      img:'outfit-boards/web/m-thu-mileend.jpg',
      note:'Your alt plan while Adriel and Jessica are at Centre Bell. Creative-neighborhood energy.',
      pieces:['Straight-leg raw denim','Heavyweight striped long-sleeve','Tobacco corduroy trucker','Wool overshirt layer','Worn leather boots'] },

    { who:'Chad', day:'Fri 10/23', icon:'bi-tree', mood:'Outdoors', title:'Botanical Garden + Laurentians',
      img:'outfit-boards/web/m-fri-laurentians.jpg',
      note:'Peak foliage, Mont-Tremblant gondola. Warm, weatherproof, photographs beautifully against fall color.',
      pieces:['Oatmeal cable-knit sweater','Slim dark jeans','Quilted or shearling jacket','Weatherproof boots','Beanie + wool scarf'] },

    { who:'Chad', day:'Fri 10/23', icon:'bi-fire', mood:'Relaxed', title:'Last Night Dinner Out',
      img:'outfit-boards/web/m-fri-dinner.jpg',
      note:'Post-Laurentians. Easy but still sharp — last real night in Montreal.',
      pieces:['Navy slim chinos','Cream ribbed knit','Deep green quilted bomber','Suede Chelsea boots','Simple silver bracelet'] },

    { who:'Chad', day:'Sat 10/24', icon:'bi-airplane-fill', mood:'Travel', title:'Oratory + Fly Home',
      img:'outfit-boards/web/m-sat-travel.jpg',
      note:'Saint Joseph\'s Oratory, last poutine, then YUL. Comfortable and airport-ready.',
      pieces:['Heathered travel joggers','Oversized olive hoodie','Packable puffer vest','Slip-on sneakers','Headphones + crossbody pouch'] },

    /* ===== ADRIEL ===== */
    { who:'Adriel', day:'Tue 10/20', icon:'bi-airplane', mood:'Travel', title:'Flight Day — AUS to YYZ',
      img:'outfit-boards/web/a-tue-flight.jpg',
      note:'Birthday trip starts here. Comfortable leaving Texas, layered for a 45&deg;F landing.',
      pieces:['Navy stretch travel trousers','Black long-sleeve henley','Burgundy zip bomber','Black leather sneakers','Charcoal merino beanie'] },

    { who:'Adriel', day:'Tue 10/20', icon:'bi-building', mood:'Golden Hour', title:'CN Tower + First Dinner',
      img:'outfit-boards/web/a-tue-cntower.jpg',
      note:'Cool-weather layering with first-night polish. Wind up top at the observation deck.',
      pieces:['Black slim tailored chinos','Burgundy merino crewneck','Structured navy overcoat','Black Chelsea boots','Silver watch + thin chain'] },

    { who:'Adriel', day:'Tue 10/20', icon:'bi-moon-stars', mood:'Night Out', title:'Church-Wellesley Village',
      img:'outfit-boards/web/a-tue-village.jpg',
      note:'Crews &amp; Tangos, The Drink, Woody\'s. Kick the week off loud.',
      pieces:['Black fitted jeans','Burgundy sheer mesh top','Cropped leather moto jacket','Chunky platform boots','Layered silver chains + ring'] },

    { who:'Adriel', day:'Wed 10/21', icon:'bi-palette2', mood:'Smart Casual', title:'Brunch + AGO',
      img:'outfit-boards/web/a-wed-brunch-ago.jpg',
      note:'Gallery-appropriate and easy to wear straight through to Union Station.',
      pieces:['Navy pleated wide trousers','Grey crewneck over a collared shirt','Camel trench coat','White leather sneakers','Tortoiseshell sunglasses'] },

    { who:'Adriel', day:'Wed 10/21', icon:'bi-train-front', mood:'Comfort', title:'VIA Rail — 5.5 Hours',
      img:'outfit-boards/web/a-wed-train.jpg',
      note:'Sit-all-day comfortable, and you step off this train straight into your own birthday dinner.',
      pieces:['Charcoal stretch wool trousers','Navy cashmere crewneck','White tee underneath','Unstructured navy blazer','Black suede loafers'] },

    { who:'Adriel', day:'Wed 10/21', icon:'bi-cake2', mood:'Birthday Boy', title:'Your Birthday Dinner',
      img:'outfit-boards/web/a-wed-birthday-dinner.jpg',
      note:'THE dinner, and it\'s yours. Agrikol, Le Violon, or Bouillon Bilk. Go sharpest of anyone at the table.',
      pieces:['Black tailored trousers','Deep burgundy silk shirt','Fitted black velvet blazer','Polished Chelsea boots','Silver watch + signet ring'] },

    { who:'Adriel', day:'Wed 10/21', icon:'bi-stars', mood:'Big Night', title:'Le Village — Birthday Night Out',
      img:'outfit-boards/web/a-wed-village-mtl.jpg',
      note:'Complexe Sky rooftop, Cabaret Mado, Club Unity. Birthday boy gets the biggest look of the trip.',
      pieces:['Glossy black slim trousers','Metallic silver mesh top','Cropped iridescent jacket','Chunky platform boots','Stacked chains + statement ring'] },

    { who:'Adriel', day:'Thu 10/22', icon:'bi-camera2', mood:'On Camera', title:'Monography Photo Studio',
      img:'outfit-boards/web/a-thu-photostudio.jpg',
      note:'Solid rich color, strong silhouette, nothing busy. This is the one going on film.',
      pieces:['Charcoal wide pleated trousers','Deep teal knit mock-neck','Draped camel overshirt','Black leather loafers','Silver chain + signet ring'] },

    { who:'Adriel', day:'Thu 10/22', icon:'bi-bank', mood:'Walking Day', title:'MMFA + Old Montreal + Little Italy',
      img:'outfit-boards/web/a-thu-oldmontreal.jpg',
      note:'Cobblestones, Notre-Dame, Jean-Talon Market — then you head to Centre Bell.',
      pieces:['Slim dark denim','Navy quarter-zip sweater','Waxed olive shirt jacket','Suede desert boots','Charcoal beanie'] },

    { who:'Adriel', day:'Thu 10/22', icon:'bi-music-note-beamed', mood:'Concert', title:'Olivia Rodrigo @ Centre Bell',
      img:'outfit-boards/web/a-thu-concert.jpg',
      note:'You and Jessica! The ticket you bought back in spring — dress for dancing.',
      pieces:['Black slim jeans','Lavender fitted tee','Metallic silver cropped bomber','Platform combat boots','Layered silver chains'] },

    { who:'Adriel', day:'Fri 10/23', icon:'bi-tree', mood:'Outdoors', title:'Botanical Garden + Laurentians',
      img:'outfit-boards/web/a-fri-laurentians.jpg',
      note:'Peak foliage, Mont-Tremblant gondola. Warm, weatherproof, and photographs beautifully against fall color.',
      pieces:['Navy cable-knit sweater','Slim dark jeans','Burgundy quilted jacket','Weatherproof leather boots','Beanie + wool scarf'] },

    { who:'Adriel', day:'Fri 10/23', icon:'bi-fire', mood:'Relaxed', title:'Last Night Dinner Out',
      img:'outfit-boards/web/a-fri-dinner.jpg',
      note:'Post-Laurentians. Easy but still sharp — last real night in Montreal.',
      pieces:['Charcoal slim chinos','Black ribbed knit','Burgundy quilted bomber','Black suede Chelsea boots','Simple silver bracelet'] },

    { who:'Adriel', day:'Sat 10/24', icon:'bi-airplane-fill', mood:'Travel', title:'Oratory + Fly Home',
      img:'outfit-boards/web/a-sat-travel.jpg',
      note:'Saint Joseph\'s Oratory, last poutine, then YUL. Comfortable and airport-ready.',
      pieces:['Charcoal travel joggers','Oversized navy hoodie','Packable black puffer vest','Slip-on sneakers','Headphones + crossbody pouch'] },

    /* ===== HAYDEE ===== */
    { who:'Haydee', day:'Tue 10/20', icon:'bi-airplane', mood:'Travel', title:'Flight Day — AUS to YYZ',
      img:'outfit-boards/web/h-tue-flight.jpg',
      note:'Elegant and easy leaving Texas, layered for a 45&deg;F landing.',
      pieces:['Ponte-knit wide-leg trousers','Merino wrap cardigan','Quilted travel vest','Leather slip-on flats','Silk scarf'] },

    { who:'Haydee', day:'Tue 10/20', icon:'bi-building', mood:'Golden Hour', title:'CN Tower + First Dinner',
      img:'outfit-boards/web/h-tue-cntower.jpg',
      note:'Tailored and warm for the observation deck, elegant enough for dinner after.',
      pieces:['Tailored plum wool trousers','Cashmere turtleneck','Long camel wool coat','Leather ankle boots','Statement amber pendant'] },

    { who:'Haydee', day:'Tue 10/20', icon:'bi-moon-stars', mood:'Night Out', title:'Church-Wellesley Village',
      img:'outfit-boards/web/h-tue-village.jpg',
      note:'Festive but comfortable for cocktails and the drag shows.',
      pieces:['Emerald trousers','Shimmering bronze silk blouse','Cropped velvet blazer','Block-heel shoes','Gold statement earrings'] },

    { who:'Haydee', day:'Wed 10/21', icon:'bi-palette2', mood:'Smart Casual', title:'Brunch + AGO',
      img:'outfit-boards/web/h-wed-brunch-ago.jpg',
      note:'Gallery-appropriate and comfortable straight through to Union Station.',
      pieces:['Tailored navy culottes','Fine-knit ivory sweater','Linen-blend blazer','Leather loafers','Pearl earrings'] },

    { who:'Haydee', day:'Wed 10/21', icon:'bi-train-front', mood:'Comfort', title:'VIA Rail — 5.5 Hours',
      img:'outfit-boards/web/h-wed-train.jpg',
      note:'Sit-all-day comfortable, elegant enough to arrive ready for the birthday dinner.',
      pieces:['Stretch wool-blend trousers','Camel cashmere wrap cardigan','Silk scarf accent','Suede flats','Leather crossbody'] },

    { who:'Haydee', day:'Wed 10/21', icon:'bi-cake2', mood:'Dress Up', title:'Adriel\'s Birthday Dinner',
      img:'outfit-boards/web/h-wed-birthday-dinner.jpg',
      note:'THE dinner. Elegant and celebratory — the dress-up night.',
      pieces:['Midnight-blue jersey dress','Beaded shawl','Pointed-toe low heels','Statement sapphire necklace','Wool wrap coat'] },

    { who:'Haydee', day:'Wed 10/21', icon:'bi-stars', mood:'Big Night', title:'Le Village — Birthday Night Out',
      img:'outfit-boards/web/h-wed-village-mtl.jpg',
      note:'Festive and comfortable enough to dance at Complexe Sky or Cabaret Mado.',
      pieces:['Burgundy silk-blend wide-leg trousers','Metallic camisole + kimono jacket','Block-heel sandals','Layered gold necklaces','Sequined clutch'] },

    { who:'Haydee', day:'Thu 10/22', icon:'bi-camera2', mood:'On Camera', title:'Monography Photo Studio',
      img:'outfit-boards/web/h-thu-photostudio.jpg',
      note:'Elegant silhouette, solid rich color, nothing busy — this is going on film.',
      pieces:['Camel wide-leg trousers','Deep teal rib-knit top','Draped rust cardigan','Sleek low heels','Delicate gold pendant'] },

    { who:'Haydee', day:'Thu 10/22', icon:'bi-bank', mood:'Walking Day', title:'MMFA + Old Montreal + Little Italy',
      img:'outfit-boards/web/h-thu-oldmontreal.jpg',
      note:'Comfortable but polished for cobblestones and the market.',
      pieces:['Straight-leg dark denim','Rust cowl-neck sweater','Quilted olive jacket','Leather walking shoes','Light scarf'] },

    { who:'Haydee', day:'Thu 10/22', icon:'bi-cup-straw', mood:'Evening', title:'Mile End + Plateau Bar Hop',
      img:'outfit-boards/web/h-thu-mileend.jpg',
      note:'Your alt plan while Adriel and Jessica are at Centre Bell. Cozy and easy.',
      pieces:['Wide-leg corduroy trousers','Chunky cream cable-knit','Quilted barn jacket','Ankle boots','Knit beret'] },

    { who:'Haydee', day:'Fri 10/23', icon:'bi-tree', mood:'Outdoors', title:'Botanical Garden + Laurentians',
      img:'outfit-boards/web/h-fri-laurentians.jpg',
      note:'Warm and weatherproof for the gondola, still stylish against the foliage.',
      pieces:['Cream cable-knit sweater','Fleece-lined ponte trousers','Quilted forest-green coat','Waterproof boots','Plaid scarf'] },

    { who:'Haydee', day:'Fri 10/23', icon:'bi-fire', mood:'Relaxed', title:'Last Night Dinner Out',
      img:'outfit-boards/web/h-fri-dinner.jpg',
      note:'Post-Laurentians. Relaxed but polished for the last real night in Montreal.',
      pieces:['Navy tailored trousers','Dove-grey merino turtleneck','Wine-red quilted jacket','Suede loafers','Delicate silver necklace'] },

    { who:'Haydee', day:'Sat 10/24', icon:'bi-airplane-fill', mood:'Travel', title:'Oratory + Fly Home',
      img:'outfit-boards/web/h-sat-travel.jpg',
      note:'Comfortable and put-together for the Oratory and the flight home.',
      pieces:['Ponte-knit joggers','Oversized cashmere-blend sweater','Packable puffer vest','Slip-on sneakers','Travel scarf'] },

    /* ----- Haydee: softer, relaxed alternates ----- */
    { who:'Haydee', day:'Tue 10/20', icon:'bi-moon-stars', mood:'Softer Take', title:'Church-Wellesley Village',
      img:'outfit-boards/web/b-tue-village.jpg',
      note:'Same night, softer lines — fluid silk instead of structure.',
      pieces:['Wine silk wide-leg trousers','Bronze silk blouse, gathered sleeve','Deep teal merino wrap cardigan','Sleek block-heel boots','Long gold pendant + small hoops'] },

    { who:'Haydee', day:'Wed 10/21', icon:'bi-cake2', mood:'Softer Take', title:'Adriel\'s Birthday Dinner',
      img:'outfit-boards/web/b-wed-birthday-dinner.jpg',
      note:'The dress-up night, done with drape instead of tailoring.',
      pieces:['Plum silk-jersey column dress','Taupe cashmere wrap','Slim antique-gold chain belt','Pointed suede low-heel boots','Gold pendant + amber drops'] },

    { who:'Haydee', day:'Thu 10/22', icon:'bi-camera2', mood:'Softer Take', title:'Monography Photo Studio',
      img:'outfit-boards/web/b-thu-photostudio.jpg',
      note:'Warm solid earth tones with a little movement — reads well on camera.',
      pieces:['Terracotta fine-knit A-line midi dress','Long draped cream cardigan','Slim tan leather belt','Camel suede ankle boots','Amber teardrop pendant'] },

    { who:'Haydee', day:'Thu 10/22', icon:'bi-bank', mood:'Softer Take', title:'MMFA + Old Montreal + Little Italy',
      img:'outfit-boards/web/b-thu-oldmontreal.jpg',
      note:'A long skirt instead of denim, still built for cobblestones.',
      pieces:['Olive corduroy A-line skirt','Mustard merino turtleneck','Camel wool wrap coat, tie belt','Brown leather ankle boots','Rust wool scarf + suede crossbody'] },

    { who:'Haydee', day:'Thu 10/22', icon:'bi-cup-straw', mood:'Softer Take', title:'Mile End + Plateau Bar Hop',
      img:'outfit-boards/web/b-thu-mileend.jpg',
      note:'Looser and warmer for the bar-hop night.',
      pieces:['Dark indigo straight-leg denim','Rust velvet blouse','Caramel suede jacket, shearling collar','Sleek leather ankle boots','Long fine gold chain'] },

    { who:'Haydee', day:'Fri 10/23', icon:'bi-tree', mood:'Softer Take', title:'Botanical Garden + Laurentians',
      img:'outfit-boards/web/b-fri-laurentians.jpg',
      note:'Just as warm for the gondola, a bit more relaxed in the shape.',
      pieces:['Cream chunky cable-knit sweater','Fleece-lined olive trousers','Rust quilted long coat','Waterproof leather boots','Mustard wool scarf + leather gloves'] },

    /* ===== JESSICA ===== */
    { who:'Jessica', day:'Tue 10/20', icon:'bi-airplane', mood:'Travel', title:'Flight Day — AUS to YYZ',
      img:'outfit-boards/web/j-tue-flight.jpg',
      note:'Soft and easy leaving Texas, layered for a 45&deg;F landing.',
      pieces:['Ivory knit wide-leg trousers','Baby-blue ribbed top','Oversized camel cardigan coat','White leather sneakers','Quilted cream crossbody'] },

    { who:'Jessica', day:'Tue 10/20', icon:'bi-building', mood:'Golden Hour', title:'CN Tower + First Dinner',
      img:'outfit-boards/web/j-tue-cntower.jpg',
      note:'Pretty and warm for the observation deck, straight into dinner after.',
      pieces:['Pleated camel midi skirt','Cream knit with a bow neckline','Tailored blush wool coat','Black Mary Jane flats','Small black top-handle bag'] },

    { who:'Jessica', day:'Tue 10/20', icon:'bi-moon-stars', mood:'Night Out', title:'Church-Wellesley Village',
      img:'outfit-boards/web/j-tue-village.jpg',
      note:'Crews &amp; Tangos, The Drink, Woody\'s. Cute and ready to dance.',
      pieces:['Black pleated mini skirt','Pink sparkly knit top','Cropped cream faux-fur jacket','Patent Mary Jane platforms','Ribbon choker + gold jewelry'] },

    { who:'Jessica', day:'Wed 10/21', icon:'bi-palette2', mood:'Smart Casual', title:'Brunch + AGO',
      img:'outfit-boards/web/j-wed-brunch-ago.jpg',
      note:'Gallery-appropriate and easy to wear straight through to Union Station.',
      pieces:['Straight-leg light-wash jeans','Cropped cream cardigan over a tee','Classic beige trench','Tan leather ballet flats','Small structured handbag'] },

    { who:'Jessica', day:'Wed 10/21', icon:'bi-train-front', mood:'Comfort', title:'VIA Rail — 5.5 Hours',
      img:'outfit-boards/web/j-wed-train.jpg',
      note:'Sit-all-day soft, but cute enough to step off the train into the birthday dinner.',
      pieces:['Soft grey knit wide-leg trousers','Fitted white ribbed top','Oversized blush cardigan','Cream leather loafers','Quilted tote + knit scarf'] },

    { who:'Jessica', day:'Wed 10/21', icon:'bi-cake2', mood:'Dress Up', title:'Adriel\'s Birthday Dinner',
      img:'outfit-boards/web/j-wed-birthday-dinner.jpg',
      note:'THE dinner. Simple little black dress, done properly — the prettiest look of the trip.',
      pieces:['LBD with a sweetheart neckline','Cropped cream blazer','Black strappy low heels','Small black satin clutch','Pearl necklace + gold earrings'] },

    { who:'Jessica', day:'Wed 10/21', icon:'bi-stars', mood:'Big Night', title:'Le Village — Birthday Night Out',
      img:'outfit-boards/web/j-wed-village-mtl.jpg',
      note:'Complexe Sky rooftop, Cabaret Mado, Club Unity. Sparkle, but keep it simple.',
      pieces:['Silver sequined mini skirt','Fitted black bodysuit','Cropped pink satin bomber','Black platform Mary Janes','Tiny silver sparkle bag'] },

    { who:'Jessica', day:'Thu 10/22', icon:'bi-camera2', mood:'On Camera', title:'Monography Photo Studio',
      img:'outfit-boards/web/j-thu-photostudio.jpg',
      note:'One clean color, one simple shape, nothing busy. This is the one going on film.',
      pieces:['Sage-green fitted midi dress','Cropped cream cardigan','Nude slingback low heels','Delicate gold necklace','Simple cream ribbon'] },

    { who:'Jessica', day:'Thu 10/22', icon:'bi-bank', mood:'Walking Day', title:'MMFA + Old Montreal + Little Italy',
      img:'outfit-boards/web/j-thu-oldmontreal.jpg',
      note:'Cobblestones, Notre-Dame, Jean-Talon Market — then straight to Centre Bell.',
      pieces:['Straight-leg dark jeans','Cream cropped cable-knit','Blush quilted jacket','White leather sneakers','Knit beanie + plaid scarf'] },

    { who:'Jessica', day:'Thu 10/22', icon:'bi-music-note-beamed', mood:'Concert', title:'Olivia Rodrigo @ Centre Bell',
      img:'outfit-boards/web/j-thu-concert.jpg',
      note:'You and Adriel! Cute, sparkly and built to jump around in all night.',
      pieces:['Lavender pleated mini skirt','Fitted white baby tee','Cropped silver sparkly cardigan','White platform sneakers','Butterfly clip + silver jewelry'] },

    { who:'Jessica', day:'Fri 10/23', icon:'bi-tree', mood:'Outdoors', title:'Botanical Garden + Laurentians',
      img:'outfit-boards/web/j-fri-laurentians.jpg',
      note:'Peak foliage and the Mont-Tremblant gondola. Cozy, warm, and great in photos.',
      pieces:['Cream chunky cable-knit','Dark slim jeans','Sage quilted puffer coat','Weatherproof tan ankle boots','Pom beanie + plaid scarf'] },

    { who:'Jessica', day:'Fri 10/23', icon:'bi-fire', mood:'Relaxed', title:'Last Night Dinner Out',
      img:'outfit-boards/web/j-fri-dinner.jpg',
      note:'Post-Laurentians. Relaxed but still pretty — last real night in Montreal.',
      pieces:['Burgundy knit midi skirt','Fitted cream ribbed top','Cropped black tailored jacket','Black low-heeled ankle boots','Delicate gold necklace'] },

    { who:'Jessica', day:'Sat 10/24', icon:'bi-airplane-fill', mood:'Travel', title:'Oratory + Fly Home',
      img:'outfit-boards/web/j-sat-travel.jpg',
      note:'Saint Joseph\'s Oratory, last poutine, then YUL. Comfortable and still cute.',
      pieces:['Soft grey knit joggers','Cropped cream hoodie','Oversized blush wrap cardigan','White slip-on sneakers','Quilted crossbody'] },

    /* ===== LULU ===== */
    { who:'Lulu', day:'Tue 10/20', icon:'bi-airplane', mood:'Travel', title:'Flight Day — AUS to YYZ',
      img:'outfit-boards/web/l-tue-flight.jpg',
      note:'Sleek and comfortable leaving Texas, layered for a 45&deg;F landing.',
      pieces:['Black tailored joggers','Fitted cream ribbed top','Oversized camel wool coat','White leather sneakers','Gold hoop earrings'] },

    { who:'Lulu', day:'Tue 10/20', icon:'bi-building', mood:'Golden Hour', title:'CN Tower + First Dinner',
      img:'outfit-boards/web/l-tue-cntower.jpg',
      note:'Sharp and minimal for the observation deck, straight into dinner.',
      pieces:['Black high-waisted trousers','Chocolate-brown turtleneck','Tailored camel overcoat','Pointed ankle boots','Delicate gold jewelry'] },

    { who:'Lulu', day:'Tue 10/20', icon:'bi-moon-stars', mood:'Night Out', title:'Church-Wellesley Village',
      img:'outfit-boards/web/l-tue-village.jpg',
      note:'Crews &amp; Tangos, The Drink, Woody\'s. Bold night-out energy.',
      pieces:['Black faux-leather leggings','Metallic silver camisole','Cropped red statement jacket','Platform ankle boots','Layered gold jewelry'] },

    { who:'Lulu', day:'Wed 10/21', icon:'bi-palette2', mood:'Smart Casual', title:'Brunch + AGO',
      img:'outfit-boards/web/l-wed-brunch-ago.jpg',
      note:'Gallery-appropriate and sleek straight through to Union Station.',
      pieces:['Wide-leg cream trousers','Fitted black turtleneck','Camel blazer','White leather loafers','Layered gold necklaces'] },

    { who:'Lulu', day:'Wed 10/21', icon:'bi-train-front', mood:'Comfort', title:'VIA Rail — 5.5 Hours',
      img:'outfit-boards/web/l-wed-train.jpg',
      note:'Comfortable all day, chic enough to step off into the birthday dinner.',
      pieces:['Wide-leg charcoal trousers','Oversized cream cashmere sweater','Sleek trench coat','Pointed flats','Gold hoop earrings'] },

    { who:'Lulu', day:'Wed 10/21', icon:'bi-cake2', mood:'Dress Up', title:'Adriel\'s Birthday Dinner',
      img:'outfit-boards/web/l-wed-birthday-dinner.jpg',
      note:'THE dinner. Elegant and glamorous — the biggest dress-up night.',
      pieces:['Emerald satin slip dress','Tailored blazer draped over','Strappy heeled sandals','Diamond-style necklace','Metallic clutch'] },

    { who:'Lulu', day:'Wed 10/21', icon:'bi-stars', mood:'Big Night', title:'Le Village — Birthday Night Out',
      img:'outfit-boards/web/l-wed-village-mtl.jpg',
      note:'Bold and dance-ready for Complexe Sky and Cabaret Mado.',
      pieces:['Vinyl-look black leggings','Metallic gold halter top','Cropped fringed jacket','Platform boots','Layered gold chains'] },

    { who:'Lulu', day:'Thu 10/22', icon:'bi-camera2', mood:'On Camera', title:'Monography Photo Studio',
      img:'outfit-boards/web/l-thu-photostudio.jpg',
      note:'Sleek silhouette, solid rich color, nothing busy — this is going on film.',
      pieces:['Cream wide-leg trousers','Burnt-orange rib bodysuit','Draped camel cardigan','Pointed low heels','Delicate gold jewelry'] },

    { who:'Lulu', day:'Thu 10/22', icon:'bi-bank', mood:'Walking Day', title:'MMFA + Old Montreal + Little Italy',
      img:'outfit-boards/web/l-thu-oldmontreal.jpg',
      note:'Chic but comfortable for cobblestones, Notre-Dame and Jean-Talon Market.',
      pieces:['Straight-leg dark denim','Oversized rust sweater','Cropped suede jacket','White leather sneakers','Knit beanie'] },

    { who:'Lulu', day:'Thu 10/22', icon:'bi-cup-straw', mood:'Evening', title:'Mile End + Plateau Bar Hop',
      img:'outfit-boards/web/l-thu-mileend.jpg',
      note:'Your alt plan while Adriel and Jessica are at Centre Bell. Easy, cool, creative-neighborhood energy.',
      pieces:['Wide-leg charcoal trousers','Oversized cream cashmere sweater','Cropped black leather jacket','Pointed black ankle boots','Small structured crossbody'] },

    { who:'Lulu', day:'Fri 10/23', icon:'bi-tree', mood:'Outdoors', title:'Botanical Garden + Laurentians',
      img:'outfit-boards/web/l-fri-laurentians.jpg',
      note:'Warm and weatherproof for the gondola, photogenic against the foliage.',
      pieces:['Cream cable-knit sweater','Slim dark jeans','Burnt-orange quilted coat','Waterproof ankle boots','Knit beanie'] },

    { who:'Lulu', day:'Fri 10/23', icon:'bi-fire', mood:'Relaxed', title:'Last Night Dinner Out',
      img:'outfit-boards/web/l-fri-dinner.jpg',
      note:'Post-Laurentians. Relaxed but chic for the last real night in Montreal.',
      pieces:['Dark green tailored trousers','Cream ribbed knit top','Fitted leather moto jacket','Ankle boots','Delicate gold necklace'] },

    { who:'Lulu', day:'Sat 10/24', icon:'bi-airplane-fill', mood:'Travel', title:'Oratory + Fly Home',
      img:'outfit-boards/web/l-sat-travel.jpg',
      note:'Comfortable and put-together for the Oratory and the flight home.',
      pieces:['Heathered grey joggers','Oversized cream cropped hoodie','Packable puffer jacket','Slip-on sneakers','Sleek crossbody'] }
  ]
};
