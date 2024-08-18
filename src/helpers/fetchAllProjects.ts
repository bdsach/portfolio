import { siteConfig } from "../../site.config";
import { fetchMarkdown } from "./fetchMarkdown";
import { fetchProjectName } from "./fetchProjectName";
import { fetchDescription } from "./fetchDescription";
import { fetchTopic } from "./fetchTopic";
import getCover from "./getCover";
import rawUrl from "./getRawReadmeUrl";

 /**
 * Fetches all projects from the site configuration.
 */
async function fetchAllProjects() {
  const promises = siteConfig.projects
  .filter((project) => project.published)
  .map((project) => {
    const url = rawUrl(project.repoUrl);
    const content = fetchMarkdown(url);
    const projectName = fetchProjectName(url);
    const description = fetchDescription(url);
    const topics = fetchTopic(project.repoUrl)
    const cover = getCover(project.repoUrl);

    return {
      projectName,
      description,
      content,
      slug: project.slug,
      cover,
      topics
    };
  });

  const responses = await Promise.all(promises);
  return responses;
}

export default fetchAllProjects;
