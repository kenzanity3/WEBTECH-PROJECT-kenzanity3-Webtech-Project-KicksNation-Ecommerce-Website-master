
// Retrieve the userID from the URL query string
export function userID (){
    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get('Userid');
    console.log(userID);
    return userID;
};

// Retrieve the itemID from the URL query string
export function itemID(){
    const urlParams = new URLSearchParams(window.location.search);
    const itemID = urlParams.get('Itemid');
    return itemID;
};


    // Fills empty fields with existing data for unchanged values
    export async function oldinfo(Fname, Lname, Address, Bdate, Phonenumber, Email) {
    const userdata = await GetUserData(); // Retrieve user data from database
    if (!Fname) Fname = userdata.FirstName;
    if (!Lname) Lname = userdata.LastName;
    if (!Address) Address = userdata.Address;
    if (!Bdate) Bdate = userdata.Birthdate;
    if (!Phonenumber) Phonenumber = userdata.PhoneNumber;
    if (!Email) Email = userdata.Email;

    return { Fname, Lname, Bdate, Email, Phonenumber, Address }; // Return completed user data
}

// Function to get user data from the database based on the userID
export async function GetUserData() {
    const database = await userdatabase(); // Fetch user database
    const userdata = database.find(user => user.Userid === parseInt(userID())); // Find user by ID
    return userdata;
}   

// Function to get user data from the database based on the userID
export async function GetItemData() {
    const database = await itemdatabase(); // Fetch user database
    const itemdata = database.find(item => item.Itemid === parseInt(itemID())); // Find user by ID
    return itemdata;
}  

// Function to fetch user data from the API
export async function userdatabase() {
    try {
        const response = await fetch('./database/user.json'); // Await the fetch call to get user data
        const data = await response.json(); // Await the response.json() call to parse the JSON
        return data; // Return the parsed user data
    } catch (error) {
        console.error('Error fetching user data', error); // Log any errors that occur during the fetch
        return []; // Return an empty array in case of an error
    }
}

    // Function to fetch admin data from the API
    export async function admindatabase() {
    try {
        const response = await fetch('./database/admin.json'); // Await the fetch call to get admin data
        const data = await response.json(); // Await the response.json() call to parse the JSON
        return data; // Return the parsed admin data
    } catch (error) {
        console.error('Error fetching user data', error); // Log any errors that occur during the fetch
        return []; // Return an empty array in case of an error
    }
}

// Function to fetch admin data from the API
export async function itemdatabase() {
    try {
        const response = await fetch('./database/itemdescription.json'); // Await the fetch call to get item data
        const data = await response.json(); // Await the response.json() call to parse the JSON
        return data; // Return the parsed item data
    } catch (error) {
        console.error('Error fetching user data', error); // Log any errors that occur during the fetch
        return []; // Return an empty array in case of an error
    }
}

// Function to set date of birth restrictions in the input field
export function dateofbirth() {
    // Age restrictions: minimum 18 years and maximum 100 years
    const age = 18;
    const oldage = 100;

    const today = new Date(); // Fetch today's date
    const year = today.getFullYear() - age; // Minimum year for age requirement (18 years ago)
    const maxyear = today.getFullYear() - oldage; // Maximum year for age requirement (100 years ago)
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Fetch current month and pad it to 2 digits
    const day = String(today.getDate()).padStart(2, '0'); // Fetch current day and pad it to 2 digits

    // Set dynamic restrictions on calendar input min and max value
    const bdatemax = `${year}-${month}-${day}`; // Maximum date for 18 years old
    const bdatemin = `${maxyear}-${month}-${day}`; // Minimum date for 100 years old

    // Select the birthdate input field from the DOM
    const BirthdateInput = document.getElementById('Birthinput');
    // Set the maximum birthdate (user must be at least 18 years old)
    BirthdateInput.setAttribute('max', bdatemax);
    // Set the minimum birthdate (user cannot be older than 100 years)
    BirthdateInput.setAttribute('min', bdatemin);
}

