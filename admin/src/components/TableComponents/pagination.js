

function Pagination(props) {
    const numPages = Math.ceil((props.pages / props.pageLimit))
    const getPaginationNum = () => {
        const numbers = [];
        for (let i = 1; i <= numPages; i++)
            numbers.push(i);

        return numbers;
    }

    const renderPageNumber = () => {
        let pageNumbers = getPaginationNum();
        return pageNumbers.map(num =>
            <button key={num} className="page" 
            style={num === props.currentPage+1 ? { backgroundColor: 'blue' , color: '#fff'} : null}
            onClick={() => props.setPage(num-1)}>{num}</button>
        )
    }

    const gotoNext = () => {
        if(props.currentPage < numPages - 1)
            props.setPage(props.currentPage + 1)
    }
    const gotoPrev = () => {
        if(props.currentPage > 0)
            props.setPage(props.currentPage - 1)
    }

    const renderPrevButtons = () => {
        return (
          <>
            <button key="first-page" disabled={props.currentPage === 0} onClick={() => props.setPage(0)}>&#171;</button>
            <button key="prev-page" disabled={props.currentPage === 0}  onClick={gotoPrev}>&#8592;</button>
          </>
        )
      };
    
      const renderNextButtons = () => {
        return (
          <>
            <button key="next-page" disabled={props.currentPage === numPages-1}  onClick={gotoNext}>&rarr;</button>
            <button key="last-page" disabled={props.currentPage === numPages-1}  onClick={() => props.setPage(numPages - 1)}>&raquo;</button>
          </>
        )
      };

    return (
        <div className="pagination-block">
            <button className="delte-btn" onClick={props.deleteRows}>Delete Selected</button>
            <div className="d-flex justify-content-end">
            {renderPrevButtons()}
            {renderPageNumber()}
            {renderNextButtons()}
            </div>
        </div>
    )
}

export default Pagination