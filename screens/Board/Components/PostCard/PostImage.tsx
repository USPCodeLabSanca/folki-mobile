import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import * as S from './styles';

interface PostImageProps {
  imageUrl: string;
}

const PostImage: React.FC<PostImageProps> = ({ imageUrl }) => {
  const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);

  useEffect(() => {
    Image.getSize(
      imageUrl,
      (width, height) => {
        setAspectRatio(width / height);
      },
      (error) => {
        console.error('Error getting image size:', error);
      }
    );
  }, [imageUrl]);

  return (
    <S.PostImage
      source={{ uri: imageUrl }}
      style={{ aspectRatio }}
      resizeMode="contain"
    />
  );
};

export default React.memo(PostImage);
