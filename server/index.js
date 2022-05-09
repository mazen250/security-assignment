import express from 'express';
import cors from 'cors'
import mongoose from  'mongoose'
import jwt from 'jsonwebtoken'
import UserModel from './models/user.js';
import TaskModel from './models/tasks.js';
const app = express();

app.use(cors());

app.use(express.json())

//connect to mongodb

mongoose.connect('mongodb+srv://Mazen:Mazen123@cluster0.sbnha.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true

})

mongoose.connection.on('connected', () => {
    console.log('connected to mongodb')
})




app.post("/register",async (req,res)=>{
    const {name,email,password} = req.body;
    const newUser = new UserModel({
        name,
        email,
        password
    }) 
    try{
        await newUser.save();
        res.send({
            message: "user created successfully",  
        })
    }
    catch{
        res.status(500).send('error')
    }  
})



//user login

app.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    // console.log("email",email ,"password",password);
        const user = await UserModel.findOne({email:email});
        if(!user){
            // console.log('user not found');
            res.send({message: "user not found"})
            
        }
        else{
            // console.log("user real password =  ",user.password);
            // console.log("user input password =  ",password);
            if(await user.password===password){
                
                const token = jwt.sign({_id:user._id},'secretkey')
                // console.log('token',token,'user',user);
                res.send({
                    message: "success",
                    user: user,
                    token: token

                })
      
            }
            else {
              
                res.send({message:"password is incorrect"})
            }
        }}
       
)



app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.get('/getallTasks',async (req,res)=>{
    const tasks = await TaskModel.find();
    res.send(tasks);

})

app.get('/task/:id',async (req,res)=>{
    id = req.body.id
    userId = req.body.userId
    const task = await TaskModel.findById(id);
    res.send(task);

})

//get user tasks
app.get('/getUserTasks/:id',async (req,res)=>{
    const id = req.params.id
    const tasks = await TaskModel.find({userId:id});
    res.send(tasks);
})

app.post("/addtask",async (req,res)=>{
    const {description,userId} = req.body;
    const newTask = new TaskModel({
        description,
        userId
    })
    await newTask.save();
    res.send({message:"task added successfully"})
})
app.get("/getuser/:id",async (req,res)=>{
    const id = req.params.id;
    const user = await UserModel.findById(id);
    res.send(user)
})

//delete task by id 
app.delete("/deletetask/:id",async (req,res)=>{
   
   

        const id = req.params.id;
        await TaskModel.findByIdAndDelete(id).exec();
        res.status(200).send('task deleted successfully');
    
})

app.post('/addAdmin',async (req,res)=>{
    const {currentUserRole,name,email,password,role} = req.body;
    if (role === 'admin'){

        const newUser = new UserModel({
            name,
            email,
            password,
            role

        })
        await newUser.save();
    }
    else{
        res.send({message:"you are not an admin that can add admins"})
    }

})


app.listen(5000, () => {
    console.log('Server is running on port 5000');
    }
);