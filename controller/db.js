const {
        Pool
} = require('pg')

const pool = new Pool({
        host: 'localhost',
        port: 5432,
        database: "twitterdb",
        user: 'postgres',
        password: 'c',
        ssl: 'any',
        max: 10,
})

pool.connect()
        .then(() => console.log('Connected on twitter database'))
        .catch(err => console.error('Connection twitter database error', err.stack))

exports.initDB = () => {
        pool.query(`
                CREATE TABLE IF NOT EXISTS users (
                        id SERIAL PRIMARY KEY UNIQUE,
                        email VARCHAR(40) not null UNIQUE,
                        name VARCHAR(40) not null,
                        password VARCHAR(40) not null);

                CREATE TABLE IF NOT EXISTS  posts (
                        id SERIAL PRIMARY KEY UNIQUE,
                        content VARCHAR(40) not null,
                        user_id integer not null,
                        FOREIGN KEY (user_id) REFERENCES users (id));

                CREATE TABLE IF NOT EXISTS comments(
                        id SERIAL PRIMARY KEY UNIQUE,
                        content VARCHAR(40) not null,
                        user_id integer,
                        post_id integer,
                        FOREIGN KEY (post_id) REFERENCES posts (id),
                        FOREIGN KEY (user_id) REFERENCES users (id))`,
                (error, result) => {
                        if (error) {
                                console.log(error)
                                // res.status(400).send(error)
                        }
                })
}