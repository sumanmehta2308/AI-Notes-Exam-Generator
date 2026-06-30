import User from "../models/userModel.js";
import Notes from "../models/notesModel.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { generateGeminiResponse } from "../services/geminiService.js";

const generateController = async (req, res) => {
  try {
    const {
      topic,
      description,
      classLevel,
      examType,
      revisionNotes = false,
      includeDiagram = false,
      includeCharts = false,
    } = req.body;

    if (!topic) {
      return res
        .status(400)
        .json({ success: false, message: "Topic is required" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.credits || user.credits < 10) {
      return res.status(403).json({
        success: false,
        message:
          "Insufficient Credits. Minimum 10 credits required to generate AI notes.",
      });
    }

    const prompt = buildPrompt({
      topic,
      description,
      classLevel,
      examType,
      revisionNotes,
      includeDiagram,
      includeCharts,
    });

    const aiResponseRaw = await generateGeminiResponse(prompt);

    let jsonString = aiResponseRaw;
    const jsonMatch = aiResponseRaw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonString = jsonMatch[0];
    }

    let parsedNotesData;
    try {
      parsedNotesData = JSON.parse(jsonString);
    } catch (parseError) {
      return res.status(500).json({
        success: false,
        message: "AI failed to format notes correctly. Please try again.",
      });
    }

    const notes = await Notes.create({
      user: user._id,
      topic,
      description,
      classLevel,
      examType,
      revisionMode: revisionNotes,
      includeDiagrams: includeDiagram,
      includeCharts: includeCharts,
      content: parsedNotesData,
    });

    user.credits -= 10;
    if (!Array.isArray(user.notes)) user.notes = [];
    user.notes.push(notes._id);
    await user.save();

    return res.status(200).json({
      success: true,
      data: parsedNotesData,
      noteId: notes._id,
      remainingCredits: user.credits,
    });
  } catch (error) {
    console.log("FULL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
      error: error.message,
    });
  }
};
export default generateController;
