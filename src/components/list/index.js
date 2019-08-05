import React from 'react';
import { connect } from "react-redux";
// import './style.scss'
import ReactList from 'react-list';
import { getOrders } from '../../redux/ducks/orders'

class List extends React.Component { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        getOrders();
        setInterval(getOrders, 5000);
    }

    renderItem = (index, key) => {
        const data = this.props.orders[index];
        return <div key={key}>{data.item_name}</div>;
    }

    render() {
        return (
            <div style={{ overflow: 'auto', height: 500 }}>
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
