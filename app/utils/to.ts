export default function to(promise: any) {
  return promise.then((data: any) => [null, data]).catch((err: any) => [err]);
}
