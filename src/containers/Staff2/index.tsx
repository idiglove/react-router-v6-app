import { useQuery } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { fetchStaffListQuery } from "../../loaders/fetchStaffList";
import { Suspense } from "react";

export default function Root() {
  const params = useParams();
  const res = useLoaderData();
  const data = res ?? {};
  const { businessId } = params ?? {};
  const rootRes = useRouteLoaderData("root");

  // const { data } = useQuery({
  //   ...fetchStaffListQuery({ ...params }),
  //   initialData: res,
  //   staleTime: 1000 * 60 * 2, //add this if you want to cache the data
  // });
  const { items } = data ?? {};
  console.log({ items, rootRes });
  return (
    <>
      <Suspense fallback={<div>loading main...</div>}>
        <div id="sidebar">
          <Link to={`/${businessId}/`}>Back to Business</Link>
          <Link to={`/${businessId}/staff`}>Back to Staff1</Link>
          <Link to={`/${businessId}/staff2`}>Back to Staff2</Link>
          <h1>Staff</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search staff"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
              <div className="sr-only" aria-live="polite"></div>
            </form>
            <form method="post">
              <button type="submit">New</button>
            </form>
          </div>
          <h2>Staff List</h2>
          <nav>
            <ul>
              {items?.map((item) => (
                <li key={item.id}>
                  <Link to={`/${businessId}/staff/${item.id}`}>
                    {item.firstName} {item.lastName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div id="detail">
          <Suspense fallback={<div>loading staff...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </Suspense>
    </>
  );
}
