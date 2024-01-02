 /**
 * Generates the raw README.md URL for a given repository URL.
 */
function getRawReadmeUrl(repoUrl: string) {
  const urlParts = repoUrl.split("/");
  const username = urlParts[3];
  const repository = urlParts[4];

  return `https://raw.githubusercontent.com/${username}/${repository}/main/README.md`;
}

export default getRawReadmeUrl