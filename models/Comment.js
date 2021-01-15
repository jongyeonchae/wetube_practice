import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: {
        type: Number,
        required: "Title is required"
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    // relationship of data(1): 연결하고자 하는 data(video)의 id를 삽입
    // ref: "Video" 는 연결하고자 하는 data의 model명과 동일해야함
    // video: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Video"
    // }
});

const model = mongoose.model("Comment", CommentSchema);
export default model;