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
    } = args.data;

    // Define email message
    const toTST = {
      from: "inquiries@tst-touristik.de",
      to: `info@tst-touristik.de`,
      subject: `New inquiry from ${emailAddress}`,
      text: `First name: ${firstName}\nLast name: ${lastName}\nEmail: ${emailAddress}\nPhone number: ${phoneNumber}\nLink: ${pagePath}\nCheck-in: ${checkInDate}\nCheck-out: ${checkOutDate}\nPeople: ${guests}\nMessage: ${message}`,
    };

    const toUser = {
      from: "inquiries@tst-touristik.de",
      to: `${emailAddress.trim()}`,
      subject: "We've received your inquiry",
      text: `We usually respond within 24 hours.`,
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
