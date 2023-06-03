/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
function asyncTask<T, U = Error>(promise: Promise<T>, errorExt?: object): Promise<[U | undefined, T | undefined]> {
  return promise
    .then<[undefined, T]>((data: T) => [undefined, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        // @ts-ignore
        Object.assign(err, errorExt);
      }

      return [err, undefined];
    });
}

export default asyncTask;
