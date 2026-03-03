module.exports = {
  dialect: 'portgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: '123456',
  database: 'dev-burguer-db',
  define: {
    timestamps: true, // cria automaticamente data de criação e atualização
    underscored: true,
    underscoredAll: true,
  },
};
