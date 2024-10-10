const nodemailer = require("nodemailer");

async function sendEmail({ args, operation, result }) {
  if (operation === "create") {
    const transporter = nodemailer.createTransport({
      host: "smtp.ionos.de",
      port: 587, // Change the port according to your configuration
      secure: false,
      auth: {
        user: "inquiries@tst-touristik.de", // Username
        pass: "MTomasevic@1972", // Password
      },
    });

    const {
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      checkInDate,
      checkOutDate,
      message,
      guests,
      pagePath,
      listingName,
    } = args.data;

    // Define email message
    const messageContent = {
      "First name": firstName,
      "Last name": lastName,
      "Email address": emailAddress,
      "Phone number": phoneNumber,
      "Listing name": listingName,
      Link: pagePath,
      "Check-in": checkInDate,
      "Check-out": checkOutDate,
      People: guests,
      Message: message,
    };

    const structuredMessageContent = Object.entries(messageContent)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    const toTST = {
      from: "inquiries@tst-touristik.de",
      to: `info@tst-touristik.de`,
      subject: `New inquiry from ${emailAddress}`,
      text: structuredMessageContent,
    };

    const toUser = {
      from: "inquiries@tst-touristik.de",
      to: `${emailAddress.trim()}`,
      subject: "We've received your inquiry",
      text: structuredMessageContent,
    };

    // Send email
    try {
      await transporter.sendMail(toTST);
    } catch (error) {
      console.log("Error sending to TST", error);
    }

    try {
      await transporter.sendMail(toUser);
    } catch (error) {
      console.log("Error sending to user", error);
    }
  }
}

module.exports = sendEmail;
