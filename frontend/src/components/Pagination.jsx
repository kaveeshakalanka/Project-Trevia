const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
//calculations & Arrays
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow);

    if (endPage - startPage < maxPagesToShow) {
        startPage = Math.max(0, endPage - maxPagesToShow);
    }

    for (let i = startPage; i < endPage; i++) {
        pages.push(i);
    }
//pagination UI
    return (
        <div className="pagination">
            <button
                disabled={currentPage === 0}
                onClick={() => onPageChange(0)}
                title="First Page"
            >
                &laquo;
            </button>
            <button
                disabled={currentPage === 0}
                onClick={() => onPageChange(currentPage - 1)}
                title="Previous Page"
            >
                Prev
            </button>

            {startPage > 0 && <span style={{ alignSelf: 'center' }}>...</span>}

            {pages.map(page => (
                <button
                    key={page}
                    className={currentPage === page ? 'active' : ''}
                    onClick={() => onPageChange(page)}
                >
                    {page + 1}
                </button>
            ))}

            {endPage < totalPages && <span style={{ alignSelf: 'center' }}>...</span>}

            <button
                disabled={currentPage === totalPages - 1}
                onClick={() => onPageChange(currentPage + 1)}
                title="Next Page"
            >
                Next
            </button>
            <button
                disabled={currentPage === totalPages - 1}
                onClick={() => onPageChange(totalPages - 1)}
                title="Last Page"
            >
                &raquo;
            </button>
        </div>
    );
};

export default Pagination;
