import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiGet } from "../utils/api";


const InvoiceDetail = () => {

    const { id } = useParams();
    const [invoice, setInvoice] = useState({});
    const [buyer, setBuyer] = useState({});
    const [seller, setSeller] = useState({});

    useEffect(() => {
        apiGet(`/api/invoices/${id}`).then((data) => {
            setInvoice(data);
            setBuyer(data.buyer);
            setSeller(data.seller);
        });
    }, [id]);

    return (
        <>
            <div>
                <h1>Detail faktury</h1>
                <hr />
                <h3>{invoice.identificationNumber}</h3>
                <p>
                    <strong>Datum vystavení:</strong>
                    <br />
                    {invoice.issued}
                </p>
                <p>
                    <strong>Datum splatnosti:</strong>
                    <br />
                    {invoice.dueDate}
                </p>
                <p>
                    <strong>Produkt:</strong>
                    <br />
                    {invoice.product}
                </p>
                <p>
                    <strong>Produkt:</strong>
                    <br />
                    {invoice.product}
                </p>
                <p>
                    <strong>Cena:</strong>
                    <br />
                    {invoice.price}
                </p>
                <p>
                    <strong>DPH:</strong>
                    <br />
                    {invoice.vat}
                </p>
                <p>
                    <strong>Popis plnění:</strong>
                    <br />
                    {invoice.note}
                </p>
                <p>
                    <strong>Odběratel</strong>
                    <br />
                    <Link to={`/persons/show/${buyer._id}`}>
                    {buyer.name}
                    </Link>
                </p>
                <p>
                    <strong>Dodavatel</strong>
                    <br />
                    <Link to={`/persons/show/${seller._id}`}>
                    {seller.name}
                    </Link>
                </p>

            </div>

        </>
    )
};

export default InvoiceDetail;
