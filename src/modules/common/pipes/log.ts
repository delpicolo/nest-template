export class Log {
  ecsVersion = '1.6';
  transactioId: string;
  serviceVersion: string;
  organizationName = 'Picolo';
  timestamp: string;
  logLevel: string;
  sourcePort: number;
  serviceName: string;
  appName: string;
  version: number;
  sourceIp: string;
  logLogger: string;
  message: any;

  constructor(request, error) {
    this.setError(request, error);
  }

  private setError(request, error): this {
    const body = { ...request.body };
    delete body.password;
    delete body.passwordConfirmation;

    this.transactioId = '';
    this.serviceVersion = '1';
    this.logLevel = 'ERROR';
    this.sourcePort = 10;
    this.serviceName = '';
    this.appName = '';
    this.version = 1;
    this.sourceIp = request.ip;
    this.logLogger = 'elasticsearch';
    this.message = {
      request: {
        ip: request.ip,
        method: request.method,
        originalUrl: request.originalUrl,
        payload: {
          method: request.method,
          route: request.route.path,
          body: body,
          query: request.query,
          params: request.params,
        },
      },
      error: error.message,
    };
    return this;
  }
}
