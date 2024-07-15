'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
      name: 'John Doe',
      email: "123@123",
      password: await bcrypt.hash('123', 10),
      },
      {
        name: 'Владислав Песков',
        email: "xfemidax@mail.ru",
        password: await bcrypt.hash('123', 10),
        }
    ], {});
    await queryInterface.bulkInsert(
      'Posts', [
        {
          userId: 1,
          name: 'Alice',
          city: 'New York',
          comment: 'This is a great place!',
          money: '1000',
          country: 'USA',
          time: '2024-07-09T15:30:00.000Z',
          image: 'https://c.wallhere.com/photos/75/a9/1200x800_px_city_Far_View_Metropolis_New_York_State_Skyscraper-1312139.jpg!d',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2,
          name: 'Bob',
          city: 'Los Angeles',
          comment: 'I love this weather!',
          money: '2000',
          country: 'USA',
          time: '2024-07-09T16:45:00.000Z',
          image: 'https://bogatyr.club/uploads/posts/2023-03/1677877364_bogatyr-club-p-los-andzheles-foni-krasivo-5.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2,
          name: 'Charlie',
          city: 'Chicago',
          comment: 'Amazing city life!',
          money: '1500',
          country: 'USA',
          time: '2024-07-09T17:00:00.000Z',
          image: 'https://avatars.mds.yandex.net/i?id=30f52ed39376e8de97fe2580fae86c20c676a380-11380860-images-thumbs&n=13',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
