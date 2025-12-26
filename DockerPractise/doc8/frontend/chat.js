// 1. Connection Setup
const BACKEND_URL = "http://localhost:3000"; 
const socket = io(BACKEND_URL);
let me = null;

// 2. Authentication (Login)
async function auth() {
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
    
    try {
        const res = await fetch(`${BACKEND_URL}/api/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if(data.success) {
            me = data.user;
            if(me.role === 'admin') {
                document.getElementById('login-box').classList.add('hidden');
                document.getElementById('admin-box').classList.remove('hidden');
                loadDepts(); // Admin needs to see departments to assign users
            } else {
                showChat(me.dept_name || 'General');
            }
        } else {
            alert("Invalid Credentials");
        }
    } catch (err) {
        console.error("Login Error:", err);
        alert("Cannot connect to Backend Server");
    }
}

// 3. Routing: Switch to Chat Room
function showChat(room) {
    if (!me) return;
    me.currentRoom = room;
    document.getElementById('room-title').innerText = `Room: ${room}`;
    
    // Hide all UI boxes, then show chat
    document.getElementById('login-box').classList.add('hidden');
    document.getElementById('admin-box').classList.add('hidden');
    document.getElementById('chat-box').classList.remove('hidden');
    
    socket.emit('joinRoom', room);
}

// 4. Admin Logic: Load Departments into Select Dropdown
async function loadDepts() {
    const res = await fetch(`${BACKEND_URL}/api/departments`);
    const depts = await res.json();
    const select = document.getElementById('dept-select');
    select.innerHTML = depts.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
}

// 5. Admin Logic: Create New Department
async function addDept() {
    const name = document.getElementById('dept-in').value;
    if(!name) return;
    
    await fetch(`${BACKEND_URL}/api/admin/create-dept`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name })
    });
    
    document.getElementById('dept-in').value = '';
    alert("Department Created!");
    loadDepts(); // Refresh the list
}

// 6. Admin Logic: Create User
async function addUser() {
    const username = document.getElementById('new-user').value;
    const dept_id = document.getElementById('dept-select').value;
    const password = Math.random().toString(36).slice(-6).toUpperCase(); 
    
    await fetch(`${BACKEND_URL}/api/admin/create-user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password, dept_id })
    });
    
    alert(`Employee Added!\nUsername: ${username}\nPassword: ${password}`);
    document.getElementById('new-user').value = '';
}

// 7. Chat Logic: Send Message
function send() {
    const msgInput = document.getElementById('msg');
    const msg = msgInput.value;
    if(!msg) return;

    // Link Detection
    const formatted = msg.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: #00ffff;">$1</a>');
    
    socket.emit('chatMessage', { 
        room: me.currentRoom, 
        sender: me.username, 
        message: formatted, 
        type: 'text' 
    });
    
    msgInput.value = '';
}

// 8. Receive Real-time Messages
socket.on('message', data => {
    const msgDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.style.padding = "5px 0";
    messageElement.innerHTML = `<b>${data.sender}:</b> ${data.message}`;
    
    msgDiv.appendChild(messageElement);
    msgDiv.scrollTop = msgDiv.scrollHeight; // Auto-scroll
});