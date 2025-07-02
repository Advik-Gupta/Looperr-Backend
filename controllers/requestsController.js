import Request from "../models/requestModel.js";

// @desc    Create a new request
// @route   POST /api/requests
// @access  USER

export const createRequest = async (req, res) => {
  console.log("Creating a new request");
  const name = req.body.name;

  const newRequest = new Request({
    title: "Sample Request",
    description: "This is a sample request description.",
    type: "custom",
    fromLocation: {
      lat: 0,
      lng: 0,
      description: "Sample from location",
    },
    toLocation: {
      lat: 0,
      lng: 0,
      description: "Sample to location",
    },
  });

  await newRequest.save();

  res.status(200).json({
    message: "Request created successfully",
    requestData: {
      id: newRequest._id,
      title: newRequest.title,
      description: newRequest.description,
      type: newRequest.type,
      status: newRequest.status,
      createdAt: newRequest.createdAt,
      fromLocation: newRequest.fromLocation,
      toLocation: newRequest.toLocation,
    },
  });
};
