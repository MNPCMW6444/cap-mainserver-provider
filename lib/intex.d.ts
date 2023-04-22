declare module "@caphub-funding/mainserver-provider";

import * as React from "react";

export interface ProvideMainServerProps {
  children: React.ReactNode;
  tryInterval?: number;
}

export const MainServerContext: React.Context<ProvideMainServerProps>;

export default function ProvideMainServer(
  props: ProvideMainServerProps
): JSX.Element;
