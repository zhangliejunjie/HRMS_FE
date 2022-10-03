import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import myPdf from '../../1.pdf'
import { Button, Box } from '@mui/material'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFView = ({ pdf }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }
    function changePage(offSet) {
        setPageNumber(prevPageNumber => prevPageNumber + offSet);
    }

    function changePageBack() {
        changePage(-1)
    }

    function changePageNext() {
        changePage(+1)
    }

    return (
        <Box >
            <Box>
                <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page size="A1" pageNumber={pageNumber} sx={{ width: '100%' }} />
                </Document>

            </Box>
            <Box>
                {
                    numPages && <p style={{ textAlign: 'center' }}> Page {pageNumber} of {numPages}</p>
                }

                <Box>
                    {pageNumber > 1 &&
                        <Button onClick={changePageBack}>Previous Page</Button>
                    }
                    {
                        pageNumber < numPages &&
                        <Button onClick={changePageNext}>Next Page</Button>
                    }
                </Box>
            </Box>

        </Box >
    )
}

export default PDFView