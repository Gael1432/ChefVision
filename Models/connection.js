import Sequelize from 'sequelize';
// import  PostgresDialect  from '@sequelize/postgres';
const [user, pass, host, port, database] = [process.env.USER_DB, process.env.PASS, process.env.HOST, process.env.PORT_DB, process.env.DATABASE]

const db = new Sequelize(database, user, pass, {
	host,
	port,
	dialect: 'postgres',
	define: {
		timestamps: false
	},
	pool: {
		max: 5,
		min: 0,
		acquire: 3000,
		idle: 10000
	},
	// operatorsAliases: false
});

export default db