import { useGetClients } from "./client.hooks";

const ClientPage = () => {
  const { data: clients, refetch, isError } = useGetClients();
  return (
    <div>
      <h1>Clients</h1>
      <button onClick={() => refetch()}>Refetch</button>
      {isError && <div>Error: NOPE!</div>}
      <ul>
        {clients?.map((client) => (
          <li key={client.id}>{client.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClientPage;
