export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    user: process.env.DB_USER ?? 'user',
    password: process.env.DB_PASS ?? 'password',
    database: process.env.DB_NAME ?? 'mydb',
  },
});
