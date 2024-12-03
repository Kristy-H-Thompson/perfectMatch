// src/pages/SavedCandidates.tsx
import React, { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

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

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No potential candidates saved yet. Start reviewing candidates!</p>
      ) : (
        <table className="candidate-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
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
            {savedCandidates.map((candidate, index) => (
              <tr key={candidate.login} className={index % 2 === 0 ? 'even' : 'odd'}>
                <td>
                  <img src={candidate.avatar_url} alt={candidate.login} width="50" height="50" />
                </td>
                <td>{candidate.name || 'No name available'}</td>
                <td>{candidate.login}</td>
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
                  <button onClick={() => removeCandidate(candidate.login)}>Remove Candidate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;