class ImageFile {
  private _inputElement = document.getElementById('file') as HTMLInputElement;
  private _imageFile: File = new File([], '');

  // Getters
  get fileHandler(): HTMLInputElement {
    return this._inputElement;
  }

  get isAvailable(): boolean {
    return this._inputElement.files
      ?.item(0)
      ?.type.startsWith('image') as boolean;
  }

  get image(): File {
    return this._imageFile;
  }
  get imageURL(): string {
    return URL.createObjectURL(this._imageFile);
  }

  // Method
  select(): void {
    this._inputElement.click();
  }

  get(): void {
    this._imageFile = this._inputElement.files?.item(0) as File;
  }
}

export default new ImageFile();
