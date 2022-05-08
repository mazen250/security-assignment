import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
 
    description: {
        type: String,
    },
    userId:{
        type: String,
        required:true
    }
})

const TaskModel = mongoose.model("Task", taskSchema);
export default TaskModel;