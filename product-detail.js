import {idcheck} from './managementjavascript/validation.js' 
import{itemID, userID,GetItemData,GetUserData} from './managementjavascript/fetchanddisplay.js'
import {addingcartitem} from './managementjavascript/usermanagement.js'

const itemimage = document.getElementById('product-img');
const itemname = document.getElementById('name');
const itemprice = document.getElementById('price');
const itemdescription = document.getElementById('Description');
async function initializedisplay(){

    if(itemID() == null )
    {
        alert("the Item did not Exist");
        location.replace(`index.html?Userid=${userID()}`);
    }

    const itemdata = await GetItemData();

    itemimage.src = itemdata.Image;
    itemname.textContent = itemdata.Name;
    itemprice.textContent = itemdata.Price;
    itemdescription.textContent = itemdata.itemdescription;
}

document.addEventListener('DOMContentLoaded', async () => {

await initializedisplay();

var ProductImg = document.getElementById("product-img");//larger image
var SmallImg = document.getElementsByClassName("small-img");//it returns list of 4 images having index 0,1,2,3 as we have 4 images with class name "small0-img" 

SmallImg[0].onclick = function()//when user click on first image or images at 0 index, it will display as ProdcutImg.src replace with clicked or SmallImg[0], so we get smallimg[0] in bigger form, similarly when click on smallimg[1], it will display in bigger picture and so on 
{
    ProductImg.src = SmallImg[0].src;   
}

SmallImg[1].onclick = function()
{
    ProductImg.src = SmallImg[1].src;   
}

SmallImg[2].onclick = function()
{
    ProductImg.src = SmallImg[2].src;   
}

SmallImg[3].onclick = function()
{
    ProductImg.src = SmallImg[3].src;   
}
});

// Add an event listener to the button with ID 'btn'
document.getElementById('btn').addEventListener("click", async (event) => {
    // Prevent the default behavior and stop event propagation
    event.stopPropagation();
    event.preventDefault();

    

    // Check if the user is logged in using the idcheck function
    if(!await idcheck()){
        
        // Initialize an empty object to store cart item details
        let cartitemformat = {};   

        // Retrieve the value of the quantity input field (first element with class 'quantity-input')
        let Quantity = Number(document.getElementsByClassName('quantity-input')[0].value);

        // Get the selected size dropdown element
        const Size = document.getElementById('select');
        
        // Get the item data and user data asynchronously
        const ItemData = await GetItemData();
        const user = await GetUserData();

        // Search for the item in the user's cart using the item ID
        const usercart = user.Cart.findIndex(item => item.Itemid === ItemData.Itemid);

        // Check if the quantity is positive; if not, show an alert and stop further execution
        if(Quantity < 1)
            return alert("The Quantity must be positive");

        // Check if a size has been selected; if not, show an alert and stop further execution
        if(Size.selectedIndex == 0)
            return alert("Please select size.");
        
        // If the item already exists in the user's cart, update the quantity by adding the previous quantity
        if(usercart !== -1){
            Quantity = Quantity + user.Cart[usercart].Quantity;
        }
       
        // Assign values to the cart item format object
        cartitemformat.Itemid = ItemData.Itemid;
        cartitemformat.Name = ItemData.Name;
        cartitemformat.Quantity = Quantity;
        cartitemformat.Size = Size.value; 
        cartitemformat.Price = ItemData.Price;   

        // Call the function to add the item to the cart
        addingcartitem(cartitemformat);
    }
    else{
        // If the user is not logged in, redirect them to the authentication page and show an alert
        location.replace("../authenticationpage/Authentication.html");
        return alert("Please Login");
    }
})