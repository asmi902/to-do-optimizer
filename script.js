document.addEventListener("DOMContentLoaded", function () {
    const inputBox = document.getElementById("input-box");
    const priorityInput = document.getElementById("priority");
    const completionTimeInput = document.getElementById("completion-time");
    const listContainer = document.getElementById("list-container");
    const addButton = document.getElementById("add-button");

    addButton.addEventListener("click", addTask);

    function addTask() {
        if (inputBox.value === "") {
            alert("You must write something");
        } else {
            let li = document.createElement("li");
            let taskDescription = `${inputBox.value}`;

            if (priorityInput.value !== "") {
                taskDescription += ` (Priority: ${priorityInput.value})`;
            }

            if (completionTimeInput.value !== "") {
                taskDescription += ` (Completion Time: ${completionTimeInput.value})`;
            }

            li.innerHTML = taskDescription;
            insertTaskInOrder(li);

            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
        }

        inputBox.value = "";
        priorityInput.value = "";
        completionTimeInput.value = "";
    }
    listContainer.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
        }
        saveData();
    }, false);

    function insertTaskInOrder(newTask) {
        const tasks = Array.from(listContainer.children);
        let added = false;

        for (let i = 0; i < tasks.length; i++) {
            const priorityNew = extractPriority(newTask.innerHTML);
            const priorityExisting = extractPriority(tasks[i].innerHTML);

            if (priorityNew < priorityExisting) {
                listContainer.insertBefore(newTask, tasks[i]);
                added = true;
                break;
            } else if (priorityNew === priorityExisting) {
                const timeNew = extractCompletionTime(newTask.innerHTML);
                const timeExisting = extractCompletionTime(tasks[i].innerHTML);

                if (timeNew < timeExisting) {
                    listContainer.insertBefore(newTask, tasks[i]);
                    added = true;
                    break;
                }
            }
        }

        if (!added) {
            listContainer.appendChild(newTask);
        }
    }

    function extractPriority(taskDescription) {
        const priorityMatch = taskDescription.match(/\(Priority: (\d+)\)/);
        return priorityMatch ? parseInt(priorityMatch[1]) : 0;
    }

    function extractCompletionTime(taskDescription) {
        const timeMatch = taskDescription.match(/\(Completion Time: (.+?)\)/);
        return timeMatch ? timeMatch[1] : '';
    }
});