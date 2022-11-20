'use strict';

import ImageFile from './image';
import uploader from './uploader';

// Elements
const previewElement = document.getElementById('preview') as HTMLImageElement;
const uploadPromptElement = document.getElementById(
  'uploadPrompt'
) as HTMLElement;
const iBoxElement = document.getElementById('iBox') as HTMLElement;
const iBoxPromptElement = document.getElementById('iBoxPrompt') as HTMLElement;
const uploadingBoxElement = document.getElementById(
  'uploadingBox'
) as HTMLElement;
const outputBoxELement = document.getElementById('outputBox') as HTMLElement;
const outputBoxPromptElement = document.getElementById(
  'outputBoxPrompt'
) as HTMLElement;
const copyElement = document.getElementById('copy') as HTMLInputElement;

// Click anywhere on page to select
const selectImage = () => ImageFile.select();
document.body.addEventListener('click', selectImage);

// When Image received
ImageFile.fileHandler.addEventListener('change', () => {
  if (ImageFile.isAvailable) {
    // Disable Image Selection
    document.body.removeEventListener('click', selectImage);

    // Grab Image File
    ImageFile.get();

    // Show Image
    previewElement.src = ImageFile.imageURL;
    previewElement.classList.remove('no-pop');

    // Show Upload button
    uploadPromptElement.classList.add('hidden');
    iBoxElement.classList.remove('hidden');
  } else {
    console.log('Wrong file selected');
  }
});

// Click to upload
iBoxElement.addEventListener('click', () => {
  uploader.upload(ImageFile.image);
});

/* --------------------------------- Upload --------------------------------- */
// Start
uploader.con.addEventListener('loadstart', () => {
  iBoxPromptElement.textContent = 'Uploading...';
});

// Progress
uploader.con.upload.addEventListener('progress', (e) => {
  console.log(e);
  const percent = Math.round((e.loaded / e.total) * 100);
  uploadingBoxElement.setAttribute('style', `--u: ${percent}%`);
});

// Finish
uploader.con.addEventListener('load', () => {
  uploadingBoxElement.dataset['prompt'] = 'Optimizing...';
  console.log(uploader.con.response[ImageFile.image.name]);
  outputBoxPromptElement.textContent = `https://ucarecdn.com/${
    uploader.con.response[ImageFile.image.name]
  }/`;
  outputBoxELement.classList.remove('hidden');
  uploadingBoxElement.classList.add('exit');
});

// Copy
copyElement.addEventListener('click', () => {
  navigator.clipboard.writeText(outputBoxPromptElement.textContent as string);
});
