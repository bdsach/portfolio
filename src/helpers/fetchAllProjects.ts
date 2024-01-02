import { siteConfig } from "../../site.config";
import { fetchMarkdown } from "./fetchMarkdown";
import { fetchProjectName } from "./fetchProjectName";
import { fetchDescription } from "./fetchDescription";
import getCover from "./getCover";
import rawUrl from "./getRawReadmeUrl";

 /**
 * Fetches all projects from the site configuration.
 */
async function fetchAllProjects() {
  const promises = siteConfig.projects.map((project) => {
    const url = rawUrl(project.repoUrl);
    const content = fetchMarkdown(url);
    const projectName = fetchProjectName(url);
    const description = fetchDescription(url);
    const cover = getCover(project.repoUrl);

    return {
      projectName,
      description,
      content,
      slug: project.slug,
      cover
    };
  });

  const responses = await Promise.all(promises);
  return responses;
}

export default fetchAllProjects;
