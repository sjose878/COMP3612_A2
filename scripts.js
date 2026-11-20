document.addEventListener("DOMContentLoaded", () => {
    //all data fetch
    fetch("https://dummyjson.com/products?limit=100")
    .then(data => data.json())

    const pages = [{button: "home", view: "home"}, {button: "browser", view: "browser"}, {button: "cart", view: "cart"}, {button: "category", view: "category"}, {button: "logo", view: "home"}];

    function addDialogPopUp() {
        document.querySelector("#nav-about-us-button")
        .addEventListener("click", () => {
            document.querySelector("#view-about-us").classList.remove("hidden");
            const dialog = document.querySelector("dialog");
            dialog.showModal();
        });

        document.querySelector("#close-dialog")
        .addEventListener("click", () => {
            const dialog = document.querySelector("dialog");
            dialog.close();
            document.querySelector("#view-about-us").classList.add("hidden");
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

        addDialogPopUp();
    }

    addHeaderButtonEvents();

    //TEMP, REMOVE LATER
    document.querySelector("#funny-product-button")
    .addEventListener("click", () => {
        pages.forEach(item => document.querySelector(`#view-${item.view}`).classList.add("hidden"));
        document.querySelector("#view-single-product").classList.remove("hidden");
    });
    
});