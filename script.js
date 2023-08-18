const addItems = document.querySelector(".add-items")//form element
const itemsList = document.querySelector(".plates")//list element
const inputElement = document.querySelector("[name=item]")//input element
//const deleteButton = document.querySelector(".delete")
const items = JSON.parse(localStorage.getItem("items")) || [];

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
itemsList.addEventListener("click", deleteItem);

function addItem(e) {
    e.preventDefault();
    const inputData = inputElement.value;
    //console.log(inputData)
    const item = {
        text: inputData,
        done: false,
    }
    //add new item to list
    items.push(item)
    //display item on UI
    populateList();

    //save to localstorage
    localStorage.setItem("items", JSON.stringify(items))
    
    this.reset();

}

function populateList() {
    itemsList.innerHTML = items.map((item, i) => {
        return `
        <li>
            <input type="checkbox"   id="item-${i}" ${item.done ? "checked" : ""} />
             <label><span data-index=${i}>${item.text}</span ></label>
            <button class="delete" data-index=${i} >x</button>
        </li>
        `
    }).join("")
}

//Toggle the done property on an item
function toggleDone(e) {
    if (!e.target.matches("span")) return; 
    const el = e.target;
    const index = el.dataset.index;
    //console.log(index)
    items[index].done = !items[index].done;

    localStorage.setItem("items", JSON.stringify(items))
    
    populateList()
}

//Delete item from list
function deleteItem(e) {
    if (!e.target.matches("button")) return;
    const el = e.target;
    const index = el.dataset.index;
    items.splice(index, 1)
    
    localStorage.setItem("items", JSON.stringify(items))
    populateList()

}

//update list upon refresh
populateList()






