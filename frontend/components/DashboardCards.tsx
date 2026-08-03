"use client";

type Props = {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  trainers: number;
  managers: number;
};

export default function DashboardCards({
  totalMembers,
  activeMembers,
  inactiveMembers,
  trainers,
  managers,
}: Props) {
  const cards = [
    {
      title: "Total Members",
      value: totalMembers,
      color: "bg-blue-500",
      icon: "👥",
    },
    {
      title: "Active Members",
      value: activeMembers,
      color: "bg-green-500",
      icon: "🟢",
    },
    {
      title: "Inactive Members",
      value: inactiveMembers,
      color: "bg-red-500",
      icon: "🔴",
    },
    {
      title: "Trainers",
      value: trainers,
      color: "bg-purple-500",
      icon: "🏋️",
    },
    {
      title: "Managers",
      value: managers,
      color: "bg-orange-500",
      icon: "👔",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`
            ${card.color}
            rounded-xl
            text-white
            p-6
            shadow-lg
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-2xl
          `}
        >
          <div className="text-4xl">
            {card.icon}
          </div>

          <h2 className="mt-4 text-lg font-semibold">
            {card.title}
          </h2>

          <p className="text-4xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}