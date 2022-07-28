import { Sequelize } from "sequelize";
import "dotenv/config";
const db = new Sequelize(process.env.DB_URI);

export default db;
