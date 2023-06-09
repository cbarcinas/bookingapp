import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import { createError } from '../utils/error.js';

// Create
export const createRoom = async (req, res, next) => {
  // hotelid coming from createRoom route url
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
export const deleteRoom = async (req, res, next) => {
  // hotelid coming from createRoom route url
  const hotelId = req.params.hotelid;

  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json('Room deleted from database');
  } catch (err) {
    next(err);
  }
};

// Get
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

// Get All
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
