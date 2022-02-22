//Set up variables for a button, userChoice, and the generated password. Also set up arrays for all of the characters needed for the password generation.
let button = document.getElementById("generate");
let passwordTextBox = document.getElementById("password");
let userChoice = [];
let generatedPassword = "";

//lowercase, uppercase, numeric, and/or special characters
const lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// const special = "!@#$%^&*()_+~`|}{[]\:;?><,./-=";
const special = ["'", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "~", "`", "|", "}", "{", "[", "]", "\"", ":", ";", "?", ">", "<", ",", ".", "/", "-", "="];

// this function will call the generated password function, and will then print that generated password onto the screen.
function writePassword() {
  passwordTextBox.value = generatePassword();
}

// here make a generate password function which will gather the user input about length and inclusions, keeping them separate helps avoid an endless cycle as well as actually creating the password
function generatePassword() {
  // this function will gather the length using a prompt !hint you may have to return an array containing the input here if you are having trouble, aka [userPassLength]!
  function userInput() {
    let userPassLength = window.prompt("Please indicate desired password length: 8-128");

    if(userPassLength < 8 || userPassLength > 128) {
      alert("Password length must be between 8 - 128. Please enter a valid password length.");
      return userInput();
    }
    return [userPassLength];
  }
  //this function gathers user's inclusions (lowercase, uppercase, number, special) !hint return an array! *** bonus *** how can we ensure the user selects at least one option?
  function userConfirms() {
    let userLower = confirm("Should the password include lowercase letters?");
    let userUpper = confirm("Should the password include uppercase letters?");
    let userNumber = confirm("Should the password include numbers?");
    let userSpecial = confirm("Should the password include special characters?");
  
    if (!userLower && !userUpper && !userNumber && !userSpecial) {
      alert("Please select at least one character type.");
      return userConfirms();
    }

    return [userLower, userUpper, userNumber, userSpecial];
  }

  let userPassLengthHolder = userInput();
  //this step is only necessary if you returned an array from userInput()
  userPassLength = userPassLengthHolder[0];


//here we use the array returned from userConfirms() to select which inclusions the user wants in their password. 
  let userBoolean = userConfirms();
  userLower = userBoolean[0];
  userUpper = userBoolean[1];
  userNumber = userBoolean[2];
  userSpecial = userBoolean[3];

  //here we need to use if statements to add the arrays of the desired inclusions to our userChoice array
  if (userLower) {
    userChoice = userChoice.concat(lower);
  }
  if (userUpper) {
    userChoice = userChoice.concat(upper);
  }
  if (userNumber) {
    userChoice = userChoice.concat(number);
  }
  if (userSpecial) {
    userChoice = userChoice.concat(special);
  }

//here we will actually create our password
  function createPassword() {
    //this is so the generator can be run over and over without refreshing the page.
    if (generatedPassword.length > 0) {
      generatedPassword = "";
    }
    //here will need to set up a loop that will make a random character for each character of the password
    for (let i = 0; i < userPassLength; i++) {
      let randomIndex = Math.floor(Math.random() * userChoice.length);
      generatedPassword = generatedPassword.concat(userChoice[randomIndex]);
  }
    return generatePassword;
}
  // createPassword ();
//now we need to check to ensure our password contains at least one of each of the inclusions requested !hint you need the .some array method here!
  if (userLower) {
    // checks generatedPassword if it contains at least one item in lowerCase
    let doesContainLower = generatedPassword.some(lower);
    if (!doesContainLower) {
      return createPassword();
    }
  }
  if (userUpper) {
    // check generatedPassword if it contains at least one item in upperCase
    let doesContainUpper = generatedPassword.some(upper);
    if (!doesContainUpper) {
      return createPassword();
    }
  }
  if (userNumber) {
    // check generatedPassword if it contains at least one item in numbers
    let doesContainNumber = generatedPassword.some(number);
    if (!doesContainNumber) {
      return createPassword();
    }
  }
  if (userSpecial) {
    // check generatedPassword if it contains at least one item in specialCharacters
    let doesContainSpecial = generatedPassword.some(special);
    if (!doesContainSpecial) {
      return createPassword();
    }
  }
  return generatedPassword;
}

// add an event listener to your button to run the write password function
button.addEventListener("click", writePassword);