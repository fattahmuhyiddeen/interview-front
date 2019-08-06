import React from 'react';
import { connect } from "react-redux";
import './style.scss'
import { getOrders } from '../../redux/ducks/orders'
import { viewData } from '../../redux/ducks/modalForm'
import { cancelOrder } from '../../redux/ducks/order';


class List extends React.Component { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        getOrders();
        setInterval(getOrders, 2000);
    }

    renderRows = (data, index) => {
        const { isCancelling } = this.props;
        const isCancelled = data.state === 'cancelled';
        const isDelivered = data.state === 'delivered';
        return (
            <tr className={`row ${index % 2 && 'row-odd'}`} key={index}>
                <td className="cell">
                    {data.id}
                </td>
                <td className="cell">
                    {data.item_name}
                </td>
                <td className="cell">
                    RM {(data.price / 100).toFixed(2)}
                </td>
                <td className={`cell cell-${data.state}`}>
                    {data.state}
                </td>
                <td className="cell">
                    <button onClick={() => viewData(data)}>View</button>
                    {!(isCancelled || isCancelling || isDelivered) && <button onClick={() => cancelOrder(data.id)}>Cancel</button>}
                    {isCancelling && '.....'}
                </td>
            </tr>);
    }

    render() {
        return (
            <div className='container'>
                <table className="w-100">
                    <tbody>
                        {this.props.orders.map(this.renderRows)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(state => ({
    orders: state.orders.data,
    isCancelling: state.order.isCancelling,
}))(List);
