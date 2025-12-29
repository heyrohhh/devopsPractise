async function fetchAccounts() {
    const res = await fetch('/api/accounts');
    const data = await res.json();
    const list = document.getElementById('accountList');
    list.innerHTML = data.map(acc => `
        <div class="account-card">
            <strong>ID: ${acc.id}</strong> | ${acc.name} | 
            <strong>Balance: $${acc.balance.toFixed(2)}</strong>
        </div>
    `).join('');
}

async function addAccount() {
    const name = document.getElementById('accName').value;
    const initialBalance = document.getElementById('accBalance').value;
    
    await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, initialBalance })
    });
    fetchAccounts();
}

async function updateBalance(type) {
    const id = document.getElementById('targetId').value;
    const amount = document.getElementById('amount').value;
    const endpoint = type === 'credit' ? '/api/accounts/credit' : '/api/accounts/debit';

    const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, amount: parseFloat(amount) })
    });

    if (!res.ok) {
        const err = await res.json();
        alert(err.error);
    }
    fetchAccounts();
}

// Load accounts on startup
fetchAccounts();