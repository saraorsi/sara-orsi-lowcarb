"use client";

import { useState } from "react";
import Card from "./card";
import CarbonBadge from "./carbonbadge";

interface DataItem {
  [key: number]: string; // This allows for dynamic access to keys in a DataItem
}

interface TableProps {
  data: DataItem[];
}

export default function Table({ data }: TableProps) {
  // Sort the data based on the date
  const sortedData = data.slice(1).sort((a: DataItem, b: DataItem) => {
    const dateA = new Date(a[0].split("/").reverse().join("-"));
    const dateB = new Date(b[0].split("/").reverse().join("-"));
    return dateB.getTime() - dateA.getTime(); // Descending order
  });

  // Extract unique types, categories, and tags from the data
  const types = new Set<string>();
  const categories = new Set<string>();
  const tags = new Set<string>();

  sortedData.forEach((item) => {
    // Ensure the item has the expected number of elements
    if (item[3]) {
      item[3].split(",").forEach((type) => types.add(type.trim()));
    }
    if (item[4]) {
      item[4].split(",").forEach((category) => categories.add(category.trim()));
    }
    if (item[5]) {
      item[5].split(",").forEach((tag) => tags.add(tag.trim()));
    }
  });

  // Convert Sets to arrays
  const mergedLabels = [...Array.from(types), ...Array.from(categories)];
  const sortedTags = Array.from(tags)
    .filter((tag) => tag)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  // State to hold the selected filters
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Handler to toggle filter selection
  const toggleFilter = (label: string) => {
    setSelectedFilters(
      (prev) =>
        prev.includes(label)
          ? prev.filter((filter) => filter !== label) // Remove if already selected
          : [...prev, label] // Add if not selected
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handler to filter data by selected types, categories, and tags
  const filterDataByCategoriesAndTypes = (item: DataItem) => {
    if (selectedFilters.length === 0) return true; // Show all if no filters are selected

    const itemTypes = (item[3] || "").split(",").map((type) => type.trim());
    const itemCategories = (item[4] || "").split(",").map((cat) => cat.trim());
    const itemTags = (item[5] || "").split(",").map((tag) => tag.trim());

    // Check if the item matches any selected type, category, or tag
    return selectedFilters.some(
      (filter) =>
        itemTypes.includes(filter) ||
        itemCategories.includes(filter) ||
        itemTags.includes(filter)
    );
  };

  return (
    <>
      {/* Filter Buttons */}
      <div className="filter">
        <button
          className={selectedFilters.length === 0 ? "active" : ""}
          onClick={() => setSelectedFilters([])} // Clear all selections
        >
          All
        </button>
        {mergedLabels.map((label, index) => (
          <button
            key={index}
            className={selectedFilters.includes(label) ? "active" : ""}
            onClick={() => toggleFilter(label)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Display tags as buttons */}
      <div className="filter-tags">
        {sortedTags.map((tag, i) => (
          <button
            key={i}
            className={selectedFilters.includes(tag) ? "active" : ""}
            onClick={() => toggleFilter(tag)} // Toggle filter on click
          >
            #{tag}
          </button>
        ))}
      </div>

      <CarbonBadge />

      {/* Render Cards */}
      {sortedData.map((item, i) => {
        const isHidden = !filterDataByCategoriesAndTypes(item);

        return (
          <div key={i} className={isHidden ? "hidden" : ""}>
            <Card
              date={item[0]}
              title={item[1]}
              excerpt={item[2]}
              types={item[3]}
              categories={item[4]}
              tags={item[5]}
              thumb={item[6]}
              link={item[7]}
            />
          </div>
        );
      })}
    </>
  );
}
