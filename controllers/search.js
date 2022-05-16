const { response } = require("../routes/jobs");

const search = (req, res = response) => {
  const { query } = req.params;
  res.json({
    msg: "searching...",
    query,
  });
};

module.exports = {
  search,
};
