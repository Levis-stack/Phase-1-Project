const API = 'http://localhost:3000/images';

function displayImages() {
  fetch(API)
    .then(response => response.json())
    .then(data => {
      console.log('data:', data);
      let gallery = document.getElementById('image-gallery');
      gallery.innerHTML = ''; 
      data.forEach(image => {
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.description;
        img.title = image.title;
        gallery.appendChild(img);

        img.addEventListener('mouseover', () => {
          img.style.transform = "scale(0.8) rotate(-15deg)";
          img.style.borderRadius = "20px";
          img.style.boxShadow = "0 32px 75px rgba(3, 8, 46, 0.2)";
        });

        img.addEventListener('mouseout', () => {
          img.style.transform = "scale(1) rotate(0deg)";
          img.style.borderRadius = "0px";
          img.style.boxShadow = "none";
        });

        img.addEventListener('click', () => {
          const fullImageDiv = document.getElementById('full-image');
          fullImageDiv.innerHTML = `
            <div class="card">
              <div class="card-content">
                <img src="${image.url}" alt="${image.title}">
                <div class="card-body">
                  <p>${image.description}</p>
                  <button class="delete-button" data-id="${image.id}">Delete</button>
                </div>
              </div>
            </div>
            <span>X</span>
          `;
          fullImageDiv.style.display = 'block';

          const closeButton = fullImageDiv.querySelector('span');
          closeButton.addEventListener('click', () => {
            fullImageDiv.style.display = 'none';
          });

          const deleteButton = fullImageDiv.querySelector('.delete-button');
          deleteButton.addEventListener('click', () => {
            const imageId = deleteButton.getAttribute('data-id');
           
            fetch(`${API}/${imageId}`, {
              method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
              console.log("Image deleted:", data);
              displayImages();
            })
            .catch(error => {
              console.error("Error deleting image:", error);
            });
          });
        });
      });
    });
}

displayImages();

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const currentRight = window.getComputedStyle(sidebar).right;

  if (currentRight === '0px') {
    sidebar.style.right = '-500px';
  } else {
    sidebar.style.right = '0';
  }
}

function addSubmitListener() {
  const form = document.getElementById('sidebarForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const imageName = formData.get("image-name");
    const imageLink = formData.get("image-url");
    const imageDescription = formData.get("image-description");
    const imageId = formData.get("image-id");

    const imageData = {
      name: imageName,
      url: imageLink,
      description: imageDescription
    };

    if (imageId) {
      const method = formData.get("method");
      if (method === "PATCH") {
        fetch(`${API}/${imageId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(imageData)
        })
          .then(response => response.json())
          .then(data => {
            console.log("Image updated:", data);
            displayImages();
          })
          .catch(error => {
            console.error("Error updating image:", error);
          });
      } else if (method === "DELETE") {
        fetch(`${API}/${imageId}`, {
          method: "DELETE"
        })
          .then(response => response.json())
          .then(data => {
            console.log("Image deleted:", data);
            displayImages(); 
          })
          .catch(error => {
            console.error("Error deleting image:", error);
          });
      }
    } else {
      fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(imageData)
      })
        .then(response => response.json())
        .then(data => {
          console.log("New image added:", data);
          displayImages();
        })
        .catch(error => {
          console.error("Error adding image:", error);
        });
    }
  });
}

window.addEventListener("DOMContentLoaded", addSubmitListener);
