const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

function addItem(e) {
  e.preventDefault();
  // validate input
  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please fill the form");
    return;
  }
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  console.log(li);

  const button = createButton("remove-item btn-link text-red");
  console.log(button);
  li.appendChild(button);
  itemList.appendChild(li);

  itemInput.value = "";
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

// Event Listener
itemForm.addEventListener("submit", addItem);
