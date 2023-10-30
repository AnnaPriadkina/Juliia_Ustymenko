console.log("Init!");

// inputmask
const form = document.querySelector(".form");

const validation = new JustValidate(".form");

validation
  .addField(".input-name", [
    {
      rule: "minLength",
      value: 3,
    },
    {
      rule: "maxLength",
      value: 30,
    },
    {
      rule: "required",
      value: true,
      errorMessage: "Please enter your name!",
    },
  ])
  .addField(".input-mail", [
    {
      rule: "required",
      value: true,
      errorMessage: "Email required",
    },
    {
      rule: "email",
      value: true,
      errorMessage: "Enter correct Email",
    },
  ])
  .addField(".textarea", [
    {
      rule: "required",
      errorMessage: "Enter your message or subject",
    },
  ])
  .onSuccess((event) => {
    console.log("Validation passes and form submitted", event);

    let formData = new FormData(event.target);

    console.log(...formData);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("Sent");
        }
      }
    };

    xhr.open("POST", "mail.php", true);
    xhr.send(formData);

    event.target.reset();
  });
