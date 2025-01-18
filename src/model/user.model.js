const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncremente: true,
        allowNull: false,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Invalid email");
          }
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            throw new Error(
              "Password must contain at least one letter and one number"
            );
          }
        },
      },
      mobile_no: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        minlength: 10,
      },
      createdBy: {
        type: DataTypes.DATE(3),
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP(3)"),
      },
      createdAt: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updatedBy: {
        type: DataTypes.DATE(3),
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP(3)"),
      },
      updatedAt: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 8);
  });

  User.beforeUpdate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 8);
    }
  });

  User.prototype.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
  };
  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };
  User.sync();
  return User;
};
