import { IMAGE_TYPES } from 'constants/constants';

const { jpg, png } = IMAGE_TYPES;

const checkImg = (file) => {
  const type = file.type.toLowerCase();
  return type === jpg || type === png;
};

export default checkImg;
