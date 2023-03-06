import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

function UpdatePropertyForm({ updateStatus, properties, setProperties }) {
    const { id } = useParams();
    const [updateProperty, setUpdateProperty] = useState({
        purchase_price: "",
        square_feet: "",
        garage_spaces: "",
        link: "",
        flip_status: ""
    });

    useEffect(() => {
        fetch(`http://localhost:9292/properties/${id}`)
        .then(r => r.json())
        .then(r => {
            setUpdateProperty({...updateProperty,
                street_address : r.street_address,
                city: r.city,
                state: r.state,
                purchase_price: r.purchase_price,
                square_feet: r.square_feet,
                garage_spaces: r.garage_spaces,
                link: r.link,
                flip_status: r.flip_status,
                type: r.type
        })
        })
    },[id])

    function handleFormChange(e) {
        setUpdateProperty({
            ...updateProperty,
            [e.target.id] : e.target.value,
        });
    }

    function handleTypechange(e) {
        setUpdateProperty({
            ...updateProperty,
            [e.target.id] : document.getElementById('type').value
        });
    }

    function updatePropertiesArray(updatedProperty) {
        const updatingProperty = properties.map((prop) => {
            if (prop.id === updatedProperty.id) {
                return updatedProperty
            } else {
                return prop
            }
        })
        setProperties(updatingProperty)
    }

    function handleUpdatingProperty(e) {
        setUpdateProperty({...updateProperty, type: updateProperty.type.property_type})
        e.preventDefault();
        fetch(`http://localhost:9292/properties/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(updateProperty)
        })
        .then(r => r.json())
        .then(r => updatePropertiesArray(r))
    }

    return (updateStatus ? (
        <div>
            <form >
                Enter Updates Here:
                <br></br>
                Purchase Price: <input type="text" className="recordFormElement" id="purchase_price" value={updateProperty.purchase_price} onChange={handleFormChange} placeholder="Property Management Payment"/>
                <br/>
                Square Feet: <input type="text" className="recordFormElement" id="square_feet" value={updateProperty.square_feet} onChange={handleFormChange} placeholder="Gross Income"/>
                <br/>
                Garage Spaces: <input type="text" className="recordFormElement" id="garage_spaces" value={updateProperty.garage_spaces} onChange={handleFormChange} placeholder="Gross Income"/>
                <br/>
                Flip Status: <input type="text" className="recordFormElement" id="flip_status" value={updateProperty.flip_status} onChange={handleFormChange} placeholder="Gross Income"/>
                <br/>
                Image URL: <input type="text" className="recordFormElement" id="link" value={updateProperty.link} onChange={handleFormChange} placeholder="Gross Income"/>
                <br/>
                <button className='submit' onSubmit={handleUpdatingProperty}>Submit Changes</button>
            </form>
        </div>) : null
    )
}

export default UpdatePropertyForm;