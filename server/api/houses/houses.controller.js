const housesService = require('../../services/houses.service');
const logger = require('../../services/logger');
const createHouse = async (req, res) => {
    const { body: { address, currentValue, loanAmount }} = req;
    try {
        const createdHouse = await housesService.create({address, currentValue, loanAmount});
        res.send(createdHouse);
    } catch(err) {
        logger.error('house.controller Failed create new house');
        res.status(500).json('Failed to create new house');
    }
}

const getHouse = async (req, res) => {
    const { params: { id } } = req;
    try {
        const house = await housesService.get(id);
        if(!house) {
            setTimeout(() => { // simulate pending (for ui)
                console.log('HELLO11')
                res.status(404).send(`Not fount house id: ${id}`);
            }, 3000);
        } else {
            setTimeout(() => { // simulate pending (for ui)
                res.send(house); 
            }, 3000);
            
        }
    } catch(err) {
        res.status(500).json('Failed to get house');
    }
}

const updateHouse = async (req, res) => {
    const { params: { id }, body: { currentValue, loanAmount } } = req;
    try {
        const house = await housesService.get(id);
        if(!house) {
            res.status(404).send(`House Not fount id: ${id}`);
        } else {
            await housesService.update(house, { currentValue, loanAmount });
            house.currentValue = currentValue || house.currentValue;
            house.loanAmount = loanAmount || house.loanAmount;
            await house.save();
            return res.send(house);
        }
    } catch (err) {
        res.status(500).json(`Failed to update house id: ${id}`);
    }
}

const deleteHouse = async(req, res) => {
    const { params: { id } } = req;
    try {
        await housesService.remove(id);
        res.send('removed');
    } catch(err) {
        res.status(500).json(`Failed to delete house id: ${id}`);
    }
}

const getAllHouse = async(req, res) => {
    try {
        const allHouse = await housesService.getAll();
        res.send(allHouse);
    } catch(err) {
        res.status(500).json(`Failed to delete house id: ${id}`);
    }
}

module.exports = {
    createHouse,
    getHouse,
    getAllHouse,
    updateHouse,
    deleteHouse
}
