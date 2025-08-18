import React, { useEffect, useState } from 'react';
import Spinner from '../../common/Spinner/Spinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UpdateTableAndModal = ({length}) => {
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUpdate, setSelectedUpdate] = useState(null);
    const axiosSecure = useAxiosSecure();
    console.log(updates);

    useEffect(() => {
        const fetchUpdates = async () => {
        try {
            const res = await axiosSecure.get("/allUpdate", {
            params: { length }
            });
            setUpdates(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

        fetchUpdates();
    }, [axiosSecure, length]);

    if (loading) return <Spinner />;

    return (
        <div>
            <div className="overflow-x-auto">
            <table className="table w-full border border-base-300">
                <thead className="bg-primary text-white">
                <tr>
                    <th className="text-left">Date</th>
                    <th className="text-left">Title</th>
                    <th className="text-left hidden lg:table-cell">Description</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {updates.map((update, index) => (
                    <tr
                    key={update.id}
                    className={index % 2 === 0 ? "bg-base-100" : "bg-base-200"}
                    >
                    <td>{update.date}</td>
                    <td>{update.title}</td>
                    <td className="hidden lg:table-cell line-clamp-2">
                        {update.description.slice(0, 70)} ...
                    </td>
                    <td>
                        <button
                        className="min-w-[86px] btn btn-sm btn-primary"
                        onClick={() => setSelectedUpdate(update)}
                        >
                        Read More
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            {/* Custom Modal */}
            {selectedUpdate && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                {/* Transparent overlay */}
                <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setSelectedUpdate(null)}
                ></div>

                {/* Modal content */}
                <div className="relative bg-base-100 p-6 rounded-lg shadow-lg max-w-lg w-full z-10">
                <h3 className="font-bold text-xl text-primary mb-3">
                    {selectedUpdate.title}
                </h3>
                <p className="text-sm text-secondary mb-5">{selectedUpdate.date}</p>
                <p className="text-base-content mb-5">{selectedUpdate.description}</p>
                <div className="flex justify-end">
                    <button
                    className="btn btn-outline btn-primary"
                    onClick={() => setSelectedUpdate(null)}
                    >
                    Close
                    </button>
                </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default UpdateTableAndModal;