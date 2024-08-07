/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import Country from "./Country";


const PersonDetail = () => {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [invoiceSellerData, setInvoiceSellerData] = useState([]); // Inicializace jako prázdné pole
    const [invoiceBuyerData, setInvoiceBuyerData] = useState([]); // Inicializace jako prázdné pole

    useEffect(() => {
        const fetchData = async () => {
            try {
                const personData = await apiGet(`/api/persons/${id}`);
                setPerson(personData);

                const ico = personData.identificationNumber;
                console.log("ICO:", ico); // Zobrazení v konzoli

                const sellerData = await apiGet(`/api/identification/${ico}/sales`);
                const invoices = sellerData.map((item) => ({
                    invoiceNumber: item.invoiceNumber,
                    issued: item.issued,
                    dueDate: item.dueDate,
                    product: item.product,
                    price: item.price,
                    vat: item.vat,
                    note: item.note,
                    buyer: item.buyer,
                    seller: item.seller,
                    _id: item._id,
                }));
                setInvoiceSellerData(invoices);

                const buyerData = await apiGet(`/api/identification/${ico}/purchases`);
                const invoicesBuyer = buyerData.map((item) => ({
                    invoiceNumber: item.invoiceNumber,
                    issued: item.issued,
                    dueDate: item.dueDate,
                    product: item.product,
                    price: item.price,
                    vat: item.vat,
                    note: item.note,
                    buyer: item.buyer,
                    seller: item.seller,
                    _id: item._id,
                }));
                setInvoiceBuyerData(invoicesBuyer);

            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, [id]);

    if (!person) {
        return <p>Loading...</p>;
    }

    const country = person.country === Country.CZECHIA ? "Česká republika" : "Slovensko";

    return (
        <>
            <div>
                <h1>Detail osoby</h1>
                <hr />
                <h3>{person.name} ({person.identificationNumber})</h3>
                <p>
                    <strong>DIČ:</strong>
                    <br />
                    {person.taxNumber}
                </p>
                <p>
                    <strong>Bankovní účet:</strong>
                    <br />
                    {person.accountNumber}/{person.bankCode} ({person.iban})
                </p>
                <p>
                    <strong>Tel.:</strong>
                    <br />
                    {person.telephone}
                </p>
                <p>
                    <strong>Mail:</strong>
                    <br />
                    {person.mail}
                </p>
                <p>
                    <strong>Sídlo:</strong>
                    <br />
                    {person.street}, {person.city}, {person.zip}, {country}
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br />
                    {person.note}
                </p>
            </div>
            <h4>Vystavené faktury</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Číslo faktury</th>
                        <th>Odběratel</th>
                        <th>Datum vystavení</th>
                        <th>Datum splatnosti</th>
                        <th>Cena</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceSellerData.map((invoice) => (
                        <tr key={invoice._id}>
                            <td>{invoice.invoiceNumber}</td>
                            <td>{invoice.buyer.name}</td>
                            <td>{invoice.issued}</td>
                            <td>{invoice.dueDate}</td>
                            <td>{invoice.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h4>Přijaté faktury</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Číslo faktury</th>
                        <th>Dodavatel</th>
                        <th>Datum vystavení</th>
                        <th>Datum splatnosti</th>
                        <th>Cena</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceBuyerData.map((invoiceBuyer) => (
                        <tr key={invoiceBuyer._id}>
                            <td>{invoiceBuyer.invoiceNumber}</td>
                            <td>{invoiceBuyer.seller.name}</td>
                            <td>{invoiceBuyer.issued}</td>
                            <td>{invoiceBuyer.dueDate}</td>
                            <td>{invoiceBuyer.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default PersonDetail;

