import mongoose from "mongoose";

const connectDB = async(DATABASE_URL)=>{
    try{

        const DB_OPTIONS={
            dbName:"DB_store"

        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS)
        console.log("start db")

    }catch(e){
        console.log(e)

    }
}

export default connectDB