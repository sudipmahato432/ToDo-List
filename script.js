let data = {
    isChecked: false,
    index: -1,
    title: "",
    description: ""
}

let tasks = [];
let completedTasks = [];

function elementFromHtml(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
}


function renderTask(element) {

    let tableContent = `
        <tr class="table-rows" id="box-${element.index}-${element.isChecked}">
        <td><input type="checkbox" onclick="updateStatus(${element.index},checked)" name="pendingOrCompleted" ${element.isChecked ? "checked" : ""}></td>
        <td>${element.title}</td>
        <td>${element.description}</td>
        <td><span onclick="editTask(${element.index},${element.isChecked})" class="material-symbols-outlined btn-edit">edit_square</span></td>
        <td><span onclick="deleteTask(${element.index},${element.isChecked})" class="material-symbols-outlined btn-delete">delete</span></td>
        <tr>
        `;

    let myContent = elementFromHtml(tableContent);

    if (element.isChecked) {
        document.querySelector("#completed-table").appendChild(myContent);
    } else {
        document.querySelector("#pending-table").appendChild(myContent);
    }

}


const submitButton = document.querySelector(".submitButton");


submitButton.addEventListener("click", () => {
    let newData = Object.create(data);
    const title = document.querySelector("#title");
    const description = document.querySelector("#Description");
    if (title.value !== "") {
        newData.isChecked = false;
        newData.index = tasks.length;
        newData.title = title.value;
        newData.description = description.value;
        tasks.push(newData);
        title.value = "";
        description.value = "";
        renderTask(newData);
    }

});



function deleteTask(i, checked) {

    if (checked) {
        completedTasks.splice(i, 1);
        for (let j = 0; j < completedTasks.length; j++) {
            if (j >= i) {
                completedTasks[j].index -= 1;
            }
        }
        refreshCompletedTasks();
    }
    else {
        tasks.splice(i, 1);
        for (let j = 0; j < tasks.length; j++) {
            if (j >= i) {
                tasks[j].index -= 1;
            }
        }
        refreshTasks();
    }
}



function updateStatus(i, checked) {

    if (checked) {
        tasks[i].isChecked = checked;
        tasks[i].index = completedTasks.length;
        completedTasks.push(tasks[i]);
        tasks.splice(i, 1);
        for (let j = i; j < tasks.length; j++) {
            tasks[j].index -= 1;
        }
        refreshTasks();
        refreshCompletedTasks();
    } else {
        completedTasks[i].isChecked = checked;
        completedTasks[i].index = tasks.length;
        tasks.push(completedTasks[i]);
        completedTasks.splice(i, 1);
        for (let j = i; j < completedTasks.length; j++) {
            completedTasks[j].index -= 1;
        }
        refreshCompletedTasks();
        refreshTasks();
    }
}


function editTask(i, checked) {
    // editEnabled = true;
    var newTitle = prompt("Enter New Title");
    var newDescription = prompt("Enter New Description");
    if (checked) {
               
        completedTasks[i].title = newTitle;
        completedTasks[i].description = newDescription;
        refreshTasks();
        refreshCompletedTasks();
    }
    else {

        tasks[i].title = newTitle;
        tasks[i].description = newDescription;
        refreshTasks();
    }
}



function refreshTasks() {
    let pendingTasks = document.querySelector("#pending-table");
    let tableRows = pendingTasks.querySelectorAll(".table-rows");
    tableRows.forEach(element => {
        element.remove();
    });
    tasks.forEach(element => {
        renderTask(element);
    });
}

function refreshCompletedTasks() {
    var TasksCompleted = document.querySelector("#completed-table");
    var tableRows = TasksCompleted.querySelectorAll(".table-rows");
    tableRows.forEach(element => {
        element.remove();
    });
    completedTasks.forEach(element => {
        renderTask(element);
    });
}

