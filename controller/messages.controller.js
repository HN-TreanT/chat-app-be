const { responseSuccessWithData, responseServerError } = require("../helper/ResponseRequests");
const moogose = require("mongoose");
const Message = require("../models/messages");
const getMessages = async (req, res) => {
  try {
    let pageSize;
    let page;
    pageSize = req.query.pageSize;
    page = req.query.page;
    if (!req.query.pageSize || !req.query.page) {
      pageSize = 1000;
      page = 1;
    }
    if (!req.query.search) {
      req.query.search = "";
    }
    if (!req.query.id) {
      return responseSuccessWithData({ res, data: [] });
    }
    const messages = await Message.aggregate([
      { $match: { _id: moogose.Types.ObjectId(req.query.id) } },
      { $unwind: "$messages" },
      { $sort: { "messages.created_at": -1 } },
      { $skip: parseInt(pageSize) * (parseInt(page) - 1) },
      { $limit: parseInt(pageSize) },
      { $project: { _id: 0, messages: 1 } },
    ]);
    const data = messages.map((message) => message.messages);
    return responseSuccessWithData({ res, data: data.reverse() });
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};
module.exports = {
  getMessages,
};
