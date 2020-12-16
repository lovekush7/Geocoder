const express = require('express');
const {
    getLocations,
    createLocations,
    getLocation,
    updateLocation,
    deleteLocation
} = require('../controllers/loccontrol');

const router = express.Router();

router.route('/').get(getLocations).post(createLocations);

router.route('/:id').get(getLocation).put(updateLocation).delete(deleteLocation);


module.exports = router;