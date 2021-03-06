import useSWR from "swr";
import Table from "react-bootstrap/Table";
import Link from "next/link";

function createTable(data, membersJSON) {
  if (typeof data === "object" && typeof membersJSON === "object") {
    const items = [];

    for (let i = 0; i < data.length; i++) {
      items.push(
        <tr>
          <td> {data[i].name} </td>
          <td> {data[i].members.map((id) => membersJSON[id]).join(", ")} </td>
          <td> {data[i].code} </td>
          <td>
            {" "}
            <Link
              href="/my-group/[data[i].code]"
              as={`/my-group/${data[i].code}`}
            >
              <a>
                https://cs48-s20-s2-t2-prod.herokuapp.com/my-group/
                {data[i].code}
              </a>
            </Link>{" "}
          </td>
        </tr>
      );
    }

    return (
      <Table striped bordered className="mt-3">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Members</th>
            <th>Code</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default function ScheduleTable() {
  const { data } = useSWR("/api/groups/getUserGroups");
  const { data: membersJSON } = useSWR("/api/user");
  return <div>{createTable(data, membersJSON)}</div>;
}
