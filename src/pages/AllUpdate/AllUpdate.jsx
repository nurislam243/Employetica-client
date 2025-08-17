import UpdateTableAndModal from '../../components/shared/UpdateTableAndModal/UpdateTableAndModal';

const AllUpdate = () => {
    return (
        <div className="px-3 @min-[280px]:px-[14px] @min-[350px]:px-4 @min-[400px]:px-5 @min-[500px]:px-8 @min-[1580px]:px-0">
            <div className='py-12 text-center relative max-w-[1536px] mx-auto w-full'>
                <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-10 text-center">
                    All Updates
                </h2>
                <UpdateTableAndModal></UpdateTableAndModal>
            </div>
        </div>
    );
};

export default AllUpdate;