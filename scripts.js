document.addEventListener("DOMContentLoaded", () => {
    const pages = ["home", "browser", "cart", "category", "about-us"];
    
    // probably better way to do this but idk
    function headerButtonEvents(){
        // logo needs to go to home view
        document.querySelector("#nav-logo-button")
        .addEventListener("click", () => {
            document.querySelector("#view-home").className = "visible";
            pages.slice(1).forEach(item => document.querySelector(`#view-${item}`).className = "hidden");
        });
        
        // all other buttons in header
        for (let page of pages) {
            document.querySelector(`#nav-${page}-button`)
            .addEventListener("click", (e) => {                
                const clicked_page = pages.find(item => `#nav-${item}-button` === `#${e.target.id}`);
                const other_pages = pages.filter(item => `#nav-${item}-button`!== `#${e.target.id}`);

                document.querySelector(`#view-${clicked_page}`).className = "visible"; 
                other_pages.forEach(item => document.querySelector(`#view-${item}`).className = "hidden");  
            });
        }
    }

    headerButtonEvents();
});