import ora from 'ora';

export default class Loading {
  private loading: ReturnType<typeof ora>;

  private pauseText?: string;

  constructor(msg?: string) {
    this.loading = ora().start(msg);
  }

  get text(): string {
    return this.loading.text;
  }

  set text(msg: string) {
    this.loading.stop();
    this.loading.start(msg);
  }

  /** 暂停loading */
  pause() {
    this.pauseText = this.loading.text;
    this.loading.stop();
  }

  /** loading恢复 */
  resume(msg?: string) {
    this.loading.start(msg || this.pauseText);
    this.pauseText = undefined;
  }

  /** 结束loading */
  stop() {
    this.loading.stop();
  }

  /** 结束loading并标记为成功 */
  succeed(msg?: string) {
    this.loading.succeed(msg);
  }

  /** 结束loading并标记为失败 */
  fail(msg?: string) {
    this.loading.fail(msg);
  }
}
