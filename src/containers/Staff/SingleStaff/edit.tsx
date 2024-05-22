import { Form, redirect, useRouteLoaderData } from "react-router-dom";
import { updateStaff } from "../../../loaders/updateStaff";
import { staffQueryKeysGenerator } from "../../../loaders/queryKeys";
import { QueryClient } from "@tanstack/react-query";

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params, ...props }) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const { businessId, staffId } = params ?? {};

    const staff = JSON.parse(localStorage.getItem("staff") ?? "");
    staff.bookableInfo.createStrategy = "new";
    await updateStaff({ ...staff, ...updates }, params);
    await queryClient.invalidateQueries({
      queryKey: staffQueryKeysGenerator.allStaff(businessId),
    });
    await queryClient.invalidateQueries({
      queryKey: staffQueryKeysGenerator.fetchStaff(businessId, staffId),
    });
    // return null;
    return redirect(`/${businessId}/staff/${staffId}`);
  };

export default function EditStaff() {
  const res = useRouteLoaderData("staffRoot");
  const data = res ?? {};
  localStorage.setItem("staff", JSON.stringify(data));

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="firstName"
          defaultValue={data?.firstName}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="lastName"
          defaultValue={data?.lastName}
        />
      </p>
      {/* <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact?.notes} rows={6} />
      </label> */}
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
