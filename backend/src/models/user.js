module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      email: {
        type: DataTypes.STRING(256),
        unique: {
          args: 'email',
          msg: 'The email is already taken!',
        },
      },
      password: {
        type: DataTypes.STRING,
      },
      token: {
        type: DataTypes.TEXT,
      },
    },
    {
      underscored: true,
    },
  );
  user.addScope('user', (data) => ({
    where: data.where,
    having: data.havingWhere,
    attributes: data.attributes,
  }));
  return user;
};
