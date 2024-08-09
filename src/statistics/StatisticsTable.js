import React, { useState, useEffect } from 'react';
import { apiGet } from '../utils/api';

const StatisticsTable = () => {
  const [invoiceStats, setInvoiceStats] = useState(null);
  const [personStats, setPersonStats] = useState(null);


  useEffect(() => {
    const fetchInvoiceStats = async () => {
      try {
        const data = await apiGet('/api/invoices/statistics');
        setInvoiceStats(data);
      } catch (error) {
        console.error('Error fetching invoice statistics:', error);
      }
    };
    fetchInvoiceStats();
  }, []);

 
  useEffect(() => {
    const fetchPersonStats = async () => {
      try {
        const data = await apiGet('/api/persons/statistics');
        setPersonStats(data);
      } catch (error) {
        console.error('Error fetching person statistics:', error);
      }
    };
    fetchPersonStats();
  }, []);

  return (
    <div className="container mt-4">
    
      {invoiceStats && (
        <div className="mb-4">
          <h4>Statistika faktur</h4>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Součet za letošní rok</th>
                <th>Součet za všechna období</th>
                <th>Počet záznamů</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{invoiceStats.currentYearSum.toLocaleString()} Kč</td>
                <td>{invoiceStats.allTimeSum.toLocaleString()} Kč</td>
                <td>{invoiceStats.invoicesCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}


      {personStats && (
        <div>
          <h4>Statistika společností</h4>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Jméno</th>
                <th>Příjmy</th>
              </tr>
            </thead>
            <tbody>
            {personStats.map(person => (
                <tr key={person.personId}>
                  <td>{person.personId}</td>
                  <td>{person.personName}</td>
                  <td>{person.revenue !== null ? person.revenue.toLocaleString() + ' Kč' : 'bez příjmů'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StatisticsTable;
