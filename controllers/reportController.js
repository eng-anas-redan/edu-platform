import Report from "../models/Report.js";

// Create Report
export const createReport = async (req, res) => {
  try {
    const exists = await Report.findOne({
      reporter: req.user.id,
      article: req.body.article,
    });

    if (exists) {
      return res.status(400).json({
        message: "You have already reported this article.",
      });
    }
    const report = await Report.create({
      ...req.body,
      reporter: req.user.id,
    });
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin get reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reporter", "fname lname email")
      .populate("article")
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Change status
export const updateReportStatus = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      },
    );
    res.json(report);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
