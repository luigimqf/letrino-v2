import { UserBasicData } from "@/features/auth/types";
import { Rank } from "./Rank";

type PodiumProps = {
  winners: UserBasicData[];
};

export const Podium = ({ winners }: PodiumProps) => {
  const getOrderClass = (index: number): string => {
    switch (index) {
      case 0:
        return "order-2";
      case 1:
        return "order-1";
      case 2:
        return "order-3";
      default:
        return `order-${index + 1}`;
    }
  };

  return (
    <div className="w-full flex justify-center items-end gap-6">
      {winners?.map((player, index) => {
        const orderClass = getOrderClass(index);
        const position = index + 1;
        const isFirst = index === 0;

        return (
          <Rank
            key={player?.username}
            position={position}
            isFirst={isFirst}
            className={orderClass}
            player={player}
          />
        );
      })}
    </div>
  );
};
