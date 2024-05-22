import { QueryClient } from "@tanstack/react-query";
import { get } from "../utils/axios";

const queryKey = ["user"];
export const fetchUserQuery = () => ({
  queryKey: queryKey,
  queryFn: async () => {
    const data = await get<Record<string, unknown>>({
      url: `${
        import.meta.env.VITE_PUBLIC_API_URL
      }/api/v5/users/281443/staff/businesses?limit=1000`,
      config: {},
    });

    return data?.data?.data ?? {};
  },
});

export const fetchUserLoader =
  (queryClient: QueryClient) =>
  async ({ params }) => {
    const { businessId } = params ?? {};
    if (businessId) {
      // const userQuery = fetchUserQuery();

      // const user = await queryClient.fetchQuery({
      //   ...userQuery,
      // });

      const cache = queryClient.getQueryData(queryKey);

      // console.log({
      //   cache,
      // });

      return (
        cache ||
        (await queryClient.fetchQuery({
          ...fetchUserQuery(),
          staleTime: 20000 * 60 * 2,
        }))
      );
    }
  };
