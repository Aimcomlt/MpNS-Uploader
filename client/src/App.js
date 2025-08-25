import React, { useState } from "react";
import { Buffer } from "buffer";
import client from "./ipfs";
import { getContract } from "./contract";

function App() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [lookup, setLookup] = useState("");
  const [fetched, setFetched] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !name) return;

    const fileData = await file.arrayBuffer();
    const added = await client.add({
      path: file.name,
      content: Buffer.from(fileData),
    });
    const cid = added.cid.toString();

    const contract = await getContract();
    const tx = await contract.setRecord(name, cid);
    await tx.wait();

    alert(`Stored ${name} → ${cid}`);
    setName("");
    setFile(null);
  };

  const handleFetch = async () => {
    const contract = await getContract();
    const cid = await contract.getRecord(lookup);
    if (!cid) return;

    const chunks = [];
    for await (const chunk of client.cat(cid)) chunks.push(chunk);
    setFetched(Buffer.concat(chunks).toString());
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>MpNS Uploader</h1>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ai.docs.core1"
          required
        />
        <button type="submit">Upload & Register</button>
      </form>

      <hr />

      <h2>Fetch by Name</h2>
      <input
        value={lookup}
        onChange={(e) => setLookup(e.target.value)}
        placeholder="ai.docs.core1"
      />
      <button onClick={handleFetch}>Fetch</button>

      {fetched && (
        <div>
          <h3>Content:</h3>
          <pre>{fetched}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
