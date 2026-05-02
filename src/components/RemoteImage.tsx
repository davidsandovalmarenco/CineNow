import React, { useEffect, useState } from 'react';
import { Image, ImageProps, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';

export const DEFAULT_MOVIE_POSTER =
  'https://ui-avatars.com/api/?name=CineNow&background=1f1f1f&color=ffffff&bold=true&size=512';
const DEFAULT_MOVIE_POSTER_ASSET = require('../../assets/posters/superman-2025.jpg') as ImageSourcePropType;

type RemoteImageProps = Omit<ImageProps, 'source'> & {
  uri?: string | null;
  assetSource?: ImageSourcePropType;
  fallbackAssetSource?: ImageSourcePropType;
  fallbackLabel?: string;
  fallbackUri?: string;
  style?: StyleProp<ImageStyle>;
};

export const RemoteImage: React.FC<RemoteImageProps> = ({
  uri,
  assetSource,
  fallbackAssetSource = DEFAULT_MOVIE_POSTER_ASSET,
  fallbackLabel,
  fallbackUri = DEFAULT_MOVIE_POSTER,
  onError,
  ...props
}) => {
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    setUseFallback(false);
  }, [uri, assetSource]);

  const labeledFallbackUri = fallbackLabel
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackLabel)}&background=1f1f1f&color=ffffff&bold=true&size=512`
    : fallbackUri;
  const sourceUri = !uri || useFallback ? labeledFallbackUri : uri;
  const source = assetSource || (useFallback ? fallbackAssetSource : { uri: sourceUri });

  return (
    <Image
      {...props}
      source={source}
      onError={(event) => {
        if (!assetSource && !useFallback) {
          setUseFallback(true);
        }
        onError?.(event);
      }}
    />
  );
};
