import React from "react";
import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

const InvoiceFilter = (props) => {
    const { handleChange, handleSubmit, filter, buyerList, sellerList, confirm, resetFilters } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <InputSelect
                        name="buyerID"
                        items={buyerList}
                        handleChange={handleChange}
                        label="Odběratel"
                        prompt="nevybrán"
                        value={filter.buyerID}
                    />
                </div>
                <div className="col">
                    <InputSelect
                        name="sellerID"
                        items={sellerList}
                        handleChange={handleChange}
                        label="Dodavatel"
                        prompt="nevybrán"
                        value={filter.sellerID}
                    />
                </div>

                <div className="col">
                    <InputField
                        type="text"
                        name="product"
                        handleChange={handleChange}
                        label="Produkt"
                        prompt="nevyplněno"
                        value={filter.product || ''}
                    />
                </div>
            </div>
            <div className="row">

                <div className="col">
                    <InputField
                        type="number"
                        min="0"
                        name="minPrice"
                        handleChange={handleChange}
                        label="Minimální cena"
                        prompt="neuveden"
                        value={filter.minPrice || ''}
                    />
                </div>
                <div className="col">
                    <InputField
                        type="number"
                        min="0"
                        name="maxPrice"
                        handleChange={handleChange}
                        label="Maximální cena"
                        prompt="neuveden"
                        value={filter.maxPrice || ''}
                    />
                </div>
                <div className="col">
                    <InputField
                        type="number"
                        min="1"
                        name="limit"
                        handleChange={handleChange}
                        label="Limit počtu faktur"
                        prompt="neuveden"
                        value={filter.limit || ''}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button
                        type="submit"
                        className="btn btn-secondary float-right mt-2 mr-2"
                    >
                        {confirm}
                    </button>
                    <Link
                        to="/invoices"
                      
                        className="btn btn-success float-right mt-2"
                    >
                        Reset
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default InvoiceFilter;
