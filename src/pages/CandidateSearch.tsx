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

  // Fetch candidates from the GitHub API
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub();
        console.log("Fetched Candidates:", data); // Log fetched data to verify
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
      console.log("Fetched User Details:", userDetails); // Log fetched details for each user
      return userDetails;
    } catch (error) {
      console.error(`Error fetching details for ${username}:`, error);
      return {}; // Return an empty object if there's an error
    }
  };

  // Function to save a candidate to localStorage
  const handleSaveCandidate = (candidate: Candidate) => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  };

  // Function to move to the next candidate
  const handleNextCandidate = () => {
    if (currentCandidateIndex < candidates.length - 1) {
      setCurrentCandidateIndex(currentCandidateIndex + 1);
    } else {
      alert("No more candidates available.");
    }
  };

  // Function to move to the next candidate without saving (for the "-" button)
  const handleNoCandidate = () => {
    if (currentCandidateIndex < candidates.length - 1) {
      setCurrentCandidateIndex(currentCandidateIndex + 1);
    } else {
      alert("No more candidates available.");
    }
  };

  // Handle when no candidates are available
  if (loading) {
    return <p>Loading candidates...</p>;
  }

  const currentCandidate = candidates[currentCandidateIndex];

  // Handle the case where currentCandidate is undefined
  if (!currentCandidate) {
    return <p>Candidate not found. Please try again later.</p>;
  }

  // Fetch additional candidate details if needed (bio, company, etc.)
  const loadCandidateDetails = async () => {
    const userDetails = await fetchCandidateDetails(currentCandidate.login);
    // Update current candidate details with additional information
    return {
      ...currentCandidate,
      ...userDetails,
    };
  };

  return (
    <div className="candidate-search">
      <h2>Candidate Search</h2>
      <div className="candidate-card">
        <img
          src={currentCandidate?.avatar_url ?? 'default-avatar-url'}
          alt={currentCandidate?.login ?? 'No login available'}
          width="150"
        />
        <div className="candidate-box">
          <h2>{currentCandidate?.name ?? 'No name available'}</h2>
          <p>Username: {currentCandidate?.login ?? 'No login available'}</p>
          <p>Location: {currentCandidate?.location ?? 'No location provided'}</p>
          <p>Company: {currentCandidate?.company ?? 'No company information'}</p>
          <p>Email: {currentCandidate?.email ?? 'No email available'}</p>
          <p>Bio: {currentCandidate?.bio ?? 'No bio available'}</p>
          <a href={currentCandidate?.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
        <div className="buttons">
          {/* "-" button: Move to the next candidate without saving */}
          <button onClick={handleNoCandidate} disabled={currentCandidateIndex === 0} className="noCandidate">
            -
          </button>
          {/* "+" button: Save the current candidate and move to the next */}
          <button
            onClick={() => {
              handleSaveCandidate(currentCandidate);
              handleNextCandidate();
            }}
            className="yesCandidate"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;