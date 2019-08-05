import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import './style.scss'
import {checkOrder} from '../../redux/ducks/health'

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
    componentDidMount(){
        checkOrder()
    }
    render() {
        const {orderStatus, paymentStatus} = this.props;
        return (
            <div className="header">
                <div className="nav-bar">
                    <Link className="router-link" to="/" style={{ color: 'maroon' }}>
                        {'Order Management'}
                    </Link>
                    <div>{`Order Microservice Status :${orderStatus}`}</div>
                    <div>{`Payment Microservice Status :${paymentStatus}`}</div>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    orderStatus: state.health.orderStatus,
    paymentStatus: state.health.paymentStatus,
}))(Header);
