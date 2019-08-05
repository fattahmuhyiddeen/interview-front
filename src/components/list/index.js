import React from 'react';
import { connect } from "react-redux";
import './style.scss'
import ReactList from 'react-list';
import { getOrders } from '../../redux/ducks/orders'

class List extends React.Component { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        getOrders();
        setInterval(getOrders, 5000);
    }

    renderItem = (index, key) => {
        const data = this.props.orders[index];
        const isCancelled = data.state === 'cancelled';
        return (
            <div className={`cell ${index % 2 && 'cell-odd'}`} key={key}>
                <div>
                    {index + 1}
                </div>
                <div>
                    {data.item_name}
                </div>
                <div>
                    RM {(data.price / 100).toFixed(2)}
                </div>
                <div className={`cell-${data.state}`}>
                    {data.state}
                </div>
                <div>
                    <button>View</button>
                    {!isCancelled && <button>Cancel</button>}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className='container'>
                <ReactList
                    itemRenderer={this.renderItem}
                    length={this.props.orders.length}
                    type='uniform'
                />
            </div>
        );
    }
}

export default connect(state => ({
    orders: state.orders.data,
}))(List);
