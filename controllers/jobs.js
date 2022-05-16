const Job = require("../models/job");

/*Public route*/
const getJobs = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [jobs, total] = await Promise.all([
    Job.find(query).limit(Number(limit)).skip(Number(from)),
    Job.countDocuments(query),
  ]);
  res.json({
    total,
    jobs,
  });
};

/*Private route - only admin role - */
const postJob = async (req, res) => {
  const { city, description, salary } = req.body;

  const job = new Job({ city, description, salary, user: req.user._id });
  await job.save();

  res.status(201).json({
    job,
  });
};

/*Private route - only admin role - */
const deleteJob = async (req, res) => {
  const { id } = req.params;

  const jobToDelete = await Job.findByIdAndUpdate(id, { status: false });

  res.json(jobToDelete);
};

/*Private route - only admin role - */
const putJob = async (req, res) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  // data.city = data.city.toUpperCase();
  // data.user = req.user._id;

  const job = await Job.findByIdAndUpdate(id, data);

  res.json(job);
};

module.exports = {
  getJobs,
  deleteJob,
  postJob,
  putJob,
};
