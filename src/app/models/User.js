import Sequelize, { Model } from "sequelize";

//          Herdando coisas de Model
class User extends Model {
  static init(sequelize) {
    Model.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      },
    );
  }
}

export default User;
