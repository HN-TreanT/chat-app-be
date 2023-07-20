const FriendRequest = require("../models/friendRequest");
const {
  reponseSuccess,
  responseInValid,
  responseServerError,
  responseSuccessWithData,
} = require("../helper/ResponseRequests");

const getFriendRequest = async (req, res) => {
  let pageSize;
  let page;
  pageSize = req.query.pageSize;
  page = req.query.page;
  if (!req.query.pageSize || !req.query.page) {
    pageSize = 1000;
    page = 1;
  }
  const friendRequest = await FriendRequest.find()
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .populate("sender");
  // .populate("recipient");
  return responseSuccessWithData({ res, data: friendRequest });
};

const createRequest = async (req, res) => {
  const request = await FriendRequest.create(req.body);
  return reponseSuccess({ res });
};
const deleteRequest = async (req, res) => {
  const request = await FriendRequest.findById(req.params._id);
  await FriendRequest.remove(request);
  return reponseSuccess({ res });
};

module.exports = {
  getFriendRequest,
  createRequest,
  deleteRequest,
};
