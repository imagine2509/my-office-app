const { EOL } = require('os');
const fs = require('fs').promises;
const { sequelize } = require('./db/models');

module.exports = async function testConnection() {
  const fullErrorFileName = 'dbconnerr.txt';
  const conColors = {
    yellow: '\x1b[33m',
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
  };
  try {
    await sequelize.authenticate();
    console.log(`${conColors.green}Успешное подключение к базе данных.${conColors.reset}`);
  } catch (error) {
    console.error(`${conColors.red}Не удалось подключиться к базе данных!${conColors.reset}${EOL}Причина: "${conColors.yellow}${error.original.routine}${conColors.reset}".${EOL}Полное описание см. в файле ${fullErrorFileName}.`);
    await fs.writeFile(fullErrorFileName, JSON.stringify(error));
    process.exit();
  }
  return true;
};