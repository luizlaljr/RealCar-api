const {
  Model,
  DataTypes
} = require('sequelize');

class Item extends Model{
  static init(sequelize){
      super.init({
          name: DataTypes.STRING,
          code: DataTypes.STRING,
          value: DataTypes.INTEGER,
          status: DataTypes.BOOLEAN,
      },{
          sequelize,
          tableName: 'items'
      })
  }
}

module.exports = Item;
