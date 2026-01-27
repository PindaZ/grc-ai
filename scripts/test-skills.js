
async function testAgentAdvanced() {
    console.log("=== Testing Advanced Skills ===");

    // Test 1: TPRM (Audit Analyzer)
    console.log("\n1. Testing Audit Analyzer (TPRM)...");
    const res1 = await fetch('http://localhost:3000/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'Analyze this SOC 2 report for anomalies.' }] })
    });
    const data1 = await res1.json();
    console.log("Skill Triggered:", data1.mock_agent_response.includes("audit-report-analyzer") ? "YES" : "NO");

    // Test 2: UAR (Access Review)
    console.log("\n2. Testing Access Reviewer (UAR)...");
    const res2 = await fetch('http://localhost:3000/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'Review the access list for terminated employees and toxic combinations.' }] })
    });
    const data2 = await res2.json();
    console.log("Skill Triggered:", data2.mock_agent_response.includes("access-reviewer") ? "YES" : "NO");

    // Test 3: Policy Enforcer
    console.log("\n3. Testing Policy Enforcer (Change Mgmt)...");
    const res3 = await fetch('http://localhost:3000/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'Check if this PR violates our peer review policy.' }] })
    });
    const data3 = await res3.json();
    console.log("Skill Triggered:", data3.mock_agent_response.includes("policy-enforcer") ? "YES" : "NO");

}

testAgentAdvanced().catch(console.error);
