import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    topic: { type: String, required: true },
    description: { type: String, default: "" },
    classLevel: { type: String },
    examType: { type: String },
    revisionMode: { type: Boolean, default: false },
    includeDiagrams: { type: Boolean, default: false },
    includeCharts: { type: Boolean, default: false },
    content: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const Notes = mongoose.model("Notes", notesSchema);
export default Notes;
