import React, { useState } from 'react';
import { Image, ImageProps, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';

export const DEFAULT_MOVIE_POSTER =
  'https://ui-avatars.com/api/?name=CineNow&background=1f1f1f&color=ffffff&bold=true&size=512';

type RemoteImageProps = Omit<ImageProps, 'source'> & {
  uri?: string | null;
  assetSource?: ImageSourcePropType;
  fallbackLabel?: string;
  fallbackUri?: string;
  style?: StyleProp<ImageStyle>;
};

export const RemoteImage: React.FC<RemoteImageProps> = ({
  uri,
  assetSource,
  fallbackLabel,
  fallbackUri = DEFAULT_MOVIE_POSTER,
  onError,
  ...props
}) => {
  const [useFallback, setUseFallback] = useState(false);
  const labeledFallbackUri = fallbackLabel
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackLabel)}&background=1f1f1f&color=ffffff&bold=true&size=512`
    : fallbackUri;
  const sourceUri = !uri || useFallback ? labeledFallbackUri : uri;
  const source = assetSource || { uri: sourceUri };

  return (
    <Image
      {...props}
      source={source}
      onError={(event) => {
        if (!assetSource && !useFallback && sourceUri !== labeledFallbackUri) {
          setUseFallback(true);
        }
        onError?.(event);
      }}
    />
  );
};
