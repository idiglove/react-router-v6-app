export const staffQueryKeysGenerator = {
  all: (businessId: number) => ["businesses", businessId, "staff"],
  allWithFilters: (businessId: number) => [
    ...staffQueryKeysGenerator.all(businessId),
    "filters",
  ],
  allStaff: (businessId: number) => [
    ...staffQueryKeysGenerator.all(businessId),
    "allStaff",
  ],
  fetchStaff: (businessId: number, staffId: number) => [
    ...staffQueryKeysGenerator.all(businessId),
    staffId,
  ],
  fetchStaffCategories: (businessId: number) => [
    ...staffQueryKeysGenerator.all(businessId),
    "categories",
  ],
  allStaffWithFilters: (businessId: number, filters?: string) => [
    ...staffQueryKeysGenerator.allWithFilters(businessId),
    filters,
  ],
};
