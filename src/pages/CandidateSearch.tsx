import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface'; // Ensure this import points to your Candidate interface
import { searchGithub, searchGithubUser } from '../api/API'; // Import both functions from API

/* 
------------------------------------------------------------------------------------------------------------

  Candidate Search

------------------------------------------------------------------------------------------------------------ 
*/

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState<Candidate | null>(null);

  // Fetch candidates from the GitHub API
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub();
        console.log("Fetched Candidates:", data);
        setCandidates(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  // Fetch additional details (like bio, company) for a specific user
  const fetchCandidateDetails = async (username: string) => {
    try {
      const userDetails = await searchGithubUser(username);
      console.log("Fetched User Details:", userDetails);
      return userDetails;
    } catch (error) {
      console.error(`Error fetching details for ${username}:`, error);
      return null; // return null for error handling
    }
  };

  // Function to save a candidate to localStorage
  const handleSaveCandidate = (candidate: Candidate) => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  };

  // Function to move to the next candidate
  const handleNext = (save: boolean) => {
    if (currentCandidateIndex < candidates.length - 1) {
      if (save && currentCandidateDetails) handleSaveCandidate(currentCandidateDetails);
      setCurrentCandidateIndex(currentCandidateIndex + 1);
    } else {
      alert("No more candidates available.");
    }
  };

  // Load additional candidate details (bio, company, etc.)
  const loadCandidateDetails = async () => {
    if (!currentCandidate) return;
    const userDetails = await fetchCandidateDetails(currentCandidate?.login);
    if (userDetails) {
      const updatedCandidate = { ...currentCandidate, ...userDetails };
      setCurrentCandidateDetails(updatedCandidate);
    }
  };

  // Ensure currentCandidate is assigned before being accessed
  const currentCandidate = candidates[currentCandidateIndex];

  // Effect hook to load details when a new candidate is selected
  useEffect(() => {
    if (currentCandidate) {
      loadCandidateDetails();
    }
  }, [currentCandidate]);

  // Handle loading state and empty candidate details
  if (loading || !currentCandidateDetails) {
    return <p>Loading candidate details...</p>;
  }

  return (
    <div className="candidate-search">
      <h2>Candidate Search</h2>
      <div className="candidate-card">
        <img
          src={currentCandidateDetails?.avatar_url ?? 'default-avatar-url'}
          alt={currentCandidateDetails?.login ?? 'No login available'}
          width="150"
        />
        <div className="candidate-box">
          <h2>{currentCandidateDetails?.name ?? 'No name available'}</h2>
          <p>Username: {currentCandidateDetails?.login ?? 'No login available'}</p>
          <p>Location: {currentCandidateDetails?.location ?? 'No location provided'}</p>
          <p>Company: {currentCandidateDetails?.company ?? 'No company information'}</p>
          <p>Email: {currentCandidateDetails?.email ?? 'No email available'}</p>
          <p>Bio: {currentCandidateDetails?.bio ?? 'No bio available'}</p>
          <a href={currentCandidateDetails?.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
        <div className="buttons">
          {/* "-" button: Move to the next candidate without saving */}
          <button onClick={() => handleNext(false)} className="noCandidate">
            -
          </button>
          {/* "+" button: Save the current candidate and move to the next */}
          <button onClick={() => handleNext(true)} className="yesCandidate">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;