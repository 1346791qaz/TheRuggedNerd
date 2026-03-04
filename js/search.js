// The Rugged Nerd — Search Results Logic

(function () {
  "use strict";

  if (!document.body.classList.contains("search-page")) {
    return;
  }

  const SEARCH_ITEMS = [
    {
      id: "blog-camper-deal-tips",
      type: "blog",
      title: "The Best Tips to Get a Great Deal on a Camper",
      content:
        "BLUF guide to RV buying: shop in late fall or winter, compare towable classes, evaluate craftsmanship, check size limits, and negotiate with screenshot-backed pricing.",
      url: "blog/camper-deal-tips.html",
      date: "2026-03-04",
      tags: [
        "camper",
        "rv",
        "travel trailer",
        "buying",
        "negotiation",
        "pricing",
        "rv tips",
      ],
    },
    {
      id: "blog-osceola-rv-park",
      type: "blog",
      title: "Osceola RV Park",
      content:
        "Refreshed archive post about Osceola, Missouri, the iconic Osceola Cheese billboard, and an easy campground stop for family road trips.",
      url: "blog/osceola-rv-park.html",
      date: "2026-02-18",
      tags: [
        "osceola",
        "missouri",
        "campground",
        "rv park",
        "review",
        "road trip",
      ],
    },
    {
      id: "blog-north-arkansas-weekend",
      type: "blog",
      title: "North Arkansas — A Weekend With A View",
      content:
        "Refreshed archive weekend trip story focused on quick family travel, crossing into a new state, and scenic North Arkansas views.",
      url: "blog/north-arkansas-a-weekend-with-a-view.html",
      date: "2026-01-27",
      tags: [
        "north arkansas",
        "weekend trip",
        "family",
        "travel trailer",
        "states",
        "views",
      ],
    },
    {
      id: "blog-falling-water-falls",
      type: "blog",
      title: "Falling Water Falls",
      content:
        "Refreshed archive post covering Falling Water Falls in Sand Gap, Arkansas, with nearby Pedestal Rock and King's Bluff trail references.",
      url: "blog/falling-water-falls.html",
      date: "2025-12-15",
      tags: [
        "falling water falls",
        "sand gap",
        "arkansas",
        "pedestal rock",
        "kings bluff",
        "waterfall",
      ],
    },

    {
      id: "resource-family-packing",
      type: "resources",
      title: "Family RV Packing Checklist",
      content:
        "Printable packing checklist for family RV trips including clothing, kitchen gear, safety items, and camp essentials.",
      url: "assets/downloads/packing-checklist-family.pdf",
      date: "2025-01-10",
      tags: ["packing", "checklist", "family", "rv", "download"],
    },
    {
      id: "resource-kids-packing",
      type: "resources",
      title: "Kids' Gear Packing List",
      content:
        "Kid-focused travel packing list with clothes, sleep gear, activities, and campsite essentials.",
      url: "assets/downloads/packing-checklist-kids.pdf",
      date: "2024-09-01",
      tags: ["packing", "kids", "family", "travel"],
    },
    {
      id: "resource-dog-packing",
      type: "resources",
      title: "Dog Travel Packing Checklist",
      content:
        "Dog-friendly travel checklist with food, leashes, health records, cleaning supplies, and comfort gear.",
      url: "assets/downloads/packing-checklist-dogs.pdf",
      date: "2024-08-01",
      tags: ["dogs", "packing", "pet", "travel"],
    },
    {
      id: "resource-kitchen",
      type: "resources",
      title: "RV Kitchen & Groceries Checklist",
      content:
        "Kitchen and groceries planning template for camp meals, cookware, pantry basics, and prep workflow.",
      url: "assets/downloads/packing-checklist-kitchen.pdf",
      date: "2024-10-01",
      tags: ["kitchen", "groceries", "camp cooking", "checklist"],
    },
    {
      id: "resource-predeparture-full",
      type: "resources",
      title: "Full Pre-Departure Checklist",
      content:
        "Complete interior and exterior departure routine for safer towing and fewer road-day surprises.",
      url: "assets/downloads/pre-departure-full.pdf",
      date: "2024-12-01",
      tags: ["pre-departure", "towing", "safety", "checklist"],
    },
    {
      id: "resource-predeparture-quick",
      type: "resources",
      title: "Quick-Launch Checklist (1-Page)",
      content:
        "One-page quick departure checklist built for fast setup and repeatable road-day routine.",
      url: "assets/downloads/pre-departure-quick.pdf",
      date: "2024-12-02",
      tags: ["quick checklist", "pre-departure", "road day"],
    },
    {
      id: "resource-towing",
      type: "resources",
      title: "Tow Vehicle & Hitch Checklist",
      content:
        "Tow setup checklist covering hitch points, electrical checks, brake controller, and load confidence.",
      url: "assets/downloads/pre-departure-towing.pdf",
      date: "2024-11-01",
      tags: ["tow vehicle", "hitch", "towing", "safety"],
    },
    {
      id: "resource-trailer-maintenance",
      type: "resources",
      title: "Travel Trailer Maintenance Log",
      content:
        "Maintenance tracker for annual tasks and per-trip checks across systems and components.",
      url: "assets/downloads/maintenance-log-trailer.pdf",
      date: "2024-07-01",
      tags: ["maintenance", "trailer", "log", "rv"],
    },
    {
      id: "resource-truck-maintenance",
      type: "resources",
      title: "Tow Vehicle Maintenance Log",
      content:
        "Vehicle service tracker for oil, tires, brakes, towing wear, and long-haul reliability.",
      url: "assets/downloads/maintenance-log-truck.pdf",
      date: "2024-06-15",
      tags: ["maintenance", "truck", "tow vehicle", "log"],
    },
    {
      id: "resource-seasonal-maintenance",
      type: "resources",
      title: "Seasonal Maintenance Schedule",
      content:
        "Seasonal RV maintenance timeline from spring de-winterize through fall storage prep.",
      url: "assets/downloads/maintenance-seasonal.pdf",
      date: "2024-05-15",
      tags: ["seasonal", "maintenance", "winterize", "schedule"],
    },
    {
      id: "resource-trip-log",
      type: "resources",
      title: "Per-Trip Travel Log",
      content:
        "Trip-by-trip log for route details, campsites, mileage, and notes from each adventure.",
      url: "assets/downloads/travel-log-trip.pdf",
      date: "2024-04-12",
      tags: ["travel log", "trip log", "mileage", "route"],
    },
    {
      id: "resource-annual-log",
      type: "resources",
      title: "Annual Adventure Log",
      content:
        "Year-long travel tracker to summarize destinations, nights, mileage, and top memories.",
      url: "assets/downloads/travel-log-annual.pdf",
      date: "2024-04-01",
      tags: ["annual", "adventure log", "travel tracker"],
    },
    {
      id: "resource-campground-template",
      type: "resources",
      title: "Campground Review Template",
      content:
        "Structured campground review template for site quality, hookups, amenities, and family-friendliness.",
      url: "assets/downloads/travel-log-campground-review.pdf",
      date: "2024-03-15",
      tags: ["campground", "review", "template", "ratings"],
    },
    {
      id: "resource-expense-tracker",
      type: "resources",
      title: "Trip Expense Tracker",
      content:
        "Travel budget tracker for fuel, campsites, food, gear, and trip-by-trip spending patterns.",
      url: "assets/downloads/travel-log-expense.pdf",
      date: "2024-03-01",
      tags: ["budget", "expense", "trip planning", "finance"],
    },

    {
      id: "photo-rocky-sunrise",
      type: "photos",
      title: "Rocky Mountain Sunrise",
      content:
        "Landscape photo metadata: Rocky Mountain National Park, sunrise views, winter light, mountain horizon.",
      url: "photos.html",
      date: "2025-02-14",
      tags: ["rocky mountain", "sunrise", "landscape", "national park"],
    },
    {
      id: "photo-zion-dusk",
      type: "photos",
      title: "Zion Canyon at Dusk",
      content:
        "Landscape photo metadata: Zion National Park canyon scene captured at dusk.",
      url: "photos.html",
      date: "2024-12-05",
      tags: ["zion", "canyon", "dusk", "desert"],
    },
    {
      id: "photo-smoky-mist",
      type: "photos",
      title: "Smoky Mountain Mist",
      content:
        "Landscape photo metadata: Great Smoky Mountains morning haze and layered ridgelines.",
      url: "photos.html",
      date: "2024-10-08",
      tags: ["smoky mountains", "mist", "landscape", "hiking"],
    },
    {
      id: "photo-pch-lookout",
      type: "photos",
      title: "Pacific Coast Lookout",
      content:
        "Landscape photo metadata: Pacific Coast Highway ocean overlook and coastal highway views.",
      url: "photos.html",
      date: "2024-07-04",
      tags: ["pch", "pacific coast", "ocean", "lookout"],
    },
    {
      id: "photo-desert-stars",
      type: "photos",
      title: "High Desert Stars",
      content:
        "Landscape photo metadata: high desert night sky and backcountry stargazing.",
      url: "photos.html",
      date: "2024-08-20",
      tags: ["desert", "stars", "night sky", "backcountry"],
    },
    {
      id: "photo-coffee-ritual",
      type: "photos",
      title: "Morning Coffee Ritual",
      content:
        "Camp life photo metadata: campsite morning coffee setup and daily routine.",
      url: "photos.html",
      date: "2024-09-01",
      tags: ["camp life", "coffee", "morning", "campsite"],
    },
    {
      id: "photo-campfire-council",
      type: "photos",
      title: "Campfire Council",
      content:
        "Camp life photo metadata: evening campfire gathering at Watchman Campground.",
      url: "photos.html",
      date: "2024-12-04",
      tags: ["campfire", "watchman", "zion", "family"],
    },
    {
      id: "photo-dorey-golden-hour",
      type: "photos",
      title: "Dorey Setup at Golden Hour",
      content:
        "Camp life photo metadata: travel trailer setup at golden hour in Colorado.",
      url: "photos.html",
      date: "2025-02-13",
      tags: ["dorey", "golden hour", "camp setup", "colorado"],
    },
    {
      id: "photo-solar-online",
      type: "photos",
      title: "Solar Array Online",
      content:
        "Camp life photo metadata: off-grid boondocking solar system in active use.",
      url: "photos.html",
      date: "2024-06-22",
      tags: ["solar", "off-grid", "boondocking", "power"],
    },
    {
      id: "photo-whole-crew",
      type: "photos",
      title: "The Whole Crew",
      content:
        "Family photo metadata: complete family portrait captured on the road.",
      url: "photos.html",
      date: "2024-09-15",
      tags: ["family", "crew", "travel", "camp"],
    },
    {
      id: "photo-summit-day",
      type: "photos",
      title: "Summit Day",
      content:
        "Family photo metadata: hiking summit moment in Rocky Mountain National Park.",
      url: "photos.html",
      date: "2025-02-15",
      tags: ["summit", "hiking", "rocky mountain", "family"],
    },
    {
      id: "photo-dogs-patrol",
      type: "photos",
      title: "The Dogs on Patrol",
      content:
        "Family photo metadata: campsite watch team Boop and Waffles on patrol.",
      url: "photos.html",
      date: "2024-09-05",
      tags: ["dogs", "boop", "waffles", "camp"],
    },
    {
      id: "photo-blue-dorey-ready",
      type: "photos",
      title: "Blue & Dorey Ready to Roll",
      content:
        "Rig photo metadata: tow vehicle and trailer fully hitched before departure.",
      url: "photos.html",
      date: "2024-11-14",
      tags: ["blue", "dorey", "truck", "hitch", "rig"],
    },
    {
      id: "photo-nerd-station",
      type: "photos",
      title: "The Nerd Station",
      content:
        "Rig photo metadata: interior workspace setup inside the trailer.",
      url: "photos.html",
      date: "2024-11-15",
      tags: ["workspace", "interior", "dorey", "tech"],
    },
    {
      id: "photo-blue-pass",
      type: "photos",
      title: "Blue on the Pass",
      content:
        "Rig photo metadata: tow vehicle crossing a mountain pass in Colorado.",
      url: "photos.html",
      date: "2025-02-16",
      tags: ["blue", "mountain pass", "colorado", "truck"],
    },
  ];

  const VALID_TYPES = ["blog", "resources", "photos"];
  const TYPE_LABELS = {
    blog: "Blog",
    resources: "Resource",
    photos: "Photo",
  };

  const form = document.getElementById("search-form");
  const queryInput = document.getElementById("search-query");
  const sortSelect = document.getElementById("search-sort");
  const resultsContainer = document.getElementById("search-results");
  const summaryElement = document.getElementById("search-summary");
  const emptyElement = document.getElementById("search-empty");
  const typeCheckboxes = Array.from(
    document.querySelectorAll("input[name='type-filter']"),
  );

  if (
    !form ||
    !queryInput ||
    !sortSelect ||
    !resultsContainer ||
    !summaryElement ||
    !emptyElement ||
    !typeCheckboxes.length
  ) {
    return;
  }

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const normalizeText = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  const tokenize = (query) => normalizeText(query).split(" ").filter(Boolean);

  const countOccurrences = (text, term) => {
    if (!term) return 0;
    const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const matches = text.match(new RegExp(safeTerm, "g"));
    return matches ? matches.length : 0;
  };

  const getTimestamp = (dateValue) => {
    const timestamp = Date.parse(dateValue || "");
    return Number.isNaN(timestamp) ? null : timestamp;
  };

  const formatDate = (dateValue) => {
    const timestamp = getTimestamp(dateValue);
    if (timestamp === null) return "Date unknown";

    return new Date(timestamp).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const computeRelevance = (item, tokens) => {
    if (!tokens.length) return 0;

    const title = normalizeText(item.title);
    const content = normalizeText(item.content);
    const tags = normalizeText((item.tags || []).join(" "));

    let score = 0;

    tokens.forEach((token) => {
      if (title.includes(token)) {
        score += 20 + countOccurrences(title, token) * 6;
      }
      if (content.includes(token)) {
        score += 8 + countOccurrences(content, token) * 3;
      }
      if (tags.includes(token)) {
        score += 10 + countOccurrences(tags, token) * 4;
      }
      if (item.type.includes(token)) {
        score += 3;
      }
    });

    return score;
  };

  const getSelectedTypes = () =>
    new Set(
      typeCheckboxes
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value)
        .filter((type) => VALID_TYPES.includes(type)),
    );

  const getTypeSetFromParams = (searchParams) => {
    const rawTypes = searchParams.get("types");
    if (!rawTypes) return new Set(VALID_TYPES);

    const parsed = rawTypes
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter((value) => VALID_TYPES.includes(value));

    return parsed.length ? new Set(parsed) : new Set(VALID_TYPES);
  };

  const sortResults = (items, sortMode) => {
    const sorted = [...items];

    if (sortMode === "newest") {
      sorted.sort((a, b) => {
        const aDate = a.timestamp ?? -Infinity;
        const bDate = b.timestamp ?? -Infinity;
        if (bDate !== aDate) return bDate - aDate;
        return b.relevance - a.relevance;
      });
      return sorted;
    }

    if (sortMode === "oldest") {
      sorted.sort((a, b) => {
        const aDate = a.timestamp ?? Infinity;
        const bDate = b.timestamp ?? Infinity;
        if (aDate !== bDate) return aDate - bDate;
        return b.relevance - a.relevance;
      });
      return sorted;
    }

    sorted.sort((a, b) => {
      if (b.relevance !== a.relevance) return b.relevance - a.relevance;
      const aDate = a.timestamp ?? -Infinity;
      const bDate = b.timestamp ?? -Infinity;
      return bDate - aDate;
    });

    return sorted;
  };

  const renderResults = (items, query, sortMode) => {
    resultsContainer.innerHTML = "";

    const normalizedQuery = query.trim();

    if (!items.length) {
      emptyElement.classList.add("show");
      summaryElement.textContent = normalizedQuery
        ? `No results found for “${normalizedQuery}”.`
        : "No content available for the selected filters.";
      return;
    }

    emptyElement.classList.remove("show");

    const resultLabel = items.length === 1 ? "result" : "results";
    if (normalizedQuery) {
      summaryElement.textContent = `Showing ${items.length} ${resultLabel} for “${normalizedQuery}”.`;
    } else {
      summaryElement.textContent = `Showing ${items.length} ${resultLabel}. Enter search terms to improve relevance.`;
    }

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "search-result-card";

      const excerptText =
        item.content.length > 220
          ? `${item.content.slice(0, 217)}...`
          : item.content;

      const relevanceHtml =
        sortMode === "relevance" && normalizedQuery
          ? `<span class="search-result-score">Relevance ${Math.round(item.relevance)}</span>`
          : "";

      card.innerHTML = `
        <div class="search-result-meta">
          <span class="search-result-type">${escapeHtml(TYPE_LABELS[item.type])}</span>
          <span>${escapeHtml(formatDate(item.date))}</span>
          ${relevanceHtml}
        </div>
        <h2 class="search-result-title"><a href="${escapeHtml(item.url)}">${escapeHtml(item.title)}</a></h2>
        <p class="search-result-excerpt">${escapeHtml(excerptText)}</p>
      `;

      resultsContainer.appendChild(card);
    });
  };

  const syncUrl = (query, types, sortMode) => {
    const params = new URLSearchParams();

    if (query.trim()) params.set("q", query.trim());
    if (sortMode !== "relevance") params.set("sort", sortMode);

    const selectedTypeList = [...types];
    if (
      selectedTypeList.length &&
      selectedTypeList.length < VALID_TYPES.length
    ) {
      params.set("types", selectedTypeList.join(","));
    }

    const nextUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    window.history.replaceState({}, "", nextUrl);
  };

  const runSearch = () => {
    const query = queryInput.value;
    const sortMode = sortSelect.value;
    const selectedTypes = getSelectedTypes();
    const tokens = tokenize(query);

    const filteredItems = SEARCH_ITEMS.map((item) => {
      const relevance = computeRelevance(item, tokens);
      return {
        ...item,
        relevance,
        timestamp: getTimestamp(item.date),
      };
    }).filter((item) => {
      if (!selectedTypes.has(item.type)) return false;
      if (!tokens.length) return true;
      return item.relevance > 0;
    });

    const sortedItems = sortResults(filteredItems, sortMode);
    renderResults(sortedItems, query, sortMode);
    syncUrl(query, selectedTypes, sortMode);
  };

  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get("q") || "";
  const initialSort = params.get("sort");
  const initialTypes = getTypeSetFromParams(params);

  queryInput.value = initialQuery;
  sortSelect.value = ["relevance", "newest", "oldest"].includes(initialSort)
    ? initialSort
    : "relevance";

  typeCheckboxes.forEach((checkbox) => {
    checkbox.checked = initialTypes.has(checkbox.value);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    runSearch();
  });

  queryInput.addEventListener("input", runSearch);
  sortSelect.addEventListener("change", runSearch);
  typeCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", runSearch);
  });

  runSearch();
})();
