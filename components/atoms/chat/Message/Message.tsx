import { PropsWithChildren } from 'react';

import styles from './Message.module.css';

interface MessageProps {
  me?: boolean;
}

function Message({ children, me = false }: PropsWithChildren<MessageProps>) {
  return (
    <div className={`${styles.container} ${me ? styles.me : ''}`}>
      {children}
    </div>
  );
}

export default Message;
