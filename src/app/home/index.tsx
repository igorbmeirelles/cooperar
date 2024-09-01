import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import Link from "next/link";

export function HomePage() {
  return (
    <main className="bg-glass p-6 mb-9 rounded-3xl grid grid-cols-3 gap-4 auto-rows-min">
      <div className="bg-glass rounded-lg p-2 h-fit">card 1</div>
      <div className="bg-glass rounded-lg p-2 h-fit">card 2</div>
      <div className="bg-glass rounded-lg p-2 h-fit">card 3</div>

      <div className="bg-glass col-span-3 p-8 rounded-xl">
        <h2 className="font-medium mb-5">Últimas movimentações</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Instituição</TableHead>
              <TableHead className="text-white">Planejado</TableHead>
              <TableHead className="text-white">Fornecido</TableHead>
              <TableHead className="text-white">De</TableHead>
              <TableHead className="text-white">Até</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Recanto Arlete Rodrigues</TableCell>
              <TableCell>1000</TableCell>
              <TableCell>1000</TableCell>
              <TableCell>20/08/2021</TableCell>
              <TableCell>20/08/2021</TableCell>
              <TableCell>
                <span className="bg-green-600/20 text-green-400 py-1 px-2 text-xs rounded">
                  Concluído
                </span>
              </TableCell>
              <TableCell>
                <Link
                  href="/dashboard"
                  className="inline-flex p-2 rounded-full bg-white hover:brightness-90 transition-all"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Empresa 1</TableCell>
              <TableCell>1000</TableCell>
              <TableCell>1000</TableCell>
              <TableCell>20/08/2021</TableCell>
              <TableCell>20/08/2021</TableCell>
              <TableCell>
                <span className="bg-green-600/20 text-green-400 py-1 px-2 text-xs rounded">
                  Concluído
                </span>
              </TableCell>
              <TableCell>
                <Link
                  href="/dashboard"
                  className="inline-flex p-2 rounded-full bg-white hover:brightness-90 transition-all"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Empresa 1</TableCell>
              <TableCell>1000</TableCell>
              <TableCell>1000</TableCell>
              <TableCell>20/08/2021</TableCell>
              <TableCell>20/08/2021</TableCell>
              <TableCell>
                <span className="bg-green-600/20 text-green-400 py-1 px-2 text-xs rounded">
                  Concluído
                </span>
              </TableCell>
              <TableCell>
                <Link
                  href="/dashboard"
                  className="inline-flex p-2 rounded-full bg-white hover:brightness-90 transition-all"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Empresa 1</TableCell>
              <TableCell>1000</TableCell>
              <TableCell>1000</TableCell>
              <TableCell>20/08/2021</TableCell>
              <TableCell>20/08/2021</TableCell>
              <TableCell>
                <span className="bg-green-600/20 text-green-400 py-1 px-2 text-xs rounded">
                  Concluído
                </span>
              </TableCell>
              <TableCell>
                <Link
                  href="/dashboard"
                  className="inline-flex p-2 rounded-full bg-white hover:brightness-90 transition-all"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
