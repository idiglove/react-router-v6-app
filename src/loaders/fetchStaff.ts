import { QueryClient } from "@tanstack/react-query";
import { get } from "../utils/axios";
import { staffQueryKeysGenerator } from "./queryKeys";

export const fetchStaffQuery = ({ businessId, staffId }) => ({
  queryKey: staffQueryKeysGenerator.fetchStaff(businessId, staffId),
  queryFn: async () => {
    const data = await get<Record<string, unknown>>({
      url: `${
        import.meta.env.VITE_PUBLIC_API_URL
      }/api/v5/businesses/${businessId}/staffs/${staffId}`,
      config: {
        //   params,
        //   gtmEventName: "FETCH_STAFF_LIST_BUSINESSES",
        //   ...requestConfig,
      },
    });

    return data?.data?.data ?? {};
  },
});

export const fetchStaffLoader =
  (queryClient: QueryClient) =>
  async ({ params }) => {
    const { businessId, staffId } = params ?? {};
    const query = fetchStaffQuery({ businessId, staffId });

    return (
      // queryClient.getQueryData(query.queryKey) ||
      await queryClient.fetchQuery({
        ...query,
        // staleTime: 20000 * 60 * 2
      })
    );
  };
