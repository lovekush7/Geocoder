const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');
const request = require('request');
const reverseGeocoding = require('../utils/reverseGeo');

const LocSchema = new mongoose.Schema({
    // address: {
    //     type: String,
    //     // required: [true, 'Please add an address']
    // },
    location: {
        // GeoJSON Point
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },

    coordinates: {
        type: [Number],
        index: '2dsphere'
    },
    address: String,
    // formattedAddress: String,
    // street: String,
    // city: String,
    // state: String,
    // zipcode: String,
    // country: String

});


// // Geocode & create location field
// LocSchema.pre('save', async function(next) {
//     const loc = await geocoder.geocode(this.address);
//     this.location = {
//         type: 'Point',
//         coordinates: [loc[0].longitude, loc[0].latitude],
//         formattedAddress: loc[0].formattedAddress,
//         street: loc[0].streetName,
//         city: loc[0].city,
//         state: loc[0].stateCode,
//         zipcode: loc[0].zipcode,
//         country: loc[0].countryCode
//     };

//     // Do not save address in DB
//     this.address = undefined;
//     next(
// });


LocSchema.pre('save', async function(next) {

    const latitude = this.location.coordinates[0];
    const longitude = this.location.coordinates[1];
    let loc = await reverseGeocoding(latitude, longitude);
    // console.log(latitude);
    this.address = loc;

    // Do not save address in DB
    //this.address = undefined;
    // next();
});

module.exports = mongoose.model('Locate', LocSchema);