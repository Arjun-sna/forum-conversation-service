import { DataTypes } from "sequelize";

export default (sequelize: any) => {
  sequelize.define("conversation", {
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  });
};
