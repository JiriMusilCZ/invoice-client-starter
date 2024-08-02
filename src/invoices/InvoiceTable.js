import React from "react";

const InvoiceTable = ({ label, items }) => {
    return (
        <div>
            <p>
                {label} {items.length}
            </p>

            <table className="table table-bordered">
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.note}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    );

};

export default InvoiceTable;