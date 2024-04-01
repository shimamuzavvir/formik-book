import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './style/home.css'
const Home = () => {
    const [userDetail, setUserDetail] = useState([]);
    const[deleteData, setDeleteData] =useState([])
    const { id } = useParams();

    const getData = async () => {
        try {
            const response = await axios.get("https://66061ceed92166b2e3c34460.mockapi.io/products");
            setUserDetail(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [deleteData]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://66061ceed92166b2e3c34460.mockapi.io/products/${id}`);
            getData(); // Refresh data after deletion
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container p-3 mt-2 b-4'>
            <h1 className="title text-center p-2">BOOKS DETAILS</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 p-2">
                {/* Mapping through the UserDetails array to display user details */}
                {userDetail.map((item) => (
                    <div key={item.id}>
                        <div className="card h-100" id='cards'>
                            <img src={item.image} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h4 className="card-title">Book-Title: {item.title}</h4>
                                <h5 className="card-text">Author-name: {item.author}</h5>
                                <h6>ISBN-NUMBER: {item.ISBN}</h6>
                                <h6 className="card-text">Publication: {item.publication}</h6>
                            </div>
                            <div className="d-flex justify-content-evenly card-footer">
                              
                                <Link to={`/edit/${item.id}`} className='btn btn-warning'>Edit</Link>
                                <button className='btn btn-danger ms-2' onClick={() => handleDelete(item.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div class ="ms-1 mt-5"> 
               <h3>
                For Add New Book:
                  <Link to="/create" className='btn btn-success ms-2' >ADD</Link>
                </h3> 
            </div>
        </div>
    );
};

export default Home;
