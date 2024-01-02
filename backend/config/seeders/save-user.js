/* eslint-disable linebreak-style */

const table = 'users';
const listArray = [
  {
    email: 'admin@mailinator.com',
    password: '$2a$10$6qwlLxlhsoGtjAum9QEf8.qtUfp2uLVs.LtyvIgUguoSI51QnHtMS',
  },
];
const data = listArray.map((element, index) => ({
  email: element.email,
  password: element.password,
  created_at: new Date(),
  updated_at: new Date(),
}));

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(table, data, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete(table, null, {}),
};
