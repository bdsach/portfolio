import { marked } from "marked";

/**
 * Fetches a markdown content from the specified URL.
 *
 * @param {string} url - The URL of the markdown content to fetch.
 * @return {Promise<string>} A promise that resolves to the fetched markdown content.
 */
export const fetchMarkdown = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch content from ${url}. Status: ${response.status}`);
    }

    const markdown = await response.text();
    const content = marked.parse(markdown);

    return content;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};