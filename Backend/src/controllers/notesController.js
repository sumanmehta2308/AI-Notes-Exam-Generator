import Notes from "../models/notesModel.js"; // Fixed import path

export const getMyNotes = async (req, res) => {
  try {
    // Fixed typos in select query spacing
    const notes = await Notes.find({ user: req.userId })
      .select(
        "topic classLevel examType revisionMode includeDiagrams includeCharts createdAt"
      )
      .sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `getCurrentUser notes error: ${error.message}` });
  }
};

export const getSingleNotes = async (req, res) => {
  try {
    const notes = await Notes.findOne({ _id: req.params.id, user: req.userId });
    if (!notes) {
      return res.status(404).json({ error: "Notes not found" });
    }
    return res.json({
      content: notes.content,
      topic: notes.topic,
      createdAt: notes.createdAt,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Server error fetching single note: ${error.message}` }); // Fixed empty catch block
  }
};
