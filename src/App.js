import "./App.css";
import { useState } from "react";

function App() {
  const [wallets, setWallets] = useState("");
  const [crypto, setCrypto] = useState("");
  const [upload, setUpload] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://trpapi.herokuapp.com/api/reimbursement/", {
        method: "POST",
        body: JSON.stringify({
          wallets: wallets,
          crypto: crypto,
          upload: upload,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setWallets("");
        setCrypto("");
        setUpload("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={wallets}
          placeholder="wallets"
          onChange={(e) => setWallets(e.target.value)}
        />
        <input
          type="text"
          value={crypto}
          placeholder="crypto"
          onChange={(e) => setCrypto(e.target.value)}
        />
        <input
          type="text"
          value={upload}
          placeholder="link to receipt"
          onChange={(e) => setUpload(e.target.value)}
        />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default App;