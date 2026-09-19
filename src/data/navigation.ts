export type NavItem = {
  /** Text shown in the sidebar. */
  label: string;
  /** Omit for a heading that only groups its children. */
  href?: string;
  children?: NavItem[];
};

/**
 * The whole site map, in the order it appears in the sidebar.
 *
 * This is the single source of truth for navigation, breadcrumbs and the
 * previous/next links at the foot of each page. To add a page: create the
 * Markdown file under `src/content/pages/`, then add an entry here.
 *
 * An `href` may point at an internal path (`/contact`), a file in `public/`
 * (`/media/form.pdf`) or an external site (`https://...`).
 */
export const navigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Calendar",
    href: "/calendar",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Location",
    href: "/location",
  },
  {
    label: "Board Members",
    href: "/board",
  },
  {
    label: "Architectural Guidelines",
    href: "/guidelines",
    children: [
      {
        label: "Guidelines, Rules and Regulations",
        children: [
          {
            label: "1.0 Objective and mission",
            href: "/guidelines/1-0-objective-and-mission",
          },
          {
            label: "2.0 Introduction",
            href: "/guidelines/2-0-introduction",
            children: [
              {
                label: "2.1 Declaration of Covenants, Conditions and Restrictions",
                href: "/guidelines/2-1-declaration-of-covenants-conditions-and-restrictions",
              },
              {
                label: "2.2 ARB Review Criteria",
                href: "/guidelines/2-2-arb-review-criteria",
              },
              {
                label: "2.3 Amendments to the ARB Guidelines",
                href: "/guidelines/2-3-amendments-to-the-arb-guidelines",
              },
              {
                label: "2.4 The ARB and the Board of Directors",
                href: "/guidelines/2-4-the-arb-and-the-board-of-directors",
              },
              {
                label: "2.5 Review Procedures",
                href: "/guidelines/2-5-review-procedures",
              },
              {
                label: "2.6 Appeal of an ARB Decision",
                href: "/guidelines/2-6-appeal-of-an-arb-decision",
              },
              {
                label: "2.7 Enforcement Procedure",
                href: "/guidelines/2-7-enforcement-procedure",
              },
              {
                label: "2.8 Disclosure Statement",
                href: "/guidelines/2-8-disclosure-statement",
              },
              {
                label: "2.9 Changes Requiring ARB Approval",
                href: "/guidelines/2-9-changes-requiring-arb-approval",
              },
              {
                label: "2.10 Elements of an ARB Application",
                href: "/guidelines/2-10-elements-of-an-arb-application",
              },
            ],
          },
          {
            label: "3.0 Guidelines",
            href: "/guidelines/3-0-guidelines",
            children: [
              {
                label: "3.1 Fences",
                href: "/guidelines/3-1-fences",
              },
              {
                label: "3.2 Storage Sheds",
                href: "/guidelines/3-2-storage-sheds",
              },
              {
                label: "3.3 Greenhouses and Solar Collectors",
                href: "/guidelines/3-3-greenhouses-and-solar-collectors",
              },
              {
                label: "3.4 Patios and Decks",
                href: "/guidelines/3-4-patios-and-decks",
              },
              {
                label: "3.5 Elevated Deck Privacy Screens",
                href: "/guidelines/3-5-elevated-deck-privacy-screens",
              },
              {
                label: "3.6 Storm and Screen Doors",
                href: "/guidelines/3-6-storm-and-screen-doors",
              },
              {
                label: "3.7 Sun Control Devices",
                href: "/guidelines/3-7-sun-control-devices",
              },
              {
                label: "3.8 Recreation and Play Equipment",
                href: "/guidelines/3-8-recreation-and-play-equipment",
              },
              {
                label: "3.9 Swimming Pools",
                href: "/guidelines/3-9-swimming-pools",
              },
              {
                label: "3.10 Hot Tubs/Jacuzzis",
                href: "/guidelines/3-10-hot-tubs-jacuzzis",
              },
            ],
          },
          {
            label: "4.0 Miscellaneous",
            href: "/guidelines/4-0-miscellaneous",
            children: [
              {
                label: "4.1 Antennas and Satellite Dishes",
                href: "/guidelines/4-1-antennas-and-satellite-dishes",
              },
              {
                label: "4.2 Animals and Common Grounds",
                href: "/guidelines/4-2-animals-and-common-grounds",
              },
              {
                label: "4.3 Dog Houses and Animal Runs/Enclosures",
                href: "/guidelines/4-3-dog-houses-and-animal-runs-enclosures",
              },
              {
                label: "4.4 Exterior Decorative Objects",
                href: "/guidelines/4-4-exterior-decorative-objects",
              },
              {
                label: "4.5 Exterior Lighting",
                href: "/guidelines/4-5-exterior-lighting",
              },
              {
                label: "4.6 Exterior Painting",
                href: "/guidelines/4-6-exterior-painting",
              },
              {
                label: "4.7 Flagpoles",
                href: "/guidelines/4-7-flagpoles",
              },
              {
                label: "4.8 Permanent Grills (Barbecues)",
                href: "/guidelines/4-8-permanent-grills-barbecues",
              },
              {
                label: "4.9 Compost Piles",
                href: "/guidelines/4-9-compost-piles",
              },
              {
                label: "4.10 Exterior Unit Air Conditioners",
                href: "/guidelines/4-10-exterior-unit-air-conditioners",
              },
              {
                label: "4.11 Clothes Lines",
                href: "/guidelines/4-11-clothes-lines",
              },
              {
                label: "4.12 Gutters and Down Spouts",
                href: "/guidelines/4-12-gutters-and-down-spouts",
              },
              {
                label: "4.13 Attic Ventilators",
                href: "/guidelines/4-13-attic-ventilators",
              },
              {
                label: "4.14 Trash/Recycling Containers",
                href: "/guidelines/4-14-trash-recycling-containers",
              },
              {
                label: "4.15 Firewood",
                href: "/guidelines/4-15-firewood",
              },
              {
                label: "4.16 Vehicle Storage",
                href: "/guidelines/4-16-vehicle-storage",
              },
              {
                label: "4.17 Real Estate Sales/Rental Signs",
                href: "/guidelines/4-17-real-estate-sales-rental-signs",
              },
              {
                label: "4.18 Landscaping and Vegetable Gardens",
                href: "/guidelines/4-18-landscaping-and-vegetable-gardens",
              },
              {
                label: "4.19 Maintenance Guidelines",
                href: "/guidelines/4-19-maintenance-guidelines",
              },
              {
                label: "4.20 Storage",
                href: "/guidelines/4-20-storage",
              },
              {
                label: "4.21 Driveways",
                href: "/guidelines/4-21-driveways",
              },
            ],
          },
        ],
      },
      {
        label: "Architectural Change Request",
        href: "/guidelines/architectural-change-request",
      },
      {
        label: "Paint Formulas",
        href: "/guidelines/paint-formulas",
      },
      {
        label: "House Paint Matrix",
        href: "/media/matrix.pdf",
      },
    ],
  },
  {
    label: "Complaints",
    href: "/complaints",
    children: [
      {
        label: "Association Complaint Procedures",
        href: "/complaints/association-complaint-procedures",
      },
    ],
  },
  {
    label: "Downloads",
    href: "/downloads",
    children: [
      {
        label: "Architectural Change Form",
        href: "/media/form.pdf",
      },
      {
        label: "Complaint Process and Forms",
        href: "/media/complaints.pdf",
      },
      {
        label: "House Paint Matrix",
        href: "/media/matrix.pdf",
      },
      {
        label: "Newsletters",
        children: [
          {
            label: "March 2017",
            href: "/media/2017-03%20news.pdf",
          },
          {
            label: "June 2015",
            href: "/media/2015-06%20news.pdf",
          },
          {
            label: "March 2015",
            href: "/media/2015-03%20news.pdf",
          },
          {
            label: "December 2014",
            href: "/media/2014-12%20news.pdf",
          },
          {
            label: "June 2014",
            href: "/media/2014-03%20news.pdf",
          },
          {
            label: "March 2014",
            href: "/media/2014-03%20news.pdf",
          },
          {
            label: "December 2013",
            href: "/media/2013-12%20news.pdf",
          },
          {
            label: "June 2013",
            href: "/media/2013-06%20news.pdf",
          },
          {
            label: "March 2013",
            href: "/media/2013-03%20news.pdf",
          },
        ],
      },
    ],
  },
];

/** Neighbourhood and county links, shown at the end of the sidebar. */
export const communityLinks: NavItem[] = [
  {
    label: "Lorton Road Improvements",
    href: "http://www.lortonroadconstruction.com/",
  },
  {
    label: "Fairfax Country Best Pick Reports",
    href: "http://www.bestpickreports.com/northern-virginia/fairfax-county",
  },
  {
    label: "Fairfax County Department of Transportation",
    href: "http://www.fairfaxcounty.gov/fcdot/",
  },
  {
    label: "Fairfax County Household Hazardous Waste Program",
    href: "http://www.fairfaxcounty.gov/recycling",
  },
  {
    label: "Propane Taxi",
    href: "https://www.propanetaxi.com/",
  },
  {
    label: "Trash Away",
    href: "http://trashaway.com",
  },
];
