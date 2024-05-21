import { Form } from "react-router-dom";

export default function SingleStaff() {
  const staff = {
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  };

  return (
    <div id="staff">
      <div>
        <img key={staff.avatar} src={staff.avatar || null} />
      </div>

      <div>
        <h1>
          {staff.first || staff.last ? (
            <>
              {staff.first} {staff.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite staff={staff} />
        </h1>

        {staff.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${staff.twitter}`}>
              {staff.twitter}
            </a>
          </p>
        )}

        {staff.notes && <p>{staff.notes}</p>}

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

function Favorite({ staff }) {
  // yes, this is a `let` for later
  let favorite = staff.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
