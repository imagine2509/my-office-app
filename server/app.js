// пакет для автоматической компиляции файлов (JSX > HTML)
require('@babel/register');

// использование данных из конфигурации файла .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const serverConfig = require('./config/serverConfig');

// роутеры
const apiRouter = require('./routes/api/main.routes');
const activationRoute = require('./routes/api/user.activation.routes');
const loginRoute = require('./routes/api/user.login.routes');
const logoutRoute = require('./routes/api/user.logout.routes');
const registerRoute = require('./routes/api/user.register.routes');
const userRoomRoute = require('./routes/api/userRoom.routes');
const refreshRoute = require('./routes/api/user.tokenRefresh.routes');
const validateAccess = require('./routes/api/user.validateAccess.routes');
const getAllRoute = require('./routes/api/user.getAll.routes');
const birthRouter = require('./routes/views/birth.routes');
const officeRouter = require('./routes/api/office.routes');
const roomRouter = require('./routes/api/room.routes');
const modifyUser = require('./routes/api/user.modify.routes');
const errorHandler = require('./middleware/errorHandler');

// инициализация приложения 'app'
const app = express();

// условное формирование порта
const PORT = process.env.PORT ?? 3001;

// конфигурация приложения
serverConfig(app);
const corsOptions = {
	origin: true,
	credentials: true,
};
app.use(cors(corsOptions));

// маршрутизация приложения
//app.use('/', mainRouter);
app.use('/api', apiRouter);
app.use('/api/userroom/', userRoomRoute);
app.use('/api/user/', activationRoute);
app.use('/api/user/', loginRoute);
app.use('/api/user/', logoutRoute);
app.use('/api/user/', registerRoute);
app.use('/api/user/', refreshRoute);
app.use('/api/user/', validateAccess);
app.use('/api/user/', modifyUser);
//app.use('/api/user/', getAllRoute);
app.use('/api', officeRouter);
app.use('/api/room/', roomRouter);
app.use('/birth', birthRouter);

// обработка ошибок из next(error)
app.use(errorHandler);

// прослушивание порта приложения
app.listen(PORT, () => {
	console.log(`*** Server started at ${PORT} port ***`);
});
