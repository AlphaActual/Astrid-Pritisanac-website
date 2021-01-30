

(function LOADER() {

    let imagesArray = []; //storage for generated images
    const gallery = document.getElementById("gallery-row");
    // console.dir(gallery);
    const galleryName = gallery.getAttribute("data-gallery");
    const gallerySize = gallery.getAttribute("data-gallery-size")


    let galleries = {

        vines: { name: "Ja sam trs", src: "./img/EXHIBITION-I-AM-THE-VINE/paintings/Vines-", carouselSrc: "./img/EXHIBITION-I-AM-THE-VINE/photos/I-am-the-vine-photo-" },
        lilies: { name: "Ljiljani", src: "./img/EXHIBITION-LILIES/paintings/Lilies-", carouselSrc: "./img/EXHIBITION-LILIES/photos/Lilies-photos-" },
        waterLilies: { name: "Lopoči", src: "./img/EXHIBITION-WATER-LILIES/Water-lilies-" },
        landscapes: { name: "Pejzaži", src: "./img/LANDSCAPES/Landscapes-" },
        adriatic: { name: "Jadran", src: "./img/ADRIATIC/Adriatic-" },
        stillLife: { name: "Mrtva priroda", src: "./img/STILL-LIFE/Still-life-" },
        blackAndWhite: { name: "Crno bijelo u boji", src: "./img/BLACK-AND-WHITE/Black-And-White-" },
        apstractions: { name: "Apstrakcije", src: "./img/APSTRACTIONS/Apstractions-" },
        poems: { name: "Pjesme", src: "./img/POEMS/Poems-" }

    };

    function imageLOAD() {
        const numOfImgsToLoad = gallerySize;
        for (let i = numOfImgsToLoad; i >= 1; i--) {

            let image = `<img src="${galleries[galleryName].src}${i}.jpg" id="${i}" class="img-fluid image-cont-scale fadeIn gallery-image" alt="${galleries[galleryName].name} ${i}">`;
            let imageHTML = `<div class="col grid-item my-3 text-center">
                        ${image}
                        <h4 class="m-2 text-center ${galleryName === "poems" ? "text-muted my-4" : ""} font-Caveat">${galleries[galleryName].name} ${i}</h4>
                    </div>`;
            // insert it in DOM
            gallery.insertAdjacentHTML("beforeend", imageHTML);


        };
    };
    imageLOAD();
    // get all images (objects) and push them in array
    document.querySelectorAll(".gallery-image").forEach(function (item) {
        imagesArray.push(item);

    })


    /// Carousels loader
    const carouselContainer = document.querySelector(".carouselCont");


    if (carouselContainer != null) { // if it exists in DOM
        const carouselLength = carouselContainer.getAttribute("data-gallery-size")
        carouselImgLoad(carouselLength, galleryName);
    };

    function carouselImgLoad(carouselLength, galleryName) {

        for (let i = 1; i <= carouselLength; i++) {

            let imageHTML = `<div class="carousel-item  ${i === 1 ? "active" : ""}">
            <img src="${galleries[galleryName].carouselSrc}${i}.jpg" class=" rounded-3 img-fluid"
              alt="Fotografija sa izložbe ${galleries[galleryName].name}">
          </div>`;
            carouselContainer.insertAdjacentHTML("beforeend", imageHTML);
        };

    };

    // MODALS

    // 1. detect image to show in modal
    // we are listening in the body because modal will be placed in the body at the end(not to have margins and paddings)
    let modalState = "closed"
    document.body.addEventListener("click", function (event) {
        if (modalState === "closed") { // to prevent bug when  clicking on image in open modal
            if (event.target.classList.contains("gallery-image")) { // if clicked on image
                // get the image
                let imgElement = event.target;
                // remove/add some classes
                imgElement.classList.remove("image-cont-scale")
                imgElement.classList.add("max-height-80");

                // create modal html template
                const modalHTML = `<div class="modal fade" id="myImageModal" tabindex="-1" aria-labelledby="myImageModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-fullscreen">
                  <div class="modal-content" style="position:relative;">
                    <div class="modal-header">
                      <h5 class="modal-title font-Caveat fs-4" style="position:absolute;left:50%;transform:translate(-50%);" id="myImageModalLabel">${event.target.alt}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex align-items-md-center text-center">
                        <div class="container-fluid p-0 m-0">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-12 col-lg-8 col-xxl-8">
                                    <div class="wrapper d-flex">
                                        <a class="btn btn-prev text-primary d-none d-lg-block align-self-center"><i class="fas fa-chevron-left top-icon fa-2x" style="pointer-events: none"></i></a>
                                        <div class="col img-div">
                                        ${imgElement.outerHTML}
                                        </div>
                                        <a class="btn btn-next text-primary d-none d-lg-block align-self-center"><i class="fas fa-chevron-right top-icon fa-2x" style="pointer-events: none"></i></a>
                                    </div>
                                </div>
                                <div class="col-12 col-lg-4 col-xxl-4 mt-5 mt-md-0 d-flex justify-content-center">
                                    <div class="centering-div text-start font-Caveat fs-4">
                                        <p><span class="text-danger">Tehnika :</span> Ulje na platnu/lesonitu</p>
                                        <p><span class="text-danger">Dimenzije :</span> AA x BB x CC</p>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
                  </div>
                </div>
              </div>`;

                // insert modal in DOM
                document.body.insertAdjacentHTML("beforeend", modalHTML);

                //designate and initiate modal
                var myModal = new bootstrap.Modal(document.getElementById('myImageModal'), {})
                myModal.show();
                modalState = "open";

                // listen for the closing button to remove modal 
                document.querySelector(".btn-close").addEventListener("click", function () {
                    //remove modal upon closing
                    document.getElementById("myImageModal").remove();
                    modalState = "closed";
                });
                // listend for the buttons prev and next
                document.querySelectorAll(".btn-prev").forEach(function (item) {
                    item.addEventListener("click", function () {
                        loadImage("previous");
                    });
                });
                document.querySelectorAll(".btn-next").forEach(function (item) {
                    item.addEventListener("click", function () {
                        loadImage();
                    });
                });

                // listen for keyboard buttons (arrows)
                const modal = document.querySelector(".modal")
                modal.addEventListener("keydown", function (e) {

                    if (e.keyCode === 37) {
                        loadImage("previous");
                    } else if (e.keyCode === 39) {
                        loadImage();
                    };

                });

                function loadImage(direction) {

                    // find the number of the image
                    // select the image
                    const modal = document.querySelector(".modal")
                    let currentImg = modal.querySelector(".gallery-image");
                    // get its number from its ID
                    let imgNumber = Number(currentImg.id);

                    //if previous button was pressed
                    if (direction === "previous") {

                        //select previous image
                        imgNumber === 1 ? imgNumber = gallerySize : imgNumber = imgNumber - 1;



                    } else {
                        //select next image
                        imgNumber == gallerySize ? imgNumber = 1 : imgNumber = imgNumber + 1;

                    }
                    //find the image with this id in the array imagesArray
                    let newImage = imagesArray.find((item) => item.id == imgNumber);

                    //replace the attributes of the image with the new ones
                    currentImg.src = newImage.src;
                    currentImg.id = newImage.id;
                    currentImg.alt = newImage.alt;
                    modal.querySelector(".modal-title").textContent = newImage.alt;

                };
                // listen for swipe events (for touch screens)

                let swipeElement = modal.querySelector(".gallery-image");
                var mc = new Hammer(swipeElement);

                // listen to events...
                mc.on("swipeleft swiperight", function (ev) {
                    if (ev === "swipeleft") {
                        loadImage("previous")
                    } else if (ev === "swiperight") {
                        loadImage();
                    };
                });

            };
        };
    });





    // initiate masonry layout and obrserve for changes
    (function initMasonry() {

        // 1. when everything is loaded
        window.addEventListener("load", resetMasonry);
        function resetMasonry() {
            var elem = document.querySelector('.grid');
            var msnry = new Masonry(elem, {
                // options
                itemSelector: '.grid-item',
            });
            msnry.layout()
        };

        // 2. when there is any change in the dom (more images added by the loader)
        // Setting up observer for DOM changes on gallery div
        // Select the node that will be observed for mutations
        const targetNode = gallery;

        // Options for the observer (which mutations to observe)
        const config = { attributes: true, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = function (mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    console.log('A child node has been added or removed.');
                    resetMasonry()
                };

            };
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);

        // Later, you can stop observing
        // observer.disconnect();
    })();
})();