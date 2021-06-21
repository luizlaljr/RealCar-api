const { Op } = require('sequelize');
const Item = require('../models/Item');

module.exports = {
  async index(req,res) {
    try {
      const {name} = req.query

      const items = await Item.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
          ]
        },
        where: {
          name: {[Op.iLike]: `%${name}%`}
        },
        order: ['name']
      });

      return res.status(200).json(items);

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para listar os items.",
        "info-error": error.message,
      });
    }
  }
}
