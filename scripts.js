document.addEventListener("DOMContentLoaded", () => {
    //all data fetch
    fetch("https://dummyjson.com/products?limit=100")
    .then(data => data.json())
    .then(data => getCategories(data.products))

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
                
                //TEMP, REMOVE LATER 
                document.querySelector("#view-single-product").classList.add("hidden");

                const clicked_page = pages.find(item => `#nav-${item.button}-button` === `#${e.currentTarget.id}`);
                document.querySelector(`#view-${clicked_page.view}`).classList.remove("hidden");
            });
        }
        // Add dialog popup for about us view
        addDialogPopUp("#about-us-dialog","#view-about-us","#nav-about-us-button", "#about-us-close-dialog");
    }

    addHeaderButtonEvents();
    // Add dialog popup for checkout toaster
    addDialogPopUp("#checkout-toaster dialog", "#checkout-toaster", "#checkout-btn", "#checkout-toaster dialog button");

    //TEMP, REMOVE LATER
    document.querySelector("#funny-product-button")
    .addEventListener("click", () => {
        pages.forEach(item => document.querySelector(`#view-${item.view}`).classList.add("hidden"));
        document.querySelector("#view-single-product").classList.remove("hidden");
    });

    function getCategories(products) {
        const categories = new Set([]);
        const thumbnails = [];
        products.forEach(item => {
            const prevSize = categories.size;
            categories.add(item.category);
            const newSize = categories.size;

            if (prevSize < newSize) {
                thumbnails.push(item.thumbnail);
            }
        });
        
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
    
});