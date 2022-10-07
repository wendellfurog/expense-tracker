import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useState, useEffect } from 'react';
import { create } from '@mui/material/styles/createTransitions';

// Clears form fields everytime a new transaction is submitted
const InitialForm = {
  amount: 0,
  description: '',
  date: new Date(),
}

export default function TransactionForm({ fetchTransactions, editTransaction }) {
  const [form, setForm] = useState(InitialForm);


  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction);
    }
  }, [editTransaction])


  function handleChange(e) {
    setForm({
      ...form, [e.target.name]: e.target.value})
  }

  function handleDate(newValue) {
    setForm({ ...form, date: newValue })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = editTransaction.amount === undefined ? create() : update();
  }

  function reload(res) {
    if (res.ok) {
      // Page adds new transaction in realtime if response is successfull
      setForm(InitialForm);
      fetchTransactions();
    }
  }

  async function create() {
    const res = await fetch('http://localhost:4000/transaction', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json"
      }
    })
    reload(res);
  }

  async function update() {
    const res = await fetch(`http://localhost:4000/transaction/${editTransaction._id}`, {
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json"
      }
    })
    reload(res);
  }


  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6">Add New Transaction</Typography>
          <TextField 
            sx={{ marginRight: 5 }} 
            id="outlined-basic" 
            label="Amount"
            size='small' 
            name='amount'
            variant="outlined"
            value={form.amount}
            onChange={handleChange}  
          />
          <TextField 
            sx={{ marginRight: 5 }} 
            id="outlined-basic" 
            label="Description"
            size='small' 
            name='description'
            variant="outlined"
            value={form.description}
            onChange={handleChange}   
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              inputFormat="MM/DD/YYYY"
              value={form.date}
              onChange={handleDate}
              renderInput={(params) => 
                <TextField sx={{ marginRight: 5 }} 
                  size='small' {...params} />}
            />
          </LocalizationProvider>
          { editTransaction.amount !== undefined && (
            <Button variant="secondary" type='submit'>Update</Button>

          )}
          { editTransaction.amount === undefined && (
            <Button variant="contained" type='submit'>Submit</Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
