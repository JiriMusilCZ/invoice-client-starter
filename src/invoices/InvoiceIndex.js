import React, { useEffect, useState } from "react";

import { apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";

const InvoiceIndex = () => {
    const [invoiceState, setInvoices] = useState([]);

    useEffect(() => {
        apiGet("/api/invoices").then((data) => setInvoices(data));
    }, []);

    return (
        <div>
            <h1>Seznam faktur</h1>

            <InvoiceTable items={invoiceState} label="Počet faktur:" />

        </div>
    );
};

export default InvoiceIndex;