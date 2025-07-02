import {
  getTasks,
  addTask,
  removeTask,
  editTask,
  toggleTaskCompletion
} from './tareas.js';

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const filterSelect = document.getElementById('filter-tasks'); 

let currentFilter = 'all'; 

function renderTasks() {
  list.innerHTML = '';
  const tasks = getTasks();

  const filteredTasks = tasks.filter(({ completed }) => {
    if (currentFilter === 'completed') return completed;
    if (currentFilter === 'pending') return !completed;
    return true;
  });

  filteredTasks.forEach(({ text, completed }, idx) => {
    const li = document.createElement('li');
    li.textContent = text;
    if (completed) li.style.textDecoration = 'line-through';

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = completed ? 'Desmarcar' : 'Completar';
    toggleBtn.onclick = () => {
      const fullIndex = tasks.indexOf(filteredTasks[idx]);
      toggleTaskCompletion(fullIndex);
      renderTasks();
    };

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.onclick = () => {
      const newText = prompt('Editar tarea:', text);
      if (newText) {
        const fullIndex = tasks.indexOf(filteredTasks[idx]);
        editTask(fullIndex, newText);
        renderTasks();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.onclick = () => {
      const fullIndex = tasks.indexOf(filteredTasks[idx]);
      removeTask(fullIndex);
      renderTasks();
    };

    li.append(toggleBtn, editBtn, deleteBtn);
    list.appendChild(li);
  });
}

form.onsubmit = e => {
  e.preventDefault();
  if (input.value.trim()) {
    addTask(input.value.trim());
    input.value = '';
    renderTasks();
  }
};

filterSelect.onchange = e => {
  currentFilter = e.target.value;
  renderTasks();
};

renderTasks();
