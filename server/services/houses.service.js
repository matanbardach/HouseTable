const logger = require('./logger');
const House = require('../db/House');

const calculateRisk = (house) => {
    const { loanAmount, currentValue = 0, risk = 0 } = house;
    if(loanAmount * 2 > currentValue) {
        return (1 - risk)/10 + risk;
    }
    return risk;
}

const get = async (houseId) => {
    try {
        const createdHouse = await House.findOne({where: {id: houseId}});
        return createdHouse;
    } catch(err) {
        logger.error('house.service:get failed to fetch', { err });
        throw err;
    }
}

const getAll = async() => {
    try {
        const allHouse = await House.findAll();
        return allHouse;
    } catch(err) {
        logger.error('house.service:getAll failed to fetch all', { err });
        throw err;
    }
}

const create = async ({address, currentValue, loanAmount}) => {
    try {
        const risk = calculateRisk({currentValue, loanAmount});
        const houseCreated = await House.create({address, currentValue, loanAmount, risk});
        return houseCreated;
    } catch(err) {
        logger.error('house.service:create failed to create', { err });
        throw err;
    }
}
// await housesService.update(house, { currentValue, loanAmount });
const update = async (house, { currentValue, loanAmount }) => {
    try {
        house.currentValue = currentValue || house.currentValue;
        house.loanAmount = loanAmount || house.loanAmount;
        house.risk = calculateRisk(house);
        await house.save();
        return house;
    } catch(err) {
        logger.error('house.service:update failed to update', { houseId: house.id, err });
        throw err;
    }

}

const remove = async(houseId) => {
    try {
        await House.destroy({where: {id: houseId}});
    } catch(err) {
        logger.error('house.service:remove failed to remove', { err });
        throw err;
    }
}

module.exports = {
    get,
    getAll,
    create,
    update,
    remove,
}