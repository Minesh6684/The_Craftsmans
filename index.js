window.addEventListener("scroll", function () {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var rotatingElement = document.querySelector(".text-path");
  var contactFormWheel = document.querySelector(".contact-form-wheel");
  rotatingElement.style.transform = "rotate(" + scrollTop / 3 + "deg)";
  contactFormWheel.style.transform = "rotate(" + scrollTop / 3 + "deg)";

  var ethics = document.querySelectorAll(".ethics .ethic");

  var observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      var descriptionElement = entry.target.querySelector(".ethic-description");
      var titleElement = entry.target.querySelector(".ethic-title");

      if (descriptionElement && titleElement) {
        if (entry.isIntersecting) {
          descriptionElement.style.left = entry.intersectionRect.y / 2.2 + "px";
          titleElement.style.right = entry.intersectionRect.y / 2.2 + "px";
        }
      }
    });
  });

  ethics.forEach(function (ethic) {
    observer.observe(ethic);
  });
});

const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission

  const nameInput = document.querySelector(".contact-form-name");
  const emailInput = document.querySelector(".contact-form-email");
  const subjectInput = document.querySelector(".contact-form-subject");
  const messageInput = document.querySelector(".contact-form-message");

  const name = nameInput.value;
  const email = emailInput.value;
  const subject = subjectInput.value;
  const message = messageInput.value;

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email account password
    },
  });

  // Define the email options
  const mailOptionsToUser = {
    from: process.env.EMAIL_USER, // Sender address
    to: email, // List of recipients
    subject: "Minesh Tandel", // Subject line
    text: "Your inquiry is submitted successfully. You are important to us. We will get back to you soon", // Plain text body
  };

  const mailOptionsToMe = {
    from: process.env.EMAIL_USER, // Sender address
    to: process.env.EMAIL_USER, // List of recipients
    subject: `${name} : ${subject}`, // Subject line
    text: message, // Plain text body
  };

  // Send the email
  transporter.sendMail(mailOptionsToUser, function (error, info) {
    if (error) {
      console.log("Error occurred:", error.message);
    } else {
      console.log("Email sent successfully!");
      console.log("Message ID:", info.messageId);
    }
  });

  transporter.sendMail(mailOptionsToMe, function (error, info) {
    if (error) {
      console.log("Error occurred:", error.message);
    } else {
      console.log("Email sent successfully!");
      console.log("Message ID:", info.messageId);
    }
  });
});
