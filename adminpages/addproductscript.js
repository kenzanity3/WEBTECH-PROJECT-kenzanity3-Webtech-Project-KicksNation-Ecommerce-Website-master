document.getElementById('image').addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const preview = document.getElementById('preview');
            preview.src = e.target.result; // Set the image source to the file reader result
            preview.style.display = 'block'; // Show the image
        }
        
        reader.readAsDataURL(file); // Convert the file to a data URL
    }
});

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const imageFile = document.getElementById('image').files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', imageFile);

    fetch('http://localhost:3000/products', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Product added successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error adding product.');
    });
});