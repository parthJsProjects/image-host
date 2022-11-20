class Uploader {
  private _key = 'dd47275adc50224d0f24';
  private _host = 'https://upload.uploadcare.com/base/';
  private static _connection: XMLHttpRequest;

  get con(): XMLHttpRequest {
    return Uploader._connection;
  }

  constructor() {
    Uploader._connection = new XMLHttpRequest();
    Uploader._connection.open('POST', this._host);
    Uploader._connection.responseType = 'json';
  }

  upload(file: File): void {
    const con = new FormData();
    con.append('UPLOADCARE_PUB_KEY', this._key);
    con.append('UPLOADCARE_STORE', 'auto');
    con.append(file.name, file);

    Uploader._connection.send(con);
  }
}

export default new Uploader();
