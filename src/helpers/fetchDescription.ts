/**
 * Fetches the project name from the given URL.
 *
 * @param {string} url - The URL to fetch the project name from.
 * @return {Promise<string>} A promise that resolves to the project name.
 */
export const fetchDescription = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch content from ${url}. Status: ${response.status}`
      );
    }

    const markdown = await response.text();

    // Use a regular expression to extract content under the ## Description heading
    const descriptionRegex = /^##\s+Description\s*([\s\S]*?)(?=^##|$)/im;
    const match = descriptionRegex.exec(markdown);
    const descriptionContent = match ? match[1].trim() : '';

    return descriptionContent;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
