const mongoosh=require('mongoose')


const appointmentSchema=new mongoosh.Schema({
    doctorId:{
        type: mongoosh.Schema.Types.ObjectId,
        ref:"Doctor",
    },
    userID:{
        type: mongoosh.Schema.Types.ObjectId,
        ref:"User",         
    },
    hospitalId:{
        type: mongoosh.Schema.Types.ObjectId,
        ref:"Hospital",
    },
    appointmentDate:{
        type: Date,
        required: true,
    },
    appointmentTime:{
        type: String,
        enum: ["9-11", "1-3", "7-9"],
        default: "9-11",
    },
    status:{
        type: String,
        default: "peasant",
    },
},{timestamps:true,versionKey:false})

module.exports=mongoosh.model("Appointment",appointmentSchema)
