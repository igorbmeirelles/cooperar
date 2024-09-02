import { InfoCard } from "./components/infoCard";
import { MovementCard } from "./components/movementsCard";

export function HomePage() {
  return (
    <main className="bg-glass p-6 mb-9 rounded-3xl grid grid-cols-3 gap-4 auto-rows-min">
      <InfoCard.Root></InfoCard.Root>
      <InfoCard.Root></InfoCard.Root>
      <InfoCard.Root></InfoCard.Root>

      <MovementCard.Root >
        <MovementCard.Title>Últimas movimentações</MovementCard.Title>
        <MovementCard.Table.Root />
      </MovementCard.Root>
    </main>
  );
}
