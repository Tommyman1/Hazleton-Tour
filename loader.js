//determines which page is the page to change
let current_page = document.body.dataset.page;
let content_data = {};

//Fetching Data
async function fetchdata(){
    try{
        //grabs the text turns it into usable json data
        const temp = await fetch("/info.json");
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

    //checks for all the id we are able to use
    for (let id in page_data){
        //grabs the id from the orginal page
        const idpage = document.getElementById(id);
        //error handling
        if (!idpage) continue;
        //changes the information from the id contexts to the current data
        idpage.textContent = page_data[id]
    }
}

//every hour it checks if the json file has been modefied
setInterval(fetchdata(),3600)