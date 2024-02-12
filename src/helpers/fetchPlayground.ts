import { siteConfig } from "../../site.config";
import { fetchMarkdown } from "./fetchMarkdown";
import { fetchProjectName } from "./fetchProjectName";
import { fetchDescription } from "./fetchDescription";
import getCover from "./getCover";
import rawUrl from "./getRawReadmeUrl";

/**
 * Fetches all playground from the site configuration.
 */
async function fetchPlayground() {
  const promises = siteConfig.playgrounds
    .filter((playground) => playground.published)
    .map((playground) => {
      const url = rawUrl(playground.repoUrl);
      const content = fetchMarkdown(url);
      const name = fetchProjectName(url);
      const description = fetchDescription(url);
      const cover = getCover(playground.repoUrl);
      const repoUrl = playground.repoUrl;

      return {
        name,
        description,
        content,
        slug: playground.slug,
        cover,
        repoUrl
      };
    });

  const responses = await Promise.all(promises);
  return responses;
}

export default fetchPlayground;
