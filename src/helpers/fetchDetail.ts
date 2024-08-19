import type { GitHubRepo } from "../@types/GitHubRepo";

/**
 * Transforms a GitHub repository URL into a GitHub API URL.
 *
 * @param {string} url - The original GitHub repository URL.
 * @return {string} The transformed GitHub API URL.
 * @throws {Error} If the input URL is not a valid GitHub repository URL.
 */
function transformUrl(url: string): string {
  const apiBase = 'https://api.github.com/repos/';
  
  const match = url.match(/https:\/\/github\.com\/([^\/]+\/[^\/]+)/);
  
  if (match) {
      return apiBase + match[1];
  } else {
      throw new Error('Invalid GitHub URL');
  }
}

/**
 * Fetches topics from a GitHub repository using the specified URL.
 *
 * @param {string} url - The URL of the GitHub repository to fetch topics from.
 * @return {Promise<string>} A promise that resolves to the fetched topics.
 * @throws {Error} If the fetch operation fails or the URL is invalid.
 */
export const fetchDetail = async (url: string): Promise<GitHubRepo> => {

  try {
    const response = await fetch(transformUrl(url), {
        headers: {Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`}
      }
      
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch content from ${url}. Status: ${response.status}`,
      );
    }

    const data = await response.json();

    return data
  } catch (error) {
    console.error(error);
    throw error;
  }
};
