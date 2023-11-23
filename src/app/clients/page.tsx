'use client'
import React from "react";
import PageTitle from "@/components/ClientsPage/PageTitle";
import ClientsTable from "@/components/ClientsPage/ClientsTable/ClientsTable";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function Clients() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <PageTitle />
      <ClientsTable />
    </QueryClientProvider>
  );
}
