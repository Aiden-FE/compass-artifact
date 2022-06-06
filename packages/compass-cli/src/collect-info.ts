import inquirer from 'inquirer';
import { CollectInfoOptions } from './interface';
import { INQUIRE_TARGET_CHOICES } from './config';

export default class CollectInfo {
  constructor(
    private appName: string,
    private commandOptions: CollectInfoOptions['commandOptions'],
  ) {}

  public inquire(): Promise<CollectInfoOptions> {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'target',
        message: '请选择构建目标',
        choices: [...INQUIRE_TARGET_CHOICES],
      },
      {
        type: 'input',
        name: 'description',
        message: '请输入项目描述',
        default: '',
      },
    ]).then((options) => ({
      target: options.target,
      replaceData: {
        name: this.appName,
        description: options.description,
      },
      commandOptions: this.commandOptions,
    }));
  }
}
