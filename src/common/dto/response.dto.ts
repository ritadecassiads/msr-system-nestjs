export class ResponseDto<T> {
  constructor(
    public message: string,
    public data?: T,
  ) {}
}
