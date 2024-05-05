const { DataTypes } = require('sequelize');
const { connection } = require('../database/connection');

const User = connection.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: { 
                args: [3, 33], 
                msg: "Name length must be between 3 and 33 characters.",
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: "Email should be valid." }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8, 80],
                msg: "Password should have from 8 to 80 characters",
            },
        }
    },
    gender: {   
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['Male', 'Female', 'Other']],
                msg: "Gender must be one of: 'Male', 'Female', 'Other'."
            }
        }
    },    
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: { msg: "Invalid date format. Please use YYYY-MM-DD." }
        }
    },
    CPF: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Ops! CPF already registered." },
        validate: {
            is: {
                args: /^\d{11}$/,
                msg: "CPF must have 11 numeric digits."
            }
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true
            }
        }
});

module.exports = User;
