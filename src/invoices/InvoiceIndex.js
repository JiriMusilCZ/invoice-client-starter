import React, { useEffect, useState } from "react";

import {apiDelete, apiGet} from "../utils/api";

import InvoiceTable from "./InvoiceTable";

const InvoiceIndex = () => {
    const [invoiceState, setInvoices] = useState([]);


    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setInvoices(invoiceState.filter((item) => item._id !== id));
    };



    
    useEffect(() => {
        apiGet("/api/invoices").then((data) => setInvoices(data));
    }, []);

    return (
        <div>
            <h1>Seznam faktur</h1>

            <InvoiceTable 
            items={invoiceState} 
            label="Počet faktur:"
            deleteInvoice={deleteInvoice}
            />

        </div>
    );
};

export default InvoiceIndex;