import axios from 'axios';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import {  useNavigate } from 'react-router-dom'; 
import './style/create.css'

const Create = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [createData, setCreateData] = useState({
        title: "",
        author: "",
        publication: "",
        ISBN: ""
    })
    const formik = useFormik({
        initialValues: {
            createData
        },
        validate: values => {
            const errors = {};

            if (!values.title) {
                errors.title = "Please enter a book title";
            } else if (values.title.length <= 5) {
                errors.title = "Length of the book title should be more than 5 letters";
            }

            if (!values.author) {
                errors.author = "Please enter an author";
            } else if (values.author.length < 3) {
                errors.author = "Length of the author's name should be more than 3 letters";
            }

            if (!values.publication) {
                errors.publication = "Please enter a publication";
            } else if (values.publication.length <= 5) {
                errors.publication = "Length of the publication should be more than 5 letters";
            }

            if (!values.ISBN) {
                errors.ISBN = "Please enter an ISBN";
            } else if (values.ISBN.length <= 10) {
                errors.ISBN = "ISBN must be 10 digits long";
            }

            return errors;
        },
        onSubmit: async (values) => {
            try {
                await axios.post("https://66061ceed92166b2e3c34460.mockapi.io/products", values);
                // Navigate to home page after successful submission
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        }
    });
    

    return (
        <div className="form-container">
            <div className="form-box-container pe-5">
                <h3>Add New Book Details</h3>
                <form onSubmit={formik.handleSubmit}> {/* Add onSubmit handler here */}
                    <div className="my-3">
                        Book-Title<span className="text-danger">*</span>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <div className="text-danger">{formik.errors.title}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label>Author<span className="text-danger">*</span></label>
                        <input
                            className="form-control"
                            type="text"
                            name="author"
                            value={formik.values.author}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                        />
                        {formik.touched.author && formik.errors.author ? (
                            <div className="text-danger">{formik.errors.author}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label>Publication<span className="text-danger">*</span></label>
                        <input
                            className="form-control Inputs"
                            type="text"
                            name="publication"
                            value={formik.values.publication}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                        />
                        {formik.touched.publication && formik.errors.publication ? (
                            <div className="text-danger">{formik.errors.publication}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label>ISBN<span className="text-danger">*</span></label>
                        <input
                            className="form-control Inputs"
                            type="text"
                            name="ISBN"
                            value={formik.values.ISBN_No}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                        />
                        {formik.touched.ISBN && formik.errors.ISBN ? (
                            <div className="text-danger">{formik.errors.ISBN}</div>
                        ) : null}
                    </div>
                    <div className="d-flex justify-content-center" id="btn-div">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={formik.isSubmitting} // Disable button while submitting
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;
