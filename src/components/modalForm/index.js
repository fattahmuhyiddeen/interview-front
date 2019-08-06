import React from 'react';
import { connect } from 'react-redux';
import './modal.scss';
import {
    toggleModal,
    ITEM_NAME_INPUT,
    PRICE_INPUT,
    setInput,
    submit,
} from '../../redux/ducks/modalForm';

const Modal = ({ modalForm }) => {
    const {
        isVisible,
        [ITEM_NAME_INPUT]: item_name_input,
        [PRICE_INPUT]: price_input,
        isSending,
        isReadOnly,
        readOnlyData
    } = modalForm;

    let title = isSending ? 'Sending ...' : 'New Order';
    if (isReadOnly) {
        title = 'View Item';
    }
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: isVisible ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: isVisible ? '1' : '0'
                }}>
                <div className="modal-header">
                    <b>{title}</b>
                    <span className="close-modal-btn" onClick={() => toggleModal()}>×</span>
                </div>
                <div className="modal-body">
                    <table>
                        <tr>
                            <td>
                                Item Name
                            </td>
                            <td>
                                <input
                                    readOnly={isReadOnly}
                                    placeholder='Book, Ice Cream, etc'
                                    value={item_name_input}
                                    onChangeCapture={(event) => setInput(ITEM_NAME_INPUT, event.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Item Price (RM)
                            </td>
                            <td>
                                <input
                                    readOnly={isReadOnly}
                                    type='number'
                                    placeholder='10.50 etc'
                                    value={price_input}
                                    onChangeCapture={(event) => setInput(PRICE_INPUT, event.target.value)}
                                />
                            </td>
                        </tr>
                        {isReadOnly && (
                            <tr>
                                <td>
                                    Order Time
                                </td>
                                <td>
                                    {readOnlyData.created_at}
                                </td>
                            </tr>
                        )}
                    </table>
                </div>
                {!isSending && !isReadOnly && <div className="modal-footer">
                    <button className="btn-continue" onClick={() => submit()}>Submit</button>
                </div>}
            </div>
        </div >
    )
}

export default connect(state => ({
    modalForm: state.modalForm
}))(Modal);