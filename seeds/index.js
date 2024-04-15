require('dotenv').config();
const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const ObjectId = mongoose.Types.ObjectId;

// ** Connecting to MongoDB via Mongoose **
console.log('Env: ', process.env.NODE_ENV);
main().catch(err => console.log('Mongo connection error', err));

const Campground = require('../models/campground');

async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/happy-camp');
    console.log('Connection to MongoDB open');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    await mongoose.connect(process.env.DB_URL2);
}

// ** Connecting to MongoDB via Mongoose **

const sample = array => array[Math.floor(Math.random() * array.length)];

const loc = [
    'Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dortmund',
    'Essen', 'Bremen', 'Dresden', 'Hanover', 'Nuremberg', 'Duisurg', 'Bochum', 'Wuppertal', 'Bielefeld',
    'Bonn', 'Münster', 'Mannheim', 'Karlsruhe', 'Ausburg', 'Wiesbaden', 'Mönchengladbach', 'Gelsenkirchen',
    'Aachen', 'Braunschweig', 'Kiel', 'Chemniz', 'Halle', 'Magdeburg', 'Lübeck', 'Erfurt', 'Oberhausen',
    'Rostock', 'Kassel', 'Hagen', 'Postdam', 'Saarbrücken', 'Hamm', 'Ludwigshafen am Rhein', 'Mühlheim an der Ruhr',
    'Oldenburg', 'Osnabrück', 'Leverkusen', 'Darmstadt', 'Heidelberg', 'Sollingen', 'Herne', 'Regensburg', 'Neuss',
    'Paderborn', 'Ingolstadt', 'Offenbach am Main', 'Fürth', 'Ulm', 'Würzburg', 'Heilbronn', 'Pforzheim', 'Wolfsburg',
    'Bottrop', 'Göttingen', 'Reutlingen', 'Koblenz', 'Erlangen', 'Bremerhaven', 'Bergisch Gladbach', 'Recklingshausen',
    'Trier', 'Jena', 'Moers', 'Salzgitter', 'Gütersloh', 'Hildescheim',
    'Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dortmund',
    'Essen', 'Bremen', 'Dresden', 'Hanover', 'Nuremberg', 'Duisurg', 'Bochum', 'Wuppertal', 'Bielefeld',
    'Bonn', 'Münster', 'Mannheim', 'Karlsruhe', 'Ausburg', 'Wiesbaden', 'Mönchengladbach', 'Gelsenkirchen',
    'Aachen', 'Braunschweig', 'Kiel', 'Chemniz', 'Halle', 'Magdeburg', 'Lübeck', 'Erfurt', 'Oberhausen',
    'Rostock', 'Kassel', 'Hagen', 'Postdam', 'Saarbrücken', 'Hamm', 'Ludwigshafen am Rhein', 'Mühlheim an der Ruhr',
    'Oldenburg', 'Osnabrück', 'Leverkusen', 'Darmstadt', 'Heidelberg', 'Sollingen', 'Herne', 'Regensburg', 'Neuss',
    'Paderborn', 'Ingolstadt', 'Offenbach am Main', 'Fürth', 'Ulm', 'Würzburg', 'Heilbronn', 'Pforzheim', 'Wolfsburg',
    'Bottrop', 'Göttingen', 'Reutlingen', 'Koblenz', 'Erlangen', 'Bremerhaven', 'Bergisch Gladbach', 'Recklingshausen',
    'Trier', 'Jena', 'Moers', 'Salzgitter', 'Gütersloh', 'Hildescheim',
    'Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dortmund',
    'Essen', 'Bremen', 'Dresden', 'Hanover', 'Nuremberg', 'Duisurg', 'Bochum', 'Wuppertal', 'Bielefeld',
    'Bonn', 'Münster', 'Mannheim', 'Karlsruhe', 'Ausburg', 'Wiesbaden', 'Mönchengladbach', 'Gelsenkirchen',
    'Aachen', 'Braunschweig', 'Kiel', 'Chemniz', 'Halle', 'Magdeburg', 'Lübeck', 'Erfurt', 'Oberhausen',
    'Rostock', 'Kassel', 'Hagen', 'Postdam', 'Saarbrücken', 'Hamm', 'Ludwigshafen am Rhein', 'Mühlheim an der Ruhr',
    'Oldenburg', 'Osnabrück', 'Leverkusen', 'Darmstadt', 'Heidelberg', 'Sollingen', 'Herne', 'Regensburg', 'Neuss',
    'Paderborn', 'Ingolstadt', 'Offenbach am Main', 'Fürth', 'Ulm', 'Würzburg', 'Heilbronn', 'Pforzheim', 'Wolfsburg',
    'Bottrop', 'Göttingen', 'Reutlingen', 'Koblenz', 'Erlangen', 'Bremerhaven', 'Bergisch Gladbach', 'Recklingshausen',
    'Trier', 'Jena', 'Moers', 'Salzgitter', 'Gütersloh', 'Hildescheim'
]

const lat = [
    52.51667, 53.55000, 48.13333, 50.93333, 50.11667, 48.78333, 51.23333,
    51.33333, 51.51667, 51.45000, 53.08333, 51.03333, 52.36667, 49.45000,
    51.43333, 51.48333, 51.26667, 52.01667, 50.73333, 51.96667, 49.48333,
    49.00000, 48.36667, 50.08333, 51.20000, 51.51667, 50.78333, 52.26667,
    54.33333, 50.83333, 51.48333, 52.13333, 47.98333, 51.33333, 50.00000,
    53.86667, 50.98333, 51.46667, 54.08333, 51.31667, 51.36667, 52.40000,
    49.23333, 51.68333, 49.48333, 51.43333, 53.13333, 52.28333, 51.03333,
    49.86667, 49.41667, 51.16667, 51.55000, 49.01667, 51.20000, 51.71667,
    48.76667, 49.01667, 51.20000, 51.71667, 48.76667, 50.10000, 49.46667,
    48.40000, 49.78333, 49.15000, 48.90000, 52.42306, 51.52472, 51.53333,
    48.48333, 50.35972, 49.58333, 53.55000, 51.18333, 51.10000, 51.58500,
    49.75000, 50.92722, 51.45917, 52.15000, 50.88333, 51.90000, 52.15000,
    52.51667, 53.55000, 48.13333, 50.93333, 50.11667, 48.78333, 51.23333,
    51.33333, 51.51667, 51.45000, 53.08333, 51.03333, 52.36667, 49.45000,
    51.43333, 51.48333, 51.26667, 52.01667, 50.73333, 51.96667, 49.48333,
    49.00000, 48.36667, 50.08333, 51.20000, 51.51667, 50.78333, 52.26667,
    54.33333, 50.83333, 51.48333, 52.13333, 47.98333, 51.33333, 50.00000,
    53.86667, 50.98333, 51.46667, 54.08333, 51.31667, 51.36667, 52.40000,
    49.23333, 51.68333, 49.48333, 51.43333, 53.13333, 52.28333, 51.03333,
    49.86667, 49.41667, 51.16667, 51.55000, 49.01667, 51.20000, 51.71667,
    48.76667, 49.01667, 51.20000, 51.71667, 48.76667, 50.10000, 49.46667,
    48.40000, 49.78333, 49.15000, 48.90000, 52.42306, 51.52472, 51.53333,
    48.48333, 50.35972, 49.58333, 53.55000, 51.18333, 51.10000, 51.58500,
    49.75000, 50.92722, 51.45917, 52.15000, 50.88333, 51.90000, 52.15000,
    52.51667, 53.55000, 48.13333, 50.93333, 50.11667, 48.78333, 51.23333,
    51.33333, 51.51667, 51.45000, 53.08333, 51.03333, 52.36667, 49.45000,
    51.43333, 51.48333, 51.26667, 52.01667, 50.73333, 51.96667, 49.48333,
    49.00000, 48.36667, 50.08333, 51.20000, 51.51667, 50.78333, 52.26667,
    54.33333, 50.83333, 51.48333, 52.13333, 47.98333, 51.33333, 50.00000,
    53.86667, 50.98333, 51.46667, 54.08333, 51.31667, 51.36667, 52.40000,
    49.23333, 51.68333, 49.48333, 51.43333, 53.13333, 52.28333, 51.03333,
    49.86667, 49.41667, 51.16667, 51.55000, 49.01667, 51.20000, 51.71667,
    48.76667, 49.01667, 51.20000, 51.71667, 48.76667, 50.10000, 49.46667,
    48.40000, 49.78333, 49.15000, 48.90000, 52.42306, 51.52472, 51.53333,
    48.48333, 50.35972, 49.58333, 53.55000, 51.18333, 51.10000, 51.58500,
    49.75000, 50.92722, 51.45917, 52.15000, 50.88333, 51.90000, 52.15000
];

const lon = [
    13.38333, 10.00000, 11.56667, 6.95000, 8.68333, 9.18333, 6.78333,
    12.38333, 7.46667, 7.01667, 8.80000, 13.73333, 9.71667, 11.08333,
    6.76667, 7.21667, 7.18333, 8.53333, 7.10000, 7.63333, 8.46667,
    8.40000, 10.90000, 8.23333, 6.43333, 7.10000, 6.08333, 10.51667,
    10.13333, 12.91667, 11.96667, 11.61667, 7.85000, 6.56667, 8.26667,
    10.68333, 11.03333, 6.85000, 12.13333, 9.50000, 7.48333, 13.06667,
    7.00000, 7.81667, 8.43333, 6.88333, 8.21667, 8.05000, 6.98333,
    8.65000, 8.71667, 7.08333, 7.21667, 12.08333, 6.70000, 8.76667,
    11.43333, 12.08333, 6.70000, 8.76667, 11.43333, 8.80000, 11.00000, 9.98333,
    9.93333, 9.21667, 8.71667, 10.78722, 6.92278, 9.93333, 9.21667,
    7.59778, 11.01667, 8.58333, 7.20000, 7.11667, 7.16194, 6.63333,
    11.58611, 6.61972, 10.33333, 8.01667, 8.38333, 9.95000,
    13.38333, 10.00000, 11.56667, 6.95000, 8.68333, 9.18333, 6.78333,
    12.38333, 7.46667, 7.01667, 8.80000, 13.73333, 9.71667, 11.08333,
    6.76667, 7.21667, 7.18333, 8.53333, 7.10000, 7.63333, 8.46667,
    8.40000, 10.90000, 8.23333, 6.43333, 7.10000, 6.08333, 10.51667,
    10.13333, 12.91667, 11.96667, 11.61667, 7.85000, 6.56667, 8.26667,
    10.68333, 11.03333, 6.85000, 12.13333, 9.50000, 7.48333, 13.06667,
    7.00000, 7.81667, 8.43333, 6.88333, 8.21667, 8.05000, 6.98333,
    8.65000, 8.71667, 7.08333, 7.21667, 12.08333, 6.70000, 8.76667,
    11.43333, 12.08333, 6.70000, 8.76667, 11.43333, 8.80000, 11.00000, 9.98333,
    9.93333, 9.21667, 8.71667, 10.78722, 6.92278, 9.93333, 9.21667,
    7.59778, 11.01667, 8.58333, 7.20000, 7.11667, 7.16194, 6.63333,
    11.58611, 6.61972, 10.33333, 8.01667, 8.38333, 9.95000,
    13.38333, 10.00000, 11.56667, 6.95000, 8.68333, 9.18333, 6.78333,
    12.38333, 7.46667, 7.01667, 8.80000, 13.73333, 9.71667, 11.08333,
    6.76667, 7.21667, 7.18333, 8.53333, 7.10000, 7.63333, 8.46667,
    8.40000, 10.90000, 8.23333, 6.43333, 7.10000, 6.08333, 10.51667,
    10.13333, 12.91667, 11.96667, 11.61667, 7.85000, 6.56667, 8.26667,
    10.68333, 11.03333, 6.85000, 12.13333, 9.50000, 7.48333, 13.06667,
    7.00000, 7.81667, 8.43333, 6.88333, 8.21667, 8.05000, 6.98333,
    8.65000, 8.71667, 7.08333, 7.21667, 12.08333, 6.70000, 8.76667,
    11.43333, 12.08333, 6.70000, 8.76667, 11.43333, 8.80000, 11.00000, 9.98333,
    9.93333, 9.21667, 8.71667, 10.78722, 6.92278, 9.93333, 9.21667,
    7.59778, 11.01667, 8.58333, 7.20000, 7.11667, 7.16194, 6.63333,
    11.58611, 6.61972, 10.33333, 8.01667, 8.38333, 9.95000
];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 240; i++) {
        const random1000 = Math.floor(Math.random() * 1000) + 1;
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '641070525515ac9af7e18326',
            title: `${sample(descriptors)} ${sample(places)}`,
            // location: `${cities[random1000].city}, ${cities[random1000].state}`,
            location: loc[i],
            geometry: { type: 'Point', coordinates: [lon[i], lat[i]] },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfnajwnp3/image/upload/v1678863673/HappyCamper/zmh1y6o4cbco5i3vznae.jpg',
                    filename: 'HappyCamper/zmh1y6o4cbco5i3vznae',
                    _id: new ObjectId("64116d3b1177a0445f03a5c2")
                },
                {
                    url: 'https://res.cloudinary.com/dfnajwnp3/image/upload/v1678863673/HappyCamper/uzlk4rtlkal4avnl4ael.jpg',
                    filename: 'HappyCamper/uzlk4rtlkal4avnl4ael',
                    _id: new ObjectId("64116d3b1177a0445f03a5c3")
                },
                {
                    url: 'https://res.cloudinary.com/dfnajwnp3/image/upload/v1678863674/HappyCamper/goerglzgwiqq2rkhctnc.jpg',
                    filename: 'HappyCamper/goerglzgwiqq2rkhctnc',
                    _id: new ObjectId("64116d3b1177a0445f03a5c4")
                }
            ],
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit laboriosam odit deleniti, tempora cumque fugiat excepturi, eius eveniet reprehenderit suscipit exercitationem, cupiditate ullam maxime? Rem perspiciatis magni vel neque! Repellat!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close(); //Closes the server
})