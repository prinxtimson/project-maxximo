import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

const SubscriptionTable = ({ subscriptions, loading }) => {
    return (
        <div className="container p-4">
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">Due Date</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Paid On</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!loading && subscription.length > 0 ? (
                                    subscriptions.map((subscription) => (
                                        <tr
                                            key={subscription.id}
                                            className="align-middle"
                                        >
                                            <th scope="row">
                                                {subscription.id}
                                            </th>
                                            <td>
                                                <Moment format="lll">
                                                    {
                                                        subscription.data
                                                            ?.start_time
                                                    }
                                                </Moment>
                                            </td>
                                            <td>
                                                <Moment format="lll">
                                                    {
                                                        subscription.data
                                                            ?.billing_info
                                                            ?.next_billing_time
                                                    }
                                                </Moment>
                                            </td>
                                            <td>{subscription.data?.status}</td>
                                            <td>
                                                <Moment>
                                                    {subscription.created_at}
                                                </Moment>
                                            </td>
                                            <td>
                                                {/*
                                                <div className="d-flex">
                                                    <div className="">
                                                        <button
                                                            className="btn"
                                                            type="button"
                                                        ></button>
                                                    </div>
                                                    <div className="flex-shrink-0 mx-2">
                                                        <button
                                                            className="btn btn-danger btn-sm text-white"
                                                            type="button"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                                */}
                                                <button
                                                    className="btn btn-danger btn-sm text-white"
                                                    type="button"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td>
                                            <strong>
                                                No subscription available yet.
                                            </strong>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

SubscriptionTable.propTypes = {
    subscriptions: PropTypes.array,
};

const mapStateToProps = (state) => ({
    subscriptions: state.subscription.subscriptions,
    loading: state.subscription.loading,
});

export default connect(mapStateToProps)(SubscriptionTable);
