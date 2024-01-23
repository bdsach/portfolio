/**
 * Fetches the project name from the given URL.
 *
 * @param {string} url - The URL to fetch the project name from.
 * @return {Promise<string>} A promise that resolves to the project name.
 */
export const fetchProjectName = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch content from ${url}. Status: ${response.status}`
      );
    }

    const markdown = await response.text();

    // Use a regular expression to extract content inside # or ## headings
    const h1Regex = /^#\s+(.+)$/gm; // Matches lines starting with # and captures the text following it

    let match;
    let h1Content = "";
    while ((match = h1Regex.exec(markdown)) !== null) {
      h1Content += match[1] + "\n"; // Concatenate captured text and add a newline
    }

    // Convert the extracted content to HTML using marked
    const content = h1Content


    return content;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
