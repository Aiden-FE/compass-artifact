import chalk from 'chalk';
import { formatDate } from '~/utils';

function formatLog(str: string, prefix?: string) {
  return `[${formatDate(new Date())}]:\t${prefix ? `${prefix}  ` : ''}${str}`;
}

class LoggerService {
  /**
   * @description 日志的打印级别,只有等于或高于此级别的日志才会被打印出来;0=debug;1=info;2=warn,success;3=error
   * @default 1
   * @private
   */
  private logLevel = 1;

  /**
   * @description 设置debug级别,设置后默认日志仅输出大于等于当前级别的日志信息
   * @param level 0=debug;1=info;2=warn,success;3=error
   */
  public setDebugLevel(level: 0 | 1 | 2 | 3) {
    this.logLevel = level;
  }

  /**
   * @param msg 消息内容
   * @param [print=true] 是否打印日志,为否的的话则不打印日志
   * @param prefix
   * @return {string} 返回被着色后的文本消息
   */
  public debug(msg: string, print = true, prefix = '🔧') {
    const text = chalk.white(formatLog(msg, prefix));
    if (print && this.logLevel <= 0) {
      // eslint-disable-next-line no-console
      console.log(text);
    }
    return text;
  }

  public info(msg: string, print = true, prefix = '💡') {
    const text = chalk.cyan(formatLog(msg, prefix));
    if (print && this.logLevel <= 1) {
      // eslint-disable-next-line no-console
      console.log(text);
    }
    return text;
  }

  public success(msg: string, print = true, prefix = '✔️') {
    const text = chalk.green(formatLog(msg, prefix));
    if (print && this.logLevel <= 2) {
      // eslint-disable-next-line no-console
      console.log(text);
    }
    return text;
  }

  public warning(msg: string, print = true, prefix = '‼️') {
    const text = chalk.hex('#FFA500')(formatLog(msg, prefix));
    if (print && this.logLevel <= 2) {
      // eslint-disable-next-line no-console
      console.log(text);
    }
    return text;
  }

  public error(msg: string, print = true, prefix = '🚫') {
    const text = chalk.red(formatLog(msg, prefix));
    if (print && this.logLevel <= 3) {
      // eslint-disable-next-line no-console
      console.log(text);
    }
    return text;
  }
}

export default new LoggerService();
