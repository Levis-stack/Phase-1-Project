const API = 'http://localhost:3000/images';
function displayImages() {
    fetch(`${API}`)
        .then(response => response.json())
        .then(data => {
            console.log('data:', data)
            let gallery = document.getElementById('image-gallery');
            data.forEach(image => {
                const img = document.createElement('img');
                img.src = image.url;
                img.alt = image.title;
                gallery.appendChild(img);

                img.addEventListener('click', () => {
                    const fullImageDiv = document.getElementById('full-image');
                    fullImageDiv.innerHTML = `

                     <div class="card">
                       <div class="card-content">
                          <img src="${image.url}" alt="${image.title}">
                      <div class="card-body">
                        
                      
                       </div>
                    </div>
                    </div>
                  </div>

                    <span>X</span>
                    `;
                    fullImageDiv.style.display = 'block'; 

                const closeButton = fullImageDiv.querySelector('span');
                   closeButton.addEventListener('click', () => {
                   fullImageDiv.style.display = 'none'; 

                   toggleSidebar();
      });
                });
            });
        });
}

displayImages();

/* <div id="form">
    <form id="new-ramen">
         <h3>Add New Ramen</h3>
          <label>Image Name:</label>
          <input type="text" id="image-name" name="image-name" >
          <label>Image URL:</label>
          <input type="text" id="image-link" name="image-url">
          <label>Image Description:</label>
          <input type="text" id="image-description" name="image-description">
          <input type="submit" class="btn" value="submit">
    </form>
 </div>
  */

 function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const currentRight = window.getComputedStyle(sidebar).right;
  
    // Check the current position of the sidebar
    if (currentRight === '0px') {
      sidebar.style.right = '-300px'; // Slide it out
    } else {
      sidebar.style.right = '0'; // Slide it in
    }
  }
  