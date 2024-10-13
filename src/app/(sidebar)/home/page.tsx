import { DataCards } from "./_components/dataCards";
import { MovementCard } from "./_components/movementsCard";

export default function HomePage() {
  return (
    <main className="mb-9 rounded-3xl grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-min">
      <DataCards />
      <MovementCard.Root className="shadow-2xl">
        <MovementCard.Title>Últimas movimentações</MovementCard.Title>
        <MovementCard.Table.Root />
      </MovementCard.Root>
    </main>
  );
}
