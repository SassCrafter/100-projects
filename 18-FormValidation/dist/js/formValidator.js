class FormValidator {
  errorString = "error";
  successString = "success";
  password;
  canSubmit = false;
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  init() {
    this.validateOnInput();
    this.validateOnSubmit();
  }

  validateOnInput() {
    const self = this;
    this.fields.forEach((field) => {
      const input = document.getElementById(field);
      input.addEventListener("input", () => {
        self.validateInput(input);
      });
    });
  }

  validateOnSubmit() {
    const self = this;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      self.fields.forEach((field) => {
        const input = document.getElementById(field);
        if (!this.canSubmit) {
          self.validateInput(input);
        }
      });
    });
  }

  validateUserNameInput(input) {
    const regex = /^\w+$/;
    return regex.test(input.value) && input.value.length > 2;
  }

  validateEmailInput(input) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(input.value);
  }

  validatePasswordInput(input) {
    const regex = /[a-z]\d|\d[a-z]/i;
    return regex.test(input.value) && input.value.length > 2;
  }

  validateConfirmPasswordInput(inputToCheck, password) {
    //console.log(inputToCheck.value, password);
    return inputToCheck.value === password;
  }

  validateInput(input) {
    let errorMessage = input.parentElement.previousElementSibling.textContent;
    if (input.value.trim() === "") {
      errorMessage += " cannot be blank";
      this.setStatus(input, errorMessage, this.errorString);
      return;
    }
    if (input.dataset.type === "username") {
      errorMessage +=
        " can only have letters, numbers, underscores and must have at least 3 chars";
      this.validateUserNameInput(input)
        ? this.setStatus(input, null, this.successString)
        : this.setStatus(input, errorMessage, this.errorString);
    }
    if (input.type === "email") {
      errorMessage += " is not valid";
      this.validateEmailInput(input)
        ? this.setStatus(input, null, this.successString)
        : this.setStatus(input, errorMessage, this.errorString);
    }
    if (input.type === "password" && input.dataset.type === "password") {
      errorMessage += " must be at least 3 chars and  has a number";
      if (this.validatePasswordInput(input)) {
        this.setStatus(input, null, this.successString);
        this.password = input.value;
        return;
      }
      this.setStatus(input, errorMessage, this.errorString);
    }

    if (
      input.type === "password" &&
      input.dataset.type === "password-confirm"
    ) {
      errorMessage = "Passwords do not match";
      this.validateConfirmPasswordInput(input, this.password)
        ? this.setStatus(input, null, this.successString)
        : this.setStatus(input, errorMessage, this.errorString);
    }
  }

  showIcon(displayIcon, hideIcon, className) {
    displayIcon.classList.add(className);
    hideIcon.classList.remove(className);
  }

  setStatus(input, message, status) {
    const errorIcon = input.parentElement.querySelector(".icon--error");
    const successIcon = input.parentElement.querySelector(".icon--success");
    const messageEl = input
      .closest(".form__group")
      .querySelector(".error-message");

    if (status === this.errorString) {
      this.showIcon(errorIcon, successIcon, "visible");
      input.classList.add("input-error");
      messageEl.textContent = message;
      return;
    }

    this.showIcon(successIcon, errorIcon, "visible");
    input.classList.remove("input-error");
    messageEl.textContent = "";
  }
}

const form = document.getElementById("signup-form");
const formFields = [
  "username-input",
  "email-input",
  "password-input",
  "password-confirm-input",
];

const validator = new FormValidator(form, formFields);
validator.init();
