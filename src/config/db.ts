import { Sequelize } from "sequelize";

import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from "./constants";

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: DB_HOST,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASS,
});

export default sequelize;
