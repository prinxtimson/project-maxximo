import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PropTypes from "prop-types";
import MainContainer from "../components/MainContainer";
import { connect } from "react-redux";
import { savePrivacy } from "../actions/privacy";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";

const PrivacyPolicyPage = ({ isAuthenticated, privacy, savePrivacy, user }) => {
    const { t } = useTranslation(["privacy"]);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    useEffect(() => {
        if (privacy.content?.body) {
            const contentBlock = htmlToDraft(privacy.content?.body);

            const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks
            );

            setEditorState(() => EditorState.createWithContent(contentState));
        }
    }, [privacy]);

    const handleSavePrivacy = () => {
        let body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        savePrivacy({ body }, privacy.content.id);
    };
    return (
        <MainContainer>
            <div className="bg-white">
                {" "}
                <div className="container">
                    <h2 className="text-align-center">Privacy Policy</h2>
                    <div className="py-2">
                        {isAuthenticated && user?.roles[0]?.name === "admin" && (
                            <div className="py-2">
                                {edit ? (
                                    <div className="d-grid gap-2 d-sm-block">
                                        <button
                                            className="btn btn-light mx-1"
                                            type="button"
                                            onClick={handleSavePrivacy}
                                        >
                                            {t("save")}
                                        </button>
                                        <button
                                            className="btn btn-light mx-1"
                                            type="button"
                                            onClick={() => setEdit(false)}
                                        >
                                            {t("cancel")}
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className="btn btn-light"
                                        type="button"
                                        onClick={() => setEdit(true)}
                                    >
                                        {t("edit")}
                                    </button>
                                )}
                            </div>
                        )}
                        {!edit ? (
                            <div
                                className="py-2"
                                dangerouslySetInnerHTML={{
                                    __html: privacy.content?.body,
                                }}
                            />
                        ) : (
                            isAuthenticated && (
                                <div
                                    className="my-3 border rounded"
                                    style={{
                                        minHeight: 450,
                                    }}
                                >
                                    <Editor
                                        editorState={editorState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={setEditorState}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

PrivacyPolicyPage.propTypes = {
    isAuthenticated: PropTypes.bool,
    privacy: PropTypes.object,
    savePrivacy: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    privacy: state.privacy,
    user: state.auth.user,
});

export default connect(mapStateToProps, { savePrivacy })(PrivacyPolicyPage);
