import React from "react";
import { render } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { AuthProvider } from "../context/index";

export function renderWithProviders(
  ui: React.ReactElement,
  options?: { initialRoute?: string },
) {
  void options;

  return render(
    <>
      {/* <QueryClientProvider client={queryClient}> */}
      {/* <AuthProvider> */}
      {/* <MemoryRouter initialEntries={[options?.initialRoute || "/"]}> */}
      {ui}
      {/* </MemoryRouter> */}
      {/* </AuthProvider> */}
      {/* </QueryClientProvider> */}
    </>,
  );
}
