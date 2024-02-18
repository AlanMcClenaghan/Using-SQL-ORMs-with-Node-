const db = require('./db');
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;

(async () => {
  await db.sequelize.sync({ force: true });

  try {
    const movie = await Movie.create({
      title: 'Toy Story',
      runtime: 81,
      releaseDate: '1995-11-22',
      isAvailableOnVHS: true,
    });

    const movie2 = await Movie.create({
      title: 'The Incredibles',
      runtime: 115,
      releaseDate: '2004-04-14',
      isAvailableOnVHS: true,
    });

    // New Person record
    const person = await Person.create({
        firstName: 'Tom',
        lastName: 'Hanks',
    });

    // New instance
    const movie3 = await Movie.build({
        title: 'Toy Story 3',
        runtime: 103,
        releaseDate: '2010-06-18',
        isAvailableOnVHS: false,
      });
      await movie3.save(); // save the record

      const toyStory3 = await Movie.findByPk(3);
      await toyStory3.update({
        title: 'Trinket Tale 3',
        isAvailableOnVHS: true,
      }, { fields: ['title', 'isAvailableOnVHS'] });  

    console.log( toyStory3.get({ plain: true }) );

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();