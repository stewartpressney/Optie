exports.seed = function(knex, Promise) {
  return knex('events').del()
    .then(function () {
      return Promise.all([
        knex('events').insert([{ event_title: 'Grouse Mountain', event_description:'A Magical Winter Adventure With The North Shore', event_meeting:'Grouse Mountain', event_url:'https://www.grousemountain.com/', user_id:2}]),
        knex('events').insert([{ event_title: 'Alice Lake Provincial Park', event_description:'Alice Lake is surrounded by towering mountains, dense forests and grassy areas.', event_meeting:'Alice Lake', event_url:'http://www.env.gov.bc.ca/bcparks/explore/parkpgs/alice_lk/', user_id:1}]),
        knex('events').insert([{ event_title: 'Kitsilano Beach', event_description:'Kitsilano Beach, known as "Kits" Beach, is located on Cornwall Ave at the north end of Yew St.', event_meeting:'Kitsilano Beach', event_url:'http://vancouver.ca/parks-recreation-culture/kitsilano-beach.aspx', user_id:3}]),
        knex('events').insert([{ event_title: 'Whistler', event_description:'Whistler é uma cidade estância do Canadá. Está localizada ao sul dos Pacific Ranges das Montanhas Costeiras, na Colúmbia Britânica, cerca de 125 km ao norte de Vancouver.', event_meeting:'Whistler Restaurant', event_url:'https://www.whistler.com/', user_id:4}]),
        knex('events').insert([{ event_title: 'Taipei', event_description:'Taipei City, is the capital and a special municipality of Taiwan', event_meeting:'YVR airport', event_url:'https://en.wikipedia.org/wiki/Taipei', user_id:5}])
      ]);
    })
};