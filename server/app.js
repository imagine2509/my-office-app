// пакет для автоматической компиляции файлов (JSX > HTML)
require('@babel/register');

// использование данных из конфигурации файла .env
require('dotenv').config();

const express = require('express');
const serverConfig = require('./config/serverConfig');

// роутеры
const apiRouter = require('./routes/api/main.routes');
const mainRouter = require('./routes/views/main.routes');
const usersRouter = require('./routes/views/users.routes');

const errorHandler = require('./middleware/errorHandler');

// инициализация приложения 'app'
const app = express();

// условное формирование порта
const PORT = process.env.PORT ?? 3001;

// конфигурация приложения
serverConfig(app);

// маршрутизация приложения
app.use('/', mainRouter);
app.use('/api', apiRouter);
app.use('/user', usersRouter);

// обработка ошибок из next(error)
app.use(errorHandler);

// прослушивание порта приложения
app.listen(PORT, () => {
	console.log(`*** Server started at ${PORT} port ***`);
});
