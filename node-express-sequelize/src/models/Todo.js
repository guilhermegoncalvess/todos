const { Model, DataTypes } = require('sequelize');
const { UUIDV4 } = require('sequelize');

class Todo extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: UUIDV4
            },
            title: DataTypes.STRING,
            completed: DataTypes.BOOLEAN,
        }, {
            sequelize
        })
    }
}

module.exports = Todo;