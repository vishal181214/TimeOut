import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jsPdf from 'jspdf';
import "jspdf-autotable";
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
// import { useDownloadExcel } from 'react-export-table-to-excel';

function Report() {
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const res = await axios.get('https://dummyjson.com/users');
            if (res) setData(res.data.users);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(data);

    // const exportExcel = useDownloadExcel({
    //     currentTableRef: data,
    //     filename: 'Emplyee Table',
    //     sheet: 'Employees'
    // })

    const exportPdf = () =>{
        const unit = "pt";
        const size = "A4";
        const orientation = "landscape"; //landscape portrait

        const marginLeft = 40;
        const doc = new jsPdf(orientation,unit,size);

        doc.setFontSize(15);

        const title = "Employee Report";
        const headers = [["EmpId","Firstname","Lastname","University","Email","Phone"]];

        const info = data.map(item => [item.id,item.firstName,item.lastName,item.university,item.email,item.phone]);

        let content = {
            startY:50,
            head:headers,
            body:info
        }

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel = async (excelData,fileName) =>{
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: {'data': ws}, SheetNames:['data']};
        const excelBuffer= XLSX.write(wb,{bookType:'xlsx', type:'array'});
        const data = new Blob([excelBuffer],{type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    

    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            <button type="button"  className="btn btn-default" style={{backgroundColor:"lightgray"}} 
            onClick={()=>exportToExcel(data,"employee data")}>
                Export To Excel
            </button>

            <button type="button" onClick={exportPdf} className="btn btn-default" style={{backgroundColor:"lightgray"}}>
                Print Pdf
            </button>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>EmpId</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>University</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.university}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Report
