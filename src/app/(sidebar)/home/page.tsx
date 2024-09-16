import { DataCards } from "./_components/dataCards";
import { MovementCard } from "./_components/movementsCard";

export default function HomePage() {
  return (
    <main className="bg-glass p-6 mb-9 rounded-3xl grid grid-cols-3 gap-4 auto-rows-min">
      <DataCards />
      <MovementCard.Root>
        <MovementCard.Title>Últimas movimentações</MovementCard.Title>
        <MovementCard.Table.Root />
      </MovementCard.Root>
    </main>
  );
}
