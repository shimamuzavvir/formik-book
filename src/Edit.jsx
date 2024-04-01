import axios from 'axios';
import React, { useState, useEffect } from 'react'; // Import useEffect
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import './style/edit.css'

const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [editBooks, SetEditBooks] = useState({
        title: '',
        author: '',
        publication: '',
        ISBN:''
    })

    // Fetch data from the API when the component mounts
    useEffect(() => {
        getData()
    }, [])

    // Function to fetch data from the API
    const getData= async () => {
        try {
            const response = await axios.get(`https://66061ceed92166b2e3c34460.mockapi.io/products/${id}`);
            // Set the fetched data to the state
            SetEditBooks(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        formik.setValues(editBooks) //it defines storing the formik values setValues() =>this set values is default function
    }, [id])

    const formik = useFormik({
        initialValues: editBooks, // Use editData as initial values
        validate: values => {
            const errors = {};

            if (!values.title) {
                errors.title = "Please enter a book title";
            } else if (values.title.length <= 4) {
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
                await axios.put(`https://66061ceed92166b2e3c34460.mockapi.io/products/${id}`, values); // Use PUT request to update existing data
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        }
    });

   

    return (
        <div className="form-container">
            <div className="form-box-container pe-5">
                <h3>Edit Book Details</h3>
                <form onSubmit={formik.handleSubmit}>
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
                            value={formik.values.ISBN}
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
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
