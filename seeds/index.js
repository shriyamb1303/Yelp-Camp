const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors}=require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async ()=>{
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            //your user id
            author: '6335a990b2e21f3869e4a9cb',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title : `${sample(descriptors)}  ${sample(places)}`,
            description : "lorem ipsum",
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dezfj7af8/image/upload/v1666982488/YelpCamp/wue3mf0fyqalgvki5wut.png',
                  filename: 'YelpCamp/wue3mf0fyqalgvki5wut'
                }
            ]
        })
        await camp.save();
    }
}
seedDB();