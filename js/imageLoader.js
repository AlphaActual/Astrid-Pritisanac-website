

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
        let imageHTML = "";

        for (let i = numOfImgsToLoad; i >= 1; i--) {
            let src = `${galleries[galleryName].src}${i}.jpg`

            let image = `<img ${i > (numOfImgsToLoad - 6) ? `src="${src}"` : 'src=""'} data-src="${src}" data-id="${i}" id="${i}" class="img-fluid image-cont-scale fadeIn gallery-image" alt="${galleries[galleryName].name} ${i}">`;

            imageHTML += `<div class="col-12 grid-item my-3 text-center">
                        ${image}
                        <h4 class="m-2 text-center ${galleryName === "poems" ? "text-white my-4" : ""} font-Caveat">${galleries[galleryName].name} ${i}</h4>
                    </div>`;

        };
        // insert it in DOM
        gallery.insertAdjacentHTML("beforeend", imageHTML);
    };
    imageLOAD();

    // this function will initiate after masonry has finished making its layout
    function lazyLoad(item) {
        //setup observer
        function callbackFunc(entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // take url from data-src and put it in src attribute
                    console.log(entry.target.id);
                    entry.target.src = entry.target.dataset.src;
                    // stop observing the element
                    observer.unobserve(item);


                };
            });
        };

        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 0,
        };

        let observer = new IntersectionObserver(callbackFunc, options);
        observer.observe(item);


    };


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

                // remove id from the current image shown in modal
                function removeID() {
                    const modal = document.querySelector(".modal")
                    const currentImg = modal.querySelector(".gallery-image");
                    currentImg.removeAttribute("id");
                };
                removeID();


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
                const modal = document.querySelector(".modal");
                modal.addEventListener("keydown", function (e) {

                    if (e.keyCode === 37 || e.keyCode === 65) {
                        loadImage("previous");
                    } else if (e.keyCode === 39 || e.keyCode === 68) {
                        loadImage();
                    };

                });
                // listen for swipe events within modal body (for touch screens)
                const modalBody = modal.querySelector(".modal-body");
                var mc = new Hammer(modalBody);

                // listen to events...
                mc.on("swipeleft swiperight", function (ev) {

                    if (ev.type === "swipeleft") {
                        loadImage()

                    } else if (ev.type === "swiperight") {
                        loadImage("previous");

                    };
                });

                function scrollToCurrentImg(id) {
                    const navHeight = navbar.getBoundingClientRect().height;
                    console.log("navheight= " + navHeight);
                    let element = document.getElementById(id);


                    let elementTop = element.getBoundingClientRect().top + window.scrollY;
                    console.log(elementTop);
                    let position = elementTop - navHeight;
                    window.scrollTo({
                        left: 0,
                        top: position,
                    });

                };

                function loadImage(direction) {

                    // find the number of the image
                    // select the image
                    const modal = document.querySelector(".modal")
                    let currentImg = modal.querySelector(".gallery-image");
                    // get its number from its data-id

                    let imgNumber = Number(currentImg.dataset.id);


                    //if previous button was pressed
                    if (direction === "previous") {


                        //select the next higher number
                        imgNumber == gallerySize ? imgNumber = 1 : imgNumber = imgNumber + 1;


                    } else {
                        //select next lower number
                        imgNumber === 1 ? imgNumber = gallerySize : imgNumber = imgNumber - 1;

                    }
                    //find the image with this id in the array imagesArray
                    let newImage = imagesArray.find((item) => item.id == imgNumber);

                    //replace the attributes of the image with the new ones
                    // move id to data-id to prevent 2 images having the same id on the page
                    currentImg.setAttribute("data-id", newImage.id);
                    currentImg.classList.remove("animateFadeIn");
                    currentImg.src = newImage.dataset.src;
                    currentImg.alt = newImage.alt;
                    modal.querySelector(".modal-title").textContent = newImage.alt;
                    // to restart fade in transition(needs some delay)
                    setTimeout(() => {
                        currentImg.classList.add("animateFadeIn");
                    }, 20);
                    //load the image in the body so it can be scrolled to the correct position...
                    let imageInGallery = document.getElementById(newImage.id);
                    imageInGallery.src = imageInGallery.dataset.src;

                    // after modal is closed page will be scrolled to the position of the last image viewed in modal
                    scrollToCurrentImg(currentImg.dataset.id);

                };
            };
        };
    });





    // initiate masonry layout,obrserve for changes and observe images for lazy loading


    // 1. when everything is loaded
    window.addEventListener("load", function () {
        observeAndPush();

        //setup and initiate masonry
        var elem = document.querySelector('.grid');
        var msnry = new Masonry(elem, {
            // options
            itemSelector: '.grid-item',
        });
        msnry.layout()


        function resetMasonry() {
            msnry.layout()

        };

        function observeAndPush() {
            document.querySelectorAll(".gallery-image").forEach(function (item) {
                // add observer for lazy load
                lazyLoad(item);
                // push images in array so they can be accesed when using modal
                imagesArray.push(item);
            });

        };
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 0,
        };

        // this observer is to trigger one last masonry adjustment when this section comes into view (fixes last image overlapping bug)
        let fillerSectionObserver = new IntersectionObserver(resetMasonry, options);
        const section = document.getElementById("observed-section");
        fillerSectionObserver.observe(section);




        // 2. when there is any change in the dom (lazy images being loaded),reset masonry layout
        // Setting up observer for DOM changes on gallery div
        // Select the node that will be observed for mutations
        const targetNode = gallery;

        // Options for the observer (which mutations to observe)
        const config = { attributeFilter: ["src"], childList: false, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = function (mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for (const mutation of mutationsList) {
                // if (mutation.type === 'childList') {
                //     console.log('A child node has been added or removed.');

                // };

                resetMasonry();
            };
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);

        // Later, you can stop observing
        // observer.disconnect();
    });
})();




