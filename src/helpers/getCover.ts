function getCover(repoUrl: string) {
    const urlParts = repoUrl.split("/");
    const username = urlParts[3];
    const repository = urlParts[4];

    return `https://raw.githubusercontent.com/${username}/${repository}/main/thumbnail/cover.png`;
}

export default getCover