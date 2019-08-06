import React from 'react';
import { toggleModal } from '../../redux/ducks/modalForm'
import './style.scss';

const AddNew = () => (
    <button onClick={() => toggleModal()}>
        {'New Order'}
    </button>
);

export default AddNew;
