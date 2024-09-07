import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import SearchBar from './SearchBar';
import SearchCard from './SearchCard';
import '../App.css';
import axios from 'axios';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [savedPapers, setSavedPapers] = useState([]);
    const [papers, setPapers] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/');
                setPapers(response.data.papers);
                // console.log(response.data.papers);
            } catch (err) {
                console.log('error fetching papers');
                console.log(err);
            }
        };
        fetchPapers();
    }, []);
    
    useEffect(() => {
        const fetchSavedPapers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/savedCollection');
                setSavedPapers(response.data);
                // console.log(response.data.savedPapers);
            } catch (err) {
                console.error('Error fetching saved papers:', err);
            }
        };
        fetchSavedPapers();
    }, []);

    // Function to search full key sentences across fields
    const searchPapers = (query) => {
        if (!query) return [];
        const lowerCaseQuery = query.toLowerCase();
        return papers.filter((paper) =>
            paper.title.toLowerCase().includes(lowerCaseQuery) ||
            paper.abstract.toLowerCase().includes(lowerCaseQuery) ||
            paper.authors.some((author) =>
                author.toLowerCase().includes(lowerCaseQuery)
            ) ||
            paper.keywords.some((keyword) =>
                keyword.toLowerCase().includes(lowerCaseQuery)
            )
        );
    };

    const handleSearch = (query) => {
        setQuery(query);
        const filteredResults = searchPapers(query);
        setResults(filteredResults);
    };

    const handleSave = async (paper) => {
        try {
            await axios.post('http://localhost:5000/savedCollection', paper);
            setSavedPapers([...savedPapers, paper]);
        } catch (err) {
            console.error('Error saving paper:', err);
        }
    };

    const isSaved = (paper) => {
        return savedPapers.some(savedPaper => savedPaper.id === paper.id);
    };

    return (
        <div className="app">
            <button
                className="saved-collection-button"
                onClick={() => navigate('/Collection')}
            >
                Saved Collection
            </button>

            <SearchBar handleSearch={handleSearch} />

            {!query ? (
                <div className="search-prompt">
                    <p>🔍 Start Searching...</p>
                </div>
            ) : results.length === 0 ? (
                <div className="no-results">
                    <div className="no-results-icon">😕</div>
                    <p>No results found.</p>
                </div>
            ) : (
                <div className="results-container">
                    {results.map((paper) => (
                        <div className="result-box" key={paper.id}>
                            <SearchCard paper={paper} />
                            <button 
                                className="save-button" 
                                onClick={() => !isSaved(paper) && handleSave(paper)}
                            >
                                {isSaved(paper) ? 'Saved' : 'Save'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
