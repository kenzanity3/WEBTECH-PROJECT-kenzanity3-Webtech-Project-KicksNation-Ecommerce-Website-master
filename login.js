import { userdatabase,admindatabase } from "./managementjavascript/fetchanddisplay.js";
import {Userchangedetail} from "./managementjavascript/usermanagement.js"


// Function to check user login credentials
async function check(username, password) { 
    

    // Fetch the user and admin data from the userdatabase function
    const data = await userdatabase();
    const admindata = await admindatabase();

    // Check if username or password is undefined or empty
    if (!username || !password) {       
        alert('Please fill the username and the password.'); // Alert the user to fill in both fields
        return null; // Exit the function if either field is empty
    }

    const admin = admindata.admin.find(admin =>admin.Username.toLowerCase() == username.toLowerCase().trim() && admin.Password == password);

    // Check if username or password is admin account
    if (admin) 
        location.replace(`../adminhomepage/homepage.html`); // Redirect to admin homepage
    

    // Find the user in the data that matches the provided username and password (case insensitive)
    const user = data.findIndex(user =>
        (user.Email.toLowerCase() === username.toLowerCase() || user.Username.toLowerCase() === username.toLowerCase().trim()) && // Check if email or username matches
        user.Password === password);    // Check if password matches

       
    


    // If a matching user is found
    if (user !== -1) {     
        if(data[user].Status != "1"){
            
            const Matcheduser = {
                Userid: data[user].Userid,
                Status: "1"
            }
            const updateStatus = await Userchangedetail(Matcheduser);

            if (updateStatus) {                        
                location.replace(`../userhomepage/index.html?Userid=${Matcheduser.Userid}`);            
            }
            else{
                return alert("Fetching user data failed.");
            }
        }
        else{
            return alert("The account are currently login");
        }
    } 
    else {
        // If no matching user is found                   
        alert("Invalid username or password."); // Log error message to the console
        
        return null; // Return null if login fails
    }
};


// Event listener for the login button click
document.getElementById('LoginButton').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the default form submission
    event.stopPropagation(); // Stop event propagation
    // Get the username and password input values
    // const username = document.getElementById('UsernameInput').value;
    // const password = document.getElementById('PasswordInput').value;
    const username = "example";
    const password = "@Exa1234";
    // Call the check function with the provided username and password
    await check(username, password)

});