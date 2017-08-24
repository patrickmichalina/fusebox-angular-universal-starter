declare module 'loglevel-std-streams' {
  interface ILoglevelStdStreams {
    (log: any): void;
  }

  const loglevelStdStreams: ILoglevelStdStreams;
  export = loglevelStdStreams;
}