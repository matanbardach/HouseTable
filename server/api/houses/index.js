const express = require('express');
const { createHouse, getHouse, getAllHouse, updateHouse, deleteHouse } = require('./houses.controller');
const router = express.Router();

router.post('/', createHouse);
router.get('/:id', getHouse);
router.get('/', getAllHouse);
router.put('/:id', updateHouse);
router.delete('/:id', deleteHouse);

module.exports = router;