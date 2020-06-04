const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create User model
class User extends Model {}

//define table columns and configuration
User.init(
    {
        // id column
        id : {
            //use the special Sequelize DataTypes object to provide what type of data this is
            type: DataTypes.INTEGER,
            //equivalent to SQL's NOT NULL
            allowNull: false,
            //instruct this is a primary key
            primaryKey: true,
            //turn on auto increment
            autoIncrement: true
        },
        // define user name column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //define email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //sets uniqueness to email field (no duplicates)
            unique: true,
            //if allowNull is set to false, we can run validation of data through here
            validate: {
                isEmail: true
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // len - sets validation to check for minimum length of field i.e password
                len: [4]
            }
        }
    },
    {
        // TABLE CONFIG OPTIONS GO HERE 

        // pass in our imported connection
        sequelize,
        // disable automatically created timestamps
        timestamps: false,
        // don't pluralize name on db table
        freezeTableName: true,
        // uses under_score instead of camelCasing
        underscored: true,
        // make it so our model name stays lowercase in the db
        modelName: 'user'
    }   
);

module.exports = User