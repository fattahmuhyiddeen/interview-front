import React from 'react';
import { connect } from "react-redux";
import { toggleModal } from '../../redux/ducks/modalForm'
import './style.scss';

const AddNew = () => (
    <button onClick={() => toggleModal()}>
        {'New Order'}
    </button>
);

export default connect(state => ({
}))(AddNew);
