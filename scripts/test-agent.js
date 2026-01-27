
async function testAgent() {
    console.log("1. Testing Generic Hello...");
    const res1 = await fetch('http://localhost:3000/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'Hello' }] })
    });
    const data1 = await res1.json();
    console.log("Status:", res1.status);
    console.log("CWD:", data1.cwd);
    console.log("Skills Dir:", data1.skills_dir_path);
    console.log("Loaded Skills:", data1.available_skills);
    console.log("Response:", data1.mock_agent_response);

    console.log("\n2. Testing Compliance Trigger...");
    const res2 = await fetch('http://localhost:3000/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'Check compliance for this doc.' }] })
    });
    const data2 = await res2.json();
    console.log("Status:", res2.status);
    console.log("Response:", data2.mock_agent_response);
}

testAgent().catch(console.error);
