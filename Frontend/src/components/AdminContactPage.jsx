import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContact,
  selectContact,
  selectContactLoading,
  selectContactError,
} from "../features/contactSlice";

const AdminContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContact);
  const loading = useSelector(selectContactLoading);
  const error = useSelector(selectContactError);

  useEffect(() => {
    dispatch(getContact());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Contact Us Messages
      </h2>

      {loading && (
        <p className="text-center text-gray-500">Loading contacts...</p>
      )}

      {error && (
        <p className="text-center text-red-600 mb-4">
          Error fetching contacts. Try again.
        </p>
      )}

      {!loading && contacts.length === 0 && (
        <p className="text-center text-gray-500">No contacts submitted yet.</p>
      )}

      {!loading && contacts.length > 0 && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((c, idx) => (
                <tr
                  key={c._id || idx}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {c.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {c.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {c.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminContactsPage;
