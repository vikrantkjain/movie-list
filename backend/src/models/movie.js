import config from '../config';
import utility from '../services/utility';

const defaultMovieImage = `${config.app.baseUrl}public/default-images/default-movie-img.png`;

module.exports = (sequelize, DataTypes) => {
  const movie = sequelize.define(
    'movie',
    {
      movieImage: {
        type: DataTypes.STRING,
        set(val) {
          let tmpStr = val;
          tmpStr = tmpStr.replace(/\\/g, '/');
          this.setDataValue('movieImage', tmpStr);
        },
      },
      title: {
        type: DataTypes.STRING(256),
      },
      publishingYear: {
        type: DataTypes.STRING(256),
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      movieImageUrl: {
        type: DataTypes.VIRTUAL,
        get() {
          const str = this.get('movieImage');
          if (!str || !utility.isFileExist(str)) {
            return defaultMovieImage;
          }
          return (str && `${config.app.baseUrl}${str}`) || '';
        },
      },
    },
    {
      underscored: true,
    },
  );
  movie.associate = (models) => {
    movie.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'cascade',
    });
  };
  return movie;
};
