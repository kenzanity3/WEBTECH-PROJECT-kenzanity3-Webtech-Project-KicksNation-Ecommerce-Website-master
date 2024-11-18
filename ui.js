import { userID } from "./fetchanddisplay.js";
import { accountcheck, idcheck } from "./validation.js";
//declare variable MenuItems which take ul having id "MenuItems"

const MenuItems = document.getElementById("MenuItems");
MenuItems.style.maxHeight = "0px";//by default, we have set menu or dropdown menu height to 0px, means it is close by default

function menutoggle()//this is the function which we have called above in nav which works on small devices and users click on it
{
    if (MenuItems.style.maxHeight =="0px")//when user click on it and if it is closed or its height is 0px, then it will open or it should have heigt of 200px upon clicking
    {
        MenuItems.style.maxHeight = "200px"
    }
    else//if user not clicked or it has already opened, then it will upon clicking again closed
    {
        MenuItems.style.maxHeight = "0px" 
    }
};

const LoginForm = document.getElementById("LoginForm");
const RegForm = document.getElementById("RegForm");
const Indicator = document.getElementById("Indicator");

function register(){

    RegForm.style.transform = "translateX(0px)";//in Css, by default we set translatex(100) so by default, we are at register, thats why when person clicks on register, everything stayed there stayed there
    LoginForm.style.transform = "translateX(0px)";
    Indicator.style.transform = "translateX(100px)";//As mentioned above, in css translatex(100) is set, so for indicator to be by default on register, we set it to 100px;
    LoginForm.elements['UsernameInput'].value = null;
    LoginForm.elements['PasswordInput'].value = null;
};

function login(){

    RegForm.style.transform = "translateX(300px)";//when person clicks on login, login form shift to 300px forward and register form goes 300px outside, but we cannot see it as we use overflow=hidden in css, if want to see, then remove overflow property.
    LoginForm.style.transform = "translateX(300px)";
    Indicator.style.transform = "translateX(0px)";//as by default on 100px or on register, so when clicks on login, it comes back to 0 px
    RegForm.elements['Usernameinput'].value = null;
    RegForm.elements['Emailinput'].value = null;
    RegForm.elements['Passwordinput'].value = null;
    RegForm.elements['Repasswordinput'].value = null;
};

function confirmDataLoss() {
    if (confirm("Leaving this page leads to data loss. Are you sure?")) {
        return true; // Proceed to cart.html
    } else {
        return false; // Stay on current page
    }
}

var quantityElements = document.querySelectorAll('.quantity-input'); 
quantityElements.forEach(quantityElement => {
    quantityElement.addEventListener('change', () => {
        if (quantityElement.value < 1) {
            quantityElement.value = 1;
        }
        if (quantityElement.value > 99) {
            quantityElement.value = 99;
        }
    });
});

//initialize design, url code and account check
document.addEventListener('DOMContentLoaded', async function() {

    //globalize the javascript design
    window.login = login;
    window.register = register;
    window.confirmDataLoss = confirmDataLoss;
    window.menutoggle = menutoggle;
    
    // Check if the current page is an authentication page based on the query parameter
    const isAuthenticationPage = window.location.pathname.toLowerCase().includes('/authenticationpage/authentication.html');
        
    // If the current page is not the authentication page, check if the user is logged in.
    if (!isAuthenticationPage) {
        // If the user is not logged in, show an alert and redirect to the login page.
        let IsLoggedIn = await accountcheck();      
        
        if (IsLoggedIn) {
            alert("You illegally login"); // Alert the user for unauthorized access
            location.replace("../authenticationpage/Authentication.html"); // Redirect to the authentication page
        }
    }

    // Dynamically determine the base path based on the current file's location
    const basePath = isAuthenticationPage ? '../userhomepage' : '.';

    // Navigation link event listeners
  document.getElementById('productsurl').onclick = function() {
    window.location.assign(`${basePath}/Products.html?Userid=${userID()}&Page=1&Filter=1&Brand=Default`);
  };

  document.getElementById('homepageurl').onclick = function() {
    window.location.assign(`${basePath}/index.html?Userid=${userID()}`);
  };

  document.getElementById('aboutusurl').onclick = function() {
    window.location.assign(`${basePath}/about.html?Userid=${userID()}`);
  };

  document.getElementById('contactusurl').onclick = function() {
    window.location.assign(`${basePath}/contact.html?Userid=${userID()}`);
  };

  document.getElementById('carturl').onclick = function() {
    window.location.assign(`${basePath}/cart.html?Userid=${userID()}`);
  };

  document.getElementById('accounturl').onclick = async function() {
    window.location.assign(await idcheck() ? `${basePath}/../authenticationpage/Authentication.html` : `${basePath}/account.html?Userid=${userID()}`);
  };
});


     
