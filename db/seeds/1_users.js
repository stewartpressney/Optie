exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert([{user_name: 'John Smith', user_email:'john@john.john'}]),
        knex('users').insert([{user_name: 'Sally Doe', user_email:'sally@smith.john'}]),
        knex('users').insert([{ user_name: 'Jorge Luiz', user_email:'john@john.john'}]),
        knex('users').insert([{ user_name: 'Tina', user_email:'tina@yahoo.com'}]),
        knex('users').insert([{ user_name: 'Stewart', user_email:'stewart@google.com'}]),
        knex('users').insert([{ user_name: 'Alice', user_email:'alice@newborn.com'}]),
        knex('users').insert([{ user_name: 'Don', user_email:'don@lighthouselabs.com'}]),
        knex('users').insert([{ user_name: 'Joel', user_email:'joellighthouselabs.com'}]),
        knex('users').insert([{ user_name: 'Jeremy', user_email:'jeremy@lighthouselabs.com'}]),
        knex('users').insert([{ user_name: 'Sam', user_email:'sam@lighthouselabs.com'}])
      ]);
    })
};