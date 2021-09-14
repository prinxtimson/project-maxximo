import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";

const axios = window.axios;

const UsersTable = ({ setAlert, alerts }) => {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers();
    }, []);

    console.log(document.body.innerText);

    const getUsers = async () => {
        try {
            const res = await axios.get("/api/users");

            setUsers(res.data);
            setData(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err.response);
            if (err.response.status == 500) {
                return setAlert("Server errror, please try again.", "danger");
            }

            setAlert(err.response.data.message, "danger");
        }
    };

    const getTrashedUser = () => {
        setUsers(data.filter((item) => item.deleted_at));
    };

    const getAllUsers = () => {
        setUsers(data);
    };

    return (
        <div className="container py-5">
            {loading ? (
                <p className="py-5">Loading........</p>
            ) : (
                <div className="card">
                    <div className="card-body table-responsive">
                        <div className="d-flex py-3">
                            <div className="flex-shrink-0">
                                <a href="#" type="button" onClick={getAllUsers}>
                                    All users
                                </a>
                                <span>{`(${data.length})`}</span>
                            </div>
                            <div className="flex-shrink-0 mx-3">
                                <a
                                    href="#"
                                    type="button"
                                    onClick={getTrashedUser}
                                >
                                    Trashed users
                                </a>
                                <span>{`(${
                                    data.filter((item) => item.deleted_at)
                                        .length
                                })`}</span>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!loading &&
                                    users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="align-middle"
                                        >
                                            <th scope="row">{user.id}</th>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="">
                                                        <img
                                                            src={user.avatar}
                                                            alt={user.name}
                                                            className="rounded-circle"
                                                            width={40}
                                                            height={40}
                                                        />
                                                    </div>
                                                    <div className="flex-shink-0 mx-2">
                                                        <p className="mb-0">
                                                            {user.username}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="mb-0">
                                                    {user.name}
                                                </p>
                                            </td>
                                            <td>{user.email}</td>
                                            <td>{user.roles[0]?.name}</td>
                                            <td>
                                                {user.deleted_at
                                                    ? "trashed"
                                                    : "active"}
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
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

UsersTable.propTypes = {
    alerts: PropTypes.array.isRequired,
    setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps, { setAlert })(UsersTable);
