import { get } from "../utils/axios";
import { staffQueryKeysGenerator } from "./queryKeys";

const fetchStaffQuery = ({ businessId, staffId }) => ({
  queryKey: staffQueryKeysGenerator.fetchStaff(businessId, staffId),
  queryFn: get<Record<string, unknown>>({
    url: `https://dev2.yocale.com/api/v5/businesses/${businessId}/staffs/${staffId}`,
    config: {
      //   params,
      //   gtmEventName: "FETCH_STAFF_LIST_BUSINESSES",
      //   ...requestConfig,
    },
  }),
  //   .then(({ data }) => data),
});

export const fetchStaffLoader =
  (queryClient) =>
  async ({ businessId, staffId }) => {
    const query = fetchStaffQuery({ businessId, staffId });

    return (
      queryClient.getQueryData(query.queryKey) ||
      (await queryClient.fetchQuery(query))
    );
  };
