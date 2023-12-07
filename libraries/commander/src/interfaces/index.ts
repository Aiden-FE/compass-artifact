import { QuestionCollection } from 'inquirer';

export type RepositoryInfo = {
  author: string;
  repository: string;
  branch?: string;
  repoPath?: string;
};

export type ContentOfGithubRepo = {
  type: 'dir' | 'file';
  path: string;
  download_url?: string;
};

export type PresetTemplatePlugin = {
  name: string;
  choices: QuestionCollection<any>;
  description?: string;
};

export interface PresetTemplate extends RepositoryInfo {
  name: string;
  plugins?: PresetTemplatePlugin[];
  description?: string;
  choices?: QuestionCollection<any>;
  replaceFilesPath?: string[];
}

export interface CustomTemplate {
  name: 'custom';
  description: string;
  choices: QuestionCollection<any>;
}

export type SelectionTemplate = PresetTemplate | CustomTemplate;

/** 将数组类型转换为联合类型 */
export type ConvertArrayToUnion<T extends any[]> = T extends Array<infer U> ? U : never;
