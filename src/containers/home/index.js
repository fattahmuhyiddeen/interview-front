import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from "react-redux";
import config from '../../config';
import './style.scss';
import List from '../../components/list';
import ModalForm from '../../components/modalForm';

const bgStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
}

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <article
                className="page-container bg-warning d-flex flex-column align-items-center"
                style={bgStyle}
            >
                <Helmet>
                    <title>Home Page</title>
                    <meta name="description" content="Order Management" />
                </Helmet>


                <div className="w-100 d-flex flex-column align-items-center pt-5">
                    <div className="col-md-10 col-sm-12 pt-5">
                        <div className="p-3 bg-light">
                            <div className="row py-2 home-page-center-panel">
                                <List />
                            </div>
                        </div>
                    </div>
                </div>
                <ModalForm />
            </article>
        );
    }
}

export default connect()(HomePage);