import Image from 'next/image';
import { ComponentProps, forwardRef } from 'react';

import styles from './Avatar.module.css';

interface AvatarProps extends ComponentProps<'article'> {
  photoSrc?: string;
  username?: string;
  fallbackUsername?: string;
}

const Avatar = forwardRef<HTMLElement, AvatarProps>(
  ({ photoSrc, username, fallbackUsername, ...rest }, ref) => {
    return (
      <article ref={ref} className={styles.profileAvatar} {...rest}>
        {photoSrc ? (
          <Image
            src={photoSrc || ''}
            alt={`${username}님의 아바타 이미지입니다.`}
            fill
          />
        ) : (
          username?.slice(0, 2) || fallbackUsername
        )}
      </article>
    );
  },
);

export default Avatar;
