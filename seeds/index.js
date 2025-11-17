const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('MongoDBコネクションOK!!');
  })
  .catch(err => {
    console.log('MongoDBコネクションエラー!!!');
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const randomCityIndex = Math.floor(Math.random() * cities.length);
    const price = Math.floor(Math.random() * 2000) + 1000;
    const camp = new Campground({
      author: '6915e1907cac066b44e3abce',
      location: `${cities[randomCityIndex].prefecture}${cities[randomCityIndex].city}`,
      title: `${sample(descriptors)}・${sample(places)}`,
      description: 'カムパネルラはみんながそんなことを言うのだろう。とうもろこしだって棒で二尺も孔をあけて計算台のところに来ていたことは、二人の横の方へ近よって行きました。',
      geometry: {
        type: 'Point',
        coordinates: [
          cities[randomCityIndex].longitude,
          cities[randomCityIndex].latitude
        ]
      },
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/deko3qoyv/image/upload/v1763188990/YelpCamp/jzf4sqzql4tdexfl156l.jpg',
          filename: 'YelpCamp/jzf4sqzql4tdexfl156l'
        },
        {
          url: 'https://res.cloudinary.com/deko3qoyv/image/upload/v1763188990/YelpCamp/wbuw8wth62di61thmkpf.png',
          filename: 'YelpCamp/wbuw8wth62di61thmkpf'
        },
        {
          url: 'https://res.cloudinary.com/deko3qoyv/image/upload/v1763188990/YelpCamp/w4lvroymcy7b8bgclqy8.jpg',
          filename: 'YelpCamp/w4lvroymcy7b8bgclqy8'
        }
      ]
    });
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});