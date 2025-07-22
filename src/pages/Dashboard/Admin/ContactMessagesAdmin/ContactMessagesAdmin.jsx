import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const ContactMessagesAdmin = () => {
  const axiosSecure = useAxiosSecure();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['contactMessages'],
    queryFn: async () => {
      const res = await axiosSecure.get('/contact-messages');
      return res.data;
    },
  });
  console.log(messages);

  if (isLoading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
      <div className="overflow-x-auto w-full">
        <table className="table-auto min-w-[600px] w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 min-w-[146px]">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Message</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(({ _id, name, email, message, createdAt }) => (
              <tr key={_id}>
                <td className="border border-gray-300 px-4 py-2">{name}</td>
                <td className="border border-gray-300 px-4 py-2">{email}</td>
                <td className="border border-gray-300 px-4 py-2">{message}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactMessagesAdmin;
