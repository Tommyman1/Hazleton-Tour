document.addEventListener("click", (e) => {
    const el = e.target.closest(".clickable");
    if (!el) return;

    const link = el.dataset.link;
    if (link) {
        window.open(link, "_blank");
    }
});

document.addEventListener("mouseover", (e) => {
    const el = e.target.closest(".clickable");
    if (el) el.style.cursor = "pointer";
});


//determines which page is the page to change
let current_page = document.body.dataset.page;
let content_data = {};



function renderfooter(containerId,items){
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";

    items.forEach(item => {
        const h6 = document.createElement("h6");
        const a = document.createElement("a");

        a.href = item.link;
        a.textContent = item.name

        h6.appendChild(a);
        container.appendChild(h6);
    });
}

function applyData(data) {
    for (let key in data) {
        if (!data.hasOwnProperty(key)) continue;

        const element = document.getElementById(key);
        const value = data[key];

        // If element does not exist, recurse deeper
        if (!element) {
            if (typeof value === "object" && value !== null) {
                applyData(value);
            }
            continue;
        }

        // TEXT CONTENT
        if (typeof value === "string") {
            const heading = element.querySelector("h1, h2, h3, h4, h5");
            if (heading) {
                heading.textContent = value;
            } else {
                element.textContent = value;
            }
        }

        // 2PICTURES (image + link)
        if (typeof value === "object" && value !== null) {

            // background image
            if (value.image) {
                element.style.backgroundImage = `url("${value.image}")`;
            }

            // clickable link
            if (value.link) {
                element.dataset.link = value.link;
                element.classList.add("clickable");
            }

// Button-based content
if (value.buttonText) {
    element.innerHTML = `
        <h4>${value.sub_title || ""}</h4>
        <h5>${value.description || ""}</h5>
        <br>
        <h5 class="button clickable" data-link="${value.link || ""}">
            ${value.buttonText}
        </h5>
    `;
}

// Plain text / titles only
else if (value.title || value.description || value.photoCredit || value.title || value.mini_title || value.big_title) {
    element.innerHTML = `
        <h2>${value.title || ""}</h2>
        <h2>${value.mini_title || ""}</h2>
        <div class = "big_title">${value.big_title|| ""}</div>
        <h5>${value.description || ""}</h5>
        <h5>${value.photoCredit || ""}</h5>
    `;
}
            // recurse deeper if needed
            applyData(value);
        }
    }
}

//Fetching Data
async function fetchdata(){
    try{
        //grabs the text turns it into usable json data
        const fetchPath = location.pathname.includes("/pages/") ? "../info.json" : "./info.json";
        const temp = await fetch(fetchPath);
        content_data = await temp.json();
        loadpagedata();
    }
    //error handling
    catch(error){
        console.error("failed to fetch json data")
    }
}
//loading the data into the page
function loadpagedata(){
    //grabs only the data from the current page
    const page_data = content_data[current_page];
    if (!page_data) return;

    applyData(page_data);

    if (page_data.footer){
        for (let section in page_data.footer){
            renderfooter(section,page_data.footer[section]);
        }
    }
}

//every hour it checks if the json file has been modefied
fetchdata();
setInterval(fetchdata, 3600000)