import { Form, useLoaderData } from "react-router-dom";

export default function SingleStaff() {
  // const params = useParams();
  const res = useLoaderData();
  const data = res ?? {};
  return (
    <div id="staff">
      <div>
        <img
          key={data?.avatar?.assetKey}
          src={data?.avatar?.url || null}
          width={100}
          height={100}
        />
      </div>

      <div>
        <h1>
          {data.firstName || data.lastName ? (
            <>
              {data.firstName} {data.lastName}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          {/* <Favorite staff={staff} /> */}
        </h1>

        {/* {staff.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${staff.twitter}`}>
              {staff.twitter}
            </a>
          </p>
        )}

        {staff.notes && <p>{staff.notes}</p>} */}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
