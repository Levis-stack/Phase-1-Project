# Image Gallery Website

### Overview
The Image Gallery website is a simple, interactive platform where users can browse and interact with images. Users can view full-size images, add new images, update existing ones, or delete them. The gallery is built to be responsive and adapts seamlessly to different screen sizes.

### Key Features
- **Responsive Design**: The website is fully responsive and works across all devices, including desktops, tablets, and smartphones.
- **Image Hover Effects**: Hovering over images gives them a dynamic feel by applying a scale and rotation effect.
- **Full-Screen Image View**: Clicking on an image opens a full-screen modal where users can see the image in its full size and read its description.
- **Sidebar for Adding/Updating Images**: The sidebar provides a user-friendly interface for adding new images to the gallery. It also allows for updating or deleting existing images.
- **Image Management**: The website supports dynamic image management, such as adding new images and deleting images using an API.

### Tech Stack
- **HTML**: For the structure of the website.
- **CSS**: For styling the page and implementing responsive design.
- **JavaScript**: For dynamic interactions, including adding hover effects, image updates, and gallery management.
- **API**: A mock API is used to fetch and manage images, which supports GET, POST, PATCH, and DELETE methods.

### Getting Started

### 1. Clone the repository
First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/image-gallery.git
cd image-gallery
```

## 2. Install Dependencies
If you’re using a backend (API), make sure it’s running. This project assumes an API running at `http://localhost:3000/images` for fetching and managing images. For a quick backend setup, you can use services like `json-server`.

#### For local testing, install `json-server` (if not using your own API):

```bash
npm install -g json-server
```

#### Create a db.json file (mock database):

#### Copy
```js
{
  "images": [
    {
      "id": 1,
      "name": "Image 1",
      "url": "https://via.placeholder.com/600",
      "description": "This is a sample image."
    },
    {
      "id": 2,
      "name": "Image 2",
      "url": "https://via.placeholder.com/600",
      "description": "This is another sample image."
    }
  ]
}
```
#### Start the server:

#### Copy
```bash
json-server --watch db.json --port 3000
```
## 3. Open the Website
Open the `index.html` file in your browser. The site will fetch images from your local API and display them in a gallery format.

## Features in Detail

### Image Gallery Grid
The images are displayed in a flexible, responsive grid layout using CSS Grid. The gallery automatically adjusts based on the screen size.

```css
#image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 30px;
}
```
### Hover Effect
Each image has a smooth hover effect using JavaScript. When the user hovers over an image, it scales down slightly, rotates, and adds a shadow for a dynamic experience.

```javascript
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
```
### Sidebar
The sidebar allows users to add, update, and delete images. It slides in from the right and provides a form for entering the image’s name, URL, and description.

```javascript
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const currentRight = window.getComputedStyle(sidebar).right;

  if (currentRight === '0px') {
    sidebar.style.right = '-500px';
  } else {
    sidebar.style.right = '0';
  }
}
```
Responsive Design
The website is built to be fully responsive. The layout changes based on the screen size:

On desktop, images are displayed in a wide grid.

On tablets, images are resized to fit the screen.

On mobile devices, the layout becomes more compact with fewer images in the grid.

```css
Copy
@media (max-width: 768px) {
  #image-gallery {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
```
## API Endpoints
The application interacts with a backend API to manage images. Here are the key endpoints:

- **GET** `/images`: Fetches all images in the gallery.
- **POST** `/images`: Adds a new image to the gallery.
- **PATCH** `/images/{id}`: Updates an image’s details (name, URL, description).
- **DELETE** `/images/{id}`: Deletes an image from the gallery.

## Future Enhancements
- **User Authentication**: Add a login system to allow users to manage their own galleries.
- **Likes and Comments**: Enable users to like and comment on images.
- **Search Functionality**: Implement a search bar to allow users to filter images by name or description.
- **Image Sorting**: Allow users to sort images by name, date, or popularity.

## Contribution
Feel free to fork this project, make changes, and submit pull requests. Your contributions are welcome!

## License
This project is open-source and available under the MIT License.
