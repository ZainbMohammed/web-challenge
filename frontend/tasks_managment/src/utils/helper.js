
// Function to validate an email address using a regex pattern.
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// get the initials from a name by cut first letter from each word
export const initName = (name) => {
     if (!name){
        return '';
     }
     const words = name.split(' ');
     let initials = '';

     for(let i =0; i < Math.min(words.length,2); i++){
        initials += words[i][0];
     }
     return initials;
}