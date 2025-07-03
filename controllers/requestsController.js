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
        requesterId: request.requesterId,
        type: request.type,
        status: request.status,
        createdAt: request.createdAt,
        fromLocation: {
          locationReferenceId: request.fromLocation.locationReferenceId,
          locationName: request.fromLocation.locationName,
        },
        toLocation: {
          locationReferenceId: request.toLocation.locationReferenceId,
          locationName: request.toLocation.locationName,
        },
        tags: request.tags.map((tag) => ({
          tagId: tag.tagId,
          tagName: tag.tagName,
        })),
        price: request.price,
        isUrgent: request.isUrgent,
        image: request.image,
        bidLimit: request.bidLimit,
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
  console.log("Request data:", req.body);

  const request = req.body;

  const newRequest = new Request({
    title: request.title,
    description: request.description,
    type: request.type,
    requesterId: "64a1f27c1c3b7f001f3a0001",
    status: "open",
    fromLocation: {
      locationReferenceId: request.fromLocation.locationReferenceId,
      locationName: request.fromLocation.locationName,
    },
    toLocation: {
      locationReferenceId: request.toLocation.locationReferenceId,
      locationName: request.toLocation.locationName,
    },
    price: request.price || 0,
    isUrgent: request.isUrgent || false,
    image: request.image || "",
    tags: request.tags || [],
    bidLimit: request.bidLimit || 0,
  });

  await newRequest.save();

  const io = req.app.get("io");

  setTimeout(async () => {
    const allRequests = await Request.find().sort({ createdAt: -1 }).lean();
    io.emit("requestsUpdated", allRequests);
  }, 100);

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
