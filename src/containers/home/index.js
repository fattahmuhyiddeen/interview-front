/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import Select from 'react-select';
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import config from '../../config';
import "react-datepicker/dist/react-datepicker.css";
import './style.scss';
import * as publicData from '../../redux/ducks/publicData'
const mapStateToProps = state => ({
});


const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => ({ value: i, label: i }))
const typeOptions = [{ value: 'box', label: 'Box' }]

const bgStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
}

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    inputChage = (state, value) => {
        const { inputs } = this.state
        inputs[state] = { value }
        this.setState({ inputs });
    }

    state = {
        inputs: {
            startDate: {}, //new Date()
            from: {},
            to: {}
        }
    }

    validateQuery = () => {
        let hasError = false;
        const inputs = this.state.inputs;
        Object.entries(this.state.inputs).forEach((input) => {
            const key = input[0]
            const value = input[1].value
            if (typeof (value) == 'undefined' || value == null) {
                hasError = true;
                inputs[key].error = 'Cannot be empty';
            }
        })

        if (hasError) {
            this.setState({ inputs });
        } else {
            publicData.getRoutes();
        }
    }

    render() {
        const { inputs } = this.state
        return (
            <article
                className="page-container bg-warning d-flex flex-column align-items-center"
                style={bgStyle}
            >
                <Helmet>
                    <title>Home Page</title>
                    <meta name="description" content="Order Management" />
                </Helmet>

                <div className="w-100 d-flex flex-column align-items-center">
                    <div className="col-md-10 col-sm-12">
                        <div className="p-3 bg-light">
                            <div className="row home-page-center-panel">
                                <div className="col-md-6 col-sm-12 pt-1 pb-3">
                                    {inputs.from.error && <div className="error-label">{inputs.from.error}</div>}
                                </div>
                                <div className="col-md-6 col-sm-12 py-1">
                                    {inputs.to.error && <div className="error-label">{inputs.to.error}</div>}
                                </div>
                            </div>
                            <div className="row py-2 home-page-center-panel">
                                <ProductAttribute>
                                    <Select
                                        className="w-100"
                                        isClearable
                                        placeholder="Quantity"
                                        options={quantityOptions}
                                    />
                                </ProductAttribute>
                                <ProductAttribute>
                                    <Select
                                        className="w-100"
                                        isClearable
                                        placeholder="Type"
                                        options={typeOptions}
                                    />
                                </ProductAttribute>

                                <ProductAttribute unit='cm'>
                                    <input
                                        placeholder="Length"
                                        className="form-control"
                                    />
                                </ProductAttribute>

                                <ProductAttribute unit='cm'>
                                    <input
                                        placeholder="Width"
                                        className="form-control"
                                    />
                                </ProductAttribute>
                                <ProductAttribute unit='cm'>
                                    <input
                                        placeholder="Height"
                                        className="form-control"
                                    />
                                </ProductAttribute>
                                <ProductAttribute unit='kg'>
                                    <input
                                        placeholder="Weight"
                                        className="form-control"
                                    />
                                </ProductAttribute>
                            </div>
                            <div className="row pt-4">
                                <div className="col-6">
                                    {inputs.startDate.error && <div className="error-label">{inputs.startDate.error}</div>}
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </article>
        );
    }
}

const ProductAttribute = (props) => (
    <div className="col-md-2 col-sm-12 py-1 input-group">
        {props.children}
        {props.unit && <div className="input-group-append">
            <span className="input-group-text">{props.unit}</span>
        </div>}
    </div>
)

export default connect(mapStateToProps)(HomePage);