import React from 'react';

import './item-status-filter.css';

class ItemStatusFilter extends React.Component {
    state = {
        status: 'All'
    };

    getClassName = (status) => {
        let className = 'btn';
        if (this.state.status === status) {
            className += ' btn-info';
        } else {
            className += ' btn-outline-secondary';
        }

        return className;
    };

    onBtnClick = (status) => {
        this.setState({
            status: status
        });
        this.props.onChange(status);
    };

    render() {
        return (
            <div className="btn-group">
                <button type="button"
                        className={this.getClassName('All')}
                        onClick={() => this.onBtnClick('All')}>
                    All
                </button>
                <button type="button"
                        className={this.getClassName('Active')}
                        onClick={() => this.onBtnClick('Active')}>
                    Active
                </button>
                <button type="button"
                        className={this.getClassName('Done')}
                        onClick={() => this.onBtnClick('Done')}>
                    Done
                </button>
            </div>
        );
    }
}

export default ItemStatusFilter;
