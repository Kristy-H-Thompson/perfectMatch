const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    const data = await response.json();
    console.log('Full Data:', data);  // Log the full response to check structure

    const users = data.map((user: any) => {
      console.log('User Data:', user);  // Log each user for debugging
      return {
        login: user.login,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        name: user.name || 'No name provided',
        company: user.company || 'No company information',
        bio: user.bio || 'No bio available',
        location: user.location || 'No location available',
        email: user.email || 'No email available',
      };
    });

    console.log('Processed Users:', users);
    return users;
  } catch (err) {
    console.log('An error occurred:', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    const data = await response.json();
    console.log('User Data:', data);

    // Return the user data including bio, name, and company
    const user = {
      login: data.login,
      avatar_url: data.avatar_url,
      name: data.name || 'No name provided', // Default if no name is provided
      company: data.company || 'No company information', // Default if no company is provided
      bio: data.bio || 'No bio available', // Default if no bio is available
      location: data.location || 'No location available', // Optional, fallback if location is missing
      email: data.email || 'No email available', // Optional, fallback if email is missing
      html_url: data.html_url,
    };

    return user;
  } catch (err) {
    console.log('An error occurred:', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };