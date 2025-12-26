async function fetchResults() {
    const res = await fetch('http://localhost:8000/results');
    const data = await res.json();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = data.map(item => 
        `<p><strong>${item.candidate_name}:</strong> ${item.vote_count} votes</p>`
    ).join('');
}

async function castVote(candidate) {
    await fetch('http://localhost:8000/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate })
    });
    alert("Voted for " + candidate);
    fetchResults();
}

// Initial Load
fetchResults();