const Item = require('../models/Item');

module.exports = {
  async index(_,res) {
    try {
      const items = await Item.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
          ]
        }
      });

      return res.status(200).json(items);

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para listar os items.",
        "info-error": error.message,
      });
    }
  },

  async store(req, res){
    try {
      const {
        items
      } = req.body;

      for (const {code, name, value, status} of items) 
        {
          await Item.create({
            code, 
            name, 
            value, 
            status
          });
        }

      return res.status(201).json({
        "message": "Items criados com sucesso.",
      });
      
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        "message-error": "Houve algum problema para salvar estes items.",
        "info-error": error.message,
      });
    }
  },

  async show(req, res) {
    try {
      const {
        item_id,
      } = req.params;
      const item = await Item.findByPk(item_id,{
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
          ]
        }
      });

      return res.status(200).json(item);

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para encontrar este item.",
        "info-error": error.message,
      });
    };
  },

  async update(req, res){
    try {
      const {
        item_id,
      } = req.params;

      const {
        code, 
        name, 
        value, 
        status
      } = req.body;

      const item = await Item.findByPk(item_id);

      await Item.update(
        {
          code: code == null ? item.code : code,
          name: name == null ? item.name : name,
          value: value == null ? item.value : value,
          status: status == null ? item.status : status,
        },
        {
          where: {id: item_id}
        }
      )
      
      return res.status(200).json({
        "message": "Item atualizado com sucesso.",
    });

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para atualizar este item.",
        "info-error": error.message,
      });
    }
  },

  async destroy(req, res) {
    try {
      const {
        item_id,
      } = req.params;

    
      await Item.destroy({
        where: {
          id: item_id,
        }
      });

      return res.status(202).json({
        "message": "Item removido com sucesso.",
      });

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para remover este item.",
        "info-error": error.message,
      });
    }
  }
}
