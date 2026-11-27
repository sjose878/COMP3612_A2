document.addEventListener("DOMContentLoaded", () => {
    //all data fetch
    fetch("https://dummyjson.com/products?limit=100")
    .then(data => data.json())
    .then(data => {
        getCategories(data.products);
        addBrowseItems(data.products);
    });

    const pages = [{button: "home", view: "home"}, {button: "browser", view: "browser"}, {button: "cart", view: "cart"}, {button: "category", view: "category"}, {button: "logo", view: "home"}];

    /*
    Adds event listeners to buttons that will open and close a dialog element.\

    @param: dialog_elem  the dialog element that will be shown when a button is clicked
    @param: container   the parent element that is hidden when dialog is not shown
    @param: open_button the button element that will show the dialog when clicked
    @param: close_button    the button rlrmrnt that will hide the dialog when clicked
    */
    function addDialogPopUp(dialog_elem, container, open_button, close_button) {
        // Add open dialog event
        document.querySelector(open_button)
        .addEventListener("click", () => {
            document.querySelector(container).classList.remove("hidden");
            const dialog = document.querySelector(dialog_elem);
            dialog.showModal();
        });
        // Add close dialog event
        document.querySelector(close_button)
        .addEventListener("click", () => {
            const dialog = document.querySelector(dialog_elem);
            dialog.close();
            document.querySelector(container).classList.add("hidden");
        });
    }
    
    function addHeaderButtonEvents(){
        // all other buttons in header
        for (let page of pages) {
            document.querySelector(`#nav-${page.button}-button`)
            .addEventListener("click", (e) => {  
                pages.forEach(item => document.querySelector(`#view-${item.view}`).classList.add("hidden"));                   
        
                const clicked_page = pages.find(item => `#nav-${item.button}-button` === `#${e.currentTarget.id}`);
                document.querySelector(`#view-${clicked_page.view}`).classList.remove("hidden");
                document.querySelector("#view-single-product").classList.add("hidden");
            });
        }
        // Add dialog popup for about us view
        addDialogPopUp("#about-us-dialog","#view-about-us","#nav-about-us-button", "#about-us-close-dialog");
    }

    addHeaderButtonEvents();
    // Add checkout event to checkout button. Place this in a function??
    const checkout_btn = document.querySelector("#checkout-btn");
    checkout_btn.addEventListener("click", checkout);

    /* 
    Displays a toaster notification for a couple of seconds.
    Function taken from lab09b-ex5
    
    @param: toaster the div that represents the toaster notification
    @param: message the message that will be displayed in the toaster
    */
    function toasterHandler(toaster, message) {
        console.log("toaster handler msg:" + message);
        const t = document.querySelector(toaster);
        t.classList.remove("hidden")
        t.textContent = message;

        // hide toaster after 4 seconds
        setTimeout(() => { 
            t.classList.add("hidden"); 
        },4000); 
    }

    /*
    PLACEHOLDER addToCart function needed for toaster
    requirements: update cart
    */
    function addToCart(e) {
        const btn = e.target;
        const prod_title = btn.dataset.product;
        // Display toaster notification when button is clicked.
        toasterHandler("#toast-add-to-cart", `${prod_title} added to cart`);
    }

    /*
    PLACEHOLDER function for checkout toaster
    requirements: display toast, clear cart, return to home view
    */
    function checkout(e) {
        toasterHandler("#toast-checkout", "Order placed!");
    }
        

    function addCategories(categories, thumbnails) {              
        const div = document.querySelector("#categories");
        let i = 0;

        categories.forEach(item => {
            const card = document.createElement("button");
            card.className = "snap-start w-64 px-8 py-5 flex flex-col justify-center text-center items-center hover:drop-shadow-lg/40";

            const img = document.createElement("img");
            img.src = thumbnails[i];
            img.className = "rounded-2xl w-48 h-48 object-cover max-w-max";
            
            const p = document.createElement("p");
            p.textContent = item.charAt(0).toUpperCase() + item.replace("-", " ").slice(1); // https://www.w3schools.com/jsref/jsref_replace.asp, https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript 
            p.className = "cursor-pointer hover:underline hover:text-yellow-300";

            card.addEventListener("click", () => {
                alert(`you clicked ${p.textContent}`)
                // replace with category filter later
            });
            
            card.appendChild(img);
            card.appendChild(p);
            div.appendChild(card);
            i++;
        });

        // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy 
        // maybe put in own function

        document.querySelector("#categories-left")
        .addEventListener("click", () => {
        div.scrollBy({
                left: -280 * 2,
                behavior: "smooth"
            });
        });

        document.querySelector("#categories-right")
        .addEventListener("click", () => {
            div.scrollBy({
                left: 280 * 2,
                behavior: "smooth"
            });
        });
        //card.classList.add("");
    }

    function getCategories(products) {
        const categories = new Set([]);
        const thumbnails = [];

        products.forEach(item => {
            const prevSize = categories.size;
            categories.add(item.category);
            const newSize = categories.size;

            if (prevSize < newSize) {
                thumbnails.push(item.thumbnail);
            };
        });

        addCategories(categories, thumbnails); 
    }

    // clean up and split into smaller functions later
    function addBrowseItems(products) {
        const ul = document.querySelector("#browse-products-list");

        products.forEach(item => {
            const li = document.createElement("li");
            li.className = "bg-white m-2 p-1 rounded-md flex flex-col";
            
            const product_button = document.createElement("button");
            product_button.className = "flex flex-col flex-1 text-left p-2 cursor-pointer";

            const img = document.createElement("img");
            img.src = item.thumbnail;
            
            const title = document.createElement("p");
            title.textContent = item.title;
            title.className = "cursor-pointer hover:underline hover:text-yellow-300";
            
            const price = document.createElement("p");
            price.className = "font-bold mt-auto";
            price.textContent = "$" + item.price;

            const cart_button = document.createElement("button");
            cart_button.className = "mt-auto bg-blue-700 text-white font-bold rounded-full w-full mt-2 mb-2 cursor-pointer hover:bg-blue-800";
            cart_button.textContent = "+ Add";
            // addToCart event is attached to button
            cart_button.dataset.product = item.title;
            cart_button.addEventListener("click", addToCart);

            product_button.addEventListener("click", () => {
                addProductPage(item);
                pages.forEach(item => document.querySelector(`#view-${item.view}`).classList.add("hidden"));
                document.querySelector("#view-single-product").classList.remove("hidden");
            });

            product_button.appendChild(img);
            product_button.appendChild(title);
            product_button.appendChild(price);
            li.appendChild(product_button);
            li.appendChild(cart_button);
            ul.appendChild(li);
        });
    }

    function addProductPage(product) {
        document.querySelector("#nav-single-product-category")
        .textContent = product.category.charAt(0).toUpperCase() + product.category.replace("-", " ").slice(1);;
        
        document.querySelector("#nav-single-product-title")
        .textContent = product.title;

        let img_i = 0; 
        document.querySelector("#single-product-img")
        .src = product.images[img_i];

         /* <button id="single-product-left" class="-mt-25 text-8xl font-extrabold text-yellow-300 hover:text-yellow-500">←</button>
                <button id="single-product-right" class="-mt-25 text-8xl font-extrabold text-yellow-300 hover:text-yellow-500">→</button> */

        document.querySelector("#single-product-left").addEventListener("click", () => {
            img_i -= 1;
            if (img_i < 0) {
                img_i = product.images.length - 1;
            };

            document.querySelector("#single-product-img")
            .src = product.images[img_i];
        });

        document.querySelector("#single-product-right").addEventListener("click", () => {
            img_i += 1;
            if (img_i >= product.images.length) {
                img_i = 0;
            };

            document.querySelector("#single-product-img")
            .src = product.images[img_i];
        });

        const img_dots = document.querySelector("#img_num");
        img_dots.textContent = "•".repeat(product.images.length);
        img_dots.className = "text-gray-500 -mt-9 text-5xl"


        document.querySelector("#single-product-title")
        .textContent = product.title;

        document.querySelector("#single-product-price")
        .textContent = "$" + product.price;

        document.querySelector("#single-product-sku")
        .textContent = product.sku;

        const rating_num = Math.round(product.rating);   
        let stars = "";

        for (let i = 1; i <= 5; i++) {
            if (i <= rating_num) {
                stars += "★";
            } else {
                stars += "☆";
            }
        }

        document.querySelector("#single-product-rating")
        .textContent = stars;

        const tags_div = document.querySelector("#single-product-tags");
        tags_div.innerHTML = "";

        product.tags.forEach(tag => {
            const tag_span = document.createElement("span");
            tag_span.className = "border px-2 rounded-lg bg-gray-200";
            tag_span.textContent = tag;
            tags_div.appendChild(tag_span);
        });

        document.querySelector("#single-product-stock")
        .textContent = product.availabilityStatus;

        document.querySelector("#single-product-desc")
        .textContent = product.description;

        // Add to cart button event
        const addToCartBtn = document.querySelector("#single-product-form button");
        // Maybe add a JSON file of product details as button data attribute?
        addToCartBtn.dataset.product = product.title;
        addToCartBtn.addEventListener("click", addToCart);

        // reviews
        const reviews_ul = document.querySelector("#products-reviews");
        reviews_ul.innerHTML = "";

        product.reviews.forEach(review => {
            const li = document.createElement("li");

            const rating = document.createElement("span");
            rating.className = "inline-block text-yellow-500 pl-3 pt-2 text-2xl";

            const review_rating_num = Math.round(review.rating);   
            let stars = "";

            for (let i = 1; i <= 5; i++) {
                if (i <= review_rating_num) {
                    stars += "★";
                } else {
                    stars += "☆";
                }
            }

            rating.textContent = stars;

            const date = document.createElement("span");
            date.className = "text-gray-500 pl-2";
            date.textContent = new Date(review.date);

            const name = document.createElement("p");
            name.className = "font-bold pl-3 pb-2 text-lg";
            name.textContent = review.reviewerName;

            const email = document.createElement("span");
            email.className = "font-normal italic pl-3 text-base";
            email.textContent = "(" + review.reviewerEmail + ")";

            const comment = document.createElement("p");
            comment.className = "pl-3 pb-5";
            comment.textContent = review.comment;

            const hr = document.createElement("hr");
            hr.className = "ml-3 mr-3"

            li.appendChild(rating);
            li.appendChild(date);
            name.append(email);
            li.appendChild(name);
            //li.appendChild(email);
            li.appendChild(comment);
            reviews_ul.appendChild(li);
            reviews_ul.appendChild(hr);

        });

        // get rid of extra hr
        reviews_ul.lastElementChild.remove();

        // specification values: "weight", "dimensions" -> .width, .height, .depth, "warrantyInformation", "shippingInformation", "returnPolicy"
        // specifications 

        /*                       <tr class="odd:bg-white even:bg-gray-200">
                          <td class="pl-2 pr-10">Example-weight</td>
                          <td class="pl-2">product.weight</td>
                      </tr>*/
    

        const specifications = [{title: "Weight", data: product.weight}, {title: "Dimensions", data: product.dimensions}, {title: "Warranty Information", data: product.warrantyInformation}, {title: "Shipping Information", data: product.shippingInformation}, {title: "Return Policy", data: product.returnPolicy}];
        const tbody = document.querySelector("#specifications tbody");
        tbody.innerHTML = "";
        
        specifications.forEach(item => {
            const tr = document.createElement("tr");
            tr.className = "odd:bg-white even:bg-gray-200";
            const td_title = document.createElement("td");
            td_title.className = "pl-3 pr-10 font-bold text-lg";
            const td_data = document.createElement("td");
            td_data.className = "pl-3 text-base";

            td_title.textContent = item.title;

            if (item.data == product.dimensions) {
                td_data.textContent = `Width: ${item.data.width}, Height: ${item.data.height}, Depth: ${item.data.depth}`;
            } else {
                td_data.textContent = item.data;
            };

            tr.appendChild(td_title);
            tr.appendChild(td_data);
            tbody.appendChild(tr);
        });

        /* <button id="product-specification-button" type="radio" name="detail_tabs" class="border pr-5 pl-5 m-0">Specifications</button>
                <button id="product-reviews-button" type="radio" name="detail_tabs" class="border pr-5 pl-5 m-0">Reviews</button>*/

        document.querySelector("#product-specification-button").addEventListener("click", (e) => {
            if (document.querySelector("#specifications").classList.contains("hidden")) {
                document.querySelector("#specifications").classList.remove("hidden");
                
                document.querySelector("#single-product-reviews")
                .classList.add("hidden");
            };
        });
        document.querySelector("#product-reviews-button").addEventListener("click", (e) => {
            if (document.querySelector("#single-product-reviews")
                .classList.contains("hidden")) {
                document.querySelector("#specifications").classList.add("hidden");
                document.querySelector("#single-product-reviews")
                .classList.remove("hidden");
                
            };
        });

    
    };
    
});