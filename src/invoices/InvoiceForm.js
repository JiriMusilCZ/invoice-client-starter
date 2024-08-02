import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiGet, apiPost, apiPut } from "../utils/api";

import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";

import FlashMessage from "../components/FlashMessage";

const InvoiceForm = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: "",
        buyer: { _id: 0},
        seller: { _id: 0},
    });

    const [persons, setPersons] = useState([]);
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data));
    }, []);

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices/", invoice))
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    const sent = sentState;
    const success = successState;

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr />
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>


                <InputField
                    required={true}
                    type="text"
                    name="invoiceNumber"
                    label="Číslo faktury"
                    prompt="Zadej číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, invoiceNumber: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="issued"
                    label="Datum vystavení"
                    prompt="Zadej datum vystavení"
                    value={invoice.issued}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, issued: e.target.value });
                    }}
                />




                <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    label="Datum splatnosti"
                    prompt="Zadej datum splatnosti"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, dueDate: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="product"
                    label="Produkt"
                    prompt="Název produktu"
                    value={invoice.product}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, product: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="number"
                    name="price"
                    label="Cena"
                    prompt="Uveďte cenu"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, price: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="number"
                    name="vat"
                    label="DPH"
                    prompt="Uveďte výši DPH"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, vat: e.target.value });
                    }}
                />



                <InputField
                    required={true}
                    type="text"
                    name="note"
                    label="Popis plnění"
                    prompt="Popis plnění"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, note: e.target.value });
                    }}
                />

                <InputSelect
                    items={persons}
                    required={true}
                    name="buyer"
                    label="Odběratel"
                    prompt="Odběratel"
                    value={invoice.buyer._id}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, buyer: { _id: e.target.value } });
                    }}
                />

                <InputSelect
                    items={persons}
                    required={true}
                    name="seller"
                    label="Dodavatel"
                    prompt="Dodavatel"
                    value={invoice.seller._id}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, seller: { _id: e.target.value } });
                    }}
                />

                <input type="submit" className="btn btn-success" value="Uložit" />

            </form>
        </div>
    )

}

export default InvoiceForm;