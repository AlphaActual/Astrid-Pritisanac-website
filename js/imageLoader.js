

(function LOADER() {


    const gallery = document.getElementById("gallery-row");
    // console.dir(gallery);
    const galleryName = gallery.getAttribute("data-gallery");
    const gallerySize = gallery.getAttribute("data-gallery-size")

    let galleries = {

        vines: { name: "Ja sam trs", src: "./img/IZLOŽBA-JA-SAM-TRS/paintings/Vines-", carouselSrc: "./img/IZLOŽBA-JA-SAM-TRS/fotografije/Ja-sam-trs-foto-" },
        lilies: { name: "Ljiljani", src: "", carouselSrc: "" },
        waterLilies: { name: "Lopoči", src: "" },
        landscapes: { name: "Pejzaži", src: "" },
        adriatic: { name: "Jadran", src: "" },
        stillLife: { name: "Mrtva priroda", src: "" },
        blackAndWhite: { name: "Crno bijelo u boji", src: "./img/CRNO-BIJELO-U-BOJI/Black-And-White-" },
        apstractions: { name: "Apstrakcije", src: "" }

    };

    function imageLOAD() {
        const numOfImgsToLoad = gallerySize;
        for (let i = 1; i <= numOfImgsToLoad; i++) {

            let imageHTML = `<div class="col grid-item my-3">
                        <img src="${galleries[galleryName].src}${i}.jpg" class="img-fluid image-cont-scale fadeIn gallery-image" alt="${galleries[galleryName].name} ${i}">
                        <h4 class="m-2 text-center font-Caveat">${galleries[galleryName].name} ${i}</h4>
                    </div>`;
            gallery.insertAdjacentHTML("beforeend", imageHTML);
        };
    };
    imageLOAD();

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
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title font-Caveat fs-4" style="position:absolute;left:50%;transform:translate(-50%);" id="myImageModalLabel">${event.target.alt}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex align-items-md-center text-center">
                        <div class="container-fluid">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-12 col-md-8 col-xxl-6">
                                    ${imgElement.outerHTML}
                                </div>
                                <div class="col-12 col-md-4 col-xxl-4 mt-5 mt-md-0 d-flex justify-content-center">
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