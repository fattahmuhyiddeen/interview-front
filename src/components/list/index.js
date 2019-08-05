import React from 'react';
import { connect } from "react-redux";
import './style.scss'
import ReactList from 'react-list';
import { getOrders } from '../../redux/ducks/orders'
import { viewData } from '../../redux/ducks/modalForm'
import { cancelOrder } from '../../redux/ducks/order';


class List extends React.Component { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        getOrders();
        setInterval(getOrders, 5000);
    }

    renderItem = (index, key) => {
        const { isCancelling, orders } = this.props;
        const data = orders[index];
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
                    <button onClick={() => viewData(data)}>View</button>
                    {!isCancelled && !isCancelling && <button onClick={() => cancelOrder(data.id)}>Cancel</button>}
                    {isCancelling && '.....'}
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
    isCancelling: state.order.isCancelling,
}))(List);
