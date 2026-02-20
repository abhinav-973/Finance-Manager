import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  share: {
    type: Number,
    required: true,
    min: 0
  }
});

const splitExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    splitType: {
      type: String,
      enum: ["equal", "custom"],
      required: true
    },

    participants: {
      type: [participantSchema],
      validate: [
        val => val.length > 0,
        "At least one participant required"
      ]
    },

    createdBy: {
      type: String, // later: ObjectId (user)
      default: "self"
    }
  },
  { timestamps: true }
);

export default mongoose.model("SplitExpense", splitExpenseSchema);
