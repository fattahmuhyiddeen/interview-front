import React from 'react';
import { connect } from "react-redux";
import { toggleModal } from '../../redux/ducks/modalForm'

class AddNew extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <>
                <button onClick={() => toggleModal()}>
                    {'New Order'}
                </button>
            </>
        );
    }
}

export default connect(state => ({
}))(AddNew);
