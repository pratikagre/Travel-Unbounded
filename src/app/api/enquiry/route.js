import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Enquiry from "@/lib/models/Enquiry";

// Server-side email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Phone number digits validation regex (between 7 and 15 digits)
const PHONE_REGEX = /^\d{7,15}$/;

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const {
      fullName,
      countryCode,
      contactNumber,
      email,
      dateOfTravel,
      numberOfPeople,
      hotelCategory,
      numberOfChildren,
    } = body;

    const errors = [];

    // 1. Validation - Full Name
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      errors.push("Full name is required.");
    }

    // 2. Validation - Country Code
    if (!countryCode || typeof countryCode !== "string" || !countryCode.trim()) {
      errors.push("Country code is required.");
    }

    // 3. Validation - Contact Number
    if (!contactNumber || typeof contactNumber !== "string" || !contactNumber.trim()) {
      errors.push("Contact number is required.");
    } else {
      // Remove any dashes or spaces for validation
      const sanitizedPhone = contactNumber.replace(/[\s-]/g, "");
      if (!PHONE_REGEX.test(sanitizedPhone)) {
        errors.push("Contact number must be between 7 and 15 digits and contain only numbers.");
      }
    }

    // 4. Validation - Email
    if (!email || typeof email !== "string" || !email.trim()) {
      errors.push("Email address is required.");
    } else if (!EMAIL_REGEX.test(email.trim().toLowerCase())) {
      errors.push("Please provide a valid email address.");
    }

    // 5. Validation - Date of Travel
    let travelDate;
    if (!dateOfTravel) {
      errors.push("Date of travel is required.");
    } else {
      travelDate = new Date(dateOfTravel);
      if (isNaN(travelDate.getTime())) {
        errors.push("Invalid date of travel.");
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (travelDate < today) {
          errors.push("Date of travel must be in the future.");
        }
      }
    }

    // 6. Validation - Number of People
    const peopleCount = parseInt(numberOfPeople, 10);
    if (isNaN(peopleCount) || peopleCount < 1) {
      errors.push("Number of people must be at least 1.");
    }

    // 7. Validation - Hotel Category
    const allowedHotels = ["Standard", "Deluxe", "Luxury"];
    if (!hotelCategory || !allowedHotels.includes(hotelCategory)) {
      errors.push("Hotel category must be one of: Standard, Deluxe, Luxury.");
    }

    // 8. Validation - Number of Children (Optional)
    let childrenCount = 0;
    if (numberOfChildren !== undefined && numberOfChildren !== "") {
      childrenCount = parseInt(numberOfChildren, 10);
      if (isNaN(childrenCount) || childrenCount < 0) {
        errors.push("Number of children cannot be negative.");
      }
    }

    // If we have errors, return them
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Save to database
    const newEnquiry = await Enquiry.create({
      fullName: fullName.trim(),
      countryCode: countryCode.trim(),
      contactNumber: contactNumber.replace(/[\s-]/g, ""),
      email: email.trim().toLowerCase(),
      dateOfTravel: travelDate,
      numberOfPeople: peopleCount,
      hotelCategory,
      numberOfChildren: childrenCount,
    });

    return NextResponse.json(
      { success: true, message: "Enquiry submitted successfully", data: newEnquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return NextResponse.json(
      { success: false, errors: ["Internal Server Error. Please try again later."] },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, data: enquiries },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { success: false, errors: ["Internal Server Error. Could not fetch enquiries."] },
      { status: 500 }
    );
  }
}
