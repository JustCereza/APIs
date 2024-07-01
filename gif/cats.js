// gatitos.js

function loadKittenGif() {
    const apiUrl = 'https://cataas.com/cat/gif';
  
    fetch(apiUrl)
      .then(response => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error('Error al cargar el GIF de gatito');
        }
      })
      .then(data => {
        const kittenUrl = URL.createObjectURL(data);
  
        // Eliminamos el GIF anterior si existe
        const existingImg = document.getElementById('kittenGif');
        if (existingImg) {
          existingImg.src = ''; // Limpiamos el src para evitar que la imagen siga cargada
        }
  
        // Mostramos el nuevo GIF de gatito
        const img = document.createElement('img');
        img.src = kittenUrl;
        img.id = 'kittenGif';
        img.classList.add('gif-image');
        const imageContainer = document.querySelector('.image-container');
        imageContainer.innerHTML = ''; // Limpiamos el contenedor antes de añadir la nueva imagen
        imageContainer.appendChild(img);
      })
      .catch(error => {
        console.error('Error al cargar el GIF de gatito:', error);
      });
  }
  
  // Evento de clic para el botón de generar GIF de gatito
  const generateKittenGifButton = document.getElementById('generateKittenGif');
  generateKittenGifButton.addEventListener('click', loadKittenGif);
  
  // Evento de clic para el botón de ocultar GIF de gatito
  const hideKittenGifButton = document.getElementById('hideKittenGif');
  hideKittenGifButton.addEventListener('click', () => {
    const img = document.getElementById('kittenGif');
    if (img) {
      img.remove();
    }
  });
  