import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from './InvoiceFilter';

const InvoiceIndex = () => {
    const [invoiceState, setInvoices] = useState([]);
    const [filterState, setFilter] = useState({
        buyerID: undefined,
        sellerID: undefined,
        product: undefined, 
        minPrice: undefined,
        maxPrice: undefined,
        limit: undefined,
    });
    const [buyerListState, setBuyerList] = useState([]);
    const [sellerListState, setSellerList] = useState([]);
    

    const deleteInvoice = async (id) => {
        try {
            await apiDelete(`/api/invoices/${id}`);
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
        setInvoices(invoiceState.filter((item) => item._id !== id));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter(prevState => ({
            ...prevState,
            [name]: value === '' ? undefined : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = filterState;
        const data = await apiGet("/api/invoices", params);
        setInvoices(data);
    };


    useEffect(() => {
        apiGet('/api/persons').then(setBuyerList);
        apiGet('/api/persons').then(setSellerList);
        apiGet('/api/invoices').then(setInvoices);
    }, []);

    return (
        <div>
            <h1>Seznam faktur</h1>
            <hr />
            <InvoiceFilter
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                buyerList={buyerListState}
                sellerList={sellerListState}
                filter={filterState}
                confirm="Filtrovat faktury"
  
            />
            <hr />
            <InvoiceTable 
                items={invoiceState} 
                label="Počet faktur:"
                deleteInvoice={deleteInvoice}
            />
        </div>
    );
};

export default InvoiceIndex;
