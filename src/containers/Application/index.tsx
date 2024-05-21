import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";

export default function Root() {
  const params = useParams();
  const res = useLoaderData();
  const data = res ?? {};
  const { items } = data ?? {};
  const { businessId } = params ?? {};

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
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
        <Outlet />
      </div>
    </>
  );
}
