const { DataTypes } = require('sequelize');
const User = require('../models/User');
const { connection } = require('../database/connection');


const Place = connection.define('places', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Name cannot be empty." },
            len: {
                args: [5, 150],
                msg: "Name length must be between 5 and 150 characters."
            }
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Description cannot be empty." }
        }
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Location cannot be empty." }
        }
    },
    latitude: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Latitude cannot be empty." },
            isDecimal: { msg: "Latitude must be a valid decimal number." }
        }
    },
    longitude: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Longitude cannot be empty." },
            isDecimal: { msg: "Longitude must be a valid decimal number." }
        }
    },
    accessibility: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Accessibility cannot be empty." },
            isIn: {
                args: [['Accessible', 'Partially Accessible', 'Not Accessible']],
                msg: "Accessibility must be one of: 'Accessible', 'Partially Accessible', 'Not Accessible'."
            }
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Category cannot be empty." }
        }
    },
    rating: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Rating cannot be empty." },
            isIn: {
                args: [['1', '2', '3', '4', '5']],
                msg: "Rating must be one of: '1', '2', '3', '4', '5'."
            }
        }
    },
});

// Validation to define the relation between User and Place
Place.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Place, { foreignKey: 'user_id', onDelete: 'RESTRICT' });

module.exports = Place;
