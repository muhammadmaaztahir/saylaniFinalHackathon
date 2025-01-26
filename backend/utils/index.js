export function generateStrongPassword(length = 12) {
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?";
    
    const allCharacters = lowerCase + upperCase + numbers + specialCharacters;
  
    let password = "";
  
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

    for (let i = 4; i < length; i++) {
      password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }
  
    password = password.split("").sort(() => 0.5 - Math.random()).join("");
  
    return password;
  }
