const express = require('express');
const routes = express.Router();

const ItemController = require('./controllers/ItemController');
const FetchController = require('./controllers/FetchController');

routes.get('/item', ItemController.index);
routes.post('/item', ItemController.store);
routes.get('/item/:item_id', ItemController.show);
routes.put('/item/:item_id', ItemController.update);
routes.delete('/item/:item_id', ItemController.destroy);

routes.get('/fetch', FetchController.index);

module.exports = routes;
