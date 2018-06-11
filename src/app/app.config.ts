export class AppConfig {
  public static get API_ENDPOINT(): string {
    return 'http://localhost:9045'
  }
  public static get APP_NAME(): string {
    return 'Virtual Machine Management System'
  }

  public static get DATE_FORMAT(): string {
    return 'YYYY-MM-DD';
  }
}
