const Locate = require('../models/Locate');
const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const reverseGeoding = require('../utils/reverseGeo');

// @desc  Get all locations
// @route GET /api/locate
// @access Public
exports.getLocations = asyncHandler(async(req, res, next) => {
    const locate = await Locate.find();
    res.status(200).json({ success: true, count: locate.length, data: locate });

});

// @desc  Get single location by id
// @route GET /api/locate
// @access Public
exports.getLocation = asyncHandler(async(req, res, next) => {
    const locate = await Locate.findById(req.params.id);

    if (!locate) {
        //return res.status(400).json({ success: false })
        return next(new errorResponse(`location is not found with id of ${req.params.id}`, 404)); // for same formatted id but not in db
    }

    res.status(200).json({ success: true, data: locate });
});

// @desc  Post all locations
// @route POST /api/locate
// @access Public
exports.createLocations = asyncHandler(async(req, res, next) => {

    const locate = await Locate.create(req.body);

    res.status(201).json({
        success: true,
        data: locate
    });
});

// @desc  Update location
// @route Update /api/locate
// @access Public
exports.updateLocation = asyncHandler(async(req, res, next) => {
    const locate = await Locate.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!locate) {
        return next(new errorResponse(`location is not found with id of ${req.params.id}`, 404));
    }
})

// @desc  Delete location
// @route Delete /api/locate
// @access Public
exports.deleteLocation = asyncHandler(async(req, res, next) => {

    const locate = await Locate.findByIdAndDelete(req.params.id);
    if (!locate) {
        return next(new errorResponse(`location is not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: {} });
});