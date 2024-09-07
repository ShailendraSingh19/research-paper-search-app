import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchCard from './SearchCard';
import '../App.css';
import axios from 'axios';

const SavedCollection = () => {
    const [savedPapers, setSavedPapers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSavedPapers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/savedCollection');
                setSavedPapers(response.data);
            } catch (err) {
                console.error('Error fetching saved papers:', err);
            }
        };
        fetchSavedPapers();
    }, []);

    const handleRemove = async (paperId) => {
        try {
            await axios.delete(`http://localhost:5000/savedCollection/${paperId}`);
            setSavedPapers(savedPapers.filter(paper => paper.id !== paperId));
        } catch (err) {
            console.error('Error removing paper:', err);
        }
    };

    return (
        <div className="app">
            <button 
                className="saved-collection-button" 
                onClick={() => navigate('/')}
            >
                Home
            </button>
            <h1>Saved Collection</h1>
            {savedPapers.length === 0 ? (
                <div className="no-results">
                    <div className="no-results-icon">😕</div>
                    <p>No papers saved yet.</p>
                </div>
            ) : (
                <div className="saved-collection-container">
                    {savedPapers.map((paper) => (
                        <div className="result-box" key={paper.id}>
                            <SearchCard paper={paper} />
                            <button 
                                className="remove-button" 
                                onClick={() => handleRemove(paper.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedCollection;
