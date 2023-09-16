function generatePassword(){

    const key = (Math.random() + 1).toString(30).substring(2).substring(0,10);
    const newPassword = key.replace("n", "@").replace("w", "!").replace("i", "#").replace("t", "$").replace("a", "*").replace("r", "%");
  
    return newPassword;
  }
  
  export {generatePassword};