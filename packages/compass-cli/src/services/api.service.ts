import { Tentacle } from '@compass-aiden/utils';

export const ApiService = new Tentacle();

export function getRepoVersions(user: string, repo: string): Promise<{ name: string }[]> {
  return new Promise((resolve, reject) => {
    ApiService.get(`https://api.github.com/repos/${user}/${repo}/releases`)
      .config({
        headers: {
          accept: 'application/vnd.github.v3+json',
        },
      })
      .subscribe(
        (resp: any) => {
          resolve(resp.data);
        },
        (err: any) => reject(err),
      );
  });
}
