const Item = require("../models/itemModel");
const mongoose = require("mongoose");

const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items." });
  }
};

const getItemById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("hii there" + id);
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid item ID." });
    }
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found." });
    res.json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ error: "Failed to fetch item." });
  }
};

const updateItem = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid item ID." });
    }
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) return res.status(404).json({ error: "Item not found." });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: "Failed to update item." });
  }
};

const deleteItem = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid item ID." });
    }
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found." });
    res.json({ message: "Item deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item." });
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};
