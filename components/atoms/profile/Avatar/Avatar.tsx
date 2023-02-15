import Image from 'next/image';
import { ComponentProps, forwardRef } from 'react';
import tw from 'twin.macro';

interface AvatarProps extends ComponentProps<'article'> {
  photoSrc?: string;
  username?: string;
  fallbackUsername?: string;
}

const Avatar = forwardRef<HTMLElement, AvatarProps>(
  ({ photoSrc, username, fallbackUsername, ...rest }, ref) => {
    return (
      <article
        ref={ref}
        css={[
          tw`relative w-9 h-9 overflow-hidden`,
          tw`flex justify-center items-center`,
          tw`bg-[rgb(var(--lightning-color4))] text-white`,
          tw`text-[0.725rem]`,
          tw`rounded-full cursor-pointer`,
        ]}
        {...rest}
      >
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
