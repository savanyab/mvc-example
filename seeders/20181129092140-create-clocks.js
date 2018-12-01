'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {  
      return queryInterface.bulkInsert('Clocks', [
        {
        manufacturer: 'Casio',
        model: 'Szamologepes',
        type: '90-es evek retro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'Rolex',
        model: 'Puccos',
        type: 'arany',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);   
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
