exports.seed = function(knex, Promise) {
  return knex('attendance').del()
    .then(function () {
      return Promise.all([
        knex('attendance').insert([{ slot_id: 1, user_id:1, available:true}]),
        knex('attendance').insert([{ slot_id: 2, user_id:2, available:true}]),
        knex('attendance').insert([{ slot_id: 3, user_id:3, available:true}]),
        knex('attendance').insert([{ slot_id: 4, user_id:4, available:false}]),
        knex('attendance').insert([{ slot_id: 5, user_id:5, available:false}]),
        knex('attendance').insert([{ slot_id: 6, user_id:1, available:false}]),
        knex('attendance').insert([{ slot_id: 7, user_id:2, available:true}]),
        knex('attendance').insert([{ slot_id: 8, user_id:3, available:true}]),
        knex('attendance').insert([{ slot_id: 9, user_id:4, available:false}]),
        knex('attendance').insert([{ slot_id: 10, user_id:5, available:false}]),
        knex('attendance').insert([{ slot_id: 10, user_id:1, available:true}]),
        knex('attendance').insert([{ slot_id: 2, user_id:2, available:true}]),
        knex('attendance').insert([{ slot_id: 3, user_id:3, available:true}]),
        knex('attendance').insert([{ slot_id: 4, user_id:4, available:false}]),
        knex('attendance').insert([{ slot_id: 5, user_id:5, available:false}])
      ]);
    })
};