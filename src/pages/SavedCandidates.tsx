// src/pages/SavedCandidates.tsx
import React, { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [sortCriteria, setSortCriteria] = useState<keyof Candidate>('login'); // Ensuring sortCriteria is one of Candidate's keys
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Fetch saved candidates from localStorage
  useEffect(() => {
    const storedCandidates = localStorage.getItem('savedCandidates');
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  // Function to handle removing a candidate
  const removeCandidate = (login: string) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.login !== login);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  // Function to handle sorting candidates based on criteria
  const sortCandidates = (candidates: Candidate[]): Candidate[] => {
    const sortedCandidates = [...candidates].sort((a, b) => {
      const aValue = a[sortCriteria] || ''; // TypeScript ensures safe property access
      const bValue = b[sortCriteria] || '';
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sortedCandidates;
  };

  // Handle change in sorting criteria
  const handleSortChange = (criteria: keyof Candidate) => {
    const newOrder = sortCriteria === criteria && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortCriteria(criteria);
    setSortOrder(newOrder);
  };

  const sortedCandidates = sortCandidates(savedCandidates);

  return (
    <div>
      <h2>Potential Candidates</h2>
      {savedCandidates.length === 0 ? (
        <p>No potential candidates saved yet. Start reviewing candidates!</p>
      ) : (
        <>
          <div className="sorting-options">
            <button onClick={() => handleSortChange('login')}>
              Sort by Username {sortCriteria === 'login' ? (sortOrder === 'asc' ? '↓' : '↑') : ''}
            </button>
            <button onClick={() => handleSortChange('location')}>
              Sort by Location {sortCriteria === 'location' ? (sortOrder === 'asc' ? '↓' : '↑') : ''}
            </button>
            <button onClick={() => handleSortChange('company')}>
              Sort by Company {sortCriteria === 'company' ? (sortOrder === 'asc' ? '↓' : '↑') : ''}
            </button>
          </div>
          <table className="candidate-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Username</th>
                <th>Location</th>
                <th>Company</th>
                <th>Email</th>
                <th>Bio</th>
                <th>Profile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedCandidates.map((candidate, index) => (
                <tr key={candidate.login} className={index % 2 === 0 ? 'even' : 'odd'}>
                  <td>
                    <img src={candidate.avatar_url} alt={candidate.login} width="50" height="50" />
                  </td>
                  <td>
                    <b>{candidate.login}</b><br />
                    ({candidate.name || 'No name provided'})
                  </td>
                  <td>{candidate.location || 'No location provided'}</td>
                  <td>{candidate.company || 'No company information'}</td>
                  <td>{candidate.email || 'No email available'}</td>
                  <td>{candidate.bio || 'No bio available'}</td>
                  <td>
                    <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                      View Profile
                    </a>
                  </td>
                  <td>
                    <button onClick={() => removeCandidate(candidate.login)} className="noCandidate">-</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default SavedCandidates;