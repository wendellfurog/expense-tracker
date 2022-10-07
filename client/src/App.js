import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// Components
import AppBar from './components/AppBar';
import TransactionForm from './components/TransactionForm';
import TransactionsList from './components/TransactionsList';




function App() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, [])

  async function fetchTransactions() {
    // Default method is GET
    const res = await fetch('http://localhost:4000/transaction');
    const { data } = await res.json();
    setTransactions(data);
  }


  return (
    <div className="App">
      <AppBar />
      <Container>
        <TransactionForm 
          fetchTransactions={fetchTransactions} 
          editTransaction={editTransaction}
        />
        <TransactionsList 
          transactions={transactions} 
          fetchTransactions={fetchTransactions}
          setEditTransaction={setEditTransaction}
        />
      </Container>
      <br/>
    </div>
  );
}

export default App;
