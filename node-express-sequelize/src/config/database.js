module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'todos',
    define: {
        timestamps: true,
        underscored: true,
    }
}