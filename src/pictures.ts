import fs from 'fs';
import mongoose, { mongo } from 'mongoose';
import * as path from 'node:path';
const { Schema } = mongoose;

const pictureSchema = new Schema({
  name: String,
  id: String,
  data: Buffer,
});

function getImageData() {
  const imagePath = path.resolve('tmp', 'test-image.jpg');
  return fs.readFileSync(imagePath);
}

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // await addPhoto();
  await readPhoto('number1');

  await mongoose.disconnect();
}

async function addPhoto() {
  const photo = mongoose.model('Photo', pictureSchema);

  const photos = new photo({ name: 'My first photo', id: 'number1', data: getImageData() });
  await photos.save();
  console.log('ok');
}

async function readPhoto(id: string) {
  const PhotoScheme = mongoose.model('Photo', pictureSchema);

  const photos = await PhotoScheme.find({ id });
  const photo = photos[0];

  console.log(photo);
}

void main();
