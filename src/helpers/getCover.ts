/**
 * Generates the URL of the cover image for a given repository URL.
 *
 * @param {string} repoUrl - The URL of the repository.
 * @return {string} The URL of the cover image.
 */
function getCover(repoUrl: string) {
    const urlParts = repoUrl.split("/");
    const username = urlParts[3];
    const repository = urlParts[4];

    return `https://raw.githubusercontent.com/${username}/${repository}/main/thumbnail/cover.png`;
}

export default getCover