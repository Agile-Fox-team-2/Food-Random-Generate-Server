'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Food, { foreignKey: 'UserId' })
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'First Name must not be empty'
        },
        len: {
          args: 3,
          msg: 'First Name must be at least 3 characters'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Last Name must not be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email must not be empty'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email address'
        }
      },
      unique: {
          args: true,
          msg: 'Email address already in use'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password must not be empty'
        },
        len: {
          args: 8,
          msg: "Password must be at least 8 characters"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};