document.addEventListener("DOMContentLoaded", () => {
    const pages = ["home", "browser", "cart", "category"];
    
    // probably better way to do this but idk
    function headerButtonEvents(){
        // logo needs to go to home view
        document.querySelector("#nav-logo-button")
        .addEventListener("click", () => {
            document.querySelector("#view-home").className = "visible";
            pages.slice(1).forEach(item => document.querySelector(`#view-${item}`).className = "hidden");
        
            // TEMP, REMOVE LATER
            document.querySelector("#view-single-product").className = "hidden";
        });
        
        // all other buttons in header
        for (let page of pages) {
            document.querySelector(`#nav-${page}-button`)
            .addEventListener("click", (e) => {                
                const clicked_page = pages.find(item => `#nav-${item}-button` === `#${e.target.id}`);
                const other_pages = pages.filter(item => `#nav-${item}-button`!== `#${e.target.id}`);

                document.querySelector(`#view-${clicked_page}`).className = "visible"; 
                other_pages.forEach(item => document.querySelector(`#view-${item}`).className = "hidden");  
                
                //TEMP, REMOVE LATER
                document.querySelector("#view-single-product").className = "hidden";
            });
        }
    }

    headerButtonEvents();

    //TEMP, REMOVE LATER
    document.querySelector("#funny-product-button")
    .addEventListener("click", () => {
        document.querySelector("#view-single-product").className = "visible";
        pages.forEach(item => document.querySelector(`#view-${item}`).className = "hidden");
    });

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
    })
    
});