"use strict";
const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");
const JwtService = require("../modules/auth.module");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "Users",
  {
    firstName: {
      type: DataTypes.STRING,
      // validate: {
      //   notNull: { msg: "firstname is required" }
      // }
    },
    lastName: {
      type: DataTypes.STRING,
      // validate: {
      //   notNull: { msg: "firstname is required" }
      // }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isEmail: { msg: "Invalid email" },
      //   notNull: { msg: "email is required" }
      // },
      unique: {
        args: true,
        msg: "Email address already in use!"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notNull: { msg: "password is required" }
      // }
    },
    verificationCode: {
      type: DataTypes.STRING
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    role: {
      type: DataTypes.ENUM("systemAdmin", "subAdmin", "user"),
      defaultValue: "user"
    }
  },
  {}
);

User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

User.prototype.toJSON = function() {
  var values = Object.assign({}, this.get());

  delete values.password;
  if (values.verificationCode) {
    delete values.verificationCode;
  }
  return values;
};

User.beforeCreate(user => {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
});

User.beforeUpdate(user => {
  if (user.password) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
  }
});

User.associate = function(models) {
  // associations can be defined here
  User.belongsTo(models.Business, {
    foreignKey: "businessId",
    as: "business"
  });
  User.hasMany(models.Attendee, {
    foreignKey: "userId",
    as: "user"
  });
  User.hasMany(models.Booking, {
    foreignKey: "bookedBy",
    as: "bookedBy"
  });
};

module.exports = User;
