import { type FC } from "react";
import { AccordionTrigger, ButtonLink } from "@schwalbs/friggle-components";
import { ChevronDown, ExternalLink } from "lucide-react";

type Props = {
  name: string;
  siteHref: string;
};

/**
 * Sticky accordion header: the company name as the trigger, plus a link to its dye page.
 * The link sits beside the trigger because a link cannot nest inside a button.
 * The chevron points down when open and up when closed. friggle's built-in indicator does the
 * reverse and cannot be flipped through className, so it is hidden (`*:last:hidden`) and replaced.
 */
const CompanyHeader: FC<Props> = ({ name, siteHref }) => (
  <div className="sticky top-0 z-sticky flex items-center gap-2 bg-background px-4">
    <AccordionTrigger className="text-lg font-semibold *:last:hidden">
      {name}
      <ChevronDown
        aria-hidden="true"
        className="size-icon-sm shrink-0 rotate-180 transition-transform duration-fast ease-standard group-data-panel-open:rotate-0"
      />
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
