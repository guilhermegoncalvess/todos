module.exports = {
    dialect: 'postgres',
    host: "db",
    username: 'postgres',
    password: 'docker',
    database: 'todos',
    port: 5432,
    define: {
        timestamps: true,
        underscored: true,
    }
}