//  Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all eventListeners

loadEventListeners();

// Load all Event Listeners
function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task Event
    form.addEventListener('submit', addTask);
    // Remove task Event
    taskList.addEventListener('click', removeTask)
    // Clear task Event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks Event
    filter.addEventListener('keyup',filterTasks);
}

//Get Tasks from Local Storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
    
    //Create LI element
    const li = document.createElement('li');
    //add Class
    li.className = 'collection-item';
    //create Text Node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element in li
    const link = document.createElement('a');
    //add Class to 'a' tag
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class ="fa fa-remove"></li>';
    // Append link to 'li'
    li.appendChild(link);

    //Append 'li' to 'ul'
    taskList.appendChild(li);    
    })
}

//add Task
function addTask(e) {
    
    if(taskInput.value === '') {
        alert('Add a Task');
    }

    //Create LI element
    const li = document.createElement('li');
    //add Class
    li.className = 'collection-item';
    //create Text Node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element in li
    const link = document.createElement('a');
    //add Class to 'a' tag
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class ="fa fa-remove"></li>';
    // Append link to 'li'
    li.appendChild(link);

    //Append 'li' to 'ul'
    taskList.appendChild(li);

    //Store in Local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();
        //Remove from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Clear Tasks
function clearTasks() {
    // taskList.innerHTML = '';

    //faster mode
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    //difference in https://jsperf.com/innerhtml-vs-removechild
    //Clear from Local Storage
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}
//Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else{
            task.style.display = 'none';
        }
    });
    
}