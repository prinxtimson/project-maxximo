import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PropTypes from "prop-types";
import MainContainer from "../components/MainContainer";
import { connect } from "react-redux";
import { savePrivacy } from "../actions/privacy";

const PrivacyPolicyPage = ({ isAuthenticated, privacy, savePrivacy }) => {
    const contentBlock = htmlToDraft(privacy.content);
    const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
    );
    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(contentState)
    );
    const [edit, setEdit] = useState(false);

    const handleSavePrivacy = () => {
        let data = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        savePrivacy(data);
    };
    return (
        <MainContainer>
            <div className="container">
                <h2 className="text-align-center">Privacy Policy</h2>
                <div className="py-2">
                    {isAuthenticated && (
                        <div className="py-2">
                            {edit ? (
                                <div className="d-grid gap-2 d-md-block">
                                    <button
                                        className="btn btn-light"
                                        type="button"
                                        onClick={handleSavePrivacy}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="btn btn-light mx-2"
                                        type="button"
                                        onClick={() => setEdit(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="btn btn-light"
                                    type="button"
                                    onClick={() => setEdit(true)}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    )}
                    {!edit ? (
                        <div className="py-2">
                            <p>privacy policy sample</p>
                        </div>
                    ) : (
                        isAuthenticated && (
                            <div
                                className="py-3 border rounded"
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
});

export default connect(mapStateToProps, { savePrivacy })(PrivacyPolicyPage);
