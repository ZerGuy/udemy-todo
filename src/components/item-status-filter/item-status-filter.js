import React from 'react';

import './item-status-filter.css';

class ItemStatusFilter extends React.Component {

    buttons = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'done', label: 'Done' },
    ]

    onButtonClick = (status) => {
        this.props.onChange(status);
    };

    render() {
        const buttons = this.buttons.map(({name, label}) => {
            const isActive = this.props.value === name;
            const className = isActive ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button type="button"
                        className={`btn ${className}`}
                        onClick={() => this.onButtonClick(name)}
                        key={name}>
                    {label}
                </button>
            )
        }); 

        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}

export default ItemStatusFilter;
