// https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types
const fileTypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "image/x-icon",
];

function validFileType(file) {
    return fileTypes.includes(file.type);
}


const fileInput = document.getElementById("input-file")
const imagesContainer = document.querySelector(".images-container")
const message = document.querySelector(".message")
const btnFile = document.querySelector("#btn-file")
const btnReset = document.querySelector("#btn-reset")
const btnSave = document.querySelector("#btn-save")


const showMessage = (msg) => {
    message.textContent = msg
    message.style.display = "block"
    setTimeout(() => {
        message.style.display = "none"
    }, 2000)
}

const uploadImages = (files) => {
    for (const image of files) {
        try {
            if (validFileType(image)) {
                let imgElement = document.createElement("img")
                imgElement.src = URL.createObjectURL(image)

                let date = new Date()
                imgElement.draggable = "true"
                imgElement.id = date.getTime() + image.name


                imgElement.className = "imgUser"
                imgElement.ondragstart = dragstartHandler


                imagesContainer.appendChild(imgElement)
            }
        } catch(e) {
            console.log(e.message)
        }

    }
}


fileInput.addEventListener("change", () => {
    try {
        let files = fileInput.files
        uploadImages(files)
    } catch (e) {
        showMessage("No se han cargado archivos")
        console.log("Error al cargar archivos")
    }

})


const dragstartHandler = (ev) => {
    // let img = document.getElementById("1")
    // ev.dataTransfer.setDragImage(img, 10, 10);
    ev.dataTransfer.effectAllowed = 'move'; // Tipo de operación
    ev.dataTransfer.setData("text", ev.target.id)
}


const dragoverHandler = (ev) => {
    ev.preventDefault()
    ev.dataTransfer.dropEffect = 'move'; // Efecto visual
}

const dropHandler = (ev) => {
    ev.preventDefault()
    ev.dataTransfer.dropEffect = "move"
    const data = ev.dataTransfer.getData("text")

    //Prevenir que una imagen tenga otra imagen por dentro
    if(ev.target === imagesContainer || ev.target.className == "row-images"){
        ev.target.appendChild(document.getElementById(data))
    } else {
        ev.target.parentNode.appendChild(document.getElementById(data))
    }
}







const resetList = () => {
    let images = document.querySelectorAll(".imgUser")
    for(let i = 0; i < images.length; i++){
        console.log(images[i])
        imagesContainer.appendChild(images[i])
    }
}




btnFile.addEventListener("click", () => {
    fileInput.click()
})


btnSave.addEventListener("click", async () => {
    const tierlist = document.querySelector(".tierlist");

    try {
      // Importación dinámica de html2canvas
      const { default: html2canvas } = await import("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm");

      // Configuración clave
      const canvas = await html2canvas(tierlist, {
        backgroundColor: null,  // Respeta fondos transparentes
        scale: 2,               // Mejor calidad (2x)
      });

      // Descarga
      const link = document.createElement("a");
      link.download = "tierlist.png";
      link.href = canvas.toDataURL("image/png", 1.0); // Calidad máxima
      link.click();

    } catch (error) {
      console.error("Error al generar la imagen:", error);
    }
  });




btnReset.addEventListener("click", () => {
    resetList()
})



const adjustStyles = () => {
    let rowImages = document.querySelectorAll(".row-images")
    for(let i = 0; i < rowImages.length; i++){
        let color
        if(i % 2 == 0){
             color = "#bbbbbb"
        } else {
            color = "#f1f1ef"
        }
        rowImages[i].style.backgroundColor = color
    }
}


document.addEventListener("DOMContentLoaded", () => {
    adjustStyles()
})


