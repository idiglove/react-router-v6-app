import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import { fetchStaffListQuery } from "../../loaders/fetchStaffList";
import { Suspense } from "react";

export default function Root() {
  const params = useParams();
  const res = useLoaderData();
  const data = res ?? {};
  const { businessId } = params ?? {};
  //  < style={{ display: "flex", flexDirection: "column" }}>
  return (
    <>
      <Link to={`/${businessId}/staff`}>Back to Staff1</Link>
      <Link to={`/${businessId}/staff2`}>Back to Staff2</Link>
      <Outlet />
      {/* <Suspense fallback={<div>loading main...</div>}>
        <div id="sidebar">
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
              {items.map((item) => (
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
      </Suspense> */}
    </>
  );
}
