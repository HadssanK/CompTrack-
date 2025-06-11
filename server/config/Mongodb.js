import mongoose from "mongoose";

const ConnectDb = async() =>{
    mongoose.connection.on('connected' , ()=>console.log("Database Connected"))
await mongoose.connect(`${process.env.MONGO_URI}/employee_issues_db`)
}

export default ConnectDb;