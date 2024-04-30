import PropTypes from 'prop-types';
import ReactPaginate from "react-paginate";
import './pagination.css'

const MyPagination = ({itemsPerPage=5, setOffset, count, ...props}) => {
    const pageCount = calculatePageCount(count, itemsPerPage)
    function calculatePageCount(totalItems, itemsPerPage) {
        let totalPages = Math.floor(totalItems / itemsPerPage);
        if (totalItems % itemsPerPage !== 0) {
            totalPages++;
        }
        return totalPages;
    }


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % count;
        setOffset(newOffset)
    };

    if (pageCount < 2) {
        return <></>
    }

    return (
        <div
            {...props}
        >
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName="container__pagination"
                pageClassName="page"
                activeClassName="active__page"
                previousClassName='container__arrow'
                nextClassName='container__arrow'
                previousLinkClassName='arrow previous__link'
                nextLinkClassName="arrow next__link"
            />
        </div>
    );
};

MyPagination.propTypes = {
    setOffset: PropTypes.func,
    count: PropTypes.number,
    itemsPerPage: PropTypes.number,
};

export default MyPagination;