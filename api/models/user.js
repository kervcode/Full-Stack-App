"use strict";
const Sequelize = require("sequelize");

//Defining the user model

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter a value for 'First Name'",
          },
          notEmpty: {
            msg: "Please enter a value for 'First Name'",
          },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter a value for 'Last Name'",
          },
          notEmpty: {
            msg: "Please enter a value for 'Last Name'",
          },
        },
      },
      emailAddress: {
        type: Sequelize.STRING,
        unique: {
          msg: "emailAdress is already in use.",
        },
        allowNull: false,
        validate: {
          isEmail: { msg: "Please enter a valid email" },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter a value for 'password'",
          },
        },
      },
    },
    { sequelize }
  );

  // Associate user table with a One-to-Many association with the course table
  User.Associate = (models) => {
    User.hasMany(models.Course, {
      as: "Owner",
      foreignKey: {
        fieldName: "userId",
        allowNull: false,
      },
    });
  };

  return User;
};
