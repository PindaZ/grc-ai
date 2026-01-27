
async function testAtomicSkills() {
    console.log("=== Testing Atomic Skills ===");

    const tests = [
        { name: "Event Listener", prompt: "Trigger an external event for termination." },
        { name: "Provisioner", prompt: "Provision a new user in AWS." },
        { name: "Evidence Logger", prompt: "Log this evidence snapshot." },
        { name: "Identity Mapper", prompt: "Match this user identity across systems." },
        { name: "Communicator", prompt: "Send a slack message to the manager." },
        { name: "Doc Parser", prompt: "Parse this PDF document." }
    ];

    for (const test of tests) {
        console.log(`\nTesting ${test.name}...`);
        try {
            const res = await fetch('http://localhost:3000/api/agent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [{ role: 'user', content: test.prompt }] })
            });
            const data = await res.json();
            const triggered = data.mock_agent_response.includes("TRIGGERING SKILL");
            const skillName = triggered ? data.mock_agent_response.match(/TRIGGERING SKILL: (.*)/)?.[1] : "NONE";

            console.log(`Triggered: ${triggered ? "YES" : "NO"} (${skillName})`);
        } catch (e) {
            console.error("Failed:", e.message);
        }
    }
}

testAtomicSkills().catch(console.error);
