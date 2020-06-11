//selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.filter-todo');


//event listener
document.addEventListener('DOMContentLoaded', updateUI)
todoBtn.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
todoFilter.addEventListener('click', filterTodo)


//functions
function addTodo(event) {
    event.preventDefault();//stops refreshing with button click

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    saveLocalS(todoInput.value);

    const checkBtn = document.createElement('button');
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    checkBtn.classList.add("check-btn");
    todoDiv.appendChild(checkBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);

    todoList.appendChild(todoDiv);

    todoInput.value = "";


}

function deleteCheck(event) {
    console.log(event.target);//returns the element clicked
    const clickedItem = event.target;

    if (clickedItem.classList[0] == 'delete-btn') {
        const todo = clickedItem.parentElement;
        //animation
        todo.classList.add('fall');//does not remove, element still exist
        removeLocal(todo);
        todo.addEventListener('transitionend', function () {
            //wait transition animation is completed
            todo.remove();
        });

    }

    if (clickedItem.classList[0] == 'check-btn') {
        const todo = clickedItem.parentElement;
        todo.classList.toggle("checked");

    }
}

function filterTodo(event) {

    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function (todo) {

        todos.forEach(function (todo) {
            if (event.target.value == "all") {
                todo.style.display = "flex";

            }
            else if (event.target.value == "checked") {
                if (todo.classList.contains("checked")) {
                    todo.style.display = "flex";
                    console.log(todo.innerText);
                }
                else {
                    todo.style.display = "none";
                }
            }

            else {
                if (!todo.classList.contains("checked")) {
                    console.log(todo.innerText)
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
            }

        })

    });

}
function checkLocal() {


    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    return todos;
}

function saveLocalS(todo) {
    let todos;
    todos = checkLocal();

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateUI() {

    let todos;
    todos = checkLocal();


    todos.forEach(function (todo) {

        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);


        const checkBtn = document.createElement('button');
        checkBtn.innerHTML = '<i class="fas fa-check"></i>';
        checkBtn.classList.add("check-btn");
        todoDiv.appendChild(checkBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.classList.add("delete-btn");
        todoDiv.appendChild(deleteBtn);

        todoList.appendChild(todoDiv);


    });
}

function removeLocal(todo) {

    //todo in this functiın is trash bin

    todos = checkLocal();
    // console.log("will delete");
    //console.log(todo);
    //console.log(todo.children[0].innerText);

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos));

}