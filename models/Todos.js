import { Sequelize, DataTypes } from "sequelize";
import db from "../utils/database.js";
const Todos = db.define(
  "User",
  {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    finished: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    tableName: "todos",
  }
);

export default Todos;
