import { useEffect, useState } from 'react'


function App() {

  const [form, setForm] = useState({
    amount: 0,
    description: '',
    date: ''
  });
  const [transactions, setTransactions] = useState([]);


  useEffect(() => {
    fetchTransactions();
  }, [])

  async function fetchTransactions() {
    // Default method is GET
    const res = await fetch('http://localhost:4000/transaction');
    const { data } = await res.json();
    setTransactions(data);
  }

  function handleInput(e) {
    setForm({
     ...form, [e.target.name]: e.target.value})
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/transaction', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json"
      }
    })
    if (res.ok) {
      // Page adds new transaction in realtime if response is successfull
      fetchTransactions();
    }
  }


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input 
          type="number" 
          name='amount'
          value={form.amount}
          onChange={handleInput} 
          placeholder="Enter transaction amount" 
        />
        <input 
          type="text" 
          name='description' 
          value={form.description}
          onChange={handleInput} 
          placeholder="Enter transaction details" 
        />
        <input 
          type="date" 
          name='date'
          value={form.date}
          onChange={handleInput} 
        />
        <button type="submit">Submit</button>
      </form>
      <br/>
      <section>
        <table>
          <thead>
            <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.amount}</td>
              <td>{transaction.description}</td>
              <td>{transaction.data}</td>
            </tr>
            ))}
          </tbody>
        </table>

      </section>
    </div>
  );
}

export default App;
