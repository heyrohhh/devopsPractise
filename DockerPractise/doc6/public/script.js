const API_URL = '/api/todos';

async function fetchTodos() {
    const res = await fetch(API_URL);
    const todos = await res.json();
    render(todos);
}

async function addTodo() {
    const input = document.getElementById('todoInput');
    if (!input.value) return;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input.value })
    });
    input.value = '';
    fetchTodos();
}

async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
}

function render(todos) {
    const list = document.getElementById('todoList');
    list.innerHTML = todos.map(todo => `
        <li>
            ${todo.text}
            <span class="delete-btn" onclick="deleteTodo(${todo.id})">✖</span>
        </li>
    `).join('');
}

fetchTodos(); // Load tasks on startup