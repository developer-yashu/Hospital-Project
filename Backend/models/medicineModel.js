const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      required: true,
    },
    DiseaseName: {
      type: String,
      required: true,
    },
    // kya kya nahi khana
    Food_Restrictions: {
      type: String,
      required: true,
    },

    medicineType: {
      type: String,
      enum: ["Tablet", "Capsule", "Syrup", "Injection", "Drops", "Powder",],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    AppointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    nextAppointmentDate: {
      type: Date,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
    },


    status: {
      type: String,
      enum: ["available", "out_of_stock"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Medicine", medicineSchema);