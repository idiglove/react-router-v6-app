import { QueryClient } from "@tanstack/react-query";
import { get } from "../utils/axios";
import { staffQueryKeysGenerator } from "./queryKeys";

const fetchStaffListQuery = ({ businessId }) => ({
  queryKey: staffQueryKeysGenerator.allStaff(businessId),
  queryFn: async () => {
    const data = await get<Record<string, unknown>>({
      url: `${import.meta.env.VITE_PUBLIC_API_URL}/api/v5/businesses/${businessId}/staffs`,
      config: {
        //   params,
        //   gtmEventName: "FETCH_STAFF_LIST_BUSINESSES",
        //   ...requestConfig,
      },
    });

    return data?.data?.data ?? {};
  },
  //   .then(({ data }) => data),
});

export const fetchStaffListLoader =
  (queryClient: QueryClient) =>
  async ({ params }) => {
    const { businessId } = params ?? {};
    if (businessId) {
      const query = fetchStaffListQuery({ businessId });

      return (
        queryClient.getQueryData(query.queryKey) ||
        (await queryClient.fetchQuery({ ...query }))
      );
    }
  };
