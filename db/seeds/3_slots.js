exports.seed = function(knex, Promise) {
  return knex('slots').del()
    .then(function () {
      return Promise.all([
        knex('slots').insert([{ slot_date: '3/12/2018', slot_start:'12:00 pm', slot_end: '3:00 pm', event_id:1}]),
        knex('slots').insert([{ slot_date: '3/12/2018', slot_start:'1:00 pm', slot_end: '4:00 pm', event_id:2}]),
        knex('slots').insert([{ slot_date: '3/12/2018', slot_start:'6:00 pm', slot_end: '9:00 pm', event_id:3}]),
        knex('slots').insert([{ slot_date: '3/17/2018', slot_start:'1:30 pm', slot_end: '10:00 pm', event_id:4}]),
        knex('slots').insert([{ slot_date: '3/17/2018', slot_start:'2:00 pm', slot_end: '11:00 pm', event_id:5}]),
        knex('slots').insert([{ slot_date: '3/18/2018', slot_start:'3:30 pm', slot_end: '8:00 pm', event_id:1}]),
        knex('slots').insert([{ slot_date: '3/24/2018', slot_start:'1:30 pm', slot_end: 'All Day', event_id:2}]),
        knex('slots').insert([{ slot_date: '3/24/2018', slot_start:'1:00 am', slot_end: '3:00 am', event_id:3}]),
        knex('slots').insert([{ slot_date: '3/24/2018', slot_start:'2:00 am', slot_end: '6:00 am', event_id:4}]),
        knex('slots').insert([{ slot_date: '3/3/2018', slot_start:'12:00 pm', slot_end: '7:30 pm', event_id:5}]),
        knex('slots').insert([{ slot_date: '3/1/2018', slot_start:'9:00 am', slot_end: 'All Day', event_id:1}]),
        knex('slots').insert([{ slot_date: '3/31/2018', slot_start:'12:00 pm', slot_end: '3:00 pm', event_id:2}]),
        knex('slots').insert([{ slot_date: '4/1/2018', slot_start:'2:00 pm', slot_end: '3:00 pm', event_id:3}]),
        knex('slots').insert([{ slot_date: '4/1/2018', slot_start:'11:30 pm', slot_end: '3:00 pm', event_id:4}]),
        knex('slots').insert([{ slot_date: '4/1/2018', slot_start:'6:00 am', slot_end: 'All Day', event_id:5}]) 
      ]);
    })
};