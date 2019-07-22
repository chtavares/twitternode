const {
        Pool
} = require('pg')

exports.connectDB = () => {
        const pool = new Pool({
                host: 'localhost',
                port: 5432,
                database: "twitterdb",
                user: 'postgres',
                ssl: 'any',
                max: 10,
        })

        pool.connect()
                .catch(err => console.error('Connection twitter database error', err.stack))
        return pool
}

exports.initDB = function intiDB() {
        const pool = this.connectDB()
        pool.query(`
                CREATE TABLE IF NOT EXISTS users (
                        id SERIAL PRIMARY KEY UNIQUE,
                        email VARCHAR(40) not null UNIQUE,
                        name VARCHAR(40) not null,
                        password VARCHAR(40) not null);

                CREATE TABLE IF NOT EXISTS  posts (
                        id SERIAL PRIMARY KEY UNIQUE,
                        content VARCHAR(240) not null,
                        user_id integer not null,
                        FOREIGN KEY (user_id) REFERENCES users (id));

                CREATE TABLE IF NOT EXISTS comments(
                        id SERIAL PRIMARY KEY UNIQUE,
                        content VARCHAR(240) not null,
                        user_id integer,
                        post_id integer,
                        FOREIGN KEY (post_id) REFERENCES posts (id),
                        FOREIGN KEY (user_id) REFERENCES users (id))`,
                (error) => {
                        if (error) {
                                console.log(error)
                        }
                })
        pool.end()
}