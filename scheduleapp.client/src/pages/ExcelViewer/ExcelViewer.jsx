import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import axios from "axios";
import "./ExcelViewer.module.css"; // Ensure proper path to the CSS file

const ExcelViewer = () => {
    const { email } = useParams();
    const [excelData, setExcelData] = useState([]);
    const [columnWidths, setColumnWidths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchExcelFile(email);
    }, [email]);

    const fetchExcelFile = async (email) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`/api/excel/excelget/${email}`, {
                responseType: "arraybuffer",
            });

            const data = response.data;
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const range = XLSX.utils.decode_range(sheet["!ref"]);
            const jsonData = [];
            const widths = [];

            for (let row = range.s.r; row <= range.e.r; row++) {
                const rowData = [];
                for (let col = range.s.c; col <= range.e.c; col++) {
                    const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
                    const cell = sheet[cellRef];
                    const cellValue = cell ? cell.v : "";
                    rowData.push(cellValue);

                    // Update column widths based on cell content
                    if (!widths[col]) widths[col] = 10; // Default width
                    if (cellValue) {
                        const length = cellValue.toString().length;
                        widths[col] = Math.max(widths[col], length);
                    }
                }
                jsonData.push(rowData);
            }

            setExcelData(jsonData);
            setColumnWidths(widths.map((width) => width * 8)); // Convert to pixels
        } catch (err) {
            console.error("Error fetching Excel file:", err);
            setError("Failed to load the Excel file. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const saveExcelFile = async () => {
        try {
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(excelData);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

            const blob = new Blob(
                [XLSX.write(workbook, { bookType: "xlsx", type: "array" })],
                { type: "application/octet-stream" }
            );

            const formData = new FormData();
            formData.append("file", blob, `${email}_updated_template.xlsx`);

            await axios.post(`/api/excel/excelpost/${email}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Excel file saved successfully!");
        } catch (err) {
            console.error("Error saving Excel file:", err);
            alert("Failed to save the Excel file. Please try again.");
        }
    };

    const handleEditCell = (rowIndex, colIndex, value) => {
        const updatedData = [...excelData];
        if (!updatedData[rowIndex]) {
            updatedData[rowIndex] = Array(columnWidths.length).fill("");
        }
        updatedData[rowIndex][colIndex] = value;
        setExcelData(updatedData);
    };

    if (loading) return <p>Loading Excel file...</p>;

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Edit Excel File for {email}</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            {columnWidths.map((width, colIndex) => (
                                <th
                                    key={`header-${colIndex}`}
                                    style={{
                                        width: `${width}px`,
                                    }}
                                ></th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {excelData.map((row, rowIndex) => (
                            <tr key={`row-${rowIndex}`}>
                                {row.map((cell, colIndex) => (
                                    <td
                                        key={`cell-${rowIndex}-${colIndex}`}
                                        style={{
                                            width: `${columnWidths[colIndex]}px`,
                                        }}
                                    >
                                        <input
                                            type="text"
                                            value={cell || ""}
                                            onChange={(e) =>
                                                handleEditCell(rowIndex, colIndex, e.target.value)
                                            }
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={saveExcelFile}>Save Changes</button>
        </div>
    );
};

export default ExcelViewer;
