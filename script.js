const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemClear = document.getElementById("clear");
const filter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  // checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();
  // validate input
  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please fill the form");
    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = document.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (chekIfItemExist(newItem)) {
      alert("Already exist");
    }
  }

  // Create item DOM element
  addItemToDOM(newItem);
  // Add item to local storage
  addItemToStorage(newItem);
  checkUI();

  itemInput.value = "";
}

function addItemToDOM(item) {
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  console.log(li);

  const button = createButton("remove-item btn-link text-red");
  console.log(button);
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);
  // Convert to JSON and set to localstorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = creatIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function creatIcon(classes) {
  const icon = document.createElement("i");

  icon.className = classes;
  return icon;
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

// function onClickItem(e){
//   if (e.target.parentElement.classList.contains("remove-item")) {
//     if (confirm("Are you sure?")) {
//       e.target.parentElement.parentElement.remove();

//     }
// }
// }

function setItemtoEdit(item) {
  isEditMode = true;
  itemList.querySelectorAll("li").forEach((i) => {
    i.classList.remove("edit-mode");
  });
  item.classList.add("edit-mode");
  console.log(item);
  formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i> Update Item ';
  formBtn.style.background = "green";
  itemInput.value = item.textContent;
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove item from local storage
      removeItemFromStorage(e.target.parentElement.parentElement.textContent);
      checkUI();
    }
  } else {
    setItemtoEdit(e.target);
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  // Filter item
  itemsFromStorage = itemsFromStorage.filter((i) => i != item);

  // Set new array to local storage

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearAllItem() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clear form local storage

  localStorage.clear();
  checkUI();
  console.log("works");
}

function filterItems(e) {
  const items = itemList.querySelectorAll("li");

  const text = e.target.value.toLowerCase();
  console.log(text);

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    console.log(itemName);

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    itemClear.style.display = "none";
    filter.style.display = "none";
  } else {
    itemClear.style.display = "block";
    filter.style.display = "block";
  }

  formBtn.innerHTML = '<i class ="fa-solid fa-plus"></i> Add Item';
  formBtn.style.background = "#333";
}

function chekIfItemExist(item) {
  const itemsFromStorage = getItemsFromStorage();
  if (itemsFromStorage.includes(item)) {
    return true;
  } else {
    return false;
  }
}

// Event Listener
itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", removeItem);
itemClear.addEventListener("click", clearAllItem);
filter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems);

checkUI();
