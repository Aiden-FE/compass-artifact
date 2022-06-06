import chalk from 'chalk';

/**
 * @description 日志服务
 */
export default class LoggerService {
  static success(msg: string, print = true) {
    const text = chalk.green(msg);
    if (print) {
      // eslint-disable-next-line no-console
      console.info(text);
    }
    return text;
  }

  static info(msg: string, print = true) {
    const text = chalk.cyan(msg);
    if (print) {
      // eslint-disable-next-line no-console
      console.info(text);
    }
    return text;
  }

  static warning(msg: string, print = true) {
    const text = chalk.hex('#FFA500')(msg);
    if (print) {
      // eslint-disable-next-line no-console
      console.info(text);
    }
    return text;
  }

  static error(msg: string, print = true, exit = true) {
    const text = chalk.red(msg);
    if (print) {
      // eslint-disable-next-line no-console
      console.info(text);
    }
    if (exit) {
      process.exit(1);
    }
    return text;
  }
}
