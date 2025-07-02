const STORAGE_KEY = 'tasks';

export function getTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(text) {
  const tasks = getTasks();
  const newTask = { text, completed: false };
  saveTasks([...tasks, newTask]);
}

export function removeTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
}

export function editTask(index, newText) {
  const tasks = getTasks();
  tasks[index].text = newText;
  saveTasks(tasks);
}

export function toggleTaskCompletion(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
}
