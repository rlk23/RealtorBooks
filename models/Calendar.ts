import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const calendarSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    allDay: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensure the event is linked to a specific user
    },
    location: {
      type: String,
      trim: true,
    },
    recurrence: {
      type: String,
      enum: ["none", "daily", "weekly", "monthly", "yearly"],
      default: "none",
    },
    color: {
      type: String, // Optionally store a color code for event display
    },
  },
  {
    timestamps: true,
  }
);

calendarSchema.plugin(toJSON);

export default mongoose.models.Calendar || mongoose.model("Calendar", calendarSchema);
