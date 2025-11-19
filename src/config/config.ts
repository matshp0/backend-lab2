export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  dbUrl: process.env.DATABASE_URL,

  jwt: {
    secret: process.env.JWT_SECRET,
    ttl: process.env.JWT_TTL || 900000,
    refreshTtl: process.env.JWT_REFRES_TTL || 604800000,
  },
});
