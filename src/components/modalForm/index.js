import React from 'react';
import { connect } from "react-redux";
import './modal.scss';
import { toggleModal, ITEM_NAME_INPUT, PRICE_INPUT, setInput, submit } from '../../redux/ducks/modalForm'

const Modal = ({ modalForm }) => {
    const { isVisible, [ITEM_NAME_INPUT]: item_name_input, [PRICE_INPUT]: price_input, isLoading } = modalForm;
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: isVisible ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: isVisible ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>New Order</h3>
                    <span className="close-modal-btn" onClick={() => toggleModal()}>×</span>
                </div>
                <div className="modal-body">
                    Item Name<input value={item_name_input} onChangeCapture={(event) => setInput(ITEM_NAME_INPUT, event.target.value)} />
                    Item Price<input type='number' value={price_input} onChangeCapture={(event) => setInput(PRICE_INPUT, event.target.value)} />
                </div>
                {!isLoading && <div className="modal-footer">
                    <button className="btn-cancel" onClick={() => toggleModal()}>Cancel</button>
                    <button className="btn-continue" onClick={() => submit()}>Submit</button>
                </div>}
            </div>
        </div >
    )
}

export default connect(state => ({
    modalForm: state.modalForm
}))(Modal);