import  {userID,userdatabase,oldinfo,GetUserData,dateofbirth,checkid} from './managementjavascript/fetchanddisplay.js'
import {Userchangedetail} from './managementjavascript/usermanagement.js';
import  {phonematchesPattern,EmailmatchesPattern,AddressmatchesPattern,UsernamematchesPattern,isValidPassword,idcheck} from './managementjavascript/validation.js';

idcheck();

//information change button
{
    // Validates input fields for the user details update
    function validateInput(address, Phonenumber, email, database) {
        let valid = true; // Validation flag
        let alertmessages = []; // Array for error messages
        let existingUser;
        const CurrentUser = userID();
        // Validate Phone Number length
        if (Phonenumber.length !== 11) {
            valid = false;
            alertmessages.push('Error: The phone number requires exactly 11 digits.');
        }
        if(!phonematchesPattern(Phonenumber)){
            valid = false;
            alertmessages.push('Error: The address is not in proper format.');
        }

        // Check for duplicate Phone Number
        existingUser = database.find(user => user.Phonenumber === Phonenumber);
        if (existingUser && existingUser.Userid !== CurrentUser) { 
            valid = false;
            alertmessages.push('Error: The Phone number is already registered to another account.');
        }

        // Validate Address format
        if (!AddressmatchesPattern(address)) {
            valid = false;
            alertmessages.push('Error: The address is not in proper format.');
        }

        // Validate Email format
        if (!EmailmatchesPattern(email)) {
            valid = false;
            alertmessages.push('Error: The email is not in proper format.');
        }

        // Check for duplicate Email
        existingUser = database.find(user => user.Email.toLowerCase() == email.toLowerCase());
        if (existingUser && existingUser.Userid != CurrentUser) { 
            valid = false;
            alertmessages.push('Error: The Email is already registered.');
        }

        return { valid, alertmessages }; // Return validation results and messages
    }
         
    //Dom Manipulation
    {
        // Wait until document is fully loaded
        document.addEventListener('DOMContentLoaded', async () => {
            checkid();
            dateofbirth();
            const userdata = await GetUserData(); // Fetch user data

            // Populate placeholders with existing user information if available
            if (userdata) {
                document.getElementById('FNameinput').placeholder = userdata.FirstName.trim();
                document.getElementById('LNameinput').placeholder = userdata.LastName.trim();
                document.getElementById('Addressinput').placeholder = userdata.Address.trim();
                document.getElementById('Birthinput').value = userdata.Birthdate.trim();
                document.getElementById('Phonenumberinput').placeholder = userdata.PhoneNumber.trim();
                document.getElementById('Emailinput').placeholder = userdata.Email.trim();
                document.getElementById('Usernameinput').placeholder = userdata.Username.trim();
            } else {
                console.error("User not found in the database.");
            }
        });

        // Handle user detail update on button click
        document.getElementById('SubmitButton').addEventListener('click', async (event) => {
            event.preventDefault();

            const database = await userdatabase(); // Fetch user database
            const FNameinput = document.getElementById('FNameinput').value.trim();
            const LNameinput = document.getElementById('LNameinput').value.trim();
            const Addressinput = document.getElementById('Addressinput').value.trim();
            const Birthdateinput = document.getElementById('Birthinput').value.trim();
            const Phonenumberinput = document.getElementById('Phonenumberinput').value.trim();
            const Emailinput = document.getElementById('Emailinput').value.trim();

            // Fill in empty fields with existing values
            const { Fname, Lname, Address, Bdate, Phonenumber, Email } 
            = await oldinfo(FNameinput, LNameinput, Addressinput, Birthdateinput, Phonenumberinput, Emailinput);

            // Validate user inputs
            const { valid, alertmessages } = validateInput(Address, Phonenumber, Email, database);

            if (valid) {
                // Construct object for updating user details
                const Userdetail = {
                    FirstName: Fname,
                    LastName: Lname,
                    Address: Address,
                    PhoneNumber: Phonenumber,
                    Email: Email,
                    Birthdate: Bdate,
                };
                await Userchangedetail(Userdetail);
            } else {
                alert(alertmessages.join('\n'));
            }
        });
    }
}

    // Validates and changes username and password
    async function validateusernameandpassword(username, password, repassword, database) {
        const userdata = await GetUserData(); // Retrieve current user data
        let valid = true; // Validation flag
        let alertmessages = []; // Array for error messages

        // If username is empty but password and re-password are provided, use the existing username from database
        if (!username && (password && repassword)) {
            username = userdata.Username; // Set username if empty
        } else if (!username || !password || !repassword) {
            // If any of the fields are empty, display error message
            alertmessages.push('Error: All fields are required.');
            valid = false;
        } else {
            // Validate Username format
            if (!UsernamematchesPattern(username)) {
                valid = false; // Set validation flag to false if username does not match pattern
                alertmessages.push('Error: The Username should start with letters. Please try another one.');
            }

            // Check for duplicate Username in the database
            const existingUser = database.find(user => user.Username.toLowerCase() === username.toLowerCase());
            if (existingUser && existingUser.Userid !== userID()) { 
                valid = false; // Set validation flag to false if username is already taken
                alertmessages.push('Error: Username is already taken.');
            }

            // Validate that password and re-password fields match
            if (password !== repassword) { 
                valid = false; // Set validation flag to false if passwords do not match
                alertmessages.push('Error: Passwords do not match.');
            }

            // Validate password strength
            if (!isValidPassword(password)) { 
                valid = false; // Set validation flag to false if password is not strong enough
                alertmessages.push('Error: Password is not strong enough. It must be at least 8 characters long and contain both letters and special characters.');
            }
        }

        return { valid, alertmessages }; // Return validation results and messages
    }

    // Change button listener for username and password update
    document.getElementById("Changeuserandpassbutton").addEventListener('click', async (event) => {
        event.preventDefault();
        console.log('igit');
        const database = await userdatabase(); // Fetch user database
        const username = document.getElementById('Usernameinput').value.trim();
        const password = document.getElementById('Passwordinput').value.trim();
        const repassword = document.getElementById('Repasswordinput').value.trim();

        const { valid, alertmessages } = validateusernameandpassword(username, password, repassword, database);

        if (valid) {
            // Update user login details
            const NewUserlogin = { Username: username, Password: password };
            await Userchangedetail(NewUserlogin);
            alert('Password change successful!');
        } else {
            alert(alertmessages.join('\n'));
        }
    });
