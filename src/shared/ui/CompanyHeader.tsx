import { type FC } from "react";
import { AccordionTrigger, ButtonLink } from "@schwalbs/friggle-components";
import { ExternalLink } from "lucide-react";

type Props = {
  name: string;
  siteHref: string;
};

/**
 * Sticky accordion header: the company name as the trigger, plus a link to its dye page.
 * The link sits beside the trigger because a link cannot nest inside a button.
 */
const CompanyHeader: FC<Props> = ({ name, siteHref }) => (
  <div className="sticky top-0 z-sticky flex items-center gap-2 bg-background px-4">
    <AccordionTrigger className="text-lg font-semibold">
      {name}
    </AccordionTrigger>
    <ButtonLink
      href={siteHref}
      isExternal
      icon={ExternalLink}
      variant="text"
      size="sm"
      aria-label={`Open ${name} dye page in a new tab`}
      title={`Open ${name} dye page in a new tab`}
    />
  </div>
);

export default CompanyHeader;
