// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    login: string; // The username of the candidate
    avatar_url: string; // URL to the candidate's avatar image
    name: string | null | undefined; // The name of the candidate (can be null or undefined)
    company: string | null | undefined; // The company of the candidate (can be null or undefined)
    location: string | null | undefined; // The location of the candidate (can be null or undefined)
    email: string | null | undefined; // The email of the candidate (can be null or undefined)
    html_url: string; // URL to the candidate's GitHub profile
    bio: string | null | undefined; // The bio of the candidate (can be null or undefined)
  }