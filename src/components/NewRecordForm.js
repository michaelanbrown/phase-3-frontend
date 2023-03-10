import React from 'react';
import './App.css';

function NewRecordForm({ recordFormData, setRecordFormData, addRecord }) {

    function handleFormChange(e) {
        setRecordFormData({
            ...recordFormData,
            [e.target.id] : e.target.value,
        });
    }

    function handleNewRecord(e) {
        e.preventDefault();
        fetch("http://localhost:9292/records", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(recordFormData)
        })
        .then(r => r.json())
        .then(r => addRecord(r))
        .then(setRecordFormData({
            mortgage_payment: "",
            hoa_payment: "",
            property_management_payment: "",
            gross_income: "",
            property: recordFormData.property
        }))
    }
    
    return (
        <div>
            <form onSubmit={handleNewRecord}>
                <p id='recordHeader'>Enter a new Finance Record:</p>
                <br/>
                <div className="formBox">
                    Street Address: <input type="text" className="recordFormElement" id="property" value={recordFormData.property} onChange={handleFormChange} placeholder="Property Street Address"/>
                    <br/>
                    Mortgage Payment: <input type="text" className="recordFormElement" id="mortgage_payment" value={recordFormData.mortgage_payment} onChange={handleFormChange} placeholder="Mortgage Payment"/>
                    <br/>
                    HOA Payment: <input type="text" className="recordFormElement" id="hoa_payment" value={recordFormData.hoa_payment} onChange={handleFormChange} placeholder="HOA Payment"/>
                    <br/>
                    Property Management Payment: <input type="text" className="recordFormElement" id="property_management_payment" value={recordFormData.property_management_payment} onChange={handleFormChange} placeholder="Property Management Payment"/>
                    <br/>
                    Income: <input type="text" className="recordFormElement" id="gross_income" value={recordFormData.gross_income} onChange={handleFormChange} placeholder="Gross Income"/>
                    <br/>
                    <button className='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default NewRecordForm;