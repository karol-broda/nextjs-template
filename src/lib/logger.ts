import pino from 'pino';

const isDev = process.env['NODE_ENV'] === 'development';
const level = process.env['LOG_LEVEL'] ?? 'info';

const logger = isDev
  ? pino({
      level,
      transport: { target: 'pino-pretty', options: { colorize: true } },
    })
  : pino({ level });

export default logger;
