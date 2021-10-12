import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PropTypes from "prop-types";
import MainContainer from "../components/MainContainer";
import { connect } from "react-redux";
import { saveTerms } from "../actions/terms";
import ReactGA from "react-ga";

const TermsConditionsPage = ({ isAuthenticated, terms, saveTerms, user }) => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    useEffect(() => {
        if (terms.content?.body) {
            const contentBlock = htmlToDraft(terms.content.body);
            const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks
            );

            setEditorState(() => EditorState.createWithContent(contentState));
        }
    }, [terms]);

    const handleSaveTerms = () => {
        let body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        saveTerms({ body }, terms.content.id);
    };

    return (
        <MainContainer>
            <div className="bg-white">
                <div className="container">
                    <h2 className="text-align-center">Terms And Conditions</h2>
                    <div className="py-2">
                        {isAuthenticated && user?.roles[0]?.name === "admin" && (
                            <div className="py-2">
                                {edit ? (
                                    <div className="d-grid gap-2 d-sm-block">
                                        <button
                                            className="btn btn-light mx-1"
                                            type="button"
                                            onClick={handleSaveTerms}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="btn btn-light mx-1"
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
                            <div
                                className="py-2"
                                dangerouslySetInnerHTML={{
                                    __html: terms.content?.body,
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

TermsConditionsPage.propTypes = {
    isAuthenticated: PropTypes.bool,
    terms: PropTypes.object,
    saveTerms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    terms: state.terms,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { saveTerms })(TermsConditionsPage);
