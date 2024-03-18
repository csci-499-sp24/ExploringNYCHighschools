function setupPage(page, bg = "white") { page.style.background = bg; page.style.fontSize = "20px"; page.style.margin = "0"; }
function navBar() {
let nav = document.createElement("nav");
nav.style.background = "gray";
nav.style.width = "100%";
nav.style.height = "60px";
nav.style.display = "flex";
nav.style.alignItems = "center";
nav.style.justifyContent = "space-between";
nav.style.padding = "0 20px";
nav.style.position = "fixed";
nav.style.top = "0";
nav.style.left = "0";
nav.style.zIndex = "1";

let dropdownItems = [
{ text: "Home", url: "#" },
{ text: "Enrollment", url: "#" },
{ text: "Find a school", url: "#" },
{ text: "About", url: "#" }
];

let dropdown = document.createElement("div");
dropdown.style.position = "relative";
dropdown.style.display = "inline-block";

let dropdownButton = document.createElement("button");
dropdownButton.textContent = "Menu";
dropdownButton.style.backgroundColor = "transparent";
dropdownButton.style.border = "none";
dropdownButton.style.color = "white";
dropdownButton.style.padding = "10px";
dropdownButton.style.fontSize = "16px";
dropdownButton.style.cursor = "pointer";

let dropdownContent = document.createElement("div");
dropdownContent.style.display = "none";
dropdownContent.style.position = "absolute";
dropdownContent.style.backgroundColor = "white";
dropdownContent.style.minWidth = "160px";
dropdownContent.style.boxShadow = "0px 8px 16px 0px rgba(0,0,0,0.2)";
dropdownContent.style.zIndex = "1";

dropdownItems.forEach(item => {
let link = document.createElement("a");
link.href = item.url;
link.textContent = item.text;
link.style.color = "black";
link.style.padding = "12px 16px";
link.style.textDecoration = "none";
link.style.display = "block";
link.addEventListener("mouseover", function() {
this.style.backgroundColor = "#f1f1f1";
});
link.addEventListener("mouseout", function() {
this.style.backgroundColor = "white";
});
dropdownContent.appendChild(link);
});

dropdown.appendChild(dropdownButton);
dropdown.appendChild(dropdownContent);

dropdown.addEventListener("mouseover", function() {
dropdownContent.style.display = "block";
});

dropdown.addEventListener("mouseout", function() {
dropdownContent.style.display = "none";
});

nav.appendChild(dropdown);

let searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.placeholder = "Search...";
searchBar.style.padding = "10px";
searchBar.style.marginRight = "0px";

let title = document.createElement("h1");
title.innerHTML = "<span style='color: #90EE90;'>Explore</span> <span style='color: #ADD8E6;'>NYC High Schools</span>";
title.style.margin = "0";

nav.appendChild(title);
nav.appendChild(searchBar);

return nav;
}

function leftSidebar() {
let sidebar = document.createElement("div");
sidebar.classList.add("left-sidebar");
sidebar.style.background = "lightgrey";
sidebar.style.width = "200px";
sidebar.style.height = "calc(100vh - 50px)";
sidebar.style.position = "fixed";
sidebar.style.top = "50px";
sidebar.style.left = "0";
sidebar.style.padding = "20px";

let filter1Checkbox = document.createElement("input");
filter1Checkbox.type = "checkbox";
filter1Checkbox.id = "filter1";
let filter1Label = document.createElement("label");
filter1Label.htmlFor = "filter1";
filter1Label.textContent = "Filter 1";

let filter2Checkbox = document.createElement("input");
filter2Checkbox.type = "checkbox";
filter2Checkbox.id = "filter2";
let filter2Label = document.createElement("label");
filter2Label.htmlFor = "filter2";
filter2Label.textContent = "Filter 2";

let filterButton = document.createElement("button");
filterButton.textContent = "Filter";
filterButton.style.marginTop = "10px";
filterButton.addEventListener("click", function () {
let selectedFilters = [];
if (filter1Checkbox.checked) {
selectedFilters.push("Filter 1");
}
if (filter2Checkbox.checked) {
selectedFilters.push("Filter 2");
}
console.log("Selected Filters:", selectedFilters);
});

sidebar.appendChild(filter1Checkbox);
sidebar.appendChild(filter1Label);
sidebar.appendChild(document.createElement("br"));
sidebar.appendChild(filter2Checkbox);
sidebar.appendChild(filter2Label);
sidebar.appendChild(document.createElement("br"));
sidebar.appendChild(filterButton);

return sidebar;
}

let nav = navBar();
let sidebar = leftSidebar();

document.body.appendChild(nav);

let container = document.createElement("div");
container.style.display = "flex";

container.appendChild(sidebar);
let mainContent = document.createElement("div");
mainContent.style.marginLeft = "220px";
mainContent.style.padding = "20px";
container.appendChild(mainContent);

document.body.appendChild(container);

setupPage(document.body);