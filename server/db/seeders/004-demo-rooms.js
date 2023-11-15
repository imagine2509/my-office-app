/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const demoRooms = [
      {
        officeId: 1,
        name: 'Встречи У Ашота',
        amount: 24,
        video: true,
        description:
          'Переговорка в французском стиле с клопами и картинами с видами Парижа. Видеосвязь присутствует. Туалет в соседнем здании (7 минут пешком + ожидание лифта). Штраф за курение : 10 плетей.',
        photo: 'src/assets/img/rooms/1.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        officeId: 1,
        name: 'Подвальный рейв',
        amount: 180,
        video: false,
        description:
          "Самая вместительная переговорка нашего офиса. Внимание: находится на -1 этаже (кнопка лифта 'гараж'). Указано количество мест при отсутствии автомобилей",
        photo: 'src/assets/img/rooms/2.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        officeId: 1,
        name: "Переговорка руководителей 'Олимп'",
        amount: 12,
        video: true,
        description:
          'Личный конференс-терминал для каждого посетителя, 12 массажных кресел, минибар, сауна. Только для руководителей.',
        photo: 'src/assets/img/rooms/3.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        officeId: 1,
        name: 'Столовая',
        amount: 8,
        video: false,
        description: 'Ненуашо?',
        photo: 'src/assets/img/rooms/4.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        officeId: 2,
        name: "Курилка 'За углом'",
        amount: 20,
        video: false,
        description:
          'Переговорка на свежем воздухе в никотиновом дыму и вишнёвом саду. Способствует улучшению здоровья и ухудщению одновременно',
        photo: 'src/assets/img/rooms/5.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        officeId: 3,
        name: 'Meeting room 1',
        amount: 48,
        video: true,
        description:
          'Основная комната обучения. Бронь возможна только с правами админисратора.',
        photo: 'src/assets/img/rooms/6.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        officeId: 3,
        name: 'Meeting room 2',
        amount: 12,
        video: true,
        description:
          "Правое крыло четвертого корпуса на главноё аллее. После стеклянных дверей: налево, вверх 1этаж, направо, комната с надписью 'Проктолог'",
        photo: 'src/assets/img/rooms/7.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        officeId: 4,
        name: "Переговорка 'Америка'",
        amount: 16,
        video: true,
        description:
          'Стильная переговорная комната, оформленная в стиле индейского поселения.',
        photo: 'src/assets/img/rooms/8.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        officeId: 5,
        name: "Переговорка 'Берёзка'",
        amount: 6,
        video: false,
        description: 'Лучшие приёмы итальянского барокко в подвале вашего офиса',
        photo: 'src/assets/img/rooms/9.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        officeId: 6,
        name: 'Комната Севы',
        amount: 1,
        video: false,
        description: 'Ёжик в тумане',
        photo: 'src/assets/img/rooms/12.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        officeId: 7,
        name: 'Комната Гоши',
        amount: 1,
        video: false,
        description: 'где мой ибупрофен ?',
        photo: 'src/assets/img/rooms/11.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        officeId: 8,
        name: 'Комната Кеши',
        amount: 1,
        video: false,
        description: 'NBA , детка !',
        photo: 'src/assets/img/rooms/10.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Rooms', demoRooms, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rooms', null, { restartIdentity: true, truncate: true });
  },
};
