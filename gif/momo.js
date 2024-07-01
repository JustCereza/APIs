function loadNewGif() {
    fetch("https://yesno.wtf/api?ref=public_apis")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error al consumir la API. Código de estado:", response.status);
        }
      })
      .then(data => {
        const gifUrl = data.image;
  
        // Eliminamos el GIF anterior si existe
        const existingImg = document.getElementById("gifImage");
        if (existingImg) {
          existingImg.src = ""; // Limpiamos el src para evitar que la imagen siga cargada
        }
  
        // Mostramos el nuevo GIF
        const img = document.createElement("img");
        img.src = gifUrl;
        img.id = "gifImage";
        img.classList.add("gif-image");
        const imageContainer = document.querySelector(".image-container");
        imageContainer.innerHTML = ""; // Limpiamos el contenedor antes de añadir la nueva imagen
        imageContainer.appendChild(img);
      })
      .catch(error => {
        console.error("Error al consumir la API:", error);
      });
  }
  
  function loadGifOfTheDay() {
    const gifOfTheDayUrl = "https://media.giphy.com/media/26xBwdIuRJiAIqHwA/giphy.gif"; // URL de un gif fijo para representar el "gif del día"
  
    // Eliminamos el GIF anterior si existe
    const existingImg = document.getElementById("gifImage");
    if (existingImg) {
      existingImg.src = ""; // Limpiamos el src para evitar que la imagen siga cargada
    }
  
    // Mostramos el GIF del día
    const img = document.createElement("img");
    img.src = gifOfTheDayUrl;
    img.id = "gifImage";
    img.classList.add("gif-image");
    const imageContainer = document.querySelector(".image-container");
    imageContainer.innerHTML = ""; // Limpiamos el contenedor antes de añadir la nueva imagen
    imageContainer.appendChild(img);
  }
  
  // Evento de clic para el botón de generar nuevo GIF
  const generateGifButton = document.getElementById("generateGif");
  generateGifButton.addEventListener("click", loadNewGif);
  
  // Evento de clic para el botón de "Gif del día"
  const gifOfTheDayButton = document.getElementById("gifOfTheDay");
  gifOfTheDayButton.addEventListener("click", loadGifOfTheDay);
  
  // Evento de clic para el botón de ocultar GIF
  const hideGifButton = document.getElementById("hideGif");
  hideGifButton.addEventListener("click", () => {
    const img = document.getElementById("gifImage");
    if (img) {
      img.remove();
    }
  });
  
  function zoom25() {
    var img = document.getElementById("gifImage");
    if (img) {
      img.style.transform = "scale(1.25)";
      img.style.transitionDuration=".5s";
    }
  }
  
  function zoom50() {
    var img = document.getElementById("gifImage");
    if (img) {
      img.style.transform = "scale(1.5)";
      img.style.transitionDuration=".5s";
    }
  }
  
  function zoom75() {
    var img = document.getElementById("gifImage");
    if (img) {
      img.style.transform = "scale(1.75)";
      img.style.transitionDuration=".5s";
    }
  }
  
  function zoom0() {
    var img = document.getElementById("gifImage");
    if (img) {
      img.style.transform = "scale(1)";
      img.style.transitionDuration=".5s";
    }
  }
  