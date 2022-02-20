import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";

const SubscriptionTable = ({ subscriptions, loading }) => {
    const { t } = useTranslation(["dashboard"]);

    return (
        <div className="container p-4">
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        {t("subscription_table.th_0")}
                                    </th>
                                    <th scope="col">
                                        {t("subscription_table.th_1")}
                                    </th>
                                    <th scope="col">
                                        {t("subscription_table.th_2")}
                                    </th>
                                    <th scope="col">
                                        {t("subscription_table.th_3")}
                                    </th>
                                    <th scope="col">
                                        {t("subscription_table.th_4")}
                                    </th>
                                    <th scope="col">
                                        {t("subscription_table.th_5")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!loading && subscriptions.length > 0 ? (
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
                                                    {t(
                                                        "subscription_table.btn_text"
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td>
                                            <strong>
                                                {t(
                                                    "subscription_table.table_text"
                                                )}
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
