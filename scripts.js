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
        addDialogPopUp("#about-us-dialog","#view-about-us","#nav-about-us-button", "#close-dialog");
    }

    addHeaderButtonEvents();

    //TEMP, REMOVE LATER
    document.querySelector("#funny-product-button")
    .addEventListener("click", () => {
        pages.forEach(item => document.querySelector(`#view-${item.view}`).classList.add("hidden"));
        document.querySelector("#view-single-product").classList.remove("hidden");
    });

    function getCategories(products) {
        const categories = new Set([]);
        products.forEach(item => categories.add(item.category));
        
        const div = document.querySelector("#categories");
        categories.forEach(item => {
            const card = document.createElement("div");
            card.className = "snap-start w-64 px-8 py-5 flex flex-col justify-center text-center items-center";

            const img = document.createElement("img");
            img.src = "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/1.webp";
            img.className = "rounded-2xl w-48 h-48 object-cover border border-black max-w-max";
            
            const button = document.createElement("button");
            button.textContent = item;
            button.className = "cursor-pointer hover:underline hover:text-yellow-300";
            
            card.appendChild(img);
            card.appendChild(button);
            div.appendChild(card);
        });

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