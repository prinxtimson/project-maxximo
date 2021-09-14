import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MainContainer from "../components/MainContainer";
import { connect } from "react-redux";
import { deleteAccount, updateUser } from "../actions/auth";

const ProfilePage = ({ alerts, loading, updateUser, deleteAccount, user }) => {
    const [inputRef, setInputRef] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        avatar: "",
    });

    const { name, avatar } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        setFormData({ name: user?.name || "", avatar: user?.avatar || "" });
    }, [user]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        if (avatar !== user.avatar) {
            data.append("avatar", avatar);
        }
        data.append("_method", "put");
        data.append("name", name);

        updateUser(data);
    };

    return (
        <MainContainer>
            <div className="container-fluid">
                <div
                    className="card my-5 m-auto p-2"
                    style={{ maxWidth: "440px" }}
                >
                    <div className="card-body">
                        <h1 className="card-title text-primary text-center">
                            Profile
                        </h1>
                        {alerts.map(
                            (alert) =>
                                alert.alertType === "danger" && (
                                    <div
                                        key={alert.id}
                                        className={`alert alert-${alert.alertType} py-2`}
                                        role="alert"
                                    >
                                        {alert.msg}
                                    </div>
                                )
                        )}
                        <form
                            onSubmit={handleOnSubmit}
                            className="form row g-3"
                        >
                            <div className="py-2 position-relative">
                                <img
                                    src={avatar}
                                    alt={name}
                                    className="rounded-circle mx-auto d-block"
                                    style={{ maxWidth: "100%" }}
                                />
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            avatar: e.target.files[0],
                                        })
                                    }
                                    name="avatar"
                                    id="avatar"
                                    className="d-none"
                                    accept="image/*"
                                    ref={(ref) => setInputRef(ref)}
                                />

                                <a
                                    className="btn btn-light rounded-circle position-absolute"
                                    style={{ right: 150, bottom: -5 }}
                                    onClick={() => inputRef?.click()}
                                    type="button"
                                >
                                    <i
                                        className="fas fa-camera "
                                        style={{ fontSize: 25 }}
                                    ></i>
                                </a>
                            </div>
                            <div className="form-floating col-12">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Full name"
                                    name="name"
                                    id="floatingInput"
                                    value={name}
                                    onChange={handleOnChange}
                                    required
                                />
                                <label htmlFor="floatingInput">Full name</label>
                            </div>
                            <div className="d-grid gap-2 col-12 mx-auto">
                                <button
                                    className={`btn btn-${
                                        loading ? "secondary" : "primary"
                                    } btn-lg text-white`}
                                    type="submit"
                                    disabled={loading}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                        <div className="d-grid gap-2 col-12 py-3 mx-auto">
                            <button
                                className={`btn btn-${
                                    loading ? "secondary" : "danger"
                                } btn-lg text-white`}
                                type="button"
                                disabled={loading}
                                onClick={deleteAccount}
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

ProfilePage.propTypes = {
    loading: PropTypes.bool,
    alerts: PropTypes.array.isRequired,
    updateUser: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    alerts: state.alert,
    user: state.auth.user,
});

export default connect(mapStateToProps, { updateUser, deleteAccount })(
    ProfilePage
);
