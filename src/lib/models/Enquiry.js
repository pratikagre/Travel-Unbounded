import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  countryCode: {
    type: String,
    required: [true, "Country code is required"],
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, "Contact number is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  dateOfTravel: {
    type: Date,
    required: [true, "Date of travel is required"],
    validate: {
      validator: function (value) {
        // Must be a future date (at least today or later, but here we require strict future or same-day onwards depending on local time)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return value >= today;
      },
      message: "Date of travel must be in the future",
    },
  },
  numberOfPeople: {
    type: Number,
    required: [true, "Number of people is required"],
    min: [1, "Number of people must be at least 1"],
  },
  hotelCategory: {
    type: String,
    required: [true, "Hotel category is required"],
    enum: {
      values: ["Standard", "Deluxe", "Luxury"],
      message: "{VALUE} is not a valid hotel category. Options are Standard, Deluxe, Luxury.",
    },
  },
  numberOfChildren: {
    type: Number,
    min: [0, "Number of children cannot be negative"],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent Mongoose from creating multiple compiles of the model in development mode
const Enquiry = mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);

export default Enquiry;
