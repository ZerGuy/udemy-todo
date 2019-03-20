import React from 'react';

import './item-add-form.css'

const ItemAddForm = (props) => {
    return (
        <div className="item-add-form">
            <button 
                className="btn btn-outline-secondary"
                onClick={() => props.onItemAdded('hey')}>
                Add Item
            </button>
        </div>
    )
}

export default ItemAddForm;