// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidate {
    login: string; // The username of the candidate
    avatar_url: string; // URL to the candidate's avatar image
    name: string | null; // The name of the candidate (can be null)
    company: string | null; // The company of the candidate (can be null)
    location: string | null; // The location of the candidate (can be null)
    email: string | null; // The email of the candidate (can be null)
    html_url: string; // URL to the candidate's GitHub profile
    bio: string | null; // The bio of the candidate (can be null)
  }