const DB = require('../../data/db-Config.js');

module.exports = {
  addBuyer,
  findBuyer,
  findBuyerById,
  findOrder,
  addOrder,
};

function addBuyer(buyer) {
  return DB('buyer')
    .insert(buyer, 'id')
    .then((ids) => {
      return findBuyerById(ids[0]);
    });
}

function findBuyer() {
  return DB('buyer');
}

function findBuyerById(id) {
  return DB('buyer').where({ id }).first();
}

function findOrder(orderId) {
  return DB('buyer as B')
    .join('order as O', 'O.buyerId', 'B.id')
    .select(
      'O.id',
      'B.contactName',
      'B.email',
      'B.organizationName',
      'B.contactPhone',
      'O.contactName',
      'O.contactPhone',
      'O.organizationWebsite',
      'O.soapBarNum',
      'O.address',
      'O.address',
      'O.country',
      'O.beneficiariesNum',
      'O.hygieneSituation',
      'O.hygieneInitiative',
      'O.comments'
    )
    .where('B.id', orderId)
    .orderBy('O.id');
}

function addOrder(order, buyerId) {
  return DB('order')
    .insert(order, buyerId)
    .then((ids) => {
      return findOrder(ids[0]);
    });
}
