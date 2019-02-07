declare module 'http' {
  interface IncomingMessage {
    cookies: Record<string, string>;
  }
}
