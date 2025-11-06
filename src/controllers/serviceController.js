import { Service } from "../models/Service.js";

export const createService = async (req, res, next) => {
  try {
    console.log("BODY:", req.body); // временно для отладки
    const newService = new Service(req.body);
    await newService.save();

    res.status(201).json({
      message: "Service created successfully",
      newService,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service updated", updated });
  } catch (error) {
    next(error);
  }
};
export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Service not found" });
  } catch (error) {
    next(error);
  }
};
