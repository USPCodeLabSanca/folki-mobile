import React, { useState, useEffect } from 'react';
import { Image, Platform, View, useWindowDimensions } from 'react-native';
import * as S from './styles';

interface PostImageProps {
  imageUrl: string;
}

const PostImage: React.FC<PostImageProps> = ({ imageUrl }) => {
  const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);
  const [containerWidth, setContainerWidth] = useState(0);
  const { height: windowHeight } = useWindowDimensions();

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

  const maxWebHeight = Math.min(windowHeight * 0.6, 600);
  const fullWidthHeight = containerWidth > 0 ? containerWidth / aspectRatio : 0;
  const shouldLimitWebHeight =
    Platform.OS === 'web' &&
    containerWidth > 0 &&
    fullWidthHeight > maxWebHeight;

  const imageStyle = shouldLimitWebHeight
    ? {
        width: maxWebHeight * aspectRatio,
        height: maxWebHeight,
      }
    : {
        width: '100%' as const,
        aspectRatio,
      };

  return (
    <View
      style={{ width: '100%', alignItems: 'center' }}
      onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}
    >
      <S.PostImage
        source={{ uri: imageUrl }}
        style={imageStyle}
        resizeMode="contain"
      />
    </View>
  );
};

export default React.memo(PostImage);
