interface RoomListItemProps {
  roomName: string;
  receiveCount: number;
  text: string;
  onClick: () => void;
}

function RoomListItem({
  roomName,
  receiveCount,
  text,
  onClick,
}: RoomListItemProps) {
  return (
    <li
      className="relative flex flex-col justify-center w-full min-h-[90px] bg-white px-[0.9rem] py-8 border-b border-[rgb(222,222,222)]"
      //   onDoubleClick={() => resetReceiveCount(room.id)}
      onDoubleClick={onClick}
      //   onClick={onClick}
    >
      <h3 className="flex">
        <span>{roomName || '방 이름'}</span>
        {receiveCount > 0 && (
          <div className="flex justify-center items-center ml-[0.4rem] w-5 h-5 text-[0.2rem] font-bold text-white bg-red-600 rounded-full">
            {receiveCount}
          </div>
        )}
      </h3>
      <p className="mt-2 text-sm font-normal opacity-80">{text}</p>
    </li>
  );
}

export default RoomListItem;
