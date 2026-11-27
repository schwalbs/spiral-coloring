import { type FC, type ReactNode } from "react";
import { Stack, Text } from "@schwalbs/friggle-components";

type AppLayoutProps = {
  foldedShirt: ReactNode;
  resultShirt: ReactNode;
  options: ReactNode;
  controls: ReactNode;
  companies: ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({
  foldedShirt,
  resultShirt,
  options,
  controls,
  companies,
}) => (
  <section className="app-layout">
    <div
      data-area="shirt-output"
      className="relative flex gap-4 p-4 md:flex-col"
    >
      <Stack gap={2} align="center" className="grow">
        <Text as="span">Folded shirt</Text>
        {foldedShirt}
      </Stack>
      <Stack gap={2} align="center" className="grow">
        <Text as="span">Result</Text>
        {resultShirt}
      </Stack>
      <div className="absolute hidden md:block">{options}</div>
    </div>
    <div data-area="controls" className="p-4">
      {controls}
    </div>
    <div data-area="colors">{companies}</div>
  </section>
);

export default AppLayout;
