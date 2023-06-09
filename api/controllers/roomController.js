import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import { createError } from '../utils/error.js';

// Create
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  // Creates new Room using the req body
  const newRoom = new Room(req.body);

  try {
    // Once the user submits the new room we take it from the req body and save to db
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// Update
export const updateRoom = async (req, res, next) => {
  // id should already exist in db since we are updating existing entry
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        // MongoDB $set
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

// Delete
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json('Hotel deleted from database');
  } catch (err) {
    next(err);
  }
};

// Get
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// Get All
export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
