"use client";

import { useParams } from "next/navigation";
import { ControlPage } from "..";
import { useSupplies } from "../_context";

export default function EditControl() {
  const { someSupplies } = useSupplies();
  const { id } = useParams();
  const supply = someSupplies.find((supply) => supply.id === id);

  return <ControlPage supply={supply} />;
}
