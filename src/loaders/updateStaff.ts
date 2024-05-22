import { put } from "../utils/axios";

export const updateStaff = async (updates, params) => {
  const { businessId, staffId } = params ?? {};
  return await put({
    url: `${
      import.meta.env.VITE_PUBLIC_API_URL
    }/api/v5/businesses/${businessId}/staffs/${staffId}/profile`,
    //   config: {
    //     gtmEventName: "UPDATE_STAFF_BUSINESSES",
    //   },
    payload: updates,
  });

  // return await queryClient.
};
