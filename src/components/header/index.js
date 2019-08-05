import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import './style.scss'
import { checkOrder, checkPayment } from '../../redux/ducks/health'

const checkHealth = () => {
    checkOrder();
    checkPayment();
}

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        checkHealth();
        setInterval(checkHealth, 5000);
    }
    render() {
        const { orderStatus, paymentStatus } = this.props;
        return (
            <div className="header">
                <div className="nav-bar">
                    <Link className="router-link" to="/" style={{ color: 'maroon' }}>
                        {'Order Management'}
                    </Link>
                    <div>
                        <div>{`Order Microservice Status :${orderStatus}`}</div>
                        <div>{`Payment Microservice Status :${paymentStatus}`}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    orderStatus: state.health.orderStatus,
    paymentStatus: state.health.paymentStatus,
}))(Header);
