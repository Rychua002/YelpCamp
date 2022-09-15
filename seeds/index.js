const mongoose = require('mongoose');
const cities = require('./cities')
const Campground = require('../models/campground');
const { descriptors, places } = require('./seedHelpers');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];



const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // Your User ID
            author: '631b6f66b440722c9f83d8cc',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,

            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis dolorem pariatur ipsa cum. Unde ab atque, nostrum cupiditate quaerat eius explicabo est odio tempora aspernatur autem repellat ad nesciunt delectus.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dqdkh7mia/image/upload/v1663003593/YelpCamp/ehbzs9lryfpzf71qj8a7.jpg',
                    filename: 'YelpCamp/ehbzs9lryfpzf71qj8a7'
                },
                {
                    url: 'https://res.cloudinary.com/dqdkh7mia/image/upload/v1663003589/YelpCamp/pkp8listkmoxdzl6laht.jpg',
                    filename: 'YelpCamp/pkp8listkmoxdzl6laht'
                },
                {
                    url: 'https://res.cloudinary.com/dqdkh7mia/image/upload/v1663003586/YelpCamp/lylrfusxma1dyntkllz9.jpg',
                    filename: 'YelpCamp/lylrfusxma1dyntkllz9'
                }

            ]
        })
        await camp.save()
    }
};


seedDB().then(() => {
    mongoose.connection.close()
})