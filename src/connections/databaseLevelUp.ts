import { Sequelize } from "sequelize";

const sequelize: Sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/userlevels.sqlite",
});

export default sequelize;
