import got from 'got';
import { GithubReleases } from './interfaces';
import { ContentOfGithubRepo, RepositoryInfo } from '~/interfaces';

/**
 * @description 获取存储库已发布版本列表
 * @param repoInfo
 * @param token
 */
export function getRepoReleasesFromGithub(repoInfo: RepositoryInfo, token?: string) {
  return got
    .get(`https://api.github.com/repos/${repoInfo.author}/${repoInfo.repository}/releases`, {
      headers: {
        accept: 'application/vnd.github.v3+json',
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    })
    .json<GithubReleases[]>()
    .then((result) => {
      // 过滤掉草稿版或者预发布版
      return result.filter((release) => !release.draft && !release.prerelease);
    });
}

/**
 * @description 获取存储库
 * @param repoInfo
 * @param token
 */
export function getRepoFromGithub(repoInfo: RepositoryInfo, token?: string) {
  return got
    .get(`https://api.github.com/repos/${repoInfo.author}/${repoInfo.repository}/zipball/${repoInfo.branch || ''}`, {
      headers: {
        accept: 'application/vnd.github+json',
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    })
    .buffer();
}

/**
 * @description 获取仓库内容
 * @param repoInfo
 */
export function getRepoContentsFromGithub(repoInfo: RepositoryInfo, token?: string) {
  let url = `https://api.github.com/repos/${repoInfo.author}/${repoInfo.repository}/contents/${
    repoInfo.repoPath || ''
  }`;
  if (repoInfo.branch) {
    url += `?ref=${repoInfo.branch}`;
  }
  return got
    .get(url, {
      headers: {
        accept: 'application/vnd.github+json',
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    })
    .json<ContentOfGithubRepo[] | ContentOfGithubRepo>();
}
