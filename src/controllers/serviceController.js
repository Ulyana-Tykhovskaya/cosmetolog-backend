import { Service } from "../models/Service.js";
import cloudinary from "../config/cloudinary.js";
export const createService = async (req, res, next) => {
  try {
    let uploadedImgs = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await cloudinary.uploader.upload_stream(
          { folder: "services" },
          (error, result) => {
            if (error) throw error;
          }
        );

        const uploadPromise = new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "services" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );
          stream.end(file.buffer);
        });

        const url = await uploadPromise;
        uploadedImgs.push(url);
      }
    }
    const transformedData = {
      pl: {
        name: req.body.namePl,
        description: req.body.descriptionPl,
      },
      de: {
        name: req.body.nameDe,
        description: req.body.descriptionDe,
      },
      price: req.body.price,
      type: req.body.type,
      imgs: uploadedImgs,
    };
    const newService = await Service.create(transformedData);

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
    const transformedData = {
      pl: {
        name: req.body.namePl,
        description: req.body.descriptionPl,
      },
      de: {
        name: req.body.nameDe,
        description: req.body.descriptionDe,
      },
      price: req.body.price,
      type: req.body.type,
      imgs: Array.isArray(req.body.imgs) ? req.body.imgs : [req.body.imgs],
    };

    const updated = await Service.findByIdAndUpdate(id, transformedData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({
      message: "Service updated successfully",
      service: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Service.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    next(error);
  }
};
