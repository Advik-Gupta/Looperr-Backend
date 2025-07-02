import Request from "../models/requestModel.js";

// @desc    Get all requests
// @route   GET /api/requests
// @access  USER

export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find({});
    res.status(200).json({
      message: "Requests fetched successfully",
      requests: requests.map((request) => ({
        id: request._id,
        title: request.title,
        description: request.description,
        type: request.type,
        status: request.status,
        createdAt: request.createdAt,
        fromLocation: request.fromLocation,
        toLocation: request.toLocation,
      })),
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({
      message: "Failed to fetch requests",
      error: error.message,
    });
  }
};

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
