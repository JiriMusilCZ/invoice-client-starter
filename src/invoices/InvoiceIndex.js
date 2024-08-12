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
        //setParamsState(filterState);
        const data = await apiGet("/api/invoices", params);
        setInvoices(data);
    };


    useEffect(() => {
  
        const fetchInvoices = async () => {
            const data = await apiGet('/api/invoices');
            setInvoices(data);

            const buyers = data.map(invoice => invoice.buyer).filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.name === value.name
                ))
            );
            const sellers = data.map(invoice => invoice.seller).filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.name === value.name
                ))
            );

            setBuyerList(buyers);
            setSellerList(sellers);
        };

        fetchInvoices();
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
