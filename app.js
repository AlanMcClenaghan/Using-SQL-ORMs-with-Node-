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

      // Find a record
    const toyStory = await Movie.findByPk(3);

    // Delete a record
    await toyStory.destroy();

    // Find and log all movies
    const movies = await Movie.findAll();
    console.log( movies.map(movie => movie.toJSON()) );

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();