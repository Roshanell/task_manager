// Create a taskManager class that will be responsible for managing the tasks in the application 
const createTaskHtml = (name, assignee, dueDate, description, status, id)=>
    `<li data-task-id = "${id}" class="list-group-item task_card border-2 rounded col-lg-5 col-md-3 p-0">
        <div class="d-flex w-100 justify-content-between align-items-center bg-dark text-light">
            <h5 class = "w-100 m-0 py-2 px-2">${name}</h5>
            <span class="badge badge-danger ${(status === 'TODO')? 'text-warning': 'text-success'}">${status}</span>
        </div>
        <div class="d-flex w-100 mb-3 justify-content-between flex-column gap-2 p-4">
            <small>Assigned To: ${assignee}</small>
            <small>Due: ${dueDate}</small>
            <p>${description}</p>
        </div>
        <button class="btn btn-sm btn-danger m-3 delete-button" >Delete Task</button>
        <button class="btn btn-sm btn-success m-3 done-button ${(status === 'TODO')? 'visible': 'invisible'}" >Mark as Done</button>
        
</li>`

class TaskManager {
    constructor(currentId=0) {
      this.tasks = [];
      this.currentId = currentId;
    }
  
    addTask(name, description, assignedTo, dueDate){
        this.currentId++;
        const task = {
            id: this.currentId,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: 'TODO'
        }
        // creates the task object

    this.tasks.push(task)
    }
    
    deleteTask(taskId) {
        // Create an empty array and store it in a new variable, newTasks
        const newTasks = [];

        
        // Loop over the tasks
        for (let i = 0; i < this.tasks.length; i++) {
            // Get the current task in the loop
            const task = this.tasks[i];

            // Check if the task id is not the task id passed in as a parameter
            if (task.id !== taskId) {
                // Push the task to the newTasks array
                newTasks.push(task);
            }
        }

        // Set this.tasks to newTasks
        this.tasks = newTasks;
    }
    getTaskById(taskId) {
        // Create a variable to store the found task
        let foundTask;

        // Loop over the tasks and find the task with the id passed as a parameter
        for (let i = 0; i < this.tasks.length; i++) {
            // Get the current task in the loop
            const task = this.tasks[i];

            // Check if its the right task by comparing the task's id to the id passed as a parameter
            if (task.id === taskId) {
                // Store the task in the foundTask variable
                foundTask = task;
            }
        }

        // Return the found task
        return foundTask;
    }


    render(){
        let htmlList = [];
        this.tasks.forEach(task =>{
            const date = new Date(task.dueDate);
            console.log(date)
            const formattedDate = `${(date.getMonth()+1)}/ ${date.getDate()}/ ${date.getFullYear()}`;
            const taskHtml = createTaskHtml(task.name, task.assignedTo, formattedDate, task.description,  task.status, task.id);
            htmlList.push(taskHtml)
        });
        const tasksHtml= htmlList.join('\n');
        let taskList = document.querySelector('.task-list');
        taskList.innerHTML = tasksHtml;
    }   
    save() {
        // Create a JSON string of the tasks
        const tasksJson = JSON.stringify(this.tasks);

        // Store the JSON string in localStorage
        localStorage.setItem('tasks', tasksJson);

        // Convert the currentId to a string;
        const currentId = String(this.currentId);

        // Store the currentId in localStorage
        localStorage.setItem('currentId', currentId);
    }
    load() {
        // Check if any tasks are saved in localStorage
        if (localStorage.getItem('tasks')) {
            // Get the JSON string of tasks in localStorage
            const tasksJson = localStorage.getItem('tasks');

            // Convert it to an array and store it in our TaskManager
            this.tasks = JSON.parse(tasksJson);
        }

        // Check if the currentId is saved in localStorage
        if (localStorage.getItem('currentId')) {
            // Get the currentId string in localStorage
            const currentId = localStorage.getItem('currentId');

            // Convert the currentId to a number and store it in our TaskManager
            this.currentId = Number(currentId);
        }
    }
  }
