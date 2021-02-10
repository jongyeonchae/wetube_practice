import mongoose from "mongoose";

// model: document name(data), schema: shape(definition)

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required",
  },
  title: {
    type: String,
    required: "Title is required",
  },
  description: String,
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // relationship of data(2): 연결하고자 하는 data(video)에 또다른 data(comment)의 array를 삽입
  // ref: "Video" 는 연결하고자 하는 data의 model명과 동일해야함
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("Video", VideoSchema);
export default model;
