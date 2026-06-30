import Notes from "../models/notesModel.js";

export const getUserHistory = async (req, res) => {
  try {
    const history = await Notes.find({ user: req.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch history: ${err.message}`,
    });
  }
};
export const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    await Notes.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "History deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Deletion failed" });
  }
};
