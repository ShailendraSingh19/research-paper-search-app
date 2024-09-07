import React from 'react';

const SearchCard = ({ paper, onSave }) => {
    return (
            <div className="detail-card">
                <h2 className="paper-title">{paper.title}</h2>
                <p className="paper-authors">{paper.authors.join(', ')}</p>
                <p className="paper-year">{paper.year}</p>
                <p className="paper-citations">Citations: {paper.citationCount}</p>
                <p className="paper-abstract">{paper.abstract}</p> 
                <a
                    href={paper.pdfUrl}
                    className="paper-link"
                    target="_blank"
                    rel="noopener noreferrer" 
                >
                    View Full Text (PDF)
                </a>
            </div>

    );
};

export default SearchCard;
