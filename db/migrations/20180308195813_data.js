
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.insert([{user_name: 'John Smith', user_email:'john@john.john'}], 'id').into('users')
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([

    ])
};
// //knex.insert([{title: 'Great Gatsby'}, {title: 'Fahrenheit 451'}], 'id').into('books')
// INSERT INTO users (user_name, user_email)
// VALUES
// ('John Smith', 'john@john.john'),
// ('Sally Doe', 'sally@smith.john'),
// ('Jorge Luiz', 'jorgeluiz@gmail.com'),
// ('Tina', 'tina@yahoo.com'),
// ('Stewart', 'stewart@google.com'),
// ('Alice', 'alice@newborn.com'),
// ('Don', 'don@lighthouselabs.com'),
// ('Joel', 'joellighthouselabs.com'),
// ('Jeremy', 'jeremy@lighthouselabs.com'),
// ('Sam', 'sam@lighthouselabs.com');
