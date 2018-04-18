const Sequelize = require('sequelize')
const db = require('../db')

const Orderline = db.define('orderline', {
    id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  priceCents: {
    type: Sequelize.INTEGER, // will be in cents
    allowNull: false
  },
  price: {
    type: Sequelize.VIRTUAL,
    get () {
      return (this.getDataValue('priceCents') / 100).toFixed(2);
    }
  },
  totalPrice: {
    type: Sequelize.VIRTUAL,
    get () {
      return this.getDataValue('qty') * this.getDataValue('price');
    }
  }
});

module.exports = Orderline;
