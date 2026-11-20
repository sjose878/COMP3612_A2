document.addEventListener("DOMContentLoaded", () => {
    //all data fetch
    fetch("https://dummyjson.com/products?limit=100")
    .then(data => data.json())

    const pages = [{button: "home", view: "home"}, {button: "browser", view: "browser"}, {button: "cart", view: "cart"}, {button: "category", view: "category"}, {button: "logo", view: "home"}];

    function addDialogPopUp() {
        document.querySelector("#nav-about-us-button")
        .addEventListener("click", () => {
            document.querySelector("#view-about-us").className = "visible";
            const dialog = document.querySelector("dialog");
            dialog.showModal();
        });

        document.querySelector("#close-dialog")
        .addEventListener("click", () => {
            const dialog = document.querySelector("dialog");
            dialog.close();
            document.querySelector("#view-about-us").className = "hidden";
        });
    }
    
    // probably better way to do this but idk. maybe in array store likw [{logo, home}, {home, home}, etc]? so dont have to do whole diff thing for logo. yeah that seems better hmm
    // might be able to put about us in here too but like in a diff function and just call that when page == about us so the function ist too long
    function addHeaderButtonEvents(){
        // all other buttons in header
        for (let page of pages) {
            document.querySelector(`#nav-${page.button}-button`)
            .addEventListener("click", (e) => {  
                pages.forEach(item => document.querySelector(`#view-${item.view}`).className = "hidden");                       
                
                //TEMP, REMOVE LATER 
                document.querySelector("#view-single-product").className = "hidden";

                const clicked_page = pages.find(item => `#nav-${item.button}-button` === `#${e.target.id}`);
                document.querySelector(`#view-${clicked_page.view}`).className = "visible"; 
            });
        }

        addDialogPopUp();
    }

    addHeaderButtonEvents();

    //TEMP, REMOVE LATER
    document.querySelector("#funny-product-button")
    .addEventListener("click", () => {
        pages.forEach(item => document.querySelector(`#view-${item.view}`).className = "hidden");
        document.querySelector("#view-single-product").className = "visible"; 
    });
    
});