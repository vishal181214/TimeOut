import React, { useState } from 'react'
import Data from './Data.json'
function PagiNation() {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = Data.splice(firstIndex, lastIndex);
    const ropage = Math.ceil(Data.length / recordsPerPage)
    const numbers = [...Array(ropage + 1).keys()].slice(1);
    return (
        <div>
            <table className='table'>
                <thead>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                </thead>
                <tbody>
                    {
                        Data.map((item, key) => {
                            return <tr key={key}>
                                <td>{item.Id}</td>
                                <td>{item.Name}</td>
                                <td>{item.LName}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <a href='!#' onClick={prevPage} className='page-link'>Prev</a>
                    </li>
                    {
                        numbers.map((n, i) => {
                            return <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a href="!#" onClick={() => changePage(n)} className='page-link'>{n}</a>
                            </li>
                        })
                    }
                    <li className='page-item'>
                        <a href='!#' onClick={nextPage} className='page-link'>
                            Next
                        </a>
                    </li>
                </ul>
            </nav>

            
        </div>
    )

    function prevPage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function nextPage() {
        if (currentPage !== ropage) {
            setCurrentPage(currentPage + 1)
        }
    }

    function changePage(id) {
        setCurrentPage(id);
    }
}

export default PagiNation
